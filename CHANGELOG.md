# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [8.1.1](https://github.com/action-land/action-land/compare/v8.1.0...v8.1.1) (2019-08-29)


### Bug Fixes

* **package:** update dependencies ([238171b](https://github.com/action-land/action-land/commit/238171b))





# [8.1.0](https://github.com/action-land/action-land/compare/v8.0.0...v8.1.0) (2019-08-23)


### Features

* **component:** add memoizeWith() ([#56](https://github.com/action-land/action-land/issues/56)) ([8152392](https://github.com/action-land/action-land/commit/8152392))





# [8.0.0](https://github.com/action-land/action-land/compare/v7.0.1...v8.0.0) (2019-08-22)


### Code Refactoring

* **action:** change signature for the spec function ([92145e2](https://github.com/action-land/action-land/commit/92145e2))


### BREAKING CHANGES

* **action:** FoldSpec's callback has the arguments reversed





# [7.0.0](https://github.com/action-land/action-land/compare/v6.0.0...v7.0.0) (2019-08-21)


### Code Refactoring

* **action:** change the function signature for Action.fold ([7a726b0](https://github.com/action-land/action-land/commit/7a726b0))


### BREAKING CHANGES

* **action:** Action.fold now takes the first argument as the action instead of seed.





# [6.0.0](https://github.com/action-land/action-land/compare/v5.1.0...v6.0.0) (2019-08-21)


### Bug Fixes

* **component:** matchR cb value type infered if action is already handled in matchR or install ([#49](https://github.com/action-land/action-land/issues/49)) ([c1e1868](https://github.com/action-land/action-land/commit/c1e1868))


### Features

* **action:** create a fold static method ([#55](https://github.com/action-land/action-land/issues/55)) ([1d7c2b1](https://github.com/action-land/action-land/commit/1d7c2b1))


### BREAKING CHANGES

* **action:** removing the \`fold()\` method and adding \`Action.fold()\` static method

* docs(action): fix test statement





# [5.1.0](https://github.com/action-land/action-land/compare/v5.0.0...v5.1.0) (2019-08-17)


### Features

* **action:** add fold method ([323e2f8](https://github.com/action-land/action-land/commit/323e2f8))
* **action:** add lift() method ([60e6c18](https://github.com/action-land/action-land/commit/60e6c18))





# [5.0.0](https://github.com/action-land/action-land/compare/v4.6.2...v5.0.0) (2019-08-16)


### Features

* **action:** remove custom test for isAction ([e0bd6c6](https://github.com/action-land/action-land/commit/e0bd6c6))


### BREAKING CHANGES

* **action:** isAction now checks if the object is an instance of the Action class





## [4.6.2](https://github.com/action-land/action-land/compare/v4.6.1...v4.6.2) (2019-08-14)


### Bug Fixes

* **component:** matchC and matchR: fix typings for matching types ([#52](https://github.com/action-land/action-land/issues/52)) ([06a6f86](https://github.com/action-land/action-land/commit/06a6f86))





## [4.6.1](https://github.com/action-land/action-land/compare/v4.6.0...v4.6.1) (2019-08-08)


### Bug Fixes

* **component:** remove oState from the component that's returned from lift ([#46](https://github.com/action-land/action-land/issues/46)) ([fe1808e](https://github.com/action-land/action-land/commit/fe1808e))





# [4.6.0](https://github.com/action-land/action-land/compare/v4.5.1...v4.6.0) (2019-07-24)


### Bug Fixes

* **package:** update dependencies ([3fe283f](https://github.com/action-land/action-land/commit/3fe283f))


### Features

* **component:** update `Component.from` ([b834203](https://github.com/action-land/action-land/commit/b834203))





## [4.5.1](https://github.com/action-land/action-land/compare/v4.5.0...v4.5.1) (2019-07-19)

**Note:** Version bump only for package action-land





# [4.5.0](https://github.com/action-land/action-land/compare/v4.4.2...v4.5.0) (2019-07-18)


### Features

* **component:** ability to add empty component ([#38](https://github.com/action-land/action-land/issues/38)) ([1869060](https://github.com/action-land/action-land/commit/1869060))





## [4.4.2](https://github.com/action-land/action-land/compare/v4.4.1...v4.4.2) (2019-07-17)


### Bug Fixes

* **component:** loosen types for Component.from() ([555cee8](https://github.com/action-land/action-land/commit/555cee8))





## [4.4.1](https://github.com/action-land/action-land/compare/v4.4.0...v4.4.1) (2019-07-15)


### Bug Fixes

* **action:** reverse the order of type params ([62b9e05](https://github.com/action-land/action-land/commit/62b9e05))





# [4.4.0](https://github.com/action-land/action-land/compare/v4.3.0...v4.4.0) (2019-07-15)


### Features

* **component:** add configure() method to configure initial state ([090d28e](https://github.com/action-land/action-land/commit/090d28e))
* **component:** add methods to interop ComponentNext with Component. ([6807b07](https://github.com/action-land/action-land/commit/6807b07))





# [4.3.0](https://github.com/action-land/action-land/compare/v4.2.0...v4.3.0) (2019-07-12)


### Features

* **component:** add new operators and improve type-safety ([081a0b3](https://github.com/action-land/action-land/commit/081a0b3))





# [4.2.0](https://github.com/action-land/action-land/compare/v4.1.0...v4.2.0) (2019-07-03)


### Features

* **component:** add componentNext ([534b86f](https://github.com/action-land/action-land/commit/534b86f))





# [4.1.0](https://github.com/action-land/action-land/compare/v4.0.1...v4.1.0) (2019-07-02)


### Bug Fixes

* **action:** add return types to action() method ([9414f54](https://github.com/action-land/action-land/commit/9414f54))
* **component:** fix typings ([217e779](https://github.com/action-land/action-land/commit/217e779))
* **package:** update dependencies ([706abfb](https://github.com/action-land/action-land/commit/706abfb))
* **readme:** Fix typo ([edc4349](https://github.com/action-land/action-land/commit/edc4349))


### Features

* **action:** add make action.type an optional type-parameter ([1a59592](https://github.com/action-land/action-land/commit/1a59592))
* **component:** deprecating \`map\` method on Component ([8efaf33](https://github.com/action-land/action-land/commit/8efaf33))
* **component:** Remove optionality from Component's type params. ([55c1570](https://github.com/action-land/action-land/commit/55c1570))





<a name="4.0.1"></a>
## [4.0.1](https://github.com/action-land/action-land/compare/v4.0.0...v4.0.1) (2018-08-22)


### Bug Fixes

* **action-type:** it should accept actions which have type as number ([a9f3ad5](https://github.com/action-land/action-land/commit/a9f3ad5))




<a name="4.0.0"></a>
# [4.0.0](https://github.com/action-land/action-land/compare/v3.0.0...v4.0.0) (2018-08-09)


### Bug Fixes

* **component:** default type of Component.Init has now become any ([39df7b8](https://github.com/action-land/action-land/commit/39df7b8))


### Code Refactoring

* **component:** add Component Class ([907873d](https://github.com/action-land/action-land/commit/907873d))


### Features

* **auto-forward:** add auto-forward HOC ([301bb09](https://github.com/action-land/action-land/commit/301bb09))
* **component:** add default generic types to class ([5cf6854](https://github.com/action-land/action-land/commit/5cf6854))
* **smitten:** smitten can take an optional "type" generic ([b9f96af](https://github.com/action-land/action-land/commit/b9f96af))


### BREAKING CHANGES

* **component:** Component is now a class with map() method




<a name="3.0.0"></a>
# [3.0.0](https://github.com/action-land/action-land/compare/v2.0.1...v3.0.0) (2018-08-02)


### Bug Fixes

* **package:** update typescript version ([cae494d](https://github.com/action-land/action-land/commit/cae494d))


### Code Refactoring

* **component:** make all the generics optional ([31ee224](https://github.com/action-land/action-land/commit/31ee224))
* **component:** update typings for `init()` ([2e0503f](https://github.com/action-land/action-land/commit/2e0503f))
* **smitten:** rename Hoe to Smitten ([a498627](https://github.com/action-land/action-land/commit/a498627))


### BREAKING CHANGES

* **component:** `init()` is not a unary function any more
* **smitten:** `Hoe` has been deprecated use `Smitten` instead
* **component:** 1. `init` may or may not take any arguments
2. All the generics are optional now




<a name="2.0.1"></a>
## [2.0.1](https://github.com/action-land/action-land/compare/v2.0.0...v2.0.1) (2018-07-26)


### Bug Fixes

* **list:** remove unnecessary usage of generics ([006386a](https://github.com/action-land/action-land/commit/006386a))




<a name="2.0.0"></a>
# [2.0.0](https://github.com/action-land/action-land/compare/v1.0.7...v2.0.0) (2018-07-25)


### Features

* **match:** pass complete value to the default function ([2a2416e](https://github.com/action-land/action-land/commit/2a2416e))


### BREAKING CHANGES

* **match:** default case for match() now gets the complete value instead of picking the action.value only




<a name="1.0.6"></a>
## [1.0.6](https://github.com/action-land/action-land/compare/v1.0.5...v1.0.6) (2018-07-23)


### Bug Fixes

* **lint:** update files with lint fixes ([bee060d](https://github.com/action-land/action-land/commit/bee060d))
* **tarz:** add proper return types for functions ([4ca3b1d](https://github.com/action-land/action-land/commit/4ca3b1d))




<a name="1.0.4"></a>
## [1.0.4](https://github.com/action-land/action-land/compare/v1.0.3...v1.0.4) (2018-07-23)


### Bug Fixes

* **nil:** improve nil typings ([1759ff7](https://github.com/action-land/action-land/commit/1759ff7))




<a name="1.0.2"></a>
## [1.0.2](https://github.com/action-land/action-land/compare/v1.0.1...v1.0.2) (2018-07-23)


### Bug Fixes

* **modules:** add npmignore file ([e73f7ee](https://github.com/action-land/action-land/commit/e73f7ee))




<a name="1.0.1"></a>
## [1.0.1](https://github.com/action-land/action-land/compare/v1.0.0...v1.0.1) (2018-07-22)


### Bug Fixes

* **package:** add publishConfig ([853ff3c](https://github.com/action-land/action-land/commit/853ff3c))




<a name="1.0.0"></a>
# [1.0.0](https://github.com/action-land/action-land/compare/v0.1.1...v1.0.0) (2018-07-22)


### Bug Fixes

* **tarz:** add better checks for non action types ([c0728b3](https://github.com/action-land/action-land/commit/c0728b3))


### Code Refactoring

* **snabbit:** snabbit will not expose Component anymore ([a33f8cb](https://github.com/action-land/action-land/commit/a33f8cb))


### Features

* **component:** add new module ([bd74d3d](https://github.com/action-land/action-land/commit/bd74d3d))
* **tarz:** add default generics ([4cadbf7](https://github.com/action-land/action-land/commit/4cadbf7))


### BREAKING CHANGES

* **snabbit:** `Component` has been depricated | Use `Component` from `@action-land/component`
* **tarz:** Order of generics have been changed




<a name="0.1.1"></a>
## [0.1.1](https://github.com/action-land/action-land/compare/v0.1.0...v0.1.1) (2018-07-22)


### Bug Fixes

* **readme:** add installation info ([676c7e6](https://github.com/action-land/action-land/commit/676c7e6))




<a name="0.1.0"></a>
# 0.1.0 (2018-07-22)


### Features

* **git:** initial commit ([23de209](https://github.com/action-land/action-land/commit/23de209))
