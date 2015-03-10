# priq

priq provides a priority queue implementation in Javascript.

# Example Usage

```js
var PriQ = require("priq");

var q = new PriQ();

q.has("key");
// => false

q.set("key", 10);
// => true

q.has("key");
// => true

q.size;
// => 1

q.priority("key");
// => 10

q.set("key", 12); // Greater priority numbers are ignored, return false.
// => false

q.set("key", 5); // Priorities can be lowered, return true;
// => true

q.priority("key");
// => 5

q = new PriQ();
q.set("a", 10);
q.set("b", 5);
q.set("c", 20);

q.min();
// => "b"

q.size;
// => 3

q.removeMin();
// => "b"

q.size;
// => 2

q.has("b")
// => false
```

# License

priq is licensed under the terms of the MIT License. See the LICENSE file for
details.
