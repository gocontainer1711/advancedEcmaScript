# Data Structures + Alogorithms  = Programs

Three Pillars of a good Program:
* Readability
* Memory / Space Complexity
* Speed / Time Complexity

64 bit computers can store values(for example numbers) of great magnitude.

## Data Structues

* Arrays
* Stacks
* Queues
* Linked Lists
* Trees
* Tries
* Graphs
* Hash Tables

## Algorithms

* Sorting
* Dynamic Programming
* BFS + DFS (Searching)
* Recursion
* TSP


https://www.bigocheatsheet.com/

Refer Space and time complexity of Each Program


## Arrays

lookup O(1)
push O(1)
insert O(n)
delete O(n)


```
const strings= ['a', 'b', 'c', 'd'];
const numbers = [1,2,3,4,5];
// Variable array is somewhere in memory and the computer knows it.
// When I do array[2], i'm telling the computer, hey go to the array and grab the 3rd item from where the array is stored.


console.log(strings[2]); // O(1)

//push
strings.push('e'); // O(1) generally , O(n) when new memory is allocated

//pop
strings.pop();
strings.pop(); // O(1)

//unshift
strings.unshift('x') // O(n)

//splice
strings.splice(2, 0, 'alien'); // O(n)

console.log(strings)

```

## Static And Dynamic Arrays

Static array (fixed in size)
Dynamic Arrays (May grow or shrink)

When array grows , creating another copy will be O(n) and hence push operation can be O(1) and o(n).




## Implementing An array

```
class MyArray {
  constructor() {
    this.length = 0;
    this.data = {};
  }
  get(index) {
    return this.data[index];
  }
  push(item) {
    this.data[this.length] = item;
    this.length++;
    return this.data;
  }
  pop() {
    const lastItem = this.data[this.length - 1];
    delete this.data[this.length - 1];
    this.length--;
    return lastItem;
  }
  deleteAtIndex(index) {
    const item = this.data[index];
    this.shiftItems(index);
    return item;
  }
  shiftItems(index) {
    for (let i = index; i < this.length - 1; i++) {
      this.data[i] = this.data[i + 1];
    }
    console.log(this.data[this.length - 1]);
    delete this.data[this.length - 1];
    this.length--;
  }
}

const myArray = new MyArray();
myArray.push('hi');
myArray.push('you');
myArray.push('!');
myArray.pop();
myArray.deleteAtIndex(0);
myArray.push('are');
myArray.push('nice');
myArray.shiftItems(0);
console.log(myArray);

```


## Note Strings are mostly array of characters.

## reverse a string
```
function reverse(str){
  if(!str || typeof str != 'string' || str.length < 2 ) return str;
  
  const backwards = [];
  const totalItems = str.length - 1;
  for(let i = totalItems; i >= 0; i--){
    backwards.push(str[i]);
  }
  return backwards.join('');
}

function reverse2(str){
  //check for valid input
  return str.split('').reverse().join('');
}

const reverse3 = str => [...str].reverse().join('');

reverse('Timbits Hi')
reverse('Timbits Hi')
reverse3('Timbits Hi')
```


## Merge Sorted Arrays

```
function mergeSortedArrays(array1, array2){
  const mergedArray = [];
  let array1Item = array1[0];
  let array2Item = array2[0];
  let i = 1;
  let j = 1;
  
  //We should actually move these 2 if statements to line 2 so that we do the checks before we do assignments in line 3 and 4!
  if(array1.length === 0) {
    return array2;
  }
  if(array2.length === 0) {
    return array1;
  }

  while (array1Item || array2Item){
   if(array2Item === undefined || array1Item < array2Item){
     mergedArray.push(array1Item);
     array1Item = array1[i];
     i++;
   }   
   else {
     mergedArray.push(array2Item);
     array2Item = array2[j];
     j++;
   }
  }
  return mergedArray;
}

mergeSortedArrays([0,3,4,31], [3,4,6,30]);
```


# Hash Table

Insert O(1)
Lookup O(1)
Delete O(1)
Search O(1)

Key -> value (via Hash Function)

Its one way.

Value can never point to a key


Hash Function is a function that generates a value of a fixed length or in fixed range  given an input.
It must be a pure function.

Same Input should not generate two different hashes.
(Idempotent)

