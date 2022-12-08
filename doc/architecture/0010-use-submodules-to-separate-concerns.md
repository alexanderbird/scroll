# 10. use submodules to separate concerns

Date: 2022-12-08

## Status

Accepted

## Context

There are sevaral (mostly) independent components of this application: the
frontend, the infrastructure as code, the data loading component (prepopulating
the database with the Bible text), some cross-cutting tests, etc..

If all those things are in the same package it will be hard to tell what docs
and dependencies are needed for different components. If someone wants to
contribute to just one aspect (e.g. adding support for an additional Bible
translation which shouldn't impact the front end, or enhancing the front end
without changing the database infrastructure) it would be helpful to be able to
clone and work on just the one package in isolation. Also, when we deploy the
front end with something like Netlify or GitHub pages, it would be helpful to
have a minimal package.json that has only the frontend specific dependencies.

On the other hand, it's helpful to have a single entrypoint that allows you to pull down
the complete code for the application (end to end). 

In the monorepo space, there are tools that support managing dependencies across
child repos in a monorepo (e.g. Lerna). They support recursive commands,
cascading builds, and things like that. However, for this project we don't have
a lot of complex dependencies between repos; it's not obvious that the
complexity of a monorepo manager is worth the benefit. If we're finding the
manual integration of the child repos is problematic, it should be possible to
start using one.

## Decision

Use a submodule-based monorepo structure for the project (with no monorepo
manager like Lerna). Integration instructions can be handled with documentation
or scripts. If that becomes too expensive, we can revisit this decision.

## Consequences

### Positive
- There is a single entry point for the project (this package)
- each component can be cloned independenly and has an independent package.json
  file
- if we have a good reason to use a different language or different language
  settings between components, that is easy

### Negative
- maybe we will have repetitive config across the different components? If this
  becomes a problem that we can't easily resolve we should revisit the decision.
    - the intent is for each component to be independent of the parent project,
      so it would be counter productive to hoist shared stuff into the parent
      repo. We could use a common repo for things like common TypeScript config,
      or we could change the monorepo decision.

What becomes easier or more difficult to do and any risks introduced by the change that will need to be mitigated.
