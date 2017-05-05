/**
    Module: marchio-core-record
    Author: Mitch Allen
*/

/*jshint node: true */
/*jshint esversion: 6 */

"use strict";

/**
 * Module
 * @module marchio-core-record
 */

/**
 * 
 * Factory module
 * @module marchio-core-record-factory
 */

 /** 
 * Factory method 
 * It takes one spec parameter that must be an object with named parameters
 * @param {Object} spec Named parameters object
 * @param {Object} spec.model Model object that must contain a fields property
 * @returns {Promise} that resolves to {module:marchio-core-record}
 * @example <caption>Usage example</caption>
 * var factory = require("marchio-core-record");
 *
 * var modelName = 'coretest';
 *
 * var model = {
 *     name: modelName,
 *     fields: {
 *         email:    { type: String, required: true },
 *         status:   { type: String, required: true, default: "NEW" },
 *         // In a real world example, password would be hashed by middleware before being saved
 *         password: { type: String, select: false },  // select: false, exclude from query results
 *      }
 *  };
 * 
 *  factory.create({ model: model })
 *  .then(function(obj) {
 *      return obj.health();
 *  })
 *  .catch( function(err) { 
 *      console.error(err); 
 *  });
 */
module.exports.create = (spec) => {

    return new Promise((resolve, reject) => {

        spec = spec || {};

        const model = spec.model;

        if(!model) {
            return reject('### ERROR: .create requires model parameter');
        }

        const _fields = model.fields;

        if(!_fields) {
            return reject('### ERROR: .create requires model.fields parameter');
        }

        // reject("reason");

        // private 
        let _package = "marchio-core-record";

        resolve({
            // public
            /** Returns the package name
              * @function
              * @instance
              * @memberof module:marchio-core-record
            */
            package: () => _package,
            /** Build a record based on the model and an input record containing original values
              * @function
              * @instance
              * @memberof module:marchio-core-record
              * @param {Object} body An object where properties represent fields from a response (like req.response)
              * @returns {Promise} that resolves to a record object containing the resulting record
              * @example <caption>Usage Example</caption>
              * var factory = require("marchio-core-record");
              * 
              * var modelName = 'coretest';
              * 
              * var model = {
              *     name: modelName,
              *     fields: {
              *         email:    { type: String, required: true },
              *         status:   { type: String, required: true, default: "NEW" },
              *         // In a real world example, password would be hashed by middleware before being saved
              *         password: { type: String, select: false },  // select: false, exclude from query results
              *      }
              *  };
              *  
              *  // normally this would come from an http method handler
              *  var req = {
              *      body: {
              *          email: "foo@example.com"
              *      }
              *  };
              * 
              * factory.create({ model: model })
              * .then( (rm) => rm.build( req.body )
              * .then( (record) => {
              *     console.log("record: ", record );
              * })
              * .catch( function(err) { 
              *     console.error(err); 
              * });
              */
            build: ( body ) => {
                return new Promise((resolve, reject) => {
                    var record = {};
                    for (var property in _fields) {
                        if (_fields.hasOwnProperty(property)) {
                            // console.log("PROPERTY:", property );
                            var fld = _fields[ property ];
                            // console.log("...:", fld  );
                            if( fld.required ) {
                                if( ! body.hasOwnProperty(property)) {
                                    if( fld.default ) {
                                        record[property] = fld.default;
                                    } else {
                                        var eMsg = `### ERROR: '${property}' is a required field`;
                                        // console.error(eMsg);
                                        return reject(eMsg);
                                    }
                                }
                            }
                            if(body[property]) {
                                record[property] = body[property];
                            } else if( fld.default ) {
                                record[property] = fld.default;
                            }
                        }
                    }
                    resolve(record);
                });
            },

            /** Build an update record based on the model and an input record containing original values
              * @function
              * @instance
              * @memberof module:marchio-core-record
              * @param {Object} body An object where properties represent fields from a response (like req.response)
              * @returns {Promise} that resolves to a record object containing the resulting record
              * @example <caption>Usage Example</caption>
              * var factory = require("marchio-core-record");
              * 
              * var modelName = 'coretest';
              * 
              * var model = {
              *     name: modelName,
              *     fields: {
              *         email:    { type: String, required: true },
              *         status:   { type: String, required: true, default: "NEW" },
              *         // In a real world example, password would be hashed by middleware before being saved
              *         password: { type: String, select: false },  // select: false, exclude from query results
              *      }
              *  };
              *  
              *  // normally this would come from an http method handler
              *  var req = {
              *      body: {
              *          email: "foo@example.com"
              *      }
              *  };
              * 
              * factory.create({ model: model })
              * .then( (rm) => rm.buildUpdate( req.body )
              * .then( (record) => {
              *     console.log("record: ", record );
              * })
              * .catch( function(err) { 
              *     console.error(err); 
              * });
              */
            buildUpdate: ( body ) => {
                return new Promise((resolve, reject) => {
                    var record = {};
                    for (var property in _fields) {
                        if (_fields.hasOwnProperty(property)) {
                            // console.log("PROPERTY:", property );
                            var fld = _fields[ property ];
                            // console.log("...:", fld  );
                            if(body[property]) {
                                record[property] = body[property];
                            } 
                        }
                    }
                    resolve(record);
                });
            },

            /** Build a record based on the selected fields in a model and a record containing original values
              * @function
              * @instance
              * @memberof module:marchio-core-record
              * @param {Object} body An object where properties represent fields from a response (like req.response)
              * @returns {Promise} that resolves to a record object containing the resulting record
              * @example <caption>Usage Example</caption>
              * var factory = require("marchio-core-record");
              * 
              * var modelName = 'coretest';
              * 
              * var model = {
              *     name: modelName,
              *     fields: {
              *         email:    { type: String, required: true },
              *         status:   { type: String, required: true, default: "NEW" },
              *         // In a real world example, password would be hashed by middleware before being saved
              *         password: { type: String, select: false },  // select: false, exclude from query results
              *      }
              * };
              *  
              *  // normally this would come from an http method handler
              * var req = {
              *      body: {
              *          email: "foo@example.com"
              *      }
              * };
              *
              * var recMgr = null; 
              *
              * factory.create({ model: model })
              * .then( (rm) => {
                    recMgr = rm;
              *     return rm.build( { req.body );
              * })
              * .then( (record) => recMgr.select( record ) )
              * .then( (response) => {
              *      console.log( response );
              *  })
              * .catch( function(err) { 
              *     console.error(err); 
              * });
              */
            select: ( body ) => {
                return new Promise((resolve, reject) => {
                    var record = {};
                    for (var property in _fields) {
                        if (_fields.hasOwnProperty(property)) {
                            // console.log("PROPERTY:", property );
                            var fld = _fields[ property ];
                            // console.log("...:", fld  );
                            var selected = fld.select === undefined || fld.select;
                            if( selected ) {
                                // console.log( "SELECTED: ", property );
                                if(body[property]) {
                                    record[property] = body[property];
                                }
                            }
                        }
                    }
                    resolve(record);
                });
            },

            /** Return a list containing the names of fields that are selected
              * @function
              * @instance
              * @memberof module:marchio-core-record
              * @returns {Promise} that resolves to a list of selected field names
              * @example <caption>Usage Example</caption>
              * var factory = require("marchio-core-record");
              * 
              * var modelName = 'coretest';
              * 
              * var model = {
              *     name: modelName,
              *     fields: {
              *         email:    { type: String, required: true },
              *         status:   { type: String, required: true, default: "NEW" },
              *         // In a real world example, password would be hashed by middleware before being saved
              *         password: { type: String, select: false },  // select: false, exclude from query results
              *      }
              * };
              *  
              *  // normally this would come from an http method handler
              * var req = {
              *      body: {
              *          email: "foo@example.com"
              *      }
              * };
              *
              * var recMgr = null; 
              *
              * factory.create({ model: model })
              * .then( (recMgr) => {
              *     recMgr = rm;
              *     return recMgr.selectedFields();
              * })
              * .then( (response) => {
              *      console.log( response );
              *  })
              * .catch( function(err) { 
              *     console.error(err); 
              * });
              */
            selectedFields: () => {
                return new Promise((resolve, reject) => {
                    var list = [];
                    for (var property in _fields) {
                        if (_fields.hasOwnProperty(property)) {
                            // console.log("PROPERTY:", property );
                            var fld = _fields[ property ];
                            // console.log("...:", fld  );
                            var selected = fld.select === undefined || fld.select;
                            if( selected ) {
                                // console.log( "SELECTED: ", property );
                                list.push(property);
                            }
                        }
                    }
                    resolve(list);
                });
            },

            /** Build a record including all fields a list and a record containing original values
              * @function
              * @instance
              * @memberof module:marchio-core-record
              * @param {Object} fields An object where property values are objects defininig fields
              * @param {Object} body An object where properties represent fields from a response (like req.response)
              * @returns {Promise} that resolves to a record object containing the resulting record
              * @example <caption>Usage Example</caption>
              * var factory = require("marchio-core-record");
              * 
              * var modelName = 'coretest';
              * 
              * var model = {
              *     name: modelName,
              *     fields: {
              *         email:    { type: String, required: true },
              *         status:   { type: String, required: true, default: "NEW" },
              *         // In a real world example, password would be hashed by middleware before being saved
              *         password: { type: String, select: false },  // select: false, exclude from query results
              *      }
              * };
              *  
              * // normally this would come from an http method handler
              * var req = {
              *      body: {
              *          email: "foo@example.com"
              *      }
              * };
              *
              * const fList = ["email", "status", "password"];
              *
              * var recMgr = null; 
              *
              * factory.create({ model: model })
              * .then( (rm) => {
                    recMgr = rm;
              *     return rm.build( { req.body );
              * })
              * .then( (record) => recMgr.fields( fList, record ) )
              * .then( (response) => {
              *      console.log( response );
              *  })
              * .catch( function(err) { 
              *     console.error(err); 
              * });
              */
            fields: ( fieldList, body ) => {
                return new Promise((resolve, reject) => {
                    var record = {};
                    fieldList.forEach(function(property) {
                        // console.log("FIELDS PROPERTY:", property );
                        if(body[property]) {
                            record[property] = body[property];
                        }
                    });
                    resolve(record);
                });
            }
            // ...
        });
    });
};
