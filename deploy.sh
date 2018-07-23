#!/usr/bin/env bash

if [[ ${TRAVIS_BRANCH} == 'master' ]]
   then lerna publish --conventional-commits --yes
fi
