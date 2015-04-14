This is a pseudo random number generator.  The code is an ugly mess but it works.

It operates by:

1. Convert the characters to 5 bits (custom mapping, can use some standard later)
2. Determine the ideal split for the binary string (attempt to maximize the least common multiple of the size of the groups). See the generatePrimeGroup function
3. Split the binary string into the groups determined above
4. Stack the groups and then XOR them to get a key

The page also includes charts generated with Chart.js to show the frequencies of groups of bits up to 5 bits.

No testing of this has been done other than checking the frequencies for uniformity

The algorithm is probably O(n log log n) since the slowest part should be the Sieve of Eratosthenes