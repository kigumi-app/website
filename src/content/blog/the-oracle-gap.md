---
title: "The oracle gap"
description: "AI can rewrite a function in seconds. Deciding whether the rewrite still does the right thing is the unsolved part, and it is older than AI."
pubDate: 2026-05-16
langue: en
etiquettes: [lab, harness]
draft: true
---

Software testing has a name for the hard part. It is called the oracle problem. Given an input and an output, how do you decide whether the output is correct? Running the program tells you what it does. It does not tell you what it should do. The thing that knows "should" is the oracle, and for most real systems the oracle is a person's understanding, not an artifact you can execute.

For decades this was a manageable gap, because the rate of change was bounded by the rate at which humans wrote code, and the human who wrote the code carried the oracle in their head while they wrote it. The test suite was a partial, externalized fragment of that understanding. It was never the whole thing and everyone knew it. It was good enough because the person was still there.

AI rewriting code at volume removes the person from that loop while leaving the oracle problem exactly where it was. This is the part the current tooling conversation skips.

## Equivalence is the wrong question

When an agent rewrites a function, the question people reach for is: is the new function equivalent to the old one? It sounds rigorous. It is the wrong question, for two reasons.

First, exact behavioral equivalence is undecidable in general and intractable in practice for anything with real state and IO. You cannot, in the budget of a pull request, prove that two non-trivial functions behave identically across all inputs. Anyone who has tried to do this seriously ends up approximating, and the approximation is where the bugs hide.

Second, you usually do not want equivalence. The rewrite often exists to change behavior, intentionally, in some respects and not others. The real question is not "is it the same." It is "did it stay the same in the ways that were supposed to stay the same, and change only in the ways that were supposed to change." That question has no answer unless something, somewhere, recorded which ways were supposed to stay the same. That record is the oracle. It almost never exists in executable form.

## Why the existing instruments do not cover this

Tests are an oracle written down, partially. They caught on as a discipline because, in a typed functional setting, the type system was expressive enough that you could state a property and have the machine generate cases against it. Property-based testing worked because the specification language was strong enough to say something true about intent rather than just about a signature. That is the actual lesson of QuickCheck and its descendants, and it is usually misremembered as "generate random inputs." The generation was never the point. The expressiveness of the property was the point.

Behavioral verification of AI-rewritten code needs the same jump, and it is harder, because the property has to express intent at the level of the system, not the function. "This function returns a sorted list" is a tractable property. "This change preserved the rule that a suspended account cannot start a checkout, while intentionally relaxing the rule about trial length" is the property that actually matters, and there is no type system in a mainstream stack that captures it. It lived in someone's head. The someone is now reviewing forty diffs an hour.

Coverage does not help here. Coverage measures whether code ran, not whether it did the right thing. A rewrite can pass every existing test, hit full coverage, and silently drop a condition that no test encoded because the condition lived in the original author's understanding and was never externalized. The test suite goes green. The behavior changed. Green meant "nothing I wrote down broke," which was always a weaker claim than the green color implied, and AI volume makes the gap between those two claims the whole game.

## Where the field is converging

The interesting signal is that this is being hit independently from several directions at once. The harness-engineering work coming out of frontier labs keeps running into the same wall: the agent can generate a candidate, and the bottleneck is deciding whether the candidate is acceptable, which requires an oracle the harness does not have. Specification-driven approaches keep rediscovering that the spec, to be useful, has to be executable and has to express intent, and that writing such a spec by hand is the work everyone was trying to avoid. The verification conversation and the AI-codegen conversation are converging on one unsolved problem from opposite sides without always naming it as the same problem.

It is the same problem. The oracle gap predates AI by decades. AI did not create it. AI removed the thing that was quietly compensating for it — a human who held the intent while the code was small enough and slow enough for one person to hold.

The useful framing is not "how do we make AI write better code." The code is often fine. It is "where does the oracle live now that the person who used to be it is reviewing diffs at a rate that makes being it impossible." That question does not have a satisfying answer in the current toolchain. Pretending the test suite is the answer is how teams will find out, in production, that it was never the whole oracle and only looked like it while a human was standing next to it.
