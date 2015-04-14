//Custom alphabet, 32 character-> fits in 5 bits nicely
//alphabet + 0, 1, space, period, comma, and single quote
var alphabet = ['a','b','c','d','e','f','g','h','i','j',
  'k','l','m','n','o','p','q','r','s','t','u','v','w','x',
  'y','z','0','1','_','.',',','\'']
  
//Gets the gcm of 2 numbers
function gcm(a, b) {
  if(b === 0) {
    return a;
  }
  else {
    return gcm(b, a % b);
  }
}

//Gets the lcm of 2 numbers
function lcm2(a, b) {
  return Math.abs(a * b) / gcm(a, b);
}

//Gets the lcm of a list of nbers (greater than 2)
function lcm(list) {
  if(!(list instanceof Array)) {
    return null;
  }
  if(list.length === 0) {
    return null;
  }
  if(list.length === 1) {
    return list[0];
  }
  while(list.length > 2) {
    var a = list.splice(0, 1);
    var b = list.splice(0, 1);
    //console.log(a[0]);
    //console.log(b[0]);
    list.push(lcm2(a[0],b[0]));
    //console.log(list);
    //console.log('');
  }
  //console.log(lcm(list[0], list[1]));
  return lcm2(list[0], list[1]);
}

//Sieve of Eratosthenes
//Creates list of all prime nbers less than n
//http://stackoverflow.com/questions/15471291/sieve-of-eratosthenes-algorithm-in-javascript-running-endless-for-large-nber
function eratosthenes(n) {
  //Eratosthenes algorithm to find all primes under n
  var array = [], upperLimit = Math.sqrt(n), output = [];

  //Make an array from 2 to (n - 1)
  for (var i = 0; i < n; i++) {
    array.push(true);
  }
  //Remove multiples of primes starting from 2, 3, 5,...
  for (var i = 2; i <= upperLimit; i++) {
    if (array[i]) {
      for (var j = i * i; j < n; j += i) {
        array[j] = false;
      }
    }
  }
  //All array[i] set to true are primes
  for (var i = 2; i < n; i++) {
    if(array[i]) {
      output.push(i);
    }
  }
  return output;
};

//Fit in as many prime numbers as possible, beginning with the lowest
//Once no more fit maxmize the final number that fit
//O(n log log n) - same as eratosthenes
function generatePrimeGroup(n) {
  var unused = eratosthenes(n);//all prime numbers below n
  var used = [];
  var space = n;
  while(n >= unused[0]) {
    used.push(unused[0]);
    n -= unused.shift();
  }
  //wow this is ugly but it works
  //increases the used primes using the open space if possible
  var j = 1;
  for(var i=n;i>0;i--) {
    var index = unused.indexOf(used[used.length-j] + i);
    if(index !== -1) {
      var t = used[used.length-j];
      used[used.length-j] = unused[index];
      unused[index] = t;
      j++;//move to the next lowest used prime
      n -= i;//reset the space open
      i = n;
      i++;//account for next decrement
    }
  }
  //console.log(used);
  return used;
}

//Split a word using the prime group
function splitWord(key) {
  var bestSplit = generatePrimeGroup(key.length);
  var splitKeys = [];
  for(var i=0;i<bestSplit.length;i++) {
    splitKeys.push(key.substring(0,bestSplit[i]));
    key = key.substring(bestSplit[i]);
  }
  //Wasn't an even split, the rest of a characters don't increase the lcm and don't matter
  if(key !== '') {
    splitKeys.push(key);
  }
  //console.log('Keys are: '+splitKeys);
  return splitKeys;
}

