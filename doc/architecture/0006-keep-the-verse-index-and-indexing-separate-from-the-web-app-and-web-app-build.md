# 6. Keep the verse index and indexing separate from the web app and web app build

Date: 2022-04-09

## Status

Accepted

## Context

For performance reasons, we'll want to pre-process the verse data into a
ready-to-use format. This should be repeatable so that we can refine the
indexing and also so that we can apply the indexer to different translations.

Probably the web application will have a build step. 

The web application will not need all of the translations loaded at once. Maybe
in the far future, there would be a multi-translation aspect (parallel Bible),
but I don't think we should assume we'll always need all the translations. 

The getbible.net dataset is a little under 10MB for a translation. That's
manageable as a single asset, but if we had 100s of translations, that's too
big. 

So we want to vary the translation but there's no need to recompile the app for
each translation.

Also, the translation list and the indexing process are likely to not be changed
at the same time as the web app. There is no need to rebuild the web app while
re-running the indexer, and there is no need to re-index the translations if
only the web app has changed.

## Decision

Let the build step for indexing and for building the web app be separate.

Let the artifacts for the web app be independent of the artifacts from the index
step. That is to say: the web app ought to dynamically load the indexed Bible
(instead of having the indexed text built into the web app assets).

## Consequences

We can change the web app or the indexer without rebuilding the other. This
should be faster for development. 

When we go from one translation to multiple translations, we're less likely to
find some hard-coded issue between the two that make extending it expensive. 

When we do support multiple translations, each client only needs to download the
web app assets and the chosen translation (not all of the translations). 

For now, for simplicity, we can have a single build command that does
everything. However, it should call out to two different independent build
scripts to do its work. 
