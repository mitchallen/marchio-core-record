marchio-core-record
==
REST response record tool
--

<p align="left">
  <a href="https://travis-ci.org/mitchallen/marchio-core-record">
    <img src="https://img.shields.io/travis/mitchallen/marchio-core-record.svg?style=flat-square" alt="Continuous Integration">
  </a>
  <a href="https://codecov.io/gh/mitchallen/marchio-core-record">
    <img src="https://codecov.io/gh/mitchallen/marchio-core-record/branch/master/graph/badge.svg" alt="Coverage Status">
  </a>
  <a href="https://npmjs.org/package/marchio-core-record">
    <img src="http://img.shields.io/npm/dt/marchio-core-record.svg?style=flat-square" alt="Downloads">
  </a>
  <a href="https://npmjs.org/package/marchio-core-record">
    <img src="http://img.shields.io/npm/v/marchio-core-record.svg?style=flat-square" alt="Version">
  </a>
  <a href="https://npmjs.com/package/marchio-core-record">
    <img src="https://img.shields.io/github/license/mitchallen/marchio-core-record.svg" alt="License"></a>
  </a>
</p>

## Installation

    $ npm init
    $ npm install marchio-core-record --save
  
* * *

## Modules

<dl>
<dt><a href="#module_marchio-core-record">marchio-core-record</a></dt>
<dd><p>Module</p>
</dd>
<dt><a href="#module_marchio-core-record-factory">marchio-core-record-factory</a></dt>
<dd><p>Factory module</p>
</dd>
</dl>

<a name="module_marchio-core-record"></a>

## marchio-core-record
Module


