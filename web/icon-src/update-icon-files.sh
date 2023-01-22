#!/bin/bash

ICON_SRC=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
ASSETS_SRC="$ICON_SRC/../src/assets"

set -e
set -x

convert $ICON_SRC/icon.svg -resize 64x64 $ASSETS_SRC/favicon.ico
convert $ICON_SRC/icon.svg -resize 192x192 $ASSETS_SRC/icons/android-chrome-192x192.png
convert $ICON_SRC/icon.svg -resize 512x512 $ASSETS_SRC/icons/android-chrome-512x512.png
convert $ICON_SRC/icon.svg -resize 180x180 $ASSETS_SRC/icons/apple-touch-icon.png
convert $ICON_SRC/icon.svg -resize 16x16   $ASSETS_SRC/icons/favicon-16x16.png
convert $ICON_SRC/icon.svg -resize 32x32   $ASSETS_SRC/icons/favicon-32x32.png
convert $ICON_SRC/icon.svg -resize 150x150 $ASSETS_SRC/icons/mstile-150x150.png
