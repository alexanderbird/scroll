# 4. Refer to verses by numeric identifiers instead of by book names

Date: 2022-04-09

## Status

Accepted

## Context

The verse index and the UI will need to uniquely identify verses. Traditionally,
verses are identified by a text name like "Genesis 1:1" which contains the book,
chapter, and verse. Some publications omit the chapter when there is only one in
the book (e.g. Jude), but the getbible.net JSON representation includes the
chapter even when there is 1. 

## Decision

To simplify how we refer to verses in the index and in the web app, let's
convert the common verse references to url-safe, numeric identifiers instead. 

For details of the conversion, refer to `source/core/identifier.spec.js`

## Consequences

Numeric verse IDs:
 - can be used unencoded in URIs
 - contain all the info of the common ID (so we can convert from numeric to
   common for display purposes)
 - are smaller than common identifiers (which makes the verse index smaller)
