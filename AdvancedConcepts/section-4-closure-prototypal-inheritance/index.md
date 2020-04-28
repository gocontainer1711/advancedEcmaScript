#Functions are objects

create function via Function Constructor

```
const two = new Function('return 2'); 
console.log(two()); // 2

const num = new Function('num','return num'); 
console.log(num(2)); // 2

```


Function is an object with following properties

* Name (optional)
* Properties (call, bind, apply, etc..)
* Code ():

### This enables us to store, pass and return functions just like data
### Functions are first class citizens in Javascript

```
function a(fn) {
    fn()
}

var stuff = function(){ console.log('hi')}
a(stuff)

function nested() {
    return function(){
        console.log('bye')
    }
}

nested()()
```

# Higher Order Functions

Function that returns or accepts another function is higher order function

Useful in async nature via callbacks

At runtime , we become able to tell the function what to do after some task is completed


```
const giveAccessTo = (name) =>
  'Access Granted to ' + name;

function authenticate(person) {
  let array = [];
  // you can add checks here for person.level
  for (let i = 0; i < 50000; i++) {
    array.push(i)
  }
  return giveAccessTo(person.name)
}

function letPerson(person, fn) { // ++ We now tell the function what data to use when we call it not when we define it + tell it what to do.
  if (person.level === 'admin') {
    return fn(person)
  } else if (person.level === 'user') {
    return fn(person)
  }
}

function sing(person) {
  return 'la la la my name is ' + person.name
}

letPerson({level: 'user', name: 'Tim'}, sing)

```

```
const genericMultiply = num1 => num2 => (num1 * num2)

genericMultiply(2)(3); // 6
const multiplyBy2 = genericMultiply(2);

multiplyBy2(3) // 6


```

# CLOSURES

Closure  = function() + Lexical Scope (What variable each function has access to)


```
function familyTree() {
  let grandpa = 'grandpa'
  return function b() {
    let father = 'father'
    return function c() {
      let son = 'son'
      return `${grandpa} > ${father} > ${son}`
    }
  }
}

const familyTree2 = grandpa => dad => father => `${grandpa} > ${father} > ${son}`

familyTree()()()
familyTree2('a')('b')('c')

//closures and higher order function
function boo(string) {
  return function(name) {
    return function(name2) {
      console.log(`hi ${name2}`)
    }
  }
}



boo('hi')('john')('tanya');

const boo2 = (name1) => (name2) => (name3) => console.log(`hi ${name1} ${name2} ${name3}`)

booX = boo2('Sam');
booY = booX('John');
booZ = booY('Tanya')

```

```

//exercise:
function callMeMaybe() {
    const callMe = 'Hi!';
    setTimeout(function() {
        console.log(callMe);
    }, 4000);

}

function callMeMaybe2() {
    setTimeout(function() {
        console.log(callMeAgain);
    }, 4000);
    const callMeAgain = 'Hi Again';
}

callMeMaybe(); // Hi!
callMeMaybe2(); //'Hi Again

```
Closures are powerful because :
1) Memory Efficient
2) Encapsulation

```
// Memory Efficient

function heavyDuty(item) {
  const bigArray = new Array(7000).fill('😄')
  console.log('created!');
  return bigArray[item]
}

heavyDuty(699)
heavyDuty(699)
heavyDuty(699)


// but i dont want to pollute the global namespace..
function heavyDuty2() {
  const bigArray = new Array(7000).fill('😄')
  console.log('created Again!')
  return function(item) {
    return bigArray[item]
  }
}

const getHeavyDuty = heavyDuty2();
getHeavyDuty(699)
getHeavyDuty(699)
getHeavyDuty(699)

```


```
//Encapsulation nested methods and variables are encapsulated
const makeNuclearButton = () => {
  let timeWithoutDestruction = 0;
  const passTime = () => timeWithoutDestruction++;
  const totalPeaceTime = () => timeWithoutDestruction;
  const launch = () => {
    timeWithoutDestruction = -1;
    return '💥';
  }

  setInterval(passTime, 1000);
  return {totalPeaceTime, launch}
}

const ww3 = makeNuclearButton();
ww3.totalPeaceTime()
```

```
let view;
function initialize() {
  let called = 0;
  return function() {
    if (called > 0) {
      return
    } else {
      view = '🏔';
      called = true;
      console.log('view has been set!')
    }

  }
}

const start = initialize();
start();
start();
start();
console.log(view)
```

```
// Solve this puzzle
const array = [1,2,3,4];
for(var index = 0; index<array.length; index++){
    setTimeout(function(){
        console.log('index', index)
    }, 3000)
} 
/*
index4
index4
index4
index4
*/

```

