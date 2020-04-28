# Error Constructor

* Error('message')
* SyntaxError
* ReferenceError

`throw new Error('msg')`
`throw new SyntaxError`
`throw new ReferenceError`

`throw 'anything'`

const {name, message, stack} = error // error properties


use try , catch , finally to handle errors
try catch blocks can even be nested inside other try catch blocks


In case of promises , we can use catch method (promise chaining)


```
Promise.resolve('asyncfail')
    .then(response => {
        console.log(response)
        throw new Error('#1 fail')
    })
    .then(response => {
        console.log(response)
    })
    .catch(err => {
        console.error('error', err.message)
    })
    .then(response => {
        console.log('hi am I still needed?', response)
        return 'done'
    })
    .catch(err => {
        console.error(err)
        return 'failed'
    })


```


```
Promise.resolve('hey!!')
    .then(response => {
       new Promise((resolve, reject)=>{
           setTimeout(()=>{
              throw new Error();
           }, 5000))
    // Each Promise should have its own catch..
    // guess the output
    return 'Success returned';
    })
    .then(response => {
        console.log(response)
    })
    .catch(err => {
        console.error('error', err.message)
    })
    .then(response => {
        console.log('hi am I still needed?', response)
        return 'done'
    })
    .catch(err => {
        console.error(err)
        return 'failed'
    })


```

```
(function () {
    console.log('a',err); // a undefined
    console.log('b',boo); // b undefined
  try {
    console.log('c',err); // c undefined
    console.log('d',boo); // d undefined
    throw new Error();
  } catch (err) {
    console.log('e',err); // e Error  at <anonymous>:7:11   at <anonymous>:19:3
    console.log('f',boo); // f undefined
    var err = 5;
    var boo = 10;
    console.log('g',err); // g 5
    console.log('h',boo); // h 10
  }
   console.log('i',err); // i undefined ???
   console.log('j',boo); // j 10
})();

(function () {
    console.log('a',err); // a undefined
    console.log('b',boo); // b undefined
  try {
    console.log('c',err); // c undefined
    console.log('d',boo); // d undefined
    throw new Error();
  } catch (error) {
    console.log('e',err); // e undefined
    console.log('f',boo); // f undefined
    var err = 5;
    var boo = 10;
    console.log('g',err); // g 5
    console.log('h',boo); // h 10
  }
   console.log('i',err); // i 5
   console.log('j',boo); // j 10
   console.log('k',error); // Reference Error
})();

```

# Extending error

```
class authenticationError extends Error {
  constructor(message) {
    super(message)
    this.name = 'ValidationError'
    this.message = message
  }
}
class PermissionError extends Error {
  constructor(message) {
    super(message)
    this.name = 'PermissionError'
    this.message = message
    this.favouriteSnack = 'grapes'
  }
}
class DatabaseError extends Error {
  constructor(message) {
    super(message)
    this.name = 'DatabaseError'
    this.message = message
  }
}

throw new PermissionError('A permission error')

```
