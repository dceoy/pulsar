---
title: Microsoft unveils Maia 300 and plans gigawatt-scale AI inference deployments
description: Microsoft plans to deploy its Maia 300 accelerator in 2027, with ambitious efficiency and throughput claims for its own AI services.
publishedAt: "2026-10-12T15:07:08Z"
researchId: 2026-10-12-news
tags:
  - artificial-intelligence
  - semiconductors
  - cloud-infrastructure
---

Microsoft announced the third-generation Azure Maia 300 AI inference system on
October 12, 2026, and said it intends to scale the Maia family to multi-gigawatt
deployments starting in 2027. The company expects Maia to become its primary
inference platform for Microsoft products and services. The announcement signals
a larger commitment to custom chips at a time when power availability, memory
bandwidth and model-serving costs are central constraints on AI infrastructure.
[Microsoft's announcement](https://blogs.microsoft.com/blog/2026/10/12/microsoft-to-expand-azure-maia-system-to-multi-gigawatt-deployments/)
distinguishes the Maia 300 rollout plan from Maia 200, which is already serving
production workloads.

## What Microsoft disclosed

Maia 300 is optimized for long-context reasoning, memory-intensive decoding and
multi-step agent workloads. Microsoft describes a chiplet design that separates
compute, memory controllers and I/O. Compute chiplets use TSMC's N2P process;
eight HBM4 stacks provide **288 GB of memory and 18 TB/s of peak bandwidth per
accelerator**. The accelerator's stated thermal design power is **950 W**.
These specifications come from Microsoft's
[architecture deep dive](https://azure.microsoft.com/en-us/blog/deep-dive-into-azure-maia-300-architecture/).

A complete rack combines **96 accelerators within a 167 kW power envelope**,
with 27.6 TB of aggregate HBM capacity. Microsoft says its Ethernet-derived
scale-up fabric can connect as many as 12,288 accelerators in a superpod.
The design emphasizes local data movement, low-precision inference and
cross-accelerator communication rather than treating peak arithmetic throughput
as the only performance measure.

Microsoft projects **40% more generated tokens per megawatt than leading
GPU-based systems**, and up to **seven times the rack-level token throughput of
Maia 200**. The latter is a comparison between generations at rack scale, not
a sevenfold gain for an individual chip. The company also reports more than
2.5 times the rack-level performance per watt versus Maia 200.
These are **vendor-reported comparisons**, and Microsoft has not supplied a
public, workload-matched independent benchmark in the cited announcement.

## Deployment status and what remains uncertain

Maia 200 is already used for Microsoft Copilot and model-development workloads,
with expansion to GitHub Copilot and Microsoft Foundry planned. **Maia 300 is
not yet a generally deployed production system**; production deployment is
scheduled to begin in 2027. Microsoft's performance projections therefore
should not be interpreted as measured service-level improvements available
to Azure customers today.

The announcements do not establish general-purpose training performance,
third-party availability, inference prices or a direct total-cost-of-ownership
comparison under identical models and service-level objectives. The mix of
models, batch sizes, context lengths, latency targets and utilization rates
will materially affect observed efficiency.

## Analysis: why the architecture matters

**Interpretation:** Inference economics increasingly depend on useful tokens
delivered within fixed power, cooling and memory constraints. Microsoft's
emphasis on rack-scale efficiency and high-bandwidth memory addresses those
constraints more directly than a chip-only specification. Custom silicon could
also give Microsoft more control over its deployment economics, but that
benefit depends on software maturity, fleet utilization and the cost of
developing and operating the hardware.

The next evidence to watch is independently comparable inference throughput,
latency and power measurements, followed by confirmed production deployment
and customer-facing economics in 2027.

## Sources

- [Microsoft: Azure Maia deployment announcement, October 12, 2026](https://blogs.microsoft.com/blog/2026/10/12/microsoft-to-expand-azure-maia-system-to-multi-gigawatt-deployments/)
- [Microsoft Azure: Maia 300 architecture deep dive, October 12, 2026](https://azure.microsoft.com/en-us/blog/deep-dive-into-azure-maia-300-architecture/)
- [Reuters: Microsoft outlines custom AI chip deployment plans, October 12, 2026](https://www.reuters.com/business/microsoft-plans-huge-deployment-its-own-ai-chips-with-an-eye-saving-costs-2026-10-12/)
