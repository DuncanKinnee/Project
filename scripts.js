window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = 'en-US';
//These are the different arrays used to hold the speech results
//they then need to break down each string into individual words and store that as an Array
let talk = [];
let splitter = [];
let wordsList = [];

//This is used to create paragraph elements on the index page so that they can display the unique words and word counts.
let r = document.createElement('p');
r.className = 'uniRes';
const box = document.querySelector('.box');
// box.appendChild(r);

let card = document.createElement('div');
card.className = 'wordCard';
// box.appendChild(card)


//This section creates paragraphs to hold the output of the speech recognition
let p = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(p);
p.className = 'talkText';


// this is the speech recognition event EventListener.
//It activates when you start talking and outputs the results into an array and then creates P elements to display them on the Index html page.
recognition.addEventListener('result', e => {
  const transcript = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('');

    // const poopScript = transcript.replace(/poop|poo|shit|dump/gi, '💩');
    p.innerHTML = '<span class="pText">' + transcript + '</span>' + '.';

    //checks if you are done talking and puts the speech into the P element
    if (e.results[0].isFinal) {
      p = document.createElement('p');
      p.className = 'talkText';
      words.appendChild(p);
      talk.push(transcript.toLowerCase());
      splitArray(); // remove?
      displayUniqueWords(); // remove?
    }
});

recognition.addEventListener('end', recognition.start);
recognition.start();


// takes the speech results and breaks them into individual words, pushes them into a new array.
function splitArray() {
  wordsList = [];
  for (var i = 0; i < talk.length; i++) {
    splitter = talk[i];
    splitter = splitter.split(' ');
    splitter.forEach((item, i) => {
      wordsList.push(item);
      return wordsList;
      });
  };

};


//returns a unique list of words from the arrays. this is used for counting
const uniWords = wordsList.filter((value,index,array) => {
  return array.indexOf(value) === index;
});


//gives the count of how many times each word apears in the arrays
function wordCount(array, value) {
  return array.filter((v) => (v === value)).length
};

// checks unique word count
function displayUniqueWords() {
  const uniqueResults = document.getElementById('uniqueWords');
  uniqueResults.innerHTML = ' ';


  const uniWords = wordsList.filter((value,index,array) => {
    return array.indexOf(value) === index;
  });

  uniWords.forEach((item, index) => {
    card = document.createElement('div');
    card.className = 'wordCard';
    box.appendChild(card)
    // r = document.createElement('p');//creates a P element that contains the arrays
    // r.className = 'uniRes';  //appends the P element to the div .box
    // card.appendChild(r);
    card.innerHTML = '<span class="wordStyle">'  +item  + '</span>' + '<span class="countStyle">' +  ' : ' + wordCount(wordsList, item)+ '</span>';//sets P element that contains the arrays
    console.log( item + ' appears: ' + wordCount(wordsList, item) + " times"); //console logs the results for double checking
  });
}
