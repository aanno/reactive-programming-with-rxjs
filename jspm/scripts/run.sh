#!/bin/bash -x

./node_modules/.bin/jspm bundle src/app.ts -wid $*
