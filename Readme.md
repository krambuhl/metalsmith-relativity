# metalsmith-relativity

Metalsmith plugin that adds relativity path metadata to files.

## Installation

    $ npm install metalsmith-relativity --save-dev

## Javascript Usage

Pass with options to `Metalsmith#use`:

```js
var relativity = require('metalsmith-relativity');

metalsmith.use(relativity({
  depth: 0 // !default
}));
```

## Options

There are a couple options available to make relativity more useful.

#### depth

Defines initial depth of relative directory, only positive integers are valid.

## License

MIT