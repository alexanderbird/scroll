# 7. use Preact for the web app

Date: 2022-04-09

## Status

Accepted

## Context

Web app frameworks save a bunch of time and effort. There are lots available,
but I'm most familiar with the JSX family of frameworks. I like Preact the best
because it's interoperable with React components but much more lightweight. For
example: `react-dom@18.0.0` is 41.7kB minified & gzipped ([bundlephobia source](https://bundlephobia.com/package/react-dom@18.0.0))
whereas `preact@10.7.1` is 4kB ([bundlephobia source](https://bundlephobia.com/package/preact@10.7.1)).

## Decision

Use Preact.

## Consequences

It's a decent, modern, popular, well supported web framework with which I am
familiar. 

Until we have specific use cases that this doesn't work for, it's a great
default. If we find it's not working, we can switch it out. 
