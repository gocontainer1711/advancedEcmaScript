OOPS + FP knowledge can help write code that is :

* Clear + Understandable 
* Easy to extend
* Easy to maintain
* Memory Efficient
* DRY

Procedural Programming vs Object Oriented Programming ?

Objects => OOPS
Functions => Functional Programming

OOPS and FP are complementary.

Javascript is a multi paradigm language. we can use the both of worlds to write better code.

Things to learn here:

* this keyword
* new keyword
* Prototype
* Es6 classes
* Java
* Inheritance
* Object.create
* Private vs Public
* Principles of OOP


## factory functions (class like construct)

A function that creates objects.

One downside of this approach is that the method is copied to each and every instance/object.
However we need the name and weapon fields to have separate copies per object.
A shared copy of methods (via prototypal inheritance) would be a better and memory efficient approach.

```
// factory function make/create
function createElf(name, weapon) {
  //we can also have closures here to hide properties from being changed.
  return {
    name,
    weapon,
    atack() {
      return 'atack with ' + weapon
    }
  }
}
const sam = createElf('Sam', 'bow');
const peter = createElf('Peter', 'bow');

sam.atack()
```

```
const elfFunctions = {
  attack: function() {
    return 'atack with ' + this.weapon
  }
}
function createElf(name, weapon) {
  //Object.create creates __proto__ link
  newElf = Object.create(elfFunctions)
  newElf.name = name;
  newElf.weapon = weapon
  return newElf
}


const sam = createElf('Sam', 'bow');
const peter = createElf('Peter', 'bow');
sam.attack()

```

## constructor function

Constructor functions should start with Upper case letters so as to remind us to use the 'new' keyword.

```
const Elf = new Function('name','weapon',
` this.name = name;
  this.weapon = weapon;`);
const sam = new Elf('Sam', 'bow');
```

```
//Constructor Functions
function Elf(name, weapon) {
  // using new keyword , `this` will now point to the newly created object instead of the global object.
  console.log('this before :', this);
  this.name = name;
  this.weapon = weapon;
  console.log('this after :', this);
  // no need to return it.. 
  // return is automatically handled by new keyword under the hood
}


// the prototype property is also added by the new keyword
Elf.prototype.attack = function() { 
    console.log('this here :', this);
  return 'atack with ' + this.weapon
}
const sam = new Elf('Sam', 'bow');
const peter = new Elf('Peter', 'bow');
console.log(peter.prototype); // ? (must be undefined since peter is an object)
sam.attack()
```

here sam.__proto__ is same as Elf.Prototype is same as peter.__proto__ 

## arrow functions are not always useful because they are lexically scoped and not dynamically scoped.


```
//Constructor Functions
function Elf(name, weapon) {
  // using new keyword , `this` will now point to the newly created object instead of the global object.
  this.name = name;
  this.weapon = weapon;
  // no need to return it.. 
  // return is automatically handled by new keyword under the hood
}

Elf.prototype.attack = () => {  // this would point not to sam or peter as it is lexically scoped
console.log('this here :', this);
  return 'atack with ' + this.weapon // this.weapon will be undefined in this case
}

const sam = new Elf('Sam', 'bow');
const peter = new Elf('Peter', 'bow');
sam.attack();

```

* every function we create has prototype property but 
    only constructor functions make use of the prototype property.

```
function Elf(name, weapon) {
  this.name = name;
  this.weapon = weapon;
}

Elf.prototype.attack = function() { 
    function doubleAttack(){
        console.log(this);
        return 'atack with ' + this.weapon
    }
   doubleAttack();
}

Elf.prototype.run = function() { 
    const doubleRun = ()=> {
        console.log(this);
        return 'runs the elf with name : ' + this.name; // ??
    }
   doubleRun();
}

Elf.prototype.walk = function() { 
    const self =  this;
    function doubleWalk() {
        console.log(self);
        return 'Walks the elf with name : ' + self.name; // ??
    }
   return doubleWalk;
}

const sam = new Elf('Sam', 'bow');
sam.attack();
sam.run();
sam.walk()();
```


