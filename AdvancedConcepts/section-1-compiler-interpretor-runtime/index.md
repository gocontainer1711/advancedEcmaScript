In a sense you just created a translator so you can communicate with somebody that doesn't know your

language and this special engine called the JavaScript engine understands javascript our computer finally

understands us.

Types Of Engines:

* V8 (Google Chrome, Node.js)
* Spider Monkey (Used in Mozilla Apps)
* Chakra (Used in Microsoft Edge), etc..

All JS Engines should comply with ECMAScript standards



Interpreter:

So it's very important let's start with the first one the interpreter with an interpreter.

What we do is we translate and read the files line by line on the fly.


What's the deal with a compiler.

Well a compiler I like an interpreter doesn't translate on the fly.

What it does is it works ahead of time to create a translation of what code we've just written and it

compiles down to usually a language that can be understood by our machines.

Interpreter vs Compiler
Interpreter
Line by line
Faster to start
Compiler
Reads entire file and translates to a lower level language
Once begun, is faster than interpreted by optimizing into a lower level language
Not perfect, can accidentally de-optimize code


Babel is a Javascript compiler that takes your modern JS code and returns  browser compatible JS (older JS code).
Typescript is a superset of Javascript that compiles down to Javascript.

Both of these do exactly what compilers do: Take one language and convert into a different one!






                  Profiler -> Compiler -> Optimised Code
                    ^
                    |
Parser -> AST -> Interpreter -> ByteCode
                    


Parser
Lexical Analysis
Code is parsed into “tokens”

AST
Tokens form an “Abstract Syntax Tree” (AST)
Practical AST Examples

Bytecode
Not as low-level as machine code, but a lower level than JS

Profiler/Monitor
Watches code and optimizes
If it sees an opportunity to optimize, e.g. a loop with same input/output, it passes the code to the JIT compiler

Compiler
Creates optimized machine code

Single-threaded
The call stack only executes one function at a time
We circumvent the limitations of ‘single-threadedness’ with the Web API

Gotchas
Hidden classes
When instantiating new objects, the compiler will try to create a common ‘hidden class’. By defining properties in different orders, e.g. 



JIT Compiler
“Just-In-Time” Compiler
As a way of getting rid of the interpreter’s inefficiency—where the interpreter has to keep retranslating the code every time they go through the loop—browsers started mixing compilers in.

Different browsers do this in slightly different ways, but the basic idea is the same. They added a new part to the JavaScript engine, called a monitor (aka a profiler). That monitor watches the code as it runs, and makes a note of how many times it is run and what types are used.

At first, the monitor just runs everything through the interpreter.

If the same lines of code are run a few times, that segment of code is called warm. If it’s run a lot, then it’s called hot.



eval
arguments
for in loop
with
delete
Switch Case (Previously, a switch-case statement could only have up to 128 case-clauses, more than that and the function containing the switch statement was not optimizable)
Hidden Classes
Inline Caching


Is Javascript an Interpreted Language?

Is Pyhton an Interpreted LAnguage?

Java vs C++ ? Are they Interpreted languages (JVM / exe)?

Names of V8 Interpreter and Compiler ?


https://github.com/petkaantonov/bluebird/wiki/Optimization-killers#3-managing-arguments


JavaScript Runtime
The runtime environment provides the built-in libraries that are available to the program at runtime (during execution). So, if you're going to use the Window object or the DOM API in the browser, those would be included in the browser's JS runtime environment. A Node.js runtime includes different libraries, say, the Cluster and FileSystem APIs. Both runtimes include the built-in data types and common facilities such as the Console object.


Call Stack + Memory Heap
Call Stack
The call stack stores function calls
Ensures the program runs in order
The first stack frame (on top) is program’s current ‘location’
First In, Last Out
Global Execution Context is called and is at bottom of Call Stack
First function is called and is added to top of Call Stack
First function ‘returns’ and it is popped off of the Call Stack
Repeat until program completes and Global Execution Context pops off the Call Stack
Stack Overflow is when there are too many stack frames, e.g.

```

function inception() {
	inception()
}
```


Memory Heap
Stores values and references
const number = 6; //allocate memory for number
const string = 'hello'; //allocate memory for a string
const human = { //allocate memory for an object and its values
first: 'Bryan',
last: 'Windsor'
}



Is Js optimised for recursive functions ?

What kinda of hash tables are used in JS ?


Garbage Collection ?
It gives javascript developers the false impression that they can choose not to care about memory management.

So how does garbage collection actually work in JavaScript.

Well it uses something called Mark and sweep algorithm and this is a great video that shows how it works.

Mark and Sweep
JS can mark what references and values in memory are still needed
After marking, JS then sweeps out the unneeded memory


```

let array = [];
while(true){
    array.push(1);
}
```