```
// Solved puzzle
const array = [1,2,3,4];

// block scoping for each iteration
for(let index = 0; index<array.length;){
    setTimeout(function(){
        console.log('index', index);
        index++;
    }, 3000)
} 

// closure
for(var index = 0; index<array.length;){
(function(index) {
    setTimeout(function(){
        console.log('index', index);
        index++;
    }, 3000)
    })(index) ;
    }


// worst solution down below :(
for(var index = 0; index<array.length;){
    setTimeout(function(){
        console.log('index', index);
        index++;
    }, 3000)
} 

/*
index0
index1
index2
index3
*/

```


# Prototypal Inheritance

Since Array and functions are objects , they can access the properties of an object via protypal Inheritance
 
to go up in the protype chain one level `__proto__`

const array = [];

const obj = {}

const func = function () {}

array.__proto__ has properties like constrcutor, toString, concat, find ,etc..
array.__proto__.__proto__ has properties like constrcutor, hasOwnProperty, __defineGetter__, __lookupGetter__ ,etc..


obj.__proto__ has properties like constrcutor, hasOwnProperty, __defineGetter__, __lookupGetter__ ,etc..
obj.__proto__.__proto__  is null // hence obj.__proto__ is parent of all types of objects(i.e Base Object)

func.__proto__ has properties like f () { [native code] }
func.__proto__.__proto__ has properties like constrcutor, hasOwnProperty, __defineGetter__, __lookupGetter__ ,etc..


In Js we don't have class based Inheritance (its syntactic sugar) , we just have Prototypal Inheritance

```
let dragon = {
  name : 'Dragon1',
  fire: true,
  power: 100,
  fight() {
    return  `${this.name} fights with power: ${this.power}`
  },
  sing() {
    if(this.fire){
    return  this.name + 'sings'
    }
  }
}

dragon.fight();
dragon.sing();

let lizard = {
  name : 'Lizi1',
  power: 1,
  fight() {
    return  `${this.name} fights with power: ${this.power}`
  }
}

lizard.fight();
lizard.sing(); // not there

// lizard.sing = dragon.sing.bind(lizard); // bind just the methods and not properties


// ## creating a prototype chain to inherit properties

lizard.__proto__ = dargon; 
lizard.sing() // runs
lizard.fire // true (inherited property)

// dragon.__proto__ // {}


// isPrototypeOf belongs to BaseObject

dragon.isPrototypeOf(lizard) // true since `lizard.__proto__ = dargon; `

lizard.isPrototypeOf(dragon) // false

for(let prop in lizard){
  if(lizard.hasOwnProperty(prop)){
    console.log('own: ', prop)// will bring only name, power , fight
  } else {
    console.log('not own: ', prop)// sing, fire
  }
}

```
Why is Prototypal Inheritance useful ?
Its memory efficient. Its there in just one place. 
For example, reduce, map belongs only to BaseClass array and is inherited via Prototype chain to all array constructs


Base Object ?
Base Function ?

```
prototype {
  __proto__
}
```

Every Prototype chain links to a prototype object{}

```

function multiplyBy5(num) {
  return num*5
}

multiplyBy5.__proto__  //  base function
Function.prototype // base function
multiplyBy5.__proto__.__proto__
Object.prototype
multiplyBy5.__proto__.__proto__.__proto__
typeof Object
typeof {}
```

__proto__ is a property of prototype and points to the prototype of its Ancestor.

`__proto__ => prototype of ancestor`

Prototype chaining is different from scope chaining.

```
array = [];

array.hasOwnProperty('map') // false

array.__proto__.hasOwnProperty('map') // true

Array.hasOwnProperty('map') // true

// Array.prototype isa same as array.__proto__
```

# Only functions have the prototype property

Every entity having prototype property is a function
Every function has a prototype.
Since Base Object has a prototype its type is function , `type of Object => function`

All standard built in objects have prototype property (uses constructor property)

## Another way to create prototype chain without __proto__ Object.create

```
let human = {
  mortal: true,
  species: 'Homosapiens'
}

let sam = Object.create(human);

sam.age = 45;

human.isPrototypeOf(sam) // true
```

```

// primitive types
const arr = [];
const str = 'xyz';

arr.prototype // undefined

str.prototype // undefined
```

```
// Excercise
// Array.map() => to print '🗺'
Array.prototype.map = function()  { // what happens with arrow function here?
  arr = [];
  for (let i = 0; i < this.length; i++) {
    arr.push((this[i]+'🗺'));
  }
  return arr;
}
console.log([1,2,3].map())

//Date object => to have method .yesterday() which shows you yesterday's day in 'YYYY-MM-DD' format.
Date.prototype.lastYear = function(){
  return this.getFullYear() - 1;
}

new Date('1900-10-10').lastYear()
// don't worry if you didn't get this... we will expand on this later.
```

Implement bind with apply
```
Function.prototype.bind = function(whoIsCallingMe){
  const self = this;
  return function(){
    return self.apply(whoIsCallingMe, arguments);
  };
}
```
