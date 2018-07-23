#!/usr/bin/env bash

if [[ ${TRAVIS_BRANCH} == 'master' ]]
then
    yarn tsc -d
    lerna publish --conventional-commits --yes
fi
