var my_module = require('./my_module')();
console.log(my_module);
my_module.greet();
my_module.add(5,6);

var math_module = require('./mathlib.js')();
console.log(math_module);
math_module.add(1,2);
math_module.multiply(3,4);
math_module.square(5);
math_module.random(6,10);