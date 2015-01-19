# basic-pipeline

A basic pipeline module for node and the web

## Installation

### NPM
    $ npm install basic-pipeline --save

### Bower
    $ bower install basic-pipeline --save
    
## Usage

Add steps to a pipeline with **use**. Then execute those steps in order with **execute**.

```js
var Pipeline = require("basic-pipeline");

var pipeline = new Pipeline();

pipeline.use(function (context, next) {
    context.foo = "bar";

    next();
});

pipeline.use(function (context, next) {
    context.bar = "baz";

    next();
});

pipeline.use(function (context, next) {
    context.theAnswerIs = "42";

    next();
});

pipeline.execute({}, function (err, context) {
    console.log(context);
});

//context => { foo: 'bar', bar: 'baz', theAnswerIs: '42' }
```
