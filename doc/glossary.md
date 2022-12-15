# Glossary

- **feed**: a random list of verses. The list of verses is the same for a given
  *seed*. By default, the seed depends on the current time (so every time you
  retrieve the feed you get different results). The feed can be paginated
  forever -- if you paginate through all 32k verses you'll get the first verses
  again in the same order.
- **verse**: the text of a single Bible verse in a specific translation. The
  verse is identified by the language code, translation code, and a numeric ID
  which is the number of the book, chapter, and verse. For example, Exodus 2:1
  in the English New King James Version is identified by "en-nkjv-2-2-1".
- **verse reference**: the standard human-readable identifier for the verse. For
  example, the first verse in the book of Genesis has a reference of "Genesis 1:1".
- **natural order**: The order of the verses in its translation. If you were
  reading a paper print Bible, the "natural order" refers to the order of the
  verses if you started at the first page of the publication and read through
  until the last page.
- **related verse**: a verse thematically related to another. Many study Bibles
  include a list of related verses called "cross references" in the centre
  column of the text. Each verse can have zero or more related verses. In the
  real world, there are different sources of lists of related verses. In Scroll,
  we do not distinguish between sources of related verses like we do between
  translations. The developers of Scroll choose a source for the related verse
  list which is suitable for the developer (based on availability of digital
  index and compatibility of license). In the initial prototype, the related
  verse list is taken from www.openbible.info.
