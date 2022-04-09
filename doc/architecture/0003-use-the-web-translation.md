# 3. use the WEB translation

Date: 2022-04-08

## Status

Accepted

extends [2. Use a public domain translation for the prototype](0002-use-a-public-domain-translation-for-the-prototype.md)

## Context

getbible.net has JSON formatted Bibles ready to go. I can see the following
English translations in [their list](https://getbible.net/v2/translations.json)

 - American Standard Version (1901)
 - Basic English Bible (1949/1964)
 - Douay Rheims (1609)
 - William Tyndale Bible (1525/1530)
 - Webster's Bible (1833)
 - World English Bible (1997)
 - Weymouth NT (1912)
 - Young's Literal Translation (1862)

Aside: I retrieved this list with the following command:

    curl https://getbible.net/v2/translations.json | jq 'values | .[] | select(.lang == "en" and .distribution_license == "Public Domain")

## Decision

Use the only Public Domain translation available in JSON from getbible.net that
was published in the last 50 years: the WEB (World English Bible)

## Consequences

Even though this isn't my preferred translation, it will at least use modern
lanauge. For the purpose of the prototype, that should be enough.

Since the goal of the project is to make an immersive Bible reading experience,
it's important that the language used be familiar, even if the translation is
unfamiliar. 

A JSON version of the translation (split into individual verses) is available at
https://getbible.net/v2/web.json. This means we don't need to build any parsing
component; we can move directly into indexing and displaying the content.
