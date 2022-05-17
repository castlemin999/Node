let count = 0;

function increase() {
  count++;
}

function getCount() {
  return count;
}

module.exports.getCount = getCount;
module.exports.increase = increase;
// = exports.increase = increase; // module은 생략이 가능하다.
console.log(module.exports === exports); // true

// But!! exports를 빈객체로 초기화 할경우 exports는 더이상 module.exports를 가르키지 않는다. 
//exports = {};
// console.log(module.exports === exports); // false
exports.increase = increase;
console.log(module);
