# metalsmith-relativity

Metalsmith plugin that adds relativity path metadata to files.  This is a path prefix to move from file directory back to the source directory for metalsmith.

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

## Example

__page/news/a-super-event.html__ 

```
---
relativity: ../../
---

<img src="{{relativity}}assets/imgs/photo.jpg" />
```

## Options

There are a couple options available to make relativity more useful.

#### depth

Defines initial depth of relative directory, only positive integers are valid.

## License

MIT