function testRandom(word) {
  var binary = word;
  //counts is how many times each block appears
  var counts = [{},{},{},{},{},{},{}];
  //single digit
  for(var i=0;i<binary.length;i++) {
    var c = binary.charAt(i);
    if(counts[0][c]) {
      counts[0][c]++;
    }
    else {
      counts[0][c] = 1;
    }
  }
  //two digit
  for(var i=0;i<Math.floor(binary.length/2);i++) {
    var c = binary.charAt(2*i) + binary.charAt(2*i+1);
    if(counts[1][c]) {
      counts[1][c]++;
    }
    else {
      counts[1][c] = 1;
    }
  }
  //three digit
  for(var i=0;i<Math.floor(binary.length/3);i++) {
    var c = binary.charAt(3*i) + binary.charAt(3*i+1) + binary.charAt(3*i+2);
    if(counts[2][c]) {
      counts[2][c]++;
    }
    else {
      counts[2][c] = 1;
    }
  }
  //four digit
  for(var i=0;i<Math.floor(binary.length/4);i++) {
    var c = binary.charAt(4*i) + binary.charAt(4*i+1) + binary.charAt(4*i+2) + binary.charAt(4*i+3);
    if(counts[3][c]) {
      counts[3][c]++;
    }
    else {
      counts[3][c] = 1;
    }
  }
  //five digit
  for(var i=0;i<Math.floor(binary.length/5);i++) {
    var c = binary.charAt(5*i) + binary.charAt(5*i+1) + binary.charAt(5*i+2) + binary.charAt(5*i+3) + binary.charAt(5*i+4);
    if(counts[4][c]) {
      counts[4][c]++;
    }
    else {
      counts[4][c] = 1;
    }
  }
/*   //ten digit
  for(var i=0;i<Math.floor(binary.length/10);i++) {
    var c = binary.charAt(10*i)
    + binary.charAt(10*i+1)
    + binary.charAt(10*i+2)
    + binary.charAt(10*i+3)
    + binary.charAt(10*i+4)
    + binary.charAt(10*i+5)
    + binary.charAt(10*i+6)
    + binary.charAt(10*i+7)
    + binary.charAt(10*i+8)
    + binary.charAt(10*i+9);
    if(counts[5][c]) {
      counts[5][c]++;
    }
    else {
      counts[5][c] = 1;
    }
  }
  //fifteen digit
  for(var i=0;i<Math.floor(binary.length/15);i++) {
    var c = binary.charAt(15*i)
    + binary.charAt(15*i+1)
    + binary.charAt(15*i+2)
    + binary.charAt(15*i+3)
    + binary.charAt(15*i+4)
    + binary.charAt(15*i+5)
    + binary.charAt(15*i+6)
    + binary.charAt(15*i+7)
    + binary.charAt(15*i+8)
    + binary.charAt(15*i+9)
    + binary.charAt(15*i+10)
    + binary.charAt(15*i+11)
    + binary.charAt(15*i+12)
    + binary.charAt(15*i+13)
    + binary.charAt(15*i+14);
    if(counts[6][c]) {
      counts[6][c]++;
    }
    else {
      counts[6][c] = 1;
    }
  } */
  //console.log(counts);
  return counts;
}

//http://stackoverflow.com/questions/7033639/javascript-split-large-string-in-n-size-chunks
function chunkString(str, len) {
  var _size = Math.ceil(str.length/len),
      _ret  = new Array(_size),
      _offset
  ;

  for (var _i=0; _i<_size; _i++) {
    _offset = _i * len;
    _ret[_i] = str.substring(_offset, _offset + len);
  }

  return _ret;
}