* [marchio-core-record](#module_marchio-core-record)
    * [.package()](#module_marchio-core-record+package)
    * [.build(body)](#module_marchio-core-record+build) ⇒ <code>Promise</code>
    * [.select(body)](#module_marchio-core-record+select) ⇒ <code>Promise</code>
    * [.selectedFields()](#module_marchio-core-record+selectedFields) ⇒ <code>Promise</code>
    * [.fields(fields, body)](#module_marchio-core-record+fields) ⇒ <code>Promise</code>

<a name="module_marchio-core-record+package"></a>

### marchio-core-record.package()
Returns the package name

**Kind**: instance method of <code>[marchio-core-record](#module_marchio-core-record)</code>  
<a name="module_marchio-core-record+build"></a>

### marchio-core-record.build(body) ⇒ <code>Promise</code>
Build a record based on the model and an input record containing original values

**Kind**: instance method of <code>[marchio-core-record](#module_marchio-core-record)</code>  
**Returns**: <code>Promise</code> - that resolves to a record object containing the resulting record  

| Param | Type | Description |
| --- | --- | --- |
| body | <code>Object</code> | An object where properties represent fields from a response (like req.response) |

**Example** *(Usage Example)*  
```js
var factory = require("marchio-core-record");

var modelName = 'coretest';

var model = {
    name: modelName,
    fields: {
        email:    { type: String, required: true },
        status:   { type: String, required: true, default: "NEW" },
        // In a real world example, password would be hashed by middleware before being saved
        password: { type: String, select: false },  // select: false, exclude from query results
     }
 };
 
 // normally this would come from an http method handler
 var req = {
     body: {
         email: "foo@example.com"
     }
 };

factory.create({ model: model })
.then( (rm) => rm.build( req.body )
.then( (record) => {
    console.log("record: ", record );
})
.catch( function(err) { 
    console.error(err); 
});
```
<a name="module_marchio-core-record+select"></a>

### marchio-core-record.select(body) ⇒ <code>Promise</code>
Build a record based on the selected fields in a model and a record containing original values

**Kind**: instance method of <code>[marchio-core-record](#module_marchio-core-record)</code>  
**Returns**: <code>Promise</code> - that resolves to a record object containing the resulting record  

| Param | Type | Description |
| --- | --- | --- |
| body | <code>Object</code> | An object where properties represent fields from a response (like req.response) |

**Example** *(Usage Example)*  
```js
var factory = require("marchio-core-record");

var modelName = 'coretest';

var model = {
    name: modelName,
    fields: {
        email:    { type: String, required: true },
        status:   { type: String, required: true, default: "NEW" },
        // In a real world example, password would be hashed by middleware before being saved
        password: { type: String, select: false },  // select: false, exclude from query results
     }
};
 
 // normally this would come from an http method handler
var req = {
     body: {
         email: "foo@example.com"
     }
};

var recMgr = null; 

factory.create({ model: model })
.then( (rm) => {
                    recMgr = rm;
    return rm.build( { req.body );
})
.then( (record) => recMgr.select( record ) )
.then( (response) => {
     console.log( response );
 })
.catch( function(err) { 
    console.error(err); 
});
```
<a name="module_marchio-core-record+selectedFields"></a>

### marchio-core-record.selectedFields() ⇒ <code>Promise</code>
Return a list containing the names of fields that are selected

**Kind**: instance method of <code>[marchio-core-record](#module_marchio-core-record)</code>  
**Returns**: <code>Promise</code> - that resolves to a list of selected field names  
**Example** *(Usage Example)*  
```js
var factory = require("marchio-core-record");

var modelName = 'coretest';

var model = {
    name: modelName,
    fields: {
        email:    { type: String, required: true },
        status:   { type: String, required: true, default: "NEW" },
        // In a real world example, password would be hashed by middleware before being saved
        password: { type: String, select: false },  // select: false, exclude from query results
     }
};
 
 // normally this would come from an http method handler
var req = {
     body: {
         email: "foo@example.com"
     }
};

var recMgr = null; 

factory.create({ model: model })
.then( (recMgr) => {
    recMgr = rm;
    return recMgr.selectedFields();
})
.then( (response) => {
     console.log( response );
 })
.catch( function(err) { 
    console.error(err); 
});
```
<a name="module_marchio-core-record+fields"></a>

### marchio-core-record.fields(fields, body) ⇒ <code>Promise</code>
Build a record including all fields a list and a record containing original values

**Kind**: instance method of <code>[marchio-core-record](#module_marchio-core-record)</code>  
**Returns**: <code>Promise</code> - that resolves to a record object containing the resulting record  

| Param | Type | Description |
| --- | --- | --- |
| fields | <code>Object</code> | An object where property values are objects defininig fields |
| body | <code>Object</code> | An object where properties represent fields from a response (like req.response) |

**Example** *(Usage Example)*  
```js
var factory = require("marchio-core-record");

var modelName = 'coretest';

var model = {
    name: modelName,
    fields: {
        email:    { type: String, required: true },
        status:   { type: String, required: true, default: "NEW" },
        // In a real world example, password would be hashed by middleware before being saved
        password: { type: String, select: false },  // select: false, exclude from query results
     }
};
 
// normally this would come from an http method handler
var req = {
     body: {
         email: "foo@example.com"
     }
};

const fList = ["email", "status", "password"];

var recMgr = null; 

factory.create({ model: model })
.then( (rm) => {
                    recMgr = rm;
    return rm.build( { req.body );
})
.then( (record) => recMgr.fields( fList, record ) )
.then( (response) => {
     console.log( response );
 })
.catch( function(err) { 
    console.error(err); 
});
```
<a name="module_marchio-core-record-factory"></a>

## marchio-core-record-factory
Factory module

<a name="module_marchio-core-record-factory.create"></a>

### marchio-core-record-factory.create(spec) ⇒ <code>Promise</code>
Factory method 
It takes one spec parameter that must be an object with named parameters

**Kind**: static method of <code>[marchio-core-record-factory](#module_marchio-core-record-factory)</code>  
**Returns**: <code>Promise</code> - that resolves to {module:marchio-core-record}  

| Param | Type | Description |
| --- | --- | --- |
| spec | <code>Object</code> | Named parameters object |
| spec.model | <code>Object</code> | Model object that must contain a fields property |

**Example** *(Usage example)*  
```js
var factory = require("marchio-core-record");

var modelName = 'coretest';

var model = {
    name: modelName,
    fields: {
        email:    { type: String, required: true },
        status:   { type: String, required: true, default: "NEW" },
        // In a real world example, password would be hashed by middleware before being saved
        password: { type: String, select: false },  // select: false, exclude from query results
     }
 };

 factory.create({ model: model })
 .then(function(obj) {
     return obj.health();
 })
 .catch( function(err) { 
     console.error(err); 
 });
```


* * *

## Testing

To test, go to the root folder and type (sans __$__):

    $ npm test
   
* * *
 
## Repo(s)

* [bitbucket.org/mitchallen/marchio-core-record.git](https://bitbucket.org/mitchallen/marchio-core-record.git)
* [github.com/mitchallen/marchio-core-record.git](https://github.com/mitchallen/marchio-core-record.git)

* * *

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style.
Add unit tests for any new or changed functionality. Lint and test your code.

* * *

## Version History

#### Version 0.1.2

* added __selectedFields__ method

#### Version 0.1.1

* updated documentation

#### Version 0.1.0 

* initial release

* * *
