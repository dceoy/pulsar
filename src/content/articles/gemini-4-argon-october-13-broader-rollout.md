---
title: Google expands Gemini 4 Argon access after its September cyber-defender preview
description: The October 13 developer and consumer rollout broadens access to Google's frontier model; pricing, benchmark claims and agent safety still require operational scrutiny.
publishedAt: "2026-10-13T16:30:42.036Z"
researchId: 2026-10-14-daily-intelligence
author: ChatGPT
tags:
  - artificial-intelligence
  - ai-agents
  - developer-tools
  - cybersecurity
---

Google expanded access to **Gemini 4 Argon** on **October 13, 2026**,
making its frontier model available to paying developers and businesses
and to eligible subscribers of its consumer services. The event is an
**access expansion, not the model's first announcement**: Google initially
introduced Argon on **September 30** with a controlled rollout to
cybersecurity partners. Distinguishing those dates matters when
assessing the release timeline. [Reuters reported the October 13
rollout](https://www.reuters.com/business/google-launches-flagship-ai-model-gemini-4-argon-developers-businesses-2026-10-13/);
[Google's September announcement](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-argon/)
describes the earlier preview and technical claims.

## Availability and published pricing

Reuters reports that paying customers can use Argon through Google's
AI application-development tools, while **Google AI Pro and Ultra**
subscribers can access it through the Gemini app and AI Mode in Search.
The **Antigravity** coding experience is restricted to Ultra subscribers
for this release. These are different product surfaces with distinct
access controls; availability in one does not demonstrate general
availability in another.

Google lists introductory API prices of **$2 per million input tokens**
and **$10 per million output tokens**, with cached input at a reported
95% discount. The company's September post states that prices rise to
**$4 and $20**, respectively, after the introductory period. Reuters
reports an end to the introductory rates after **November 30, 2026**;
the original Google post does not itself specify that date.
Pricing applies to token usage and should not be interpreted as a
complete enterprise cost estimate, which also depends on throughput,
tool calls, storage, retries and supervision.

## Capabilities are promising but need workload-specific validation

Google positions Argon for multi-step software engineering,
cybersecurity defense and specialized knowledge work in law and
finance. It reports **77.9% on DeepSWE v1.1**, a long-horizon software
engineering evaluation, and a **68% CWE-bench v1** remediation score.
These are Google-presented results with particular evaluation
protocols, not proof that the model leads under every independent
coding or security workload.

Google also advertises a **one-million-token output limit**, up from
64,000 tokens in its cited comparison. That figure refers to output
capacity; it should not be confused with a guarantee of coherent
execution across an equally long task or with a context-window size.
Long-running agents still require effective checkpointing, rate-limit
handling and independent verification of changes.

Reuters reports that teams piloting Argon in Antigravity increased
agent-generated code submissions by more than **35%** and reduced
rollbacks by nearly **one-third**, according to Google. The cited
reporting does not establish randomized assignment, comparable
project difficulty, or independent replication, so these should be
treated as company-reported operational metrics rather than
transferable productivity guarantees.

## Analysis: controls matter more than a leaderboard position

**Interpretation:** The material change on October 13 is that
engineering organizations can start testing Argon against their own
tasks instead of relying on the September limited-access preview.
A useful evaluation should measure accepted changes, CI pass rates,
review defect severity, rollback frequency, latency and total cost
under a consistent tool-permission policy. Benchmark results alone
cannot answer whether an agent can safely merge code or operate
production systems.

Google's September post describes prompt-injection defenses,
misalignment monitoring, sandbox hardening and a phased cyber-defender
program. Those are vendor statements about safeguards, not an
independent certification that autonomous workflows are safe.
Independent red teaming, audit logs, scoped credentials and human
approval for consequential operations remain relevant.

## Sources

- [Reuters: October 13, 2026 Argon access expansion](https://www.reuters.com/business/google-launches-flagship-ai-model-gemini-4-argon-developers-businesses-2026-10-13/)
- [Google: original September 30 Argon announcement](https://blog.google/innovation-and-ai/models-and-research/gemini-models/gemini-4-argon/)
- [Google DeepMind: Gemini 4 Argon cybersecurity capabilities](https://deepmind.google/models/gemini/cyber/)
