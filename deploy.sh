#!/usr/bin/env bash

DEPLOY_BRANCH=master

if [ "$TRAVIS_BRANCH" = "$DEPLOY_BRANCH" ]; then
    git remote set-url origin https://${GH_TOKEN}@github.com/${TRAVIS_REPO_SLUG}
    yarn lerna-publish --yes --conventional-commits
    git push --all origin ${DEPLOY_BRANCH}
fi