## Except null and undefined Js has constructor functions for everything

```
var a = new Number(5);
var b = 5;
typeof a // object
typeof b // number
a==b // true
a===b // false
```


# ES6 Classes still syntactic sugar

```
class Elf {
  constructor(name, weapon) {
    this.name = name;
    this.weapon = weapon;
    // attack method can't be part of the constructo since its hould be shared across all the objects, memory efficiency
  }
  attack() {
    return 'atack with ' + this.weapon
  }
}


// instantiation of class
const fiona = new Elf('Fiona', 'ninja stars');
console.log(fiona instanceof Elf) // 
const ben = new Elf('Ben', 'bow');
fiona.attack()
```

## 4 ways of binding with this

```
// new binding
function Person(name, age) {
  this.name = name;
  this.age =age;
  console.log(this);
}

const person1 = new Person('Xavier', 55)

//implicit binding
const person = {
  name: 'Karen',
  age: 40,
  hi() {
    console.log('hi' + this.name)
  }
}

person.hi()

//explicit binding
const person3 = {
  name: 'Karen',
  age: 40,
  hi: function() {
    console.log('hi' + this.setTimeout)
  }.bind(window)
}

person3.hi()

// arrow functions
const person4 = {
  name: 'Karen',
  age: 40,
  hi: function() {
    var inner = () => {
      console.log('hi ' + this.name)
    }
    return inner()
  }
}

person4.hi()

```

## Inheritance


### Prototype chain lost with spread operator
```
class Elf {
  constructor(name, weapon) {
    this.name = name;
    this.weapon = weapon;
    // attack method can't be part of the constructo since its hould be shared across all the objects, memory efficiency
  }
  attack() {
    return 'atack with ' + this.weapon
  }
}


// instantiation of class
const fiona = new Elf('Fiona', 'ninja stars');
console.log(fiona instanceof Elf) // 
const ben = {...fiona}
ben.attack() // error
```

### extends keyword

First line of the constructor should always be call to super

```
class Character {
  constructor(name, weapon) {
    this.name = name;
    this.weapon = weapon;
  }
  attack() {
    return 'atack with ' + this.weapon
  }
}

class Elf extends Character { 
  constructor(name, weapon, type) {
    // console.log('what am i?', this); this gives an error
    super(name, weapon) 
    console.log('what am i?', this);
    this.type = type;
  }
}

class Ogre extends Character {
  constructor(name, weapon, color) {
    super(name, weapon);
    this.color = color;
  }
  makeFort() { // this is like extending our prototype.
    return 'strongest fort in the world made'
  }
}

const houseElf = new Elf('Dolby', 'cloth', 'house')
//houseElf.makeFort() // error
const shrek = new Ogre('Shrek', 'club', 'green')
shrek.makeFort()


console.log(Ogre.prototype.isPrototypeOf(shrek)) // true

console.log(Ogre.isPrototypeOf(shrek)) // false

console.log(shrek instanceof Ogre); // true

console.log(shrek instanceof Character); // true

```

## there are no such thing as private method or private data member in es6 classes
Clas fields are still in proposal.



# 4 pillars of OOP

* Encapsulation
* Abstraction
* Polymorphism (method Overriding)
* Inheritance

Is function overloading possible in JS ?

Why and when is bind used in react components ?


### Polymorphism example
```
class Character {
  constructor(name, weapon) {
    this.name = name;
    this.weapon = weapon;
  }
  attack() {
    return 'atack with ' + this.weapon
  }
}

class Queen extends Character { 
  constructor(name, weapon, kind) {
    super(name, weapon) 
    this.kind = kind;
  }
  attack() {
    console.log(super.attack());
    return `I am the ${this.name} of ${this.kind}, now bow down to me! `
  }
}

const victoria = new Queen('Victoria', 'army', 'hearts');
victoria.attack()

```