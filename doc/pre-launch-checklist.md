# Things to do before the initial launch

## Nice to have before sharing this more broadly

- observability
  - collect metrics for
     - API requests per unit time
     - API requests per session
     - sessions per unit time
  - [maybe?] show metrics on the site (About > How It's Made) and include realtime
    estimated cost per month and per visit
- availability
  - retry once if there is an API error
  - show something sensible if the API is offline
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

## Optional -- before I forget the context
- maintainability refactor across all the code
  - data
     - data cleanup
        - remove unused translation version
        - where are the transliterations for Hebrew words?
        - remove duplicate related references so we don't have to filter on the
          Client side
  - infra
     - separate stacks for db and api
     - [maybe] nuke all the infra and rebuild it to check that the documentation is
       complete and the process is repeatable
  - web client, SDK, and SDK tests
     - whatever it takes to make the code intention revealing and easy to change

