const fs = require('fs');

// node에서는 global 객체
// browser에서는 window 객체

console.log(global);

global.hello = () => {
  global.console.log('hello'); // = console.log('hello');
};

global.hello();
hello();
