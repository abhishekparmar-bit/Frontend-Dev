"use strict";

function demo(a, b) {
    let obj = { total: 10 };
    console.log("Before delete:", obj.total);

    delete obj.total;

    console.log("After delete:", obj.total); // undefined
}

demo(5, 10);
