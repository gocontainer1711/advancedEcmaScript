Every function in the call stack has its own execution context that manages local variables.
The base execution context that runs is called the ' global ' execution context.
the global execution context gives two things by default(both are equal):
1) global object
2) this 

Hoisting is also performed in the execution phase.

in browser this === window

every global variable becomes a field of the global object



Execution Context
The environment in which the current code is being evaluated in. There can only be one execution context running at any point of time! This is because Javascript is single-threaded.



arguments is an object that is made available to execution contexts made with the function keyword
Because arguments is an object, Array methods are not available
We can use Array.from(arguments) to create an array with the arguments values
The spread operator can be used to convert arguments in a function into an Array



Lexical Environment
Lexical environments means where the code was written.
The Global Environment is the parent environment to all other environments created in the code
In the browser, the global environment is called window
In Node.js, the global environment is called global


```
function outer(){
    function inner(){
        // function inner is lexically inside outer which is lexically inside global
    }
}

```

In Js the data and variables that are available is determined by the lexical scope(where fn is defined) and not the dynamic scope (where the function is called).


Hoisting (During the creation phase before execution of the code)

Hoisting reserves memory for variables in heap before the code is executed.

Hoisting happens in every execution context

Instead, the variable and function declarations are put into memory during the compile phase, but stay exactly where you typed them in your code.
One of the advantages of JavaScript putting function declarations into memory before it executes any code segment is that it allows you to use a function before you declare it in your code. 

variables are partially hoisted (value is undefined).
functions are fully hoisted .

```
catName("Tigger"); => My cat's name is Tig
catName(myPet); => My cat's name is undefined
var myPet = 'Baloo';

function catName(name) { 
  console.log("My cat's name is " + name); 
} 

```
Example 2

```
catName("Tigger"); => Reference Error catName is not defined

(function catName(name) { 
  console.log("My cat's name is " + name); 
}) 

```

Example 3

```
catName(myPet); => Reference Error myPet is not defined
let myPet = 'Baloo';

function catName(name) { 
  console.log("My cat's name is " + name); 
}

```


Example 4 guess the output

```


const catName = (name) => { 
  console.log("My cat's name is " + name); 
}

let myPet = 'Baloo';

catName(myPet); => ??

```



Example 5 guess the output

```
let myPet = 'Baloo';

catName(myPet); => ??

const catName = (name) => { 
  console.log("My cat's name is " + name); 
}

```



Example 6 guess the output

```
// function definition vs declaration
let myPet = 'Baloo';

catName(myPet); => ??

var catName = (name) => { 
  console.log("My cat's name is " + name); 
}

```




Example 7 guess the output

```
let myPet = 'Baloo';

catName(myPet); => ??

function catName(name) => { 
  console.log("My cat's name is " + name); 
}

function catName(name) => { 
  console.log("Hey !!!!!!!!!!!!!!!!!!!!!... My cat's name is " + name); 
}

// function definition vs declaration
```





Example 8 guess the output

```
var a = 1;
var a = 2;
console.log(a);

```


```
var fav = 'grapes'

function printFav1() {
    console.log('Inside printFav1');
    console.log(fav);
    var fav = 'oranges';
    console.log(fav);
}

function printFav2() {
    console.log('Inside printFav2');
    console.log(fav);
    fav = 'oranges';
    console.log(fav);
}


printFav1();
printFav2();

```


```

function bigBrother(){
  function littleBrother() {
    return 'it is me!';
  }
  return littleBrother();
  function littleBrother() {
    return 'no me!';
  }
}

// Before running this code, what do you think the output is?
bigBrother();

```

JavaScript only hoists declarations, not initializations. If a variable is declared and initialized after using it, the value will be undefined. 





const/let
const and let have block scope
const and let declarations are not hoisted, so variables declared with const/let can only be accessed after their declaration in the code.

var
var has function scope


Block Scope
A block scope is the area within if and switch conditions or for and while loops. Generally speaking, whenever you see {curly brackets}, it is a block. In ES6, const and let keywords allow developers to declare variables in the block scope, which means those variables exist only within the corresponding block.


Function Scope
Whenever you declare a variable in a function, the variable is visible only within the function. You can't access it outside the function. var is the keyword to define a variable for a function-scope accessibility.
function foo(){
    var fruit ='apple';
    console.log('inside function: ',fruit);
}

foo();                    //inside function: apple
console.log(fruit);       //error: fruit is not defined 

```

//Function Scope
function loop() {
  for( var i = 0; i < 5; i++) {
    console.log(i);
  }
  console.log(i)
}

//Block Scope
function loop2() {
  for( let i = 0; i < 5; i++) {
    console.log(i);
  }
  console.log(i)
}

```


