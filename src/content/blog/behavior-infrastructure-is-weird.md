---
title: "Behavior infrastructure is weird now. So was observability in 2010."
description: "Every category that became inevitable looked unnecessary right before it became inevitable. The tell is always the same."
pubDate: 2026-05-07
langue: en
etiquettes: [lab, harness]
draft: true
---

In 2010, telling an engineering team they needed a separate product to understand their own running system sounded like overhead. They had logs. They had a person who knew which server to SSH into. The system was complex but it was complex at a scale a few people could still hold in their heads. Paying a vendor to tell you what your own software was doing felt like paying someone to read your own diary.

Datadog launched into that. So did the rest of the observability category. For a few years it was a hard sell, because the pain it removed was a pain teams had normalized. They did not experience "we cannot see our system" as a problem. They experienced it as Tuesday.

Then systems crossed a complexity threshold, the number of services went up faster than the number of people who could reason about them, and observability stopped being weird. It became a line item nobody argues about. The shift was not that the tools got better. The shift was that the thing they made visible got too big to hold in a head, and the head had been the only instrument.

## The pattern, not the anecdote

This is not a story about observability. It is the shape every infrastructure category follows, and the shape is worth naming because we are inside it again.

Feature flags were "just an if-statement and a config file" until the cost of a bad deploy and the number of deploys both went up, and then LaunchDarkly was a category. Version control was a discipline serious people thought was excessive ceremony until codebases and teams got large enough that not having it was the excessive thing. CI was paranoia until it was negligence to skip it.

Each one followed the same three steps. First, the capability exists informally, held by a person or a habit. Second, something scales — systems, teams, deploy frequency, blast radius — until the informal version stops fitting in the place it used to fit. Third, the formal version stops being overhead and becomes the thing you are negligent for not having. The category does not get created by a vendor. It gets created by the scaling event. The vendor just shows up holding the formal version when the informal one breaks.

The tell, every time, is the same sentence: "we already do that, informally." That sentence is not evidence the category is unnecessary. It is evidence the category is pre-inflection. "We already do observability, we have logs." "We already do feature management, we have a toggle." The informal version existing is the precondition, not the counterargument.

## What is scaling right now

The capability that currently lives informally is this: knowing what your software actually does, held in the heads of the few people who have been there long enough.

That has always been informal. It worked because the rate of change was bounded by how fast humans could write code, and humans writing code was also how humans came to understand it. The informal store was continuously refilled by the same process that changed the system.

That coupling is breaking. Code is now produced faster than the people responsible for it can absorb what changed. The informal store of "what does this system do" is being drawn down faster than it is being refilled, for the first time, structurally. That is the scaling event. Not more code. The decoupling of code production from system understanding.

So the category is at step two. The capability exists informally — it is the senior engineer, the tribal knowledge, the doc that is six months stale. Something is scaling against it. The formal version sounds like overhead today for exactly the reason observability sounded like overhead in 2010: the pain it removes is one teams have normalized into Tuesday.

## Why the timing argument matters more than the product argument

Being early in a category is not a marketing problem to be solved with a louder description. It is a question of whether the scaling event is real and whether it has actually started. If it has not, no amount of category creation works, because you are selling a formal solution to an informal pain that still fits in the place it lives.

The evidence that this one has started is not a metric I can put on a chart. It is the consistency of the conversation. Teams describe the symptom — onboarding got slower, changes break things nobody predicted, no one can fully say what the system does — without connecting it to a cause and without a word for it. Undiagnosed, consistent, repeating across companies that have never spoken. That is exactly what step two sounded like the last three times.

"Behavior infrastructure is weird" is a true statement about right now. It was equally true about observability in 2010 and about feature flags in 2012. The weirdness is not a verdict on the category. It is the timestamp.
