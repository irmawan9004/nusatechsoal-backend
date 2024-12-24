function sortEvenOdd(arr) {

    const even = arr.filter(num => num % 2 === 0);
    const odd = arr.filter(num => num % 2 !== 0);

    even.sort((a, b) => a - b);
    odd.sort((a, b) => a - b);
  

    return even.concat(odd);
  }
  

  const input = [5, 3, 8, 6, 1, 9, 2];
  const result = sortEvenOdd(input);
  console.log(result); 
  