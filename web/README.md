# scroll

## Updating the main logo
1. Put the new SVG in ./icon-src/icon.svg
2. Run ./icon-src/update-icon-files.sh (this requires imagemagick installed on
   your machine)
3. Commit the updated images

## CLI Commands

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# test the production build locally
npm run serve

For API Access, browse from `http://scrollbible.localhost:8080`. You will need to
add the following to your `/etc/hosts` file for this to work:

    127.0.0.1  scrollbible.localhost

# run tests with jest and enzyme
npm run test
```

For detailed explanation on how things work, checkout the [CLI Readme](https://github.com/developit/preact-cli/blob/master/README.md).
