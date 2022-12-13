const axios = require('axios').default;

const API_KEY = '32020206-eb1e8243d0555b8d860dcfe9c';
const URL = 'https://pixabay.com/api';

const optionsAxios = {
  key: '32020206-eb1e8243d0555b8d860dcfe9c',
  image_type : 'photo',
  q:'',
};

export function goForImages(e) {
  optionsAxios.q = `${e.target.value}`;
console.log(optionsAxios.q);
  axios(URL,optionsAxios).then(console.log)
console.log('dsfds');
}
