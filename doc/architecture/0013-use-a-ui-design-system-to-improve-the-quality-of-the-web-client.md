# 13. use a UI Design system to improve the quality of the web client

Date: 2023-01-16

## Status

Accepted

## Context

There exist UI design systems which provide out of the box components for things
like buttons that are nice to use. There has been a lot of UX testing and
iteration that goes into designing these component libraries; they will be
better than what I have the time/skill to do on my own. 

Material UI is a popular design system that I am familiar with. Out of the box
it works with the existing Preact tooling, and it adds only 10s of kilobytes to
the bundle size. For example, this commit adds a button with icons and it has
the following impact on bundle size:

    route-verse.chunk.*****.esm.js ⏤  36.6 kB (+32 kB)

5 kB to 37 kB is a big jump, but it's still only 10s of kBs per page. My guess
is that we won't notice the difference in loading times.

## Decision

Use Material UI components.

## Consequences

- pro: it will be easier to make a more usable application
- con: Extra 10s of kBs per page to the bundle size. 
   - but my guess is that this is negligible

It would be orders of magnitude more time to create these components from
scratch. If the bundle size is enough of a problem to warrant the investment, we
can revisit this decision and consider replacing the Material UI components with
bespoke (lightweight) components. Because these components tend to have simple
interfaces, it should not be a big obstacle to roll our own. 

What becomes easier or more difficult to do and any risks introduced by the change that will need to be mitigated.
