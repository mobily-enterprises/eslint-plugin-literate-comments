# eslint-plugin-literate-comments

Plugin to allow col-1 literate comments in a file

NOTE that this plugin will add 1 line of code in eslint's `indent` plugin:

````
module.exports.create.offsets = offsets;
````

This plugin effectively piggybacks onto eslint's original `indent` plugin. However, in order to work it needs `offsets` variable which is within the file's scope.

[This issue](https://github.com/eslint/eslint/issues/15618) currently discusses it.