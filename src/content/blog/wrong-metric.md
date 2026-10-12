---
title: "The metric AI coding tools optimize is the wrong one"
description: "Lines shipped per hour went up. The number that matters went down, and nobody is measuring it."
pubDate: 2026-04-09
langue: en
etiquettes: [lab, harness]
draft: true
---

Every AI coding tool sells the same number: more code, faster. Cursor, Copilot, the agent frameworks, the IDE plugins. The pitch is throughput. You write less, the machine writes more, the pull requests pile up, the velocity chart goes up and to the right.

The number is real. The conclusion drawn from it is wrong.

Throughput was a useful proxy when a human wrote every line. If someone produced more working code per week, they understood more of the system per week, because writing the code was how you came to understand it. The output and the understanding moved together. You could measure one and trust the other.

That link is now broken. The code gets written by something that does not retain what it learned, working from a prompt that does not persist. The output goes up. The understanding does not come with it. You are measuring the part that got cheap and ignoring the part that got expensive.

## What the number hides

Ask a CTO what their product does. You will get a clear answer, at the level of features and flows. Now ask the codebase the same question. Read it the way a new hire would, or the way an auditor would, and reconstruct the actual behavior: every state the system can be in, every condition that changes the outcome, every rule that fires on an edge case nobody mentions in the standup.

The two answers used to be close. They are drifting apart, and AI-generated commits widen the gap with every merge. The mental model in the CTO's head was built over years. The code is now being changed faster than that model can be updated. The map and the territory are separating, and the tool that accelerated the separation is the one being celebrated for it.

This is not a complaint about AI code quality. The code often works. It passes the tests. It ships. The problem is not that the output is bad. The problem is that the output arrives without the thing that used to arrive with it: a person who now knows how the system behaves and why.

## The honest version of the productivity question

The industry already senses this. Look at how serious engineering organizations are responding, not at what the tool vendors say.

Amazon mandates senior sign-off on AI-generated changes. Meta tracks token usage in performance reviews. Uber has equated pull-request volume with productivity. These are not solutions. They are symptoms. Each one is a large organization noticing that the old proxy stopped working and reaching for a manual patch. Senior sign-off is a human being asked to reconstruct intent by reading a diff, one diff at a time, for a volume of diffs that is increasing. That does not scale. It is the bottleneck moving, not the bottleneck closing.

The reason none of these work is that they all measure or gate the code, and the code is not where the loss happened. The loss happened when the intent behind the change was never written down anywhere a person or a system could later read it. The pull request records what changed. It does not record what the system is now supposed to do, or why this behavior and not the one that was there yesterday.

## What should be measured instead

The useful question is not "how much code did we ship." It is "can we still answer what the system does, from something other than the code itself, and is that answer current."

That is a measurable thing. It has a yes or no. Most teams shipping AI-generated code at volume would answer no, and would not have a way to even check, which is the actual finding.

I spent a career being the layer between what a business wanted and what the software did. Consulting, building, teaching. The same failure repeated at every company: the intent existed clearly in someone's head, degraded through every translation on the way to code, and was never captured in a form anyone could verify against later. That was true when humans wrote all the code and the translation was slow. It is worse now, because the translation is fast and the number on the dashboard says everything is fine.

Throughput going up while answerability goes down is not a productivity win. It is debt, taken on at machine speed, recorded nowhere, and reported as progress.

The first company that measures the second number instead of the first one will find out how far apart the two have already drifted. The number will not be flattering. It will be the true one.
