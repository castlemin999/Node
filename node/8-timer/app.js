let num = 1;

// setInterval을 종료시키기 위해 clearInterval에 객체로 전달
const interval = setInterval(() => {
  console.log(num++);
}, 1000);

setTimeout(() => {
  console.log('Timeout!');
  clearInterval(interval);
}, 6000);
