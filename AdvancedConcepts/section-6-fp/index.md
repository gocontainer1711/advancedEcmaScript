# Functional Programming in JS

* Curry
* Partial Application
* Pure functions
* Referential Transparency
* Compose
* Pipe
* Composition vs Inheritance
* OOP vs FP

# Rambda is a JS library that supports FP. It has inbuilt compose etc..

We remember in our object oriented programming section how we had classes to divide up properties and

methods of let's say an ogre from that of an elf and functional programming has this idea as well of

separating concerns but **they also separate data and functions**.

* Data and functions are separated.

* Functions operate data and not belong to it (unlike map being a method of Array)


## Pure functions

* No Side Effects (No touching outside world)
* Same Input should always return the same output (Referential Transparency)

```
function xyz(){
  console.log('hi'); // side effect
}
```


* Impure Function
```
//Side effects:
const array = [1,2,3];
function mutateArray(arr) {
  arr.pop()
}
function mutateArray2(arr) {
  arr.forEach(item => arr.push(1
  ))
}
//The order of the function calls will matter.
mutateArray(array)
mutateArray2(array)
array
```

## Can Everything be pure ?

No, Soemtimes side effects are desired functions..
The goal of FP is to minimise side effects.
Purity is confidence level (need not be 100%)

## Characteristics of a Perfect Function

* Should do only one task
* return statement
* Pure
* No shared state
* Immutable state
* Composable
* Predictable



## Idempotence (Predictable Even if it is not pure)
// should return the same result for the same input

```
// Idempotence:
function notGood() {
  return Math.random()
  // new Date();
}

function good() {
  return 5
}

Math.abs(Math.abs(-10)) // idempotence
```


## Imperative vs Declarative

Humans are declarative
Computers are imperative

for loop (i++) is imperative

forEach is declarative

Jquery is more imperative
React is more declarative

Declarative code compiles down to imperative code.

## Immutability 

not changing state , instead creating new copies that gets changed.

Simply A function should not mutate its arguments or global state.

* Persistent data structures // Memory Efficient


## High Order Functions and closures

HOF either returns a function or takes one or more function as arguments.

```

const hof = (fn, a) => fn(a)

const closure = function() {
    let count = 0;
    return function incr() {
        return count++; // violates FP since mutating not a good example of FP
    }
}
const incr = closure();
incr(); // 0
incr(); // 1
incr(); // 2
```

## currying

```
const prod = a => b => a * b

const prodBy2 = prod(2)

prod(2)(3) // 6

prodBy2(3) // 6
```


## Partial Application

A way to partially apply a function and uses closures to remember the rest of the args.

On the second call , partial expects all the arguments.

On the other hand curry expects minimum one argument per call.

```
const multiply = (a, b) => a * b

multiplyByTwo = multiply.bind(null, 2);

multiplyByTwo(2) // 4
```


## Compose and pipe

```


fn1(fn2(fn3(50)));

compose(fn1, fn2, fn3)(50) //Right to left
pipe(fn3, fn2, fn1)(50)//left to right

const compose = (f, g) => (a) => f(g(a))
const pipe = (f, g) => (a) => g(f(a))
const multiplyBy3AndAbsolute = compose((num) => num*3, Math.abs)
console.log(multiplyBy3AndAbsolute(-50))

```

## Arity

Arity simply means the number of arguments a function takes.

Fewer the number of arguments , easier it is to use the function.

Break down and use compose .

To many args is not great.


## Exercise
```
// Amazon shopping
const user = {
  name: 'Kim',
  active: true,
  cart: [],
  purchases: []
}


//Implement a cart feature:
// 1. Add items to cart.
// 2. Add 3% tax to item in cart
// 3. Buy item: cart --> purchases
// 4. Empty cart

//Bonus:
// accept refunds.
// Track user history.
```

Solution

```
const user = {
  name: 'Kim',
  active: true,
  cart: [],
  purchases: []
}
const history1 = [];
const compose = (f, g) => (...args) => f(g(...args))
const pipe = (f, g) => (...args) => g(f(...args))
const purchaseItem  = (...fns) => fns.reduce(compose);
const purchaseItem2  = (...fns) => fns.reduce(pipe);
purchaseItem2(
  addItemToCart,
  applyTaxToItems,
  buyItem,
  emptyUserCart,
)(user, {name: 'laptop', price: 60})
// purchaseItem(
//   emptyUserCart,
//   buyItem,
//   applyTaxToItems,
//   addItemToCart
// )(user, {name: 'laptop', price: 50})
function addItemToCart(user, item) {
  history1.push(user)
  const updatedCart = user.cart.concat(item)
  return Object.assign({}, user, {cart: updatedCart});
}

function applyTaxToItems(user) {
  history1.push(user)
  const {cart} = user;
  const taxRate = 1.3;
  const updatedCart = cart.map(item => {
    return {
      name: item.name,
      price: item.price*taxRate
    }
  })
  return Object.assign({}, user, { cart: updatedCart });
}

function buyItem(user) {
  history1.push(user)
  const itemsInCart = user.cart;
  return Object.assign({}, user, { purchases: itemsInCart });
}
function emptyUserCart(user) {
  history1.push(user)
  return Object.assign({}, user, { cart: [] });
}

function refundItem() {

}

function getUserState() {

}

function goBack() {

}

function goForward() {

}
```