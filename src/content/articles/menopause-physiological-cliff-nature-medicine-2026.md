---
title: Nature Medicine study reconstructs abrupt systemic lab changes around menopause
description: An analysis of roughly 300 million lab tests across US and Israeli datasets finds population-level inflection points near the final menstrual period, but cannot prove benefits of hormone therapy.
publishedAt: "2026-10-13T16:30:42.036Z"
researchId: 2026-10-14-daily-intelligence
author: ChatGPT
tags:
  - biomedical-research
  - womens-health
  - epidemiology
  - medical-data-science
---

A **Nature Medicine** study published on **October 12, 2026**, and
highlighted in a **October 13** research release, reports a broad
population-level change in laboratory trajectories around the
**final menstrual period (FMP)**. Using a computational approach to
align test patterns when individual FMP dates are often missing,
researchers analyzed **more than 300 million laboratory tests** from
US and Israeli datasets. The paper describes these inferred shifts as
a physiological "cliff." This is a methodological and observational
finding, **not proof that every person experiences a sudden clinical
deterioration at menopause**.
See the [peer-reviewed original article](https://www.nature.com/articles/s41591-026-04614-0)
and [Nature's October 13 research highlight](https://www.natureasia.com/ja-jp/nm/pr-highlights/15645).

## How the researchers reconstructed menopause timing

The authors used US **NHANES data from 1999-2022** and laboratory
records from **Clalit Health Services in Israel from 2004-2024**.
The Israeli dataset included approximately **1.3 million women aged
30-70**. Because a person's FMP is usually not recorded alongside
every test, the authors developed the **YoGlen** deconvolution
approach: it mathematically removes the apparent blurring caused by
variation in menopause age across the population.

Importantly, **the method does not estimate the exact FMP date for
each individual**. It reconstructs average laboratory trajectories
relative to an inferred population transition. This makes the study
valuable for identifying systemic patterns in large observational
datasets but unsuitable as a validated individual diagnostic clock.

## Main findings across organ systems

The researchers examined **90 laboratory measures** and found
statistically significant menopause-associated shifts in **52 of
90**, using multiple-testing correction in a comparison with male
reference trajectories. A ferritin trajectory, for example, showed
an inferred step of approximately **0.6 standard deviations**.
The patterns spanned endocrine, skeletal, liver, kidney, blood and
lipid measurements. Age-adjusted male comparison trajectories did
not show analogous discontinuities.

For overlapping measurements, the size of the shifts was strongly
correlated between the two datasets (**Pearson r = 0.89**). This
cross-population agreement supports reproducibility of the pattern,
although it does not independently validate each inferred person's
menopause timing.

The analysis also inferred changes long before FMP: accelerated
population-average changes began roughly **15 years before FMP for
anti-Müllerian hormone**, **14 years for FSH**, and **12 years for
estradiol**. These are reconstructed group trajectories, not
validated personalized prediction windows.

## Hormone therapy: association is not a treatment effect

The authors observed smaller menopause-associated laboratory
shifts among people using **menopausal hormone therapy (MHT)**.
In NHANES, they adjusted measured socioeconomic and lifestyle
factors with propensity-score matching and regression. The study
also compared periods before, during and after MHT prescriptions
for a subgroup in the Israeli data.

This finding is **observational**. MHT recipients can differ from
nonrecipients in healthcare access, underlying health and
unmeasured risk factors even after statistical adjustment.
The authors explicitly call for prospective randomized trials
to establish causal effects. The paper does not justify initiating
hormone therapy solely to normalize laboratory trajectories.

## Analysis: implications for medical data science

**Interpretation:** The key innovation is the reuse of large
cross-sectional laboratory datasets to study transitions whose exact
time stamps are missing. Similar latent-time alignment methods may
be useful for puberty, disease onset or recovery, but only if the
assumed event-time distribution is reasonable and sensitivity checks
are convincing.

For clinical translation, the next steps are prospective cohorts
with directly observed FMP dates, independent external validation,
and tests of whether reconstructed signals improve patient-relevant
outcomes beyond conventional age-based risk assessment.
A laboratory discontinuity is not automatically a meaningful
endpoint for diagnosis, prevention or treatment.

**Evidence limitations:** Clalit individual-level data are not
publicly available; the paper provides code and aggregated or
simulated materials. The deconvolution assumes a distribution of
menopause age, and residual confounding remains, particularly in
the hormone-therapy comparisons. The findings concern population
averages and should not be generalized uncritically to individual
patient decisions.

## Sources

- [Pridham and colleagues, Nature Medicine, published October 12, 2026](https://www.nature.com/articles/s41591-026-04614-0)
- [Nature Portfolio: research highlight, October 13, 2026](https://www.natureasia.com/ja-jp/nm/pr-highlights/15645)
- [Authors' analysis code and shared materials: YoGlen](https://github.com/AlonLabWIS/YoGlen)
