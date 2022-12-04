# 8. Prepopulate a database via script; read from database via SDK

Date: 2022-12-04

## Status

Accepted

## Context

- writing to the database is a development-time activity
  - the data for a given translation never changes
  - it's an ongoing operational task to onboard new translations
  - end users never onboard new translations
- the data will be read from the web/mobile clients

## Decision

Use ad-hoc (version controlled) scripts for ingesting data. Create an
integration-tested SDK for reading from the database (SDK + database + data are
included in the test scope). If it's helpful, curate a minimal sample dataset to
support these tests. 

## Consequences

Ingestion is lighweight and flexible. By version controlling the ingestion
scripts it's theoretically repeatable. Once the process stabilizes it may be
worth creating some more hardened process for ingesting.

Reads are dependable and simple. During client development we can unit test
against a test double of the database (either a functional in memory database or
a test framework mock of the SDK interface).