```

function foo(){
    if(true){
        var fruit1 = 'apple';        //exist in function scope
        const fruit2 = 'banana';     //exist in block scope
        let fruit3 = 'strawberry';   //exist in block scope

    }
    console.log(fruit1);
    console.log(fruit2);
    console.log(fruit3);
}

foo();
//result:
//apple
//error: fruit2 is not defined
//error: fruit3 is not defined

```



# Function Definition vs Function Declaration vs Function Invocation .

```

// Function expression (not available for hoisting)
var canada = () => {
console.log('very cold');
}

car india = function() {
console.log('warm');
}

// Function Declaration (hoisted)

function africa() {
console.log('hot');
}

//Function Invocation

canada()
india()
africa()

```


When a function is invoked Well we create a new execution context on top of our global execution context

and we get a few things.

1) this
2) arguments (that's another keyword in JavaScript )


```
function add(a, b){
    console.log(a, b);
    // not good for compiler optimistaions
    console.log('arguments: ', arguments);// its an object {'0': 11, '1': 29}
    console.log(Array.from(arguments)); // gives an array
    return a + b;
}

add(11, 29);


function add2(...args){
  
    console.log('args: ', args);// its an array [ 11,  29]
    return a + b;
}
add2(11, 29);
```


`arguments` is only available inside function's execution context and not in global execution context.
A func with no args is also given a blank empty object as arguments.




Scope Chain 

Context vs. Scope
Context refers to the this keyword, i.e. the object
Scope refers to the visibility of variables

The scope chain is based on the call-stack, not the nesting of scopes in code.

To understand the scope chain you must know how closures work.

A closure is formed when you nest functions, inner functions can refer to the variables present in their outer enclosing functions even after their parent functions have already executed.

JavaScript resolves identifiers within a particular context by traversing up the scope chain, moving from locally to globally.


```
// Scope:
function sayMyName() {
  var a = 'a';
  return function findName() {
    var b = 'b';
    console.log(c)
    return function printName() {
      var c = 'c';
      return 'Andrei Neagoie'
    }
  }
}

sayMyName()()()

```

```
function findName() {
  var b = 'b';
  return printName();
}

function printName() {
  var c = 'c'
  return 'Andrei Neagoie'
}

function sayMyName() {
  var a = 'a';
  return findName()
}

sayMyName()
```


```
var currentScope = 0; // global scope 
(function () { 
  var currentScope = 1, one = 'scope1'; 
  alert(currentScope); 
  (function () { 
    var currentScope = 2, two = 'scope2'; 
    alert(currentScope); 
    (function () { 
      var currentScope = 3, three = 'scope3'; 
      alert(currentScope); 
      alert(one + two + three); // climb up the scope chain to get one and two 
    }());
  }());
}());
```

Js uses [[Scopes]] that is linked to each execution environment to access variables of linked scopes.

```
// Weird Javascript #1 - it asks global scope for height. Global scope says: ummm... no but here I just created it for you.
// ps this isn't allowed in strict mode. We call this leakage of global variables.
function weird() {
  height = 50
}

var heyhey = function doodle() {
  // code here
}

heyhey();
doodle(); // Error! because it is enclosed in its own scope.

```


Why not use too much global variables?
1) Memory leak
2) Mutation bugs
3) variable collisions across files in multiple scripts of html (solved by modules in es6)


IIFE




Implement let and const of Es6 ?


IIFE (IMMEDIATELY INVOKED FUNCTION EXPRESSION)

IIFE are common javascript design pattern used by a lot of popular libraries especially

backbone JS and JQuery.

Immediately invoked anonymous function.

Creates an anonymous execution context.


```
// this is a function expresssion and not a function declaration
// No global property is created here since this anonymous function is not assigned to a global variable
(function(){
    var x ;
    x= 100;
    

})()
```


```
// global scope polluted only once via $
var $ = (function() {
    function add(a, b){
        return a + b
    }
    function minus(a, b){
        return a - b
    }
    return {
        add:add,
        minus:minus
    }
})()

$.add(2,3)
$.minus(3,2)
```


```
var _ = (function(outer) {
    function random(){
        return outer.random();
    }
    return {
        random:random
    }
})(outer)

_.random()_
```

#this Keyword (this tells , which object called me ??)

// scariest and most confusing part of js

Simplest and most effective definition : 'this is the object that the function is a property of'

```

function a(){
    console.log(this); // window object
}

function b() {
    'use strict'
    console.log(this); // undefined
}

```

```
// Importance of this illustrated here
const obj = {
    name : 'Billy',
    sing: function () {
        return 'lalala'  + this.name;
    },
    singAgain: function(){
        return this.sing() + '!';
    }
}
obj.sing(); // lalala Billy

//newer syntax
const obj = {
    name : 'Billy',
    sing() {
        return 'lalala'  + this.name;
    },
    singAgain(){
        return this.sing() + '!';
    }
}

```