Garbage Collection
Garbage collection refers to a process that automatically frees up memory as it is able
Garbage collection helps us avoid memory leaks
Memory leaks are a failure in a program to release discarded memory, causing impaired performance or failure.


there are three

common memory leaks

1) Global variables (infinite number of global variables)
2) Event listeners
3) Set Intervals

Adding and not removing event listeners in single page applications (moving back and forth between components may add more and more listeners if not managed well)

```
var element = document.getElementById('button');

function onClick(event) {
    element.innerHtml = 'text';
}

element.addEventListener('click', onClick);
// Do stuff
element.removeEventListener('click', onClick);
element.parentNode.removeChild(element);
// Now when element goes out of scope,
// both element and onClick will be collected even in old browsers that don't handle cycles well.

```


Set Intervals


```
setInterval(()=>{
// referncing memory variables and those will never be collected by gc
}, 200);

```

And also things running in the background may lead to memory leaks


Single Threaded Model
JS is single-threaded
The call stack only executes one function at a time
We circumvent the limitations of ‘single-threadedness’ with the Web API




background.

Let's dig deep into this topic the web API comes with the browser Chrome Microsoft Edge safari Firefox

all of them have their JavaScript engine implementation and all of them have a javascript runtime that

provide a web API these web APIs are applications which can do a variety of things like send HDP requests

listen to Dom events maybe click events on a dom delay execution using something like set timeout.


Can you set interval.

You can even be used for caching or database storage on the browser.

Let me show you what I mean.

If we go to the console here and I look at the window object Well this is what the browser provides.

This is the web API that we can use so that if I scroll down here I can see different things that the

browser provides for us that our JavaScript engine can use.

For example if I scroll down to let's go to fetch fetch that is the function to make HDB calls.

We can use that if I keep scrolling down and let's look at something fun like indexed Dobbie D.B. or

index D.B..

That's actually a little database that we can use on our browser.


eg : setTimeOut is provided by browser and not js ??

Web API is asynchronous and js is synchronous.

call stack
event loop
web API
call back queue


(refer loupe for visualisation)

http://latentflip.com/loupe/?code=JC5vbignYnV0dG9uJywgJ2NsaWNrJywgZnVuY3Rpb24gb25DbGljaygpIHsKICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gdGltZXIoKSB7CiAgICAgICAgY29uc29sZS5sb2coJ1lvdSBjbGlja2VkIHRoZSBidXR0b24hJyk7ICAgIAogICAgfSwgMjAwMCk7Cn0pOwoKY29uc29sZS5sb2coIkhpISIpOwoKc2V0VGltZW91dChmdW5jdGlvbiB0aW1lb3V0KCkgewogICAgY29uc29sZS5sb2coIkNsaWNrIHRoZSBidXR0b24hIik7Cn0sIDUwMDApOwoKY29uc29sZS5sb2coIldlbGNvbWUgdG8gbG91cGUuIik7!!!PGJ1dHRvbj5DbGljayBtZSE8L2J1dHRvbj4%3D


```
$.on('button', 'click', function onClick() {
    setTimeout(function timer() {
        console.log('You clicked the button!');    
    }, 1000);
});

console.log("Hi!");

setTimeout(function timeout() {
    console.log("Click the button!");
}, 9000);


for(var i = 1; i<= 9999999; i++) {
    
}

console.log("Welcome to loupe.");
```





What happens if we do the exact same thing but this time add zero here.

What do you think will happen.

Well if I run this I get 1 3 to still now.

Like I said before this is a very common interview question.

The reason that happens is that no matter how fast this set timeout timer happens it still gets sent

to the web API still get sent to the callback queue and the event loop still needs to check those two

checks Hey is the stack empty and has the entire file been run in our case.

No we are still waiting on console log to run.

And only then will I push our callback function our console log to our call stack.

How cool is that and using this method we're able to have this power of asynchronous code that is instead

of being limited to one call stack and one memory heap whenever we get tasks that can be asynchronous

that take a long time possibly like modifying dom or making HDP requests.



JS Runtime vs Engine ?


How 

call stack
event loop
web API
call back queue


are implemented in browser as well as node js ?


Js => Musical note
Js Engine => Composer/Artist
Js Runtime => set of instruments and tools to play the music


Node Js is a Js runtime and not a languaage and even not an engine.
Its written in C++ and its an executable just like browsers leverage it.


There are few differences

Node js has:
VS engine
Event loop
Event queue
Worker threads
Node API (Node js bindings)
LIBUV (Async I/O)

We can access file systems , Network, Programs

There is no window in the browser , instead it has something called 'global'


Chrome and Node.js share the same engine (Google's V8), but they have different runtime (execution) environments.


```
const print = (data)=>{
    console.log(data);
}
setTimeout(()=>{print(1)}, 0);
Promise.resolve(2).then((data)=>{print(data)});
print(3);


```