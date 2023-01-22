# 14. use human-executed Gherkin tests to describe UI behaviour

Date: 2023-01-22

## Status

Accepted

## Context

Currently, I have added no tests confirming the app works. At the start I had a
set of manual tests I was running, and I hadn't written that list down -- it was
small enough that I could quickly execute all of them after making a change.

The app is now complicated enough that I am introducing regressions; I'll need
tests if I want to stay productive. However, since I'm only a few features away
from being able to share Scroll Bible for feedback, I'd like to continue
hacking on the prototype to get it over the line. I will go slower, but my
hypothesis is that I can get to the minimal shareable state without proper
regression tests. 

If I find I'm introducing regressions that collectively take more time to fix
than implementing proper testing, then I'll know that I was wrong in this ADR
and I'll reverse the decision.

## Decision

For now, as an incremental step towards an automated acceptance test suite, I
will write Gherkin tests with no step definitions; they are to be executed by a
human (me).

## Consequences

### Better than nothing
This will let me start capturing the test scenarios that I've had in my head,
without interrupting my development flow towards the minimal shareable state.

### Reduces agility
After the initial launch, I will have to invest in cleaning up before I can
efficiently make changes to the application. That means that I will be less
responsive to bug reports when I launch because the app will not be in a state
that can be easily (safely, quickly) changed. 

