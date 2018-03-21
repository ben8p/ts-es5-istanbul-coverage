# ts-es5-istanbul-coverage
Make sure you don't miss branch coverage when outputing TypeScript as ES5

## Goal
When your project uses TypeScript exported as ES5, Webpack for build and Instanbul for the code coverage, you may encounter some impossible to cover branches.
This is because of how TypeScript emits files.
You can read more on the subject :
 - https://github.com/SitePen/remap-istanbul/issues/106
 - https://github.com/Microsoft/TypeScript/issues/13455
 - https://github.com/gotwarlost/istanbul/issues/690

This little webpack loader will add `/* istanbul ignore next */` where needed.

## Install
`yarn add ts-es5-istanbul-coverage --dev`
or
`npm install ts-es5-istanbul-coverage --save-dev`

## Usage
Simply configure the loader as any other loader.
Note: It must run **After** the actual typescript transpilation (so it should appear first in the webpack configuration rule)

## Example of confuguration using ts-loader and ts-es5-istanbul-coverage
```
module.exports = {
	module: {
		rules: [
			// all files with a `.ts` or `.tsx` extension will be handle
			{
				test: /\.tsx?$/,
				use: [
					{
						loader: 'ts-es5-istanbul-coverage',
					},
					{
						loader: 'ts-loader',
					},
				],
			}
		]
	}
}
```

## Current fixes
Currently the loader fix the branch coverage for the following:
Emitted code like:
```
function MyClass() {
	return _super !== null && _super.apply(this, arguments) || this;
}
```
will be replaced by
```
function MyClass() {
	/* istanbul ignore next */return _super !== null && _super.apply(this, arguments) || this;
}
```
Which solves the coverage for the branch `|| this`

Emitted code like:
```
function MyClass() {
    return _this;
    var _a, _b;
}
```
will be replaced by
```
function MyClass() {
    var _a, _b;
    return _this;
}
```
Which solves the coverage for the `var` statement

Emitted code like:
```
for (var _i = 0; _i < arguments.length; _i++) {
	dependencies[_i] = arguments[_i];
}
```
will be replaced by
```
for (var _i = 0; _i < arguments.length; _i++) {/* istanbul ignore next */
	dependencies[_i] = arguments[_i];
}
```
Which solves the coverage for the loop body
