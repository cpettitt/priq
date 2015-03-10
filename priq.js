(function(global) {
  /**
   * A min-priority queue data structure. This algorithm is derived from Cormen,
   * et al., "Introduction to Algorithms". The basic idea of a min-priority
   * queue is that you can efficiently (in O(1) time) get the smallest key in
   * the queue. Adding and removing elements takes O(log n) time. A key can
   * have its priority decreased in O(log n) time.
   *
   * Keys are converted to strings, as with properties in Javascript objects. If
   * you want to use object you must create a unique string representation for
   * each unique object.
   */
  function PriQ() {
    /* What a pirate says. Also how we organize the keys into a tree. */
    this._arr = [];

    /* Mapping of key to its index in `_arr` */
    this._indices = {};
  }

  /**
   * Returns the number of elements in the queue. Takes `O(1)` time.
   */
  Object.defineProperty(PriQ.prototype, "size", {
    enumerable: true,
    get: function() { return this._arr.length; }
  });

  /**
   * Returns the keys that are in the queue. Takes `O(n)` time.
   */
  PriQ.prototype.keys = function() {
    return this._arr.map(function(x) { return x.key; });
  };

  /**
   * Returns `true` if **key** is in the queue and `false` if not.
   */
  PriQ.prototype.has = function(key) {
    return this._indices.hasOwnProperty(key);
  };

  /**
   * Returns the priority for **key**. If **key** is not present in the queue
   * then this function returns `undefined`. Takes `O(1)` time.
   *
   * @param {Object} key
   */
  PriQ.prototype.priority = function(key) {
    var index = this._indices[key];
    if (index !== undefined) {
      return this._arr[index].priority;
    }
  };

  /**
   * Returns the key for the minimum element in this queue. If the queue is
   * empty this function throws an Error. Takes `O(1)` time.
   */
  PriQ.prototype.min = function() {
    if (!this.size) {
      throw new Error("Queue underflow");
    }
    return this._arr[0].key;
  };

  /**
   * Inserts or updats a new key into the priority queue. If the key already
   * exists in the queue and the new value is lower, set the key to the lower
   * value. Return `true` is the queue was modified; otherwise `false`.
   *
   * Takes `O(n)` time.
   *
   * @param {Object} key the key to add
   * @param {Number} priority the initial priority for the key
   */
  PriQ.prototype.set = function(key, priority) {
    var indices = this._indices,
        index = indices[key];
    key = String(key);
    if (index === undefined) {
      var arr = this._arr;
      index = arr.length;
      indices[key] = index;
      arr.push({ key: key, priority: priority });
      decrease(arr, indices, index);
      return true;
    } else if (priority < this._arr[index].priority) {
      this._arr[index].priority = priority;
      decrease(this._arr, this._indices, index);
      return true;
    }
    return false;
  };

  /**
   * Removes and returns the smallest key in the queue. Takes `O(log n)` time.
   */
  PriQ.prototype.removeMin = function() {
    swap(this._arr, this._indices, 0, this._arr.length - 1);
    var min = this._arr.pop();
    delete this._indices[min.key];
    heapify(this._arr, this._indices, 0);
    return min.key;
  };

  function heapify(arr, indices, i) {
    var l = 2 * i,
        r = l + 1,
        largest = i;
    if (l < arr.length) {
      largest = arr[l].priority < arr[largest].priority ? l : largest;
      if (r < arr.length) {
        largest = arr[r].priority < arr[largest].priority ? r : largest;
      }
      if (largest !== i) {
        swap(arr, indices, i, largest);
        heapify(arr, indices, largest);
      }
    }
  }

  function decrease(arr, indices, index) {
    var priority = arr[index].priority;
    var parent;
    while (index !== 0) {
      parent = index >> 1;
      if (arr[parent].priority < priority) {
        break;
      }
      swap(arr, indices, index, parent);
      index = parent;
    }
  }

  function swap(arr, indices, i, j) {
    var origArrI = arr[i];
    var origArrJ = arr[j];
    arr[i] = origArrJ;
    arr[j] = origArrI;
    indices[origArrJ.key] = i;
    indices[origArrI.key] = j;
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = PriQ;
  } else {
    global.PriQ = PriQ;
  }
})(this);
