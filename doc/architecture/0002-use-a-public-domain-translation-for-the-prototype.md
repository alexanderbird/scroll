# 2. Use a public domain translation for the prototype

Date: 2022-04-08

## Status

Accepted

extended by [3. use the WEB translation](0003-use-the-web-translation.md)

## Context

We'll need one or more Bible translations. In the interest of getting something
working sooner, I'd like to stick with one translation.

Licensing a Bible translation for republishing is not easy business. For
example:

- https://hackathon.bible/data/ provides a list of many Bible data sources, but
  I didn't see anything usable
- blb.org has great concordance and interlinear Bibles, but their
  [policies](https://www.blueletterbible.org/about/permissions.cfm) make it
  clear that we mustn't scrape data from their website
- biblia.com looks great, but their [terms of use](https://bibliaapi.com/docs/Terms_of_Use)
  make it clear that the data can't be stored in a separate database or
  retrieval system (which would be quite restrictive in how we build the app)
- [SWORD-to-JSON](https://github.com/wasdin/SWORD-to-JSON) apparently can
  convert Sword files (e.g.
  [NASB](https://shop.lockman.org/products/e-sword-new-american-standard-bible-study-set-nasb-2020-text))
  to JSON, but I can't imagine those are licensed to be published on a website
- getbible.net has a wonderful [list of JSON encoded Bibles](https://getbible.net/v2/translations.json),
  but they're all public domain.

## Decision

Use a Public Domain Bible translation for the prototype. 

## Consequences

- No troubles with licensing
- It's not going to be my preferred translation
- We'll get a working prototype sooner
- Down the road, once there's a prototype, maybe we can hand the project off to
  blb.org or someone similar and let them handle the licensing issue

