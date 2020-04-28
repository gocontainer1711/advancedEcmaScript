# Modules (Separation Of Concerns)


Module Pattern via IIFE

 ^
 | global scope
 | module scope
 | function scope
 | block scope

```

var globalObj = {
    a: 1
}

var fightModule = (function(globalObj){

    var harry = 'potter'
    var voldemort = 'He who must not be named' // private variable
    var private_func = () => {} // private function

    console.log(globaObj);


    function fight(char1, char2) {
        var attack1 = Math.floor(Math.random() * char1.length);
        var attack2 = Math.floor(Math.random() * char2.length);
        return attack1 > attack2 ? `${char1} wins` : `${char2} wins`
    }

    return {fight}

})(globalObj)

```

Pros of Module pattern

* Self contained Module
* Loosely coupled via exports
* Reusability

Cons of Module pattern
* We don't know all the dependencies (order of the script tag matters)
* pollution of the global scope 


Webpack , browserify etc.. solves such problems

## Es6 Modules
```
import module1 from 'module1'
import defaultExportedObj, {exportedObj} from 'xyz'

const pvt = ()=>{}

export const func = ()=>{}

export default const func2 = ()=>{}
```


```

import defaultExport from "module-name";
import * as name from "module-name";
import { export1 } from "module-name";
import { export1 as alias1 } from "module-name";
import { export1 , export2 } from "module-name";
import { foo , bar } from "module-name/path/to/specific/un-exported/file";
import { export1 , export2 as alias2 , [...] } from "module-name";
import defaultExport, { export1 [ , [...] ] } from "module-name";
import defaultExport, * as name from "module-name";
import "module-name";
var promise = import("module-name");

```


```
import "module-name";

Import an entire module for side effects only, without importing anything. This runs the module's global code, but doesn't actually import any values.
```

## Dynamic Imports

 In situations where you wish to load a module conditionally or on demand, you can use a dynamic import instead. 

```
import('/modules/my-module.js')
  .then((module) => {
    // Do something with the module.
  });

```
```
let module = await import('/modules/my-module.js');
```