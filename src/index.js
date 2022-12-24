import { FetchAPI } from './js/api';
import { createMarkupElemetsGallery } from './js/createMarkupElemetsGallery';

import './js/back-to-top';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDWkH4ILDlVzP0Wnvj-LokZrEXKerxqmJA',
  authDomain: 'filmoteka-9a3bd.firebaseapp.com',
  projectId: 'filmoteka-9a3bd',
  storageBucket: 'filmoteka-9a3bd.appspot.com',
  messagingSenderId: '326843580471',
  appId: '1:326843580471:web:412bafb98df63bfdf8ffb2',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const debounce = require('lodash.debounce');
const DEBOUNCE_DELAY = 300;

const searchForm = document.querySelector('.search-form-input');
const galleryList = document.querySelector('.gallery');
const searchResult = document.querySelector('.search-result');

const fetchApi = new FetchAPI();

document.addEventListener('click', onCardClick);
document.addEventListener('DOMContentLoaded', renderTrendingFilms());

let galleryEl = [];

function onCardClick(e) {
  if (e.path[2].className !== 'photo-card') {
    return;
  }

  if (e.path[2].className === 'photo-card') {
    console.dir(e.path[2].dataset.id);
  }
}

async function renderTrendingFilms() {
  galleryList.innerHTML = '';
  fetchApi.page = 1;
  const { data } = await fetchApi.fetchTrendingFilms();
  galleryEl = data.results;
  renderGallery();
}

searchForm.addEventListener('input', debounce(SearchFilms, DEBOUNCE_DELAY));

async function SearchFilms(e) {
  const { value } = e.target;

  try {
    if (value.trim() === '') {
      renderTrendingFilms();
      return;
    }

    galleryList.innerHTML = '';
    fetchApi.page = 1;
    const { data } = await fetchApi.fetchSearchFilms(value.trim());

    if (data.total_results === 0) {
      searchResult.innerHTML =
        'Search result not successful. Enter the correct movie name and!';
      renderTrendingFilms();
      return;
    }

    if (data.total_results > 0) {
      searchResult.innerHTML = '';
      galleryEl = data.results;
      console.log(galleryEl);
      renderGallery();
    }
  } catch (error) {
    console.log(error.massage);
  }
}

function renderGallery() {
  const galleryElements = galleryEl.map(createMarkupElemetsGallery);
  galleryList.insertAdjacentHTML('beforeend', galleryElements.join(''));
}
