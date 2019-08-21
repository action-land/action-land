# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [7.0.0](https://github.com/action-land/action-land/compare/v6.0.0...v7.0.0) (2019-08-21)

**Note:** Version bump only for package @action-land/component





# [6.0.0](https://github.com/action-land/action-land/compare/v5.1.0...v6.0.0) (2019-08-21)


### Bug Fixes

* **component:** matchR cb value type infered if action is already handled in matchR or install ([#49](https://github.com/action-land/action-land/issues/49)) ([c1e1868](https://github.com/action-land/action-land/commit/c1e1868))





# [5.1.0](https://github.com/action-land/action-land/compare/v5.0.0...v5.1.0) (2019-08-17)


### Features

* **action:** add lift() method ([60e6c18](https://github.com/action-land/action-land/commit/60e6c18))





# [5.0.0](https://github.com/action-land/action-land/compare/v4.6.2...v5.0.0) (2019-08-16)

**Note:** Version bump only for package @action-land/component





## [4.6.2](https://github.com/action-land/action-land/compare/v4.6.1...v4.6.2) (2019-08-14)


### Bug Fixes

* **component:** matchC and matchR: fix typings for matching types ([#52](https://github.com/action-land/action-land/issues/52)) ([06a6f86](https://github.com/action-land/action-land/commit/06a6f86))





## [4.6.1](https://github.com/action-land/action-land/compare/v4.6.0...v4.6.1) (2019-08-08)


### Bug Fixes

* **component:** remove oState from the component that's returned from lift ([#46](https://github.com/action-land/action-land/issues/46)) ([fe1808e](https://github.com/action-land/action-land/commit/fe1808e))





# [4.6.0](https://github.com/action-land/action-land/compare/v4.5.1...v4.6.0) (2019-07-24)


### Features

* **component:** update `Component.from` ([b834203](https://github.com/action-land/action-land/commit/b834203))





## [4.5.1](https://github.com/action-land/action-land/compare/v4.5.0...v4.5.1) (2019-07-19)

**Note:** Version bump only for package @action-land/component





# [4.5.0](https://github.com/action-land/action-land/compare/v4.4.2...v4.5.0) (2019-07-18)


### Features

* **component:** ability to add empty component ([#38](https://github.com/action-land/action-land/issues/38)) ([1869060](https://github.com/action-land/action-land/commit/1869060))





## [4.4.2](https://github.com/action-land/action-land/compare/v4.4.1...v4.4.2) (2019-07-17)


### Bug Fixes

* **component:** loosen types for Component.from() ([555cee8](https://github.com/action-land/action-land/commit/555cee8))





## [4.4.1](https://github.com/action-land/action-land/compare/v4.4.0...v4.4.1) (2019-07-15)

**Note:** Version bump only for package @action-land/component





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

* **component:** fix typings ([217e779](https://github.com/action-land/action-land/commit/217e779))


### Features

* **component:** deprecating \`map\` method on Component ([8efaf33](https://github.com/action-land/action-land/commit/8efaf33))
* **component:** Remove optionality from Component's type params. ([55c1570](https://github.com/action-land/action-land/commit/55c1570))





<a name="4.0.1"></a>
## [4.0.1](https://github.com/action-land/action-land/compare/v4.0.0...v4.0.1) (2018-08-22)




**Note:** Version bump only for package @action-land/component

<a name="4.0.0"></a>
# [4.0.0](https://github.com/action-land/action-land/compare/v3.0.0...v4.0.0) (2018-08-09)


### Bug Fixes

* **component:** default type of Component.Init has now become any ([39df7b8](https://github.com/action-land/action-land/commit/39df7b8))


### Code Refactoring

* **component:** add Component Class ([907873d](https://github.com/action-land/action-land/commit/907873d))


### Features

* **auto-forward:** add auto-forward HOC ([301bb09](https://github.com/action-land/action-land/commit/301bb09))
* **component:** add default generic types to class ([5cf6854](https://github.com/action-land/action-land/commit/5cf6854))


### BREAKING CHANGES

* **component:** Component is now a class with map() method




<a name="3.0.0"></a>
# [3.0.0](https://github.com/action-land/action-land/compare/v2.0.1...v3.0.0) (2018-08-02)


### Code Refactoring

* **component:** make all the generics optional ([31ee224](https://github.com/action-land/action-land/commit/31ee224))
* **component:** update typings for `init()` ([2e0503f](https://github.com/action-land/action-land/commit/2e0503f))


### BREAKING CHANGES

* **component:** `init()` is not a unary function any more
* **component:** 1. `init` may or may not take any arguments
2. All the generics are optional now




<a name="2.0.1"></a>
## [2.0.1](https://github.com/action-land/action-land/compare/v2.0.0...v2.0.1) (2018-07-26)




**Note:** Version bump only for package @action-land/component

<a name="1.0.6"></a>
## [1.0.6](https://github.com/action-land/action-land/compare/v1.0.5...v1.0.6) (2018-07-23)


### Bug Fixes

* **lint:** update files with lint fixes ([bee060d](https://github.com/action-land/action-land/commit/bee060d))




<a name="1.0.4"></a>
## [1.0.4](https://github.com/action-land/action-land/compare/v1.0.3...v1.0.4) (2018-07-23)




**Note:** Version bump only for package @action-land/component

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


### Features

* **component:** add new module ([bd74d3d](https://github.com/action-land/action-land/commit/bd74d3d))