cons of hash : Collisions

Techniques:
Separate chaining
Linear Probing 
Quadratic Probing etc..


Which Hash Function is used by JS ?




Example:

* md5
* SHA-1
* SHA-256


## How Hash Collisions Avoided in JS ?


## Es6 brings Map and Sets 

Objects can have only string keys

Maps can have any data type as keys (even function can be a key in a Js Map)

Sets stores only keys and no values

```
const a = new Map()
const b = new Sets() // ??

```

## Implementing a Hash Table 

```
class HashTable {
  constructor(size){
    this.data = new Array(size);
    // this.data = [];
  }

  _hash(key) {
    let hash = 0;
    for (let i =0; i < key.length; i++){
        hash = (hash + key.charCodeAt(i) * i) % this.data.length
    }
    return hash;
  }

  set(key, value) {
    let address = this._hash(key);
    if (!this.data[address]) {
      this.data[address] = [];
    }
    this.data[address].push([key, value]);
    return this.data;
  }

  get(key){
    const address = this._hash(key);
    const currentBucket = this.data[address]
    if (currentBucket) {
      for(let i = 0; i < currentBucket.length; i++){
        if(currentBucket[i][0] === key) {
          return currentBucket[i][1]
        }
      }
    }
    return undefined;
  }
  
  keys(){
    const keysArray = [];
    console.log(this.data.length);
    for (let i = 0; i < this.data.length; i++){
      if(this.data[i]){
        keysArray.push(this.data[i][0][0])
      }
    }
    return keysArray;
  }
}

const myHashTable = new HashTable(50);
myHashTable.set('grapes', 10000)
myHashTable.set('grapes', 10000)
myHashTable.get('grapes')
myHashTable.set('apples', 9)
myHashTable.get('apples')
myHashTable.keys()
```

firstRecurringCharacter

```
//Google Question
//Given an array = [2,5,1,2,3,5,1,2,4]:
//It should return 2

//Given an array = [2,1,1,2,3,5,1,2,4]:
//It should return 1

//Given an array = [2,3,4,5]:
//It should return undefined


function firstRecurringCharacter(input) {
  for (let i = 0; i < input.length; i++) {
    for (let j = i + 1; j < input.length; j++) {
      if(input[i] === input[j]) {
        return input[i];
      }
    }
  }
  return undefined
}

function firstRecurringCharacter2(input) {
  let map = {};
  for (let i = 0; i < input.length; i++) {
    if (map[input[i]] !== undefined) {
      return input[i]
    } else {
      map[input[i]] = i;
    }
  }
  return undefined
}

firstRecurringCharacter2([1,5,5,1,3,4,6])


//Bonus... What if we had this:
// [2,5,5,2,3,5,1,2,4]
// return 5 because the pairs are before 2,2
```


## Es7 had only two changes

1) Array.includes('x')
2) Exponential OPerator (2**2 => 4)


## Es8 had few changes

1) String Padding ('x'.padStart(1); 'y'.padEnds(1))
2) trailing comma in function argument won't error

```
const func = (
  a,
  b,
  )=>{

}
func(1,2,)

```

3) Objet.values()=>[...values], Object.entries() => [...[key, value]]

we had Object.keys() from before

4) Async Await


## Es10
1) flat() => [1,2,[3,4]]=> [1,2,3,4] flats one level
2) flat(n) => flattens n layers
3) '  x  '.trimStart()
4) '  x  '.trimEnd()
5) Object.fromEntries

```
userProfiles = [ ['a', 2], ['b', 3], ['c', 6] ]
Object.fromEntries(userProfiles) => {a:2, b: 3, c: 6} 
```
6) catch block in try catch construct now can be written without any parameter. Its optional now

```
try{

} catch{
  // is valid now
}
```

for in & for of Arrays and Objects


```

const list = [10,20];
for(const index in list){
// iteration or enumeration ?
}
for(const value of list) {
// iterates over values
}
```

```

const obj = {
  a: 1,
  b: 2
}
for(const key in obj){
// a, b
// this is example of enumeration and not iteration
}
for(const value of obj) {
  // error out for objects since obj is not iterable
}
```


## Debugging

```
for(const char of 'character'){
  debugger;
  console.log(char);
}
```