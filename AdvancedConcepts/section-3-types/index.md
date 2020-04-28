// Primitive type ??
* Numbers 5
* boolean , true
* 'Sample string'
* undefined
* null
* Symbol('my Symbol')

//Non Primitive type (pointer points to heap memory)
* Objects,  {}

What are built in objects ??
What are wrappers ? eg Boolean
Where are primitive data types stored stack vs heap ??

```

typeof 5 // number
typeof true // boolean
typeof 'Sample string' // string
typeof undefined // undefined ??
typeof null // object
typeof Symbol('my Symbol') // symbol
typeof {} // object
typeof [] // object
typeof function(){} // object

```

type of error ?

undefined is absense of definition
null is absence of value

Functions and arrays are object.

```
function a () {
    return 5;
}
a.msg = 'hiii'
console.log(a.msg) // hiii
```


# Array.isArray()

```

Array.isArray([1,2]) // true

Array.isArray({}) // false

```

# Pass By reference vs Pass By Value


primitive types are passed by value

```
function increment(num){
    num++;
    console.log('num inside increment :', num);
}

var num =  5;
console.log(num); // 5
increment(num);
console.log(num); // 5

```



```

function increment(num){
    num.value++;
    console.log('num inside increment :', num);
}

var num =  {value: 5};
console.log(num.value); // 5
increment(num);
console.log(num.value); // 6

```



```
const number = 100
const string = "Jay"
let obj1 = {
  value: "a"
}
let obj2 = {
  value: "b"
}
let obj3 = obj2;
 
function change(number, string, obj1, obj2) {
    number = number * 10;
    string = "Pete";
    obj1 = obj2;
    obj2.value = "c";
}
 
change(number, string, obj1, obj2);
 
//Guess the outputs here before you run the code: 
console.log(number); 
console.log(string);
console.log(obj1.value);
```


```

var list = [1,2];
var copy = list;
var anotherCopy = [].concat(list);
copy.push(3);
anotherCopy.push(3.3);
console.log(copy);
console.log(anotherCopy);
console.log(list);

```

shallow clone is concerned about the first level only

```

let obj = {a: 5, deep : { inner: 'try to copy me'}};
let clone = Object.assign({}, obj); // shallow clone
let cloneX = {...a}; // shallow clone 
let superClone = JSON.parse(JSON.stringify(obj)); // deep clone 

obj.a++;

console.log(obj);
console.log(clone);
console.log(cloneX);
console.log(superClone);

obj.deep.inner = 'changed'


console.log(obj);
console.log(clone);
console.log(cloneX);
console.log(superClone);


```

How Would you compare two objects if they are pointing to a different location in memory but still have the same properties?

```
var one = {a: 5, b:'str'}
var other = {a: 5, b:'str'}
var eq = one === other
console.log(eq);
```

Works when you have simple JSON-style objects without methods and DOM nodes inside:

 JSON.stringify(obj1) === JSON.stringify(obj2)


 Refer : https://stackoverflow.com/questions/1068834/object-comparison-in-javascript




Why mutation is bad, other than debugging readability ?? More research 


Type Coercion

Prefer using '===' to '=='

```
1=='1'
NaN==NaN
NaN === NaN // false
1 == true
0 == false
+0 === -0
```

```
Object.is(-0, +0); // false
Object.is(1, false)
Object.is(NaN, NaN)
```

https://dorey.github.io/JavaScript-Equality-Table/

https://www.ecma-international.org/ecma-262/5.1/#sec-11.9.3


```
false == ""  
false == []  
false == {}  
"" == 0      
"" == []     
"" == {}     
0 == []      
0 == {}      
0 == null 
```

What are the pros and cons of static and dynamically typed language ?
What are strong and weak typed ?

```
var a = 'String ' + 17;
// weakly typed lang
```

```
python 

variable_string = 'string'
variable_num = 17
variable_res = variable_string + variable_num # errros out

# strongly typed lang
```
Reason (fb), flow (fb) , typeScript (microsoft) make js a statically typed language

http://blog.digitaljob.org/