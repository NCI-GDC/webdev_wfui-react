#!/bin/sh

#rm -rf dist
#./node_modules/.bin/webpack
#./node_modules/.bin/webpack --output-filename=dist/WFUI.js
#./node_modules/.bin/webpack --output-filename=dist/WFUI.min.js --optimize-minimize

rm -rf lib
npx babel --verbose --config-file=./buildConfigs/babel.config.js src/components --out-dir lib
cp -R src/styles lib/styles/

# rm -rf dist
./node_modules/.bin/webpack --quiet --config ./buildConfigs/webpack.config.js --mode=production