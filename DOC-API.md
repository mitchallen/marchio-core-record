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

factory.create({ model })
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
