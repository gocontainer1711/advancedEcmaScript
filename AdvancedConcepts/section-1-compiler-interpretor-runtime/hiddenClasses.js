

function Point(x, y) {
    this.x = x;
    this.y = y;
    }
    const obj1 = new Point(1,2)
    const obj2 = new Point(3,4)
    // Here the objects are given new properties, but in different orders
    obj1.a = 1
    obj1.b = 2
    obj2.b = 2
    obj2.a = 1

    delete obj1.x;




    // the compiler will de-optimize the code

    // When compiling, the compiler tries to optimize the code, for example, by creating "hidden classes": https://engineering.linecorp.com/en/blog/v8-hidden-class/



    // There are cases where the code can be optimized by the compiler by sharing "hidden classes", 
    // but for some reason, such as a different order of object property creation, the compiler mistakenly thinks
    //  that two objects, which should be able to share "hidden classes", cannot. The compiler is thus creating
    //   an unnecessary inefficiency which we call "de-optimizing the code".
    // This means that we should either set all possible properties in the constructor of a class 
    // Or we can be careful to always define new properties in the same order
    

    // We should write predictable code not only for people but also for machine for optimisations.