#!/bin/bash

set -xe

cd api-sdk
npm install
npm run update-environment
npm run build
cd ../web
npm install
npm run build
