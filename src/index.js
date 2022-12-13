// import { debounce } from "lodash";
const debounce = require('lodash.debounce');
import { refs } from "./js/refs";
import { goForImages} from './js/responce'

refs.form.addEventListener('input', debounce(searchInput, 300));

function searchInput(e) {
    goForImages(e);
    console.log(e.target.value);
    
}