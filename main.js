// Write a program that works with a text file. The aim of the program is to read a text from the text file and analyze it. Specifically it should count and print:

// 1. the number of words
// 2. the number of letters
// 3. the number of sentences
// 4. the most used letter in a text
// 5. the most used word in a text

// For example if out text file contains this text:
// "Hello from C++ world"
// the program should give the following output:
// Words: 4
// Letters: 15 (special characters and space are not counted)
// Sentences: 1
// Letter frequency: o (both o and l are used 3 times so any of the letters is considered as a right answer)
// Word frequency: 0 (there is no word that is used more than once)
// The result should be kept in a separate text file.

const fs = require("fs");

function analyze(text) {
  const words = text.match(/\b\w+\b/g) || [];
  const letters = text.replace(/[^a-zA-Z]/g, "").length;
  const sentences = text.split(/[.!?]/).length - 1;
  const letterFrequency = {};
  for (let letter of text) {
    if (letter.match(/[a-zA-Z]/)) {
      letter = letter.toLowerCase();
      letterFrequency[letter] = (letterFrequency[letter] || 0) + 1;
    }
  }
  const mostUsedLetter = Object.keys(letterFrequency).reduce((a, b) =>
    letterFrequency[a] > letterFrequency[b] ? a : b
  );
  const wordFrequency = {};
  words.forEach((word) => {
    wordFrequency[word.toLowerCase()] =
      (wordFrequency[word.toLowerCase()] || 0) + 1;
  });
  const mostUsedWord = Object.keys(wordFrequency).reduce((a, b) =>
    wordFrequency[a] > wordFrequency[b] ? a : b
  );
  return {
    words: words.length,
    letters,
    sentences,
    mostUsedLetter,
    mostUsedWord,
  };
}
function writeToResultFile(result) {
  const resultText = `
    Words: ${result.words}
    Letters: ${result.letters}
    Sentences: ${result.sentences}
    Letter frequency: ${result.mostUsedLetter}
    Word frequency: ${result.mostUsedWord}
  `;

  fs.writeFileSync("result.txt", resultText);
  console.log("Results saved to result.txt");
  console.log(resultText);
}

const filePath = "input.txt";
const text = fs.readFileSync(filePath, "utf-8");
const result = analyze(text);
writeToResultFile(result);
