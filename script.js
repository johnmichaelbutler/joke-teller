const button = document.getElementById('button');
const audioElement = document.getElementById('audio');


// Passing Joke to VoiceRSS API
function tellMe(joke) {
  VoiceRSS.speech({
    key: 'ba3cbd24478f4db78bead83db071e95f',
    src: joke,
    hl: 'en-us',
    r: 0,
    c: 'mp3',
    f: '44khz_16bit_stereo',
    ssml: false
  });
}

// Get Jokes form Joke API
async function getJokes() {
  let joke = '';
  const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist';

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    if(data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke
    }
    //Text-to-Speech
    tellMe(joke);
    // Disable Button
    toggleButton();
  } catch(error) {
    console.log('Whoops', error);
  }
};

// Event Listeners
button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', () => button.disabled = !button.disabled);