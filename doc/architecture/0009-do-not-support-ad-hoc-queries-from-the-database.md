# 9. Do not support ad-hoc queries from the database

Date: 2022-12-04

## Status

Accepted

## Context

Relational databases are more expensive to operate and scale than NoSQL
databases, but they support queries that were not imagined at the time the
schema was set. By contrast, NoSQL databases are cheaper and more scalable but
the set of queries must be known at the time that the schema is set.

## Decision

Since neither the schema nor the query pattern is highly changeable, we will not
take the requirement that we must support adhoc queries.

## Consequences

This is a fairly reversible decision because the client will be coupled to an
SDK which could be replaced with another implementation backed by a different
database. Because the data is ingested by script (and not user defined) it would
be possible to swap out databases even while running the application. 
