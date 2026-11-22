const ARTICLE_PATH = /\/articles\/([^/]+)\.md$/u;
const HEADING_TAG = /^h[1-6]$/u;

/** Give each article's Markdown headings unique IDs in combined research pages. */
export function namespaceArticleHeadings() {
  return (tree, file) => {
    const source = String(file.path ?? '').replaceAll('\\', '/');
    const match = source.match(ARTICLE_PATH);
    if (!match) {
      return;
    }

    const prefix = `${match[1]}-`;
    const headingIds = new Set();
    const anchors = [];
    function visit(node) {
      if (node.type === 'element') {
        const id = node.properties?.id;
        if (HEADING_TAG.test(node.tagName) && typeof id === 'string') {
          headingIds.add(id);
          node.properties.id = `${prefix}${id}`;
        } else if (node.tagName === 'a') {
          anchors.push(node);
        }
      }
      for (const child of node.children ?? []) {
        visit(child);
      }
    }
    visit(tree);

    // Keep intra-document heading links working on both article and report pages.
    for (const anchor of anchors) {
      const href = anchor.properties?.href;
      if (typeof href === 'string' && href.startsWith('#')) {
        const fragment = href.slice(1);
        if (headingIds.has(fragment)) {
          anchor.properties.href = `#${prefix}${fragment}`;
        }
      }
    }
  };
}
