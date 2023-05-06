function isPrime(n) {
  // Check if the number is divisible by any integer from 2 to n-1
  for (var i = 2; i < n; i++) {
    if (n % i == 0) {
      return false;
    }
  }
  return true;
}

function generatePrimes(n) {
  var primes = [];

  // Generate the first n prime numbers
  for (var i = 2; primes.length < n; i++) {
    if (isPrime(i)) {
      primes.push(i);
    }
  }

  // Send the list of prime numbers back to the main page
  postMessage(primes.join(", "));
}

// Listen for messages coming from the main page
onmessage = function (event) {
  generatePrimes(event.data);
};
