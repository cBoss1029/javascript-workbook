'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});
/*First, write a function to scrub the string of white space, convert it to
 lower case, and store the new string for use in later functions.*/


let string;

function scrubString(str) {
  string = str.toLowerCase().trim();
  return string;
}

/*Second, you need a function that searches the string for vowels and returns
 the index number of the first vowel it finds. I feel it would be better to
 write a small regex for this to avoid having to write a loop with a conditional
  statement for each vowel.*/

function findVowelIndex(str) {
  const re = /[aeiouy]/g;
  /*regular expression, the characters in the brackets
 are what you’re searching for, the “g” tells it to search the whole string.*/

  scrubString(str); //scrub whitespace and convert to lower case

  return string.search(re);
  /*this searches the string for characters that
  match the ones in the regex (vowels in this case), and stores the index
  number of the first match*/
}



function pigLatin(word) {

  // Your code here
  const vowelIndex = findVowelIndex(word);
  if (vowelIndex === 0) {
    return string + 'yay';
    /*if the string begins with a vowel, just add
       ‘yay’ to the end*/

  } else {
    return `${string.substring(vowelIndex, string.length)}${string.substring(0, vowelIndex)}ay`;
    /*move everything
       before the first vowel to the end of the string and ad 'ay'*/
  }
}


function getPrompt() {
  rl.question('word ', (answer) => {
    console.log(pigLatin(answer));
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#pigLatin()', () => {
    it('should translate a simple word', () => {
      assert.equal(pigLatin('car'), 'arcay');
      assert.equal(pigLatin('dog'), 'ogday');
    });
    it('should translate a complex word', () => {
      assert.equal(pigLatin('create'), 'eatecray');
      assert.equal(pigLatin('valley'), 'alleyvay');
    });
    it('should attach "yay" if word begins with vowel', () => {
      assert.equal(pigLatin('egg'), 'eggyay');
      assert.equal(pigLatin('emission'), 'emissionyay');
    });
    it('should lowercase and trim word before translation', () => {
      assert.equal(pigLatin('HeLlO '), 'ellohay');
      assert.equal(pigLatin(' RoCkEt'), 'ocketray');
    });
  });
} else {

  getPrompt();

}
