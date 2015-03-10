var expect = require("chai").expect,
    PriQ = require("./priq");

describe("PriQ", function() {
  var pq;

  beforeEach(function() {
    pq = new PriQ();
  });

  describe("size", function() {
    it("returns 0 for an empty queue", function() {
      expect(pq.size).to.equal(0);
    });

    it("returns the number of elements in the queue", function() {
      pq.set("a", 1);
      expect(pq.size).to.equal(1);
      pq.set("b", 2);
      expect(pq.size).to.equal(2);
    });
  });

  describe("keys", function() {
    it("returns all of the keys in the queue", function() {
      pq.set("a", 1);
      pq.set(1, 2);
      pq.set(false, 3);
      pq.set(undefined, 4);
      pq.set(null, 5);
      expect(pq.keys().sort()).to.eql(["a", "1", "false", "undefined", "null"].sort());
    });
  });

  describe("has", function() {
    it("returns true if the key is in the queue", function() {
      pq.set("a", 1);
      expect(pq.has("a")).to.be.true;
    });

    it("returns false if the key is not in the queue", function() {
      expect(pq.has("a")).to.be.false;
    });
  });

  describe("priority", function() {
    it("returns the current priority for the key", function() {
      pq.set("a", 1);
      pq.set("b", 2);
      expect(pq.priority("a")).to.equal(1);
      expect(pq.priority("b")).to.equal(2);
    });

    it("returns undefined if the key is not in the queue", function() {
      expect(pq.priority("foo")).to.be.undefined;
    });
  });

  describe("min", function() {
    it("throws an error if there is no element in the queue", function() {
      expect(function() { pq.min(); }).to.throw;
    });

    it("returns the smallest element", function() {
      pq.set("b", 2);
      pq.set("a", 1);
      expect(pq.min()).to.equal("a");
    });

    it("does not remove the minimum element from the queue", function() {
      pq.set("b", 2);
      pq.set("a", 1);
      pq.min();
      expect(pq.size).to.equal(2);
    });
  });

  describe("set", function() {
    it("adds the key to the queue", function() {
      pq.set("a", 1);
      expect(pq.keys()).to.eql(["a"]);
    });

    it("returns true if the key was added", function() {
      expect(pq.set("a", 1)).to.be.true;
    });

    it("returns false if the key already exists in the queue and the priority is not lower", function() {
      pq.set("a", 1);
      expect(pq.set("a", 1)).to.be.false;
    });

    it("returns true if the key was in the queue but the new priority was lower", function() {
      pq.set("a", 5);
      expect(pq.set("a", 4)).to.be.true;
    });
  });

  describe("removeMin", function() {
    it("removes the minimum element from the queue", function() {
      pq.set("b", 2);
      pq.set("a", 1);
      pq.set("c", 3);
      pq.set("e", 5);
      pq.set("d", 4);
      expect(pq.removeMin()).to.equal("a");
      expect(pq.removeMin()).to.equal("b");
      expect(pq.removeMin()).to.equal("c");
      expect(pq.removeMin()).to.equal("d");
      expect(pq.removeMin()).to.equal("e");
    });

    it("throws an error if there is no element in the queue", function() {
      expect(function() { pq.removeMin(); }).to.throw;
    });
  });
});
