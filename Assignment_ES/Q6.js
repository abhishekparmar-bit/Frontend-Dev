"use strict";

function generatePyramid(limit = 4) {
  for (let i = 1; i <= limit; i++) {
    let row = "";
    for (let j = 0; j < i; j++) {
      row += "*";
      if (j < i - 1) row += " ";
    }
    console.log(row);
  }
}

generatePyramid(); 
