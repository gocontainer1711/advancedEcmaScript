* Web APIs 
* Async/Await
* Callbacks
* Microtask Queue (Job queue)
* Task Queue (callback Queue)
* Promises
* Event loop
* Call Stack


Explain Js is a single threaded language that can be non-blocking ?


What is a Promise (Es6) ?

A promise is an object that may produce a single value some time in the future .

A promise may be in one of the following states :

a) Fullfilled
b) Rejected
c) Pending

```
const promise = new Promise((resolve, reject)=>{
    if(true){
        resolve('worked');
    } else {
        reject('broke);
    }
});

promise
  .then(res => `${res} !!!`)
  .then(res => {
      console.log('modified : ', res);
      throw Error;
  })
  .then(()=>{
      console.log('skipped');
  })
  .catch((err)=>{
      console.log(err);
  })
  .then(()=>{
      console.log('Will it run ? incase of resolve or reject when placed after catch8');
  })
```

```
const urls = [
    'https://jsonplaceholder.typeicode.com/users',
    'https://jsonplaceholder.typeicode.com/posts',
    'https://jsonplaceholder.typeicode.com/albums',
];

Promise.all(urls.map((url)=>{ return fetch(url).then(resp => resp.json())}))
.then((responses)=>{
    console.log(responses);
})
.catch((err)=>{ throw err})
```

# Async await (Es8)


makes code easier to read and synchronous

What happens when two concurrent users hit an api on js server  ?
How is stack shared between two complex async functions (which has sync + async code) ?
Is it just handled by some Queue sequentially ?


```
async function () {
    const urls = [
    'https://jsonplaceholder.typeicode.com/users',
    'https://jsonplaceholder.typeicode.com/posts',
    'https://jsonplaceholder.typeicode.com/albums',
];

try{
 const responses = await Promise.all(urls.map((url)=>{ return fetch(url).then(resp => resp.json())}))
 console.log(responses);
} catch((err)=>{
     throw err
  }).finally(()=>{
      // finally arg is emptty
      console.log('always executed at the end);
  })

}
```

Es9 
```
const func = (a, b, c, d, e, f) {
 return a+b+c+d-e-f;
}

const argList = [1,2,3,4,5,6];

func(...argList); // we can call func in this way

```


 
## for await of syntax (Es9)
```
async function () {
    const urls = [
    'https://jsonplaceholder.typeicode.com/users',
    'https://jsonplaceholder.typeicode.com/posts',
    'https://jsonplaceholder.typeicode.com/albums',
];

try{
    const promises = urls.map((url)=>{ return fetch(url) });
    for await (let resp of promises) {
        const data = await resp.json();
        console.log(data);
    }
} catch((err)=>{
     throw err
  }).finally(()=>{
      // finally arg is emptty
      console.log('always executed at the end);
  })

}
```

for of loops can be used in conjction with await ?

How can we use other array helpers with await ?

## Job Queue / Microtask Queue (Higher Priority queue than callback / Tsk Queue)

Its used for Promises. 
callback queue is used for setTimeout.
Not all browsers implement this queue

```
setTimeout(()=>{console.log('1', 'is the loneliest number')}, 0) // 3rd
setTimeout(()=>{console.log('2', 'can be as bad as one')}, 10) // 4th


Promise.resolve('hi').then((data)=> console.log('2', data)) // 2nd


console.log('3','is a crowd') // first
```

## Parallel, Sequential, Race

```
// variation 1
const promisify = (item, delay) =>
  new Promise((resolve) =>
    setTimeout(() =>
      resolve(item), delay));

const a = () => promisify('a', 100);
const b = () => promisify('b', 5000);
const c = () => promisify('c', 3000);

async function parallel() {
  const promises = [a(), b(), c()];
  const [output1, output2, output3] = await Promise.all(promises);
  return `prallel is done: ${output1} ${output2} ${output3}`
}

async function race() {
  const promises = [a(), b(), c()];
  const output1 = await Promise.race(promises);
  return `race is done: ${output1}`;
}

async function sequence() {
  const output1 = await a();
  const output2 = await b();
  const output3 = await c();
  return `sequence is done ${output1} ${output2} ${output3}`
}

sequence().then(console.log)
parallel().then(console.log)
race().then(console.log)
```

```
// variation 2

const promisify = (item, delay, caller) =>
  new Promise((resolve) =>
    setTimeout(() => {
        console.log(item, delay, caller);
        resolve(item), delay)
    });

const a = (caller) => promisify('a', 100, caller);
const b = (caller) => promisify('b', 5000, caller);
const c = (caller) => promisify('c', 3000, caller);

async function parallel() {
  const promises = [a('parallel'), b('parallel'), c('parallel')];
  const [output1, output2, output3] = await Promise.all(promises);
  return `prallel is done: ${output1} ${output2} ${output3}`
}

async function race() {
  const promises = [a('race'), b('race'), c('race')];
  const output1 = await Promise.race(promises);
  return `race is done: ${output1}`;
}

async function sequence() {
  const output1 = await a('sequence');
  const output2 = await b('sequence');
  const output3 = await c('sequence');
  return `sequence is done ${output1} ${output2} ${output3}`
}

sequence().then(console.log)
parallel().then(console.log)
race().then(console.log)
```


## Threads, Concurrency and Parallelism

Web Worker runs in other threads outside the main threads


cluster module :  https://www.freecodecamp.org/news/scaling-node-js-applications-8492bd8afadc/

Before we create a cluster to clone this server into multiple workers, let’s do a simple benchmark of how many requests this server can handle per second. We can use the Apache benchmarking tool for that. After running the simple server.js code above, run this ab command:

`ab -c200 -t10 http://localhost:8080/`


```
// cluster.js
const cluster = require('cluster');
const os = require('os');

if (cluster.isMaster) {
  const cpus = os.cpus().length;

  console.log(`Forking for ${cpus} CPUs`);
  for (let i = 0; i<cpus; i++) {
    cluster.fork();
  }
} else {
  require('./server');
}

```

```

const restartWorker = (workerIndex) => {
  const worker = workers[workerIndex];
  if (!worker) return;

  worker.on('exit', () => {
    if (!worker.exitedAfterDisconnect) return;
    console.log(`Exited process ${worker.process.pid}`);
    
    cluster.fork().on('listening', () => {
      restartWorker(workerIndex + 1);
    });
  });

  worker.disconnect();
};

restartWorker(0);

```



https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers

https://www.internalpointers.com/post/gentle-introduction-multithreading





```
var worker = new Worker('worker.js')
worker.postMessage('Helloooo')

addEventListener('message)

```


Concurrency (Single-Core CPU)                       Concurrency + Parallelism (Multi-Core CPU) 

 th1(2 cpu(1) cycle)                                 th1(1 cpu(1) cycle) | th2(2 cpu(2) cycle)
 th2(1 cpu(1) cycle)                                 th3(2 cpu(1) cycle) | th4(1 cpu(2) cycle)
 th1(1 cpu(1) cycle)                                 th1(4 cpu(1) cycle) | th5(2 cpu(2) cycle)
 th2(3 cpu(1) cycle)                                 th3(2 cpu(1) cycle) | th2(2 cpu(2) cycle)
 th1(1.5 cpu(1) cycle)                               th1(1 cpu(1) cycle) | th5(3 cpu(2) cycle)

 // Parallelism may bring bugs related to race condition , deadlocks etc..


 ```
 const {spawn} = require('child_process')
 spawn('git', ['stuff'])
 ```

 Does Hapi and Express use some kind of cluster module ?
 