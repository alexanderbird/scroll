# Things to do before the initial launch

## Before sharing this with one or two close friends

Give context 1:1 via text or in person

- documentation
  - regulatory/legal
    - an About > Attribution page that covers the long-form attribution and
      licensing requirements for the WEB Bible, the Strong's annotated Bible,
      the cross references, and the Strong's dictionary

## Nice to have before sharing this more broadly
Context is discoverable from the app

- more pleasant to use than that other Bible app
  - UX review from an expert
  - sharing?
   - social meta tags so the description comes through clearly when sharing
     https://scrollbible.app
   - maybe a better icon/colors/whatever
   - maybe nice social meta tags for indivual verses (so you can share a verse
     and the preview includes verse reference or something)
   - maybe a share button
   - review the PWA meta data
- observability
  - collect metrics for
     - API requests per unit time
     - API requests per session
     - sessions per unit time
  - [maybe?] show metrics on the site (About > How It's Made) and include realtime
    estimated cost per month and per visit

## Optional

- documentation
  - public relations
    - an About page that communicates purpose
       - missional focus -- free to use, not for making money
          - may accept money to cover costs but that's it
    - somehow describe the early prototype goals
      - collect feedback to improve (what should not be changed, what should be
        changed)
      - determine if this tool is useful enough to keep working on it
         - we'll use quantitative measures (how many visits per month?) and
           qualitative (what feedback do we get emailed to
           feedback@scrollbible.app)
    - an About > Privacy page that tells what we do (and don't) track
    - [maybe] add an FAQ
       - Why did you pick the WEB translation?
       - Why don't you have my favorite translation?
       - What is happening next for Scroll Bible?
       - Can I help build it?
       - Is there a mobile app?
          - include instructions about install PWA (Share > Add to home screen)
       - etc.
  - regulatory/legal
    - check with the cross reference, the Strong's annotated Bible, and the Strong's
      dictionary publishers if they are satisfied with the attribution on the site
- maintainability refactor across all the code
  - data
     - data cleanup
        - remove unused translation version
        - where are the transliterations for Hebrew words?
        - remove duplicate related references so we don't have to filter on the
          Client side
  - infra
     - separate stacks for db and api
  - web client, SDK, and SDK tests
     - whatever it takes to make the code intention revealing and easy to change

