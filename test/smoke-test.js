/**
    Module: marchio-core-app
      Test: record-test
    Author: Mitch Allen
*/

/*jshint node: true */
/*jshint mocha: true */
/*jshint esversion: 6 */

"use strict";

var should = require('should'),
    modulePath = "../modules/index",
    TEST_PORT = process.env.TEST_PORT || 8080;

describe('record', () => {

    var _factory = null;

    var _modelName = 'coretest';

    var _testModel = {
        name: _modelName,
        fields: {
            email:    { type: String, required: true },
            status:   { type: String, required: true, default: "NEW" },
            // In a real world example, password would be hashed by middleware before being saved
            password: { type: String, select: false },  // select: false, exclude from query results
            // alpha:    { type: String, required: true, default: "AAA" },
            // beta :    { type: String, default: "BBB" },
        }
    };

    var _req = {
        body: {
            email: "foo@example.com"
        }
    };

    before( done => {
        // Call before all tests
        delete require.cache[require.resolve(modulePath)];
        _factory = require(modulePath);
        done();
    });

    after( done => {
        // Call after all tests
        done();
    });

    beforeEach( done => {
        // Call before each test
        done();
    });

    afterEach( done => {
        // Call after eeach test
        done();
    });

    it('module should exist', done => {
        should.exist(_factory);
        done();
    });

    it('.create should return object', done => {
        _factory.create( { model: _testModel} )
        .then((recMgr) => {
            should.exist(recMgr);
            should.exist(recMgr.build);
            should.exist(recMgr.select);
            should.exist(recMgr.fields);
            done();
        })
         .catch((err) => { 
            console.error(err); 
            done(err);  // to pass on err, remove err (done() - no arguments)
        });
    });

    it('.build should reject if required field with no default is missing', done => {
        var mockReq = {
            body: {
                // no fields
            }
        };
        _factory.create( { model: _testModel} )
        .then((recMgr) => {
            should.exist(recMgr);
            should.exist(recMgr.build);
            return recMgr.build( mockReq.body );
            // done();
        })
         .catch((err) => {  
            // console.error(err); 
            done();  // to pass on err, remove err (done(err) => done() - no arguments)
        });
    });

    it('.build method should set default field', done => {
        _factory.create( { model: _testModel} )
        .then((recMgr) => {
            should.exist(recMgr);
            should.exist(recMgr.build);
            return recMgr.build( _req.body );
        })
        .then((record) => {
            // console.log( record );
            should.exist(record.status);
            record.status.should.eql(_testModel.fields.status.default);
            done();
        })
         .catch((err) => {  
            console.error(err); 
            done(err);  // to pass on err, remove err (done() - no arguments)
        });
    });

    it('.build method should override default field if set', done => {
        var mockReq = {
            body: {
                email: "foo@example.com",
                status: "UPDATE",
                password: "password1234!"
            }
        };
        _factory.create( { model: _testModel} )
        .then((recMgr) => {
            should.exist(recMgr);
            should.exist(recMgr.build);
            return recMgr.build( mockReq.body );
        })
        .then((record) => {
            // console.log( record );
            should.exist(record.status);
            record.status.should.eql(mockReq.body.status);
            done();
        })
         .catch((err) => { 
            console.error(err); 
            done(err);  // to pass on err, remove err (done() - no arguments)
        });
    });

    it('.buildUpdate should pass if required field with no default is missing', done => {
        var mockReq = {
            body: {
                // no fields
            }
        };
        _factory.create( { model: _testModel} )
        .then((recMgr) => {
            should.exist(recMgr);
            should.exist(recMgr.build);
            return recMgr.buildUpdate( mockReq.body );
        })
        .then((record) => {
            should.exist(record);
            should.not.exist(record.email);
            should.not.exist(record.status);
            should.not.exist(record.password);
            done();
        })
         .catch((err) => {  
            // console.error(err); 
            done( err );  // to pass on err, remove err (done(err) => done() - no arguments)
        });
    });

    it('.buildUpdate should update field', done => {
        var mockReq = {
            body: {
                status: "UPDATE",
            }
        };
        _factory.create( { model: _testModel} )
        .then((recMgr) => {
            should.exist(recMgr);
            should.exist(recMgr.build);
            return recMgr.buildUpdate( mockReq.body );
        })
        .then((record) => {
            should.exist(record);
            should.not.exist(record.email);
            should.exist(record.status);
            record.status.should.eql(mockReq.body.status);
            should.not.exist(record.password);
            done();
        })
         .catch((err) => {  
            // console.error(err); 
            done( err );  // to pass on err, remove err (done(err) => done() - no arguments)
        });
    });

    it('.buildUpdate should update multiple fields', done => {
        var mockReq = {
            body: {
                email: "test-update@example.com",
                status: "UPDATE",
            }
        };
        _factory.create( { model: _testModel} )
        .then((recMgr) => {
            should.exist(recMgr);
            should.exist(recMgr.build);
            return recMgr.buildUpdate( mockReq.body );
        })
        .then((record) => {
            should.exist(record);
            should.exist(record.email);
            record.email.should.eql(mockReq.body.email);
            should.exist(record.status);
            record.status.should.eql(mockReq.body.status);
            should.not.exist(record.password);
            done();
        })
         .catch((err) => {  
            // console.error(err); 
            done( err );  // to pass on err, remove err (done(err) => done() - no arguments)
        });
    });

    it('.buildUpdate should not allow unknown field to be set', done => {
        var mockReq = {
            body: {
                email: "test-update@example.com",
                status: "UPDATE",
                bogus: "this should not be allowed"
            }
        };
        _factory.create( { model: _testModel} )
        .then((recMgr) => {
            should.exist(recMgr);
            should.exist(recMgr.build);
            return recMgr.buildUpdate( mockReq.body );
        })
        .then((record) => {
            should.exist(record);
            should.exist(record.email);
            record.email.should.eql(mockReq.body.email);
            should.exist(record.status);
            record.status.should.eql(mockReq.body.status);
            should.not.exist(record.password);
            should.not.exist(record.bogus);
            done();
        })
         .catch((err) => {  
            // console.error(err); 
            done( err );  // to pass on err, remove err (done(err) => done() - no arguments)
        });
    });

    it('.buildUpdate method should override default field if set', done => {
        var mockReq = {
            body: {
                email: "foo@example.com",
                status: "UPDATE",
                password: "password1234!"
            }
        };
        _factory.create( { model: _testModel} )
        .then((recMgr) => {
            should.exist(recMgr);
            should.exist(recMgr.build);
            return recMgr.buildUpdate( mockReq.body );
        })
        .then((record) => {
            // console.log( record );
            should.exist(record.status);
            record.status.should.eql(mockReq.body.status);
            done();
        })
         .catch((err) => { 
            console.error(err); 
            done(err);  // to pass on err, remove err (done() - no arguments)
        });
    });

    it('.select method should only return selected fields', done => {
        var mockReq = {
            body: {
                email: "foo@example.com",
                status: "UPDATE",
                password: "password1234!"
            }
        };

        var recMgr = null;

        _factory.create( { model: _testModel} )
        .then((rm) => {
            recMgr = rm;
            should.exist(recMgr);
            should.exist(recMgr.select);
            return recMgr.build( mockReq.body );
        })
        .then((record) => recMgr.select( record ))
        .then((response) => {
            // console.log(response);
            should.exist(response);
            should.exist(response.email);
            should.exist(response.status);
            should.not.exist(response.password);
            response.email.should.eql(mockReq.body.email);
            response.status.should.eql(mockReq.body.status);
            done();
        })
         .catch((err) => {  
            console.error(err); 
            done(err);  // to pass on err, remove err (done() - no arguments)
        });
    });

    it('.selectedFields should return list selected field names', done => {
        var recMgr = null;
        _factory.create( { model: _testModel} )
        .then((rm) => {
            recMgr = rm;
            should.exist(recMgr);
            should.exist(recMgr.selectedFields);
            return recMgr.selectedFields();
        })
        .then((response) => {
            // console.log(response);
            should.exist(response);
            response.length.should.eql(2);
            response.should.eql(['email','status']);
            done();
        })
         .catch((err) => {  
            console.error(err); 
            done(err);  // to pass on err, remove err (done() - no arguments)
        });
    });

    it('.fields method should return all fields listed', done => {
        var mockReq = {
            body: {
                email: "foo@mexample.com",
                status: "UPDATE",
                password: "password1234!"
            }
        };
        var fList = ["email", "status", "password"];
        var recMgr = null;
        _factory.create( { model: _testModel} )
        .then((rm) => {
            recMgr = rm;
            should.exist(recMgr);
            should.exist(recMgr.fields);
            return recMgr.build( mockReq.body );
        })
        .then((record) => recMgr.fields( fList, record ) )
        .then((response) => {
            should.exist(response);
            should.exist(response.email);
            should.exist(response.status);
            should.exist(response.password);
            response.email.should.eql(mockReq.body.email);
            response.status.should.eql(mockReq.body.status);
            response.password.should.eql(mockReq.body.password);
            done();
        })
        .catch((err) => { 
            console.error(err); 
            done(err);  // to pass on err, remove err (done() - no arguments)
        });
    });
    
});
