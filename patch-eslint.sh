#!/bin/bash


# If the file couldn't be found, then skip
# file="./indent.js" # This is for testing purposes
file="../eslint/lib/rules/indent.js"
if [ ! -f "$file" ];then
  >&2 echo "Could not find eslint's original indent.js file, this won't work"
  exit 1
fi

# If the string is not already there, apply the patch
str="module.exports.create.offsets = offsets;"
if ! grep -q "$str" $file; then
  sed -i -- "/const parameterParens = new WeakSet();/a\ \ \ \ \ \ \ \ $str" $file  
else
  echo "Original indent.js already patched. Patching was skipped"
fi