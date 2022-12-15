# Scroll

An immersive Bible exploration app

For the developer guide, refer to [./doc/DEVELOPER_GUIDE.md](./doc/DEVELOPER_GUIDE.md).

For a Glossary, refer to [./doc/glossary.md](./doc/glossary.md).

## Purpose

There is a lot wrong with social media. However, one thing that social media
apps do well is to allow you to skim read a broad range of content and drill
down into specifics that interest you. This is a new type of reading that is not
possible with physical books. It lets you assemble, on the fly, a new collection
of writing around a theme that's interesting to you at the moment. The cost to
this deep, curiosity-driven focus is that we are less exposed to ideas that we
are uninterested in. At worst, this leads to myopic thinking and a false view of
the world. However, as long as it is not one's only source of information, the
self-directed deep dives of social media applications make for a fascinating new
way to consume content.

What if it was possible to explore the Bible this way? First, you scroll past a
wide range of excerpts from scripture. After ignoring 2, 20, or 100 verses, you
find one that reminds you of something going on in your life or something you've
been thinking about recently. It's confusing, so you zoom out and read a few
verses before it and a few after. You'd like to know more, so you swipe to a few
thematically related verses (cross references). One word is confusing, so you
deep click into the greek word for a quick dictionary entry (it's fascinating,
so you scroll through the list of verses where that words is used in the New
Testament). That was interesting, but you've read enough. You jump back to the
home screen and continue scrolling.

That's Scroll. 

## Tenets

Opinionated statements about how we'll approach this initiative. These can be
used to "break ties" when we're unsure of how to proceed. They should be updated
over time if we're no longer finding them fit to use. 

### Product Tenets

- **Differentiate on ease of use:** Since all the content we intend to expose is
  already publicly accessible throubh blb.org, we cannot ignore performance and
  ease of use. This may require clever data structures and algorithms and
  structured usability testing -- but that's the main point of what we're doing.
  It cannot be neglected. 
- **Require zero training:** Scroll must be completely intuitive. A first time
  user (who has used a social media platform) ought to be able to take advantage
  of all of the capabilities of the system without any training or guidance. 
- **Use Layman's Terms:** Bible study tools have a lot of jargon. (For example:
  "Concordance", "interlinear", "Cross-reference".) Those terms ought not to
  appear in the application, and should instead be replaced by simpler,
  intention-oriented terms (e.g. "cross-reference" could become "related").

### Approach

- **Honor God:** our assessment of history is that it's strategically correct to
  chose a path that honors and includes God even when there is an apparently
  more efficient course of action which requires ignoring or acting against some
  of God's ways
- **Respect content licensing:** this project would be much easier if we could
  scrape content or publish content that we have licensed for personal use. We
  won't do that.
- **Prototype first:** In the spirit of "nail it before you scale it", we'll
  prioritize getting a working prototype to gather feedback rather than a
  complete feature set. For example, this means choosing defaults instead of
  making things configurable.
- **No throwaway prototypes:** Although we'll choose incomplete features to get
  quick feedback, we won't neglect the internal quality of the application. When
  we proceed from prototype to full application we should have no reason to
  rewrite the application. 
    - meta comment: is this the right tenet? Or should we make this throwaway,
      and just go for the minimum level of internal quality to get to a
      prototype?

## FAQ

### What content will the app expose?

The text of the Holy Bible (ideally with many translations), cross references,
interlinear Bible, Greek/Hebrew concordance.

On the home screen you'll see random Bible verses from all parts of the Bible.
As you scroll, you can select a verse and drill down in a few different ways:
 - read it in context (verses before and after it)
 - read related verses (cross references for the passage)
 - see the interlinear Bible (the verse is expanded into one or two words per
   line, and one Greek/Hebrew word per line)
     - from a Greek/Hebrew word, you'll see a quick summary of how it's used in
       the Bible, a list of different English words that it's translated into in
       the Bible, and then the list of verses that it is included in in the
       Bible.
     - maybe from the Greek/Hebrew word you can browse to related words (root
       word, or following words in the concordance)

Any time a Bible verse is displayed you have the same controls as on the home
page: you can navigate from that verse to related verses as described above.

It's important that the navigation is effortless. The experience of navigating
through the passages should be almost subconscious -- a single scroll or click
gesture with no thought to the navigation. 

### Will there be a social/sharing aspect to the app?

No. Although it is inspired by a social media news feed, the content we're
scrolling through in the app is from the Bible, not from our friends. 

### Are you planning on commercializing this?

No, I don't have time or room in my current employment contract for that. Three
end states that I can see are (1) abandon the project, or (2) the prototype is
useful for a few friends, or (3) the prototype is interesting enough that we can
pitch it to an organization like Blue Letter Bible and have them take over
operating and developing the app.

## Technical Decisions

Refer to [./doc/architecture](./doc/architecture) for the architectural decision
records. 

## Contributing

Does this sound interesting to you? Your ideas, wishes, or programming are
welcome. You can use the Issues feature in GitHub to share your ideas or wishes.
If you're a programmer and want to help, please send me a message and we'll get
you set up.

## Timelines

This is a low-importance hobby project for me that I may ignore for months or
years (or I could abandon it). It's still very experimental.
