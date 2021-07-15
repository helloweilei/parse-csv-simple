# parse-csv-simple
A parser for csv file.

## Usage

Import the library in your code

### parse the whole csv string directly

```js
var {parse} = require('parse-csv-simple');
var csvText = 'name,age,gender\nJenny,21,female';
parse(csvText); // [['name', 'age', 'gender'], ['Jenny', '21', 'female']]
```

### get an iterable object, you can control the iterate flow.

```js
var {parseIterable} = require('parse-csv-simple');
var csvText = 'name,age,gender\nJenny,21,female';
var iteratableObj = parseIterable(csvText);

for (var row of iteratableObj) {
  // do something
}
```

### custom the delimiter or rows to parse

```js
var {parse} = require('parse-csv-simple');
var csvText = 'name,age,gender\nJenny,21,female';
var iteratableObj = parse(csvText, { delimiter: '...', limit: 100 });
```
