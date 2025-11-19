function outer() {
  console.log(count);
  var count = 5;

  function inner() {
    console.log(count);
    var count = 10;
  }

  inner();
}
outer();
