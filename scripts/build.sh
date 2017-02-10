#!/bin/sh

#rm -rf dist
#./node_modules/.bin/webpack
#./node_modules/.bin/webpack --output-filename=dist/WFUI.js
#./node_modules/.bin/webpack --output-filename=dist/WFUI.min.js --optimize-minimize

rm -rf lib
./node_modules/.bin/babel src --out-dir lib

rm -rf dist
./node_modules/.bin/webpack