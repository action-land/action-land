# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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





## [4.4.1](https://github.com/action-land/action-land/compare/v4.4.0...v4.4.1) (2019-07-15)


### Bug Fixes

* **action:** reverse the order of type params ([62b9e05](https://github.com/action-land/action-land/commit/62b9e05))





# [4.3.0](https://github.com/action-land/action-land/compare/v4.2.0...v4.3.0) (2019-07-12)


### Features

* **component:** add new operators and improve type-safety ([081a0b3](https://github.com/action-land/action-land/commit/081a0b3))





# [4.1.0](https://github.com/action-land/action-land/compare/v4.0.1...v4.1.0) (2019-07-02)


### Bug Fixes

* **action:** add return types to action() method ([9414f54](https://github.com/action-land/action-land/commit/9414f54))


### Features

* **action:** add make action.type an optional type-parameter ([1a59592](https://github.com/action-land/action-land/commit/1a59592))





<a name="4.0.1"></a>
## [4.0.1](https://github.com/action-land/action-land/compare/v4.0.0...v4.0.1) (2018-08-22)


### Bug Fixes

* **action-type:** it should accept actions which have type as number ([a9f3ad5](https://github.com/action-land/action-land/commit/a9f3ad5))




<a name="2.0.1"></a>
## [2.0.1](https://github.com/action-land/action-land/compare/v2.0.0...v2.0.1) (2018-07-26)


### Bug Fixes

* **list:** remove unnecessary usage of generics ([006386a](https://github.com/action-land/action-land/commit/006386a))




<a name="1.0.6"></a>
## [1.0.6](https://github.com/action-land/action-land/compare/v1.0.5...v1.0.6) (2018-07-23)


### Bug Fixes

* **lint:** update files with lint fixes ([bee060d](https://github.com/action-land/action-land/commit/bee060d))




<a name="1.0.4"></a>
## [1.0.4](https://github.com/action-land/action-land/compare/v1.0.3...v1.0.4) (2018-07-23)


### Bug Fixes

* **nil:** improve nil typings ([1759ff7](https://github.com/action-land/action-land/commit/1759ff7))




<a name="1.0.2"></a>
## [1.0.2](https://github.com/action-land/action-land/compare/v1.0.1...v1.0.2) (2018-07-23)


### Bug Fixes

* **modules:** add npmignore file ([e73f7ee](https://github.com/action-land/action-land/commit/e73f7ee))




<a name="1.0.0"></a>
# [1.0.0](https://github.com/action-land/action-land/compare/v0.1.1...v1.0.0) (2018-07-22)




**Note:** Version bump only for package @action-land/core

<a name="0.1.0"></a>
# 0.1.0 (2018-07-22)


### Features

* **git:** initial commit ([23de209](https://github.com/action-land/action-land/commit/23de209))
