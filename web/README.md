# scroll

## Updating the main logo
1. Put the new SVG in ./icon-src/icon.svg
2. Run ./icon-src/update-icon-files.sh (this requires imagemagick installed on
   your machine)
3. Commit the updated images

## Dev

- `npm run test` for tests
- `npm run dev` for localhost with live reload

For API Access, browse from `http://scrollbible.localhost:8080`. You will need to
add the following to your `/etc/hosts` file for this to work:

    127.0.0.1  scrollbible.localhost