```
function printName(){
    console.log(this.name);
}

const name = 'OuterSunny';

const ob1 = {
    name: 'Sunny1',
    printName:printName

}
const obj2 = {
    name: 'Sunny2',
    printName:printName
}
printName() // OuterSunny
obj1.printName() // Sunny1
obj2.printName() // Sunny2

```

Importance of this :
1) gives methods access to their object
2) execute the same code for multiple objects
3) function knows about the 


```

//Exercise:
const a = function() {
  console.log(this) // window
  const b = function() {
    console.log(this) // window
    const c = {
      hi: function() {
     console.log(this) // {hi:f}
    }}
    c.hi()
  }
  b()
}

a()

//JS is weird:
const obj = {
  name: 'Billy',
  sing: function() {
    console.log(this) // in this case, it's a method on an object.
    var anotherFunc = function() {
      console.log(this)// this points to windows!
    }
    anotherFunc() // not called by obj but called when sing got executed
  }
}

obj.sing();// sing called by obj


```

Dynamic Scope: Where the function is called
Lexical scope : Where function is defined

Dynamic scope !== Lexical Scope


## this keyword is dynamically scoped.
## Arrow funcions are lexically bound i.e this behaves lexically and not dynamically
## bind is also used to solve this problem.


```
const obj = {
  name: 'Billy',
  sing: function() {
    console.log(this) // obj
    var anotherFunc = () => {
      console.log(this)// obj
    }
    anotherFunc() // still not called by obj but called when sing got executed
  },
    sing2() {
    console.log(this) // ??
    var anotherFunc = () => {
      console.log(this)// ??
    }
    anotherFunc() // still not called by obj but called when sing got executed
  }
}

obj.sing();// sing called by obj

```


```
// Another way to achieve the same
const obj = {
  name: 'Billy',
  sing: function() {
    console.log(this) // obj
    var self = this; // using closure
    var anotherFunc = function() {
      console.log(self) // ??
    }
    anotherFunc() // still not called by obj but called when sing got executed
  }
}

obj.sing();// sing called by obj

```


# call(), apply(), bind()


underneath the hood all js functions use call() to call functions.

* call, apply is used to borrow methods
* bind returns a new function with certain type of context and parameters

```
function a() {
    console.log('hey')
}
a.call() // hi
a.apply() // hi

```

```
// call, apply is used to borrow methods
call(obj , arg1, arg2, arg3, ...)
apply(obj , [arg1, arg2, arg3, ...])


const wizard = {
    name: 'Scarlet',
    health: 50,
    power: 70,
    heal(health, power){
        this.health+=health
        this.power+=power
    }
}
const archer = {
   name: 'Scarlet',
    health: 25,
    power: 30
}

console.log(archer);
wizard.heal.apply(archer, [100, 30]);
console.log(archer);
wizard.heal.call(archer, 90, 40);
console.log(archer);
// archer will borrow method heal of the wizard in both the examples


// bind returns a new function with certain type of context and parameters for later use
// bind uses call and not apply
var archersHeal = wizard.heal.bind(archer, 90, 40);
archersHeal()

```

```
const array = [1,2,3];

// in this case, the 'this' keyword doesn't matter!
function getMaxNumber(arr){
  return Math.max.apply(null, arr);  
}

getMaxNumber(array)
```


## bind and currying


```

function multiply (a,b) {
    return a*b
}

let multiplyByTwo = multiply.bind(this, 2);
let multiplyByTen = multiply.bind(this, 10);

console.log(multiplyByTwo(3)) // 6
console.log(multiplyByTen(3)) // 30

```

```
// exercise
var b = {
  name: 'jay',
  say() {console.log(this)}
}

var c = {
  name: 'jay',
  say() {return function() {console.log(this)}}
}

var d = {
  name: 'jay',
  say() {return () => console.log(this)}
}
```



```
// exercise
var b = {
  name: 'jay',
  say() {console.log(this)} // obj b
}

var c = {
  name: 'jay',
  say() {return function() {console.log(this)}} // window or global
}

var d = {
  name: 'jay',
  say() {return () => console.log(this)} // undefined ??
}
```


```
exercise 2
const character = {
  name: 'Simon',
  getCharacter() {
    return this.name;
  }
};
const giveMeTheCharacterNOW = character.getCharacter.bind(character);


console.log('?', giveMeTheCharacterNOW()); // ?? Simon


```

Context vs. Scope
Context refers to the this keyword, i.e. the object
Scope refers to the visibility of variables