function testKey() {
  var key = document.getElementById('key').value;
  key = key.replace(/[ ]/gi, '_');
  key = key.replace(/[^a-zA-Z01_.,']/gi, '').toLowerCase();
  
  var binary = '';
  for(var i=0;i<key.length;i++) {
    var b = alphabet.indexOf(key.charAt(i)).toString(2);
    while(b.length !== 5) {
      b = '0' + b;
    }
    binary += b;
  }
  
  var splitKey = splitWord(binary);
  var keyLen = 8192 * 5;//how long of a key to generate (mult by 5 b/c converted to 5 bits)
  var genKey = '';
  for(var i=0;i<keyLen;i++) {
    var bit = '0';
    for(var j=0;j<splitKey.length;j++) {
      var b = splitKey[j].charAt(i%splitKey[j].length);
      if(bit === '1' && b === '1'){
        bit = '0';
      }
      else if(b === '1'){
        bit = '1';
      }
    }
    genKey += bit;
  }
  
  var outKey = '';
  for(var i=0;i<keyLen/5;i++){
    var t = genKey.charAt(5*i) + genKey.charAt(5*i+1) + genKey.charAt(5*i+2) + genKey.charAt(5*i+3) + genKey.charAt(5*i+4);
    outKey += alphabet[parseInt(t,2)];
  }
  
  document.getElementById('out').innerHTML = '<span>Single bit:</span><br>\
      <canvas id="out0" class="outGraph"></canvas><br>\
      <span>Two bit:</span><br>\
      <canvas id="out1" class="outGraph"></canvas><br>\
      <span>Three bit:</span><br>\
      <canvas id="out2" class="outGraph"></canvas><br>\
      <span>Four bit:</span><br>\
      <canvas id="out3" class="outGraph"></canvas><br>\
      <span>Five bit (one character):</span><br>\
      <canvas id="out4" class="outGraph"></canvas><br>\
      <span id="outText"></span>';
  document.getElementById('outText').innerHTML = 'Key: '+key+'<br><br>';
  document.getElementById('outText').innerHTML += 'Split:<br>'+JSON.stringify(generatePrimeGroup(binary.length))+'<br>';
  document.getElementById('outText').innerHTML += JSON.stringify(splitKey)+'<br><br>';
  document.getElementById('outText').innerHTML += 'Period: '+lcm(generatePrimeGroup(key.length))+'<br><br>';
  document.getElementById('outText').innerHTML += 'Generated Key:<br>'+chunkString(outKey,5).join(' ');
  var counts = testRandom(genKey);
  //console.log(counts);
  
  //Create first chart
  var ctx = document.getElementById("out0").getContext("2d");
  var data = {labels: [], datasets: [{data: []}]};
  for(var i=0;i<2;i++) {
    data.labels.push(i.toString(2));
    data.datasets[0].data.push(0);
  }
  for(var b in counts[0]) {
    data.datasets[0].data[parseInt(b, 2)] = counts[0][b];
  }
  var barChart0 = new Chart(ctx).Bar(data, {});
  
  //Create second chart
  ctx = document.getElementById("out1").getContext("2d");
  data = {labels: [], datasets: [{data: []}]};
  for(var i=0;i<4;i++) {
    data.labels.push(i.toString(2));
    data.datasets[0].data.push(0);
  }
  for(var b in counts[1]) {
    data.datasets[0].data[parseInt(b, 2)] = counts[1][b];
  }
  var barChart1 = new Chart(ctx).Bar(data, {});
  
  //Create third chart
  ctx = document.getElementById("out2").getContext("2d");
  data = {labels: [], datasets: [{data: []}]};
  for(var i=0;i<8;i++) {
    data.labels.push(i.toString(2));
    data.datasets[0].data.push(0);
  }
  for(var b in counts[2]) {
    data.datasets[0].data[parseInt(b, 2)] = counts[2][b];
  }
  var barChart2 = new Chart(ctx).Bar(data, {});
  
  //Create fourth chart
  ctx = document.getElementById("out3").getContext("2d");
  data = {labels: [], datasets: [{data: []}]};
  for(var i=0;i<16;i++) {
    data.labels.push(i.toString(2));
    data.datasets[0].data.push(0);
  }
  for(var b in counts[3]) {
    data.datasets[0].data[parseInt(b, 2)] = counts[3][b];
  }
  var barChart3 = new Chart(ctx).Bar(data, {});
  
  //Create fifth chart
  ctx = document.getElementById("out4").getContext("2d");
  data = {labels: [], datasets: [{data: []}]};
  for(var i=0;i<32;i++) {
    data.labels.push(i.toString(2));
    data.datasets[0].data.push(0);
  }
  for(var b in counts[4]) {
    data.datasets[0].data[parseInt(b, 2)] = counts[4][b];
  }
  var barChart4 = new Chart(ctx).Bar(data, {});
  
  //console.log(genKey);
}