#!/usr/bin/env bash

DEPLOY_BRANCH=master

if [ "$TRAVIS_BRANCH" = "$DEPLOY_BRANCH" ]; then
    git checkout "$DEPLOY_BRANCH"
    yarn lerna-publish --yes
fi
