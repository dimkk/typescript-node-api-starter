/// <reference path="../typings/mocha/mocha.d.ts" />
/// <reference path="../typings/chai/chai.d.ts" />
/// <reference path="../typings/superagent/superagent.d.ts" />

/**
 * Module dependencies.
 */
import superagent = require("superagent");
import chai = require("chai");

/**
 * Globals
 */
const expect = chai.expect;

describe("express rest api server", function(){
  let id;

  it("post object", function(done){
    superagent.post("http://localhost:3000/api/taxi")
      .send({
          name: "John's taxi"
      })
      .end(function(e,res){
        // console.log(res.body);
        expect(e).to.eql(null);
        expect(res.body.message).to.eql("Taxi created!");
        done();
    });
});

  it("retrieves an object", function(done){
    superagent.get("http://localhost:3000/api/taxis/"+id)
      .end(function(e, res){
        // console.log(res.body)
        expect(e).to.eql(null);
        expect(typeof res.body).to.eql("object");
        expect(res.body._id.length).to.eql(24);
        expect(res.body._id).to.eql(id);
        done();
    });
});

  it("retrieves a collection", function(done){
    superagent.get("http://localhost:3000/collections/test")
      .end(function(e, res){
        // console.log(res.body)
        expect(e).to.eql(null);
        expect(res.body.length).to.be.above(0);
        expect(res.body.map(function (item){return item._id;})).to.contain(id);
        done();
      });
  });

  it("updates an object", function(done){
    superagent.put("http://localhost:3000/collections/test/"+id)
      .send({name: "Peter"
        , email: "peter@yahoo.com"})
      .end(function(e, res){
        // console.log(res.body)
        expect(e).to.eql(null);
        expect(typeof res.body).to.eql("object");
        expect(res.body.msg).to.eql("success");
        done();
      });
  });
  it("checks an updated object", function(done){
    superagent.get("http://localhost:3000/collections/test/"+id)
      .end(function(e, res){
        // console.log(res.body)
        expect(e).to.eql(null);
        expect(typeof res.body).to.eql("object");
        expect(res.body._id.length).to.eql(24);
        expect(res.body._id).to.eql(id);
        expect(res.body.name).to.eql("Peter");
        done();
    });
  });

  it("removes an object", function(done){
    superagent.del("http://localhost:3000/collections/test/"+id)
      .end(function(e, res){
        // console.log(res.body)
        expect(e).to.eql(null);
        expect(typeof res.body).to.eql("object");
        expect(res.body.msg).to.eql("success");
        done();
    });
  });
});
