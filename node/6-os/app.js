const os = require('os');

// OS 별로 개행이 어떤건지 확인
console.log(os.EOL === '\n');   // mac
console.log(os.EOL === '\r\n'); // window

console.log(os.totalmem());
console.log(os.freemem());
console.log(os.type());
console.log(os.userInfo());
console.log(os.cpus());
console.log(os.homedir());
console.log(os.hostname());
