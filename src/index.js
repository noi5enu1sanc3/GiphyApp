import "./pages/index.css";
import Api from "./scripts/components/Api";

import Gif from "./scripts/components/Gif.js";
import Section from "./scripts/components/Section.js";
import TabSwitcher from "./scripts/components/TabSwitcher.js";
import Form from "./scripts/components/Form.js";
import ReloadButton from "./scripts/components/ReloadButton.js";
import FormValidator from "./scripts/FormValidator.js";

import { key } from "./scripts/utils/key.js";

import Masonry from "./scripts/lib/masonry.js";

import {
  elementsConfigGif,
  elementsConfigSingle,
  elementsConfigTabs,
  elementsConfigForm,
  config,
  containerSelectorTrending,
  containerSelectorRandom,
  containerSelectorSearch,
  containerSelectorUpload,
  randomButtonSelector,
  trendingButtonSelector,
  searchButtonSelector,
  trendingSectionSelector,
  uploadButtonSelector,
  randomSectionSelector,
  searchSectionSelector,
  uploadSectionSelector,
  searchReloadButtonSelector,
  randomReloadButtonSelector,
  rotationAnimationClass,
  uploadGifForm,
  searchGifForm
} from "./scripts/utils/constants.js"

//init form validator
const uploadValidator = new FormValidator(config, uploadGifForm);
uploadValidator.enableValidation();

const searchValidator = new FormValidator(config, searchGifForm);
searchValidator.enableValidation();

//init masonry
function masonryInit() {
  const elem = document.querySelector('.grid');
  const msnry = new Masonry( elem, {
    // options
    itemSelector: '.grid-item',
    columnWidth: 200,
    horizontalOrder: true,
    initLayout: false,
    gutter: 30,
    fitWidth: true
  });
  msnry.reloadItems();
  msnry.layout();
}

function masonrySearchInit() {
  const elem = document.querySelector('.grid-search');
  const msnry = new Masonry( elem, {
    // options
    itemSelector: '.grid-item',
    columnWidth: 200,
    horizontalOrder: true,
    initLayout: false,
    gutter: 30,
    fitWidth: true
  });
  msnry.reloadItems();
  msnry.layout();
}

//init Trending switcher
const switcherTrending = new TabSwitcher(
  elementsConfigTabs,
  trendingButtonSelector,
  trendingSectionSelector,
  () => {
    getTrending();
    switcherTrending.showSection()
  }
);
switcherTrending.setEventListeners();

//function performing and rendering random search
function searchRandom() {
  api.getSearches()
      .then(list => {
        const randomSearch = list.data[Math.floor(Math.random() * list.data.length)];
        api.search(randomSearch)

          .then(gifs => {
          searchGif.clearContainer();
          document.querySelector('.search-gif-section__search-text').textContent = `Someone's searching: "${randomSearch}"`.toUpperCase();
          searchGif.renderItems(gifs.data);
          masonrySearchInit()
        })
      })
      .catch(err => console.log(err))
}

//function performing and rendering trending search
function getTrending() {
  api.getTrendingGifs()
   .then(gifs => {
      trendingGifs.clearContainer();
      trendingGifs.renderItems(gifs.data);
    })
    .then(() => masonryInit())
    .catch(err => console.log(err))
}

//init Search Switcher
const switcherSearch = new TabSwitcher(
  elementsConfigTabs,
  searchButtonSelector,
  searchSectionSelector,
  () => {
     searchValidator.resetErrors();
     searchRandom();
     switcherSearch.showSection();
  }
  );
switcherSearch.setEventListeners();

//init Upload switcher
const switcherUpload = new TabSwitcher(
  elementsConfigTabs,
  uploadButtonSelector,
  uploadSectionSelector,
  () => {
    uploadValidator.resetErrors();
    switcherUpload.showSection();
  }
)
switcherUpload.setEventListeners();

//function performing random gif query and rendering results
function getRandom() {
  api.getRandomGif()
   .then(gif => {
    randomGif.clearContainer();
    randomGif.renderItem(gif.data)
  })
  .catch(err => console.log(err))
}

//init Random switcher
const switcherRandom = new TabSwitcher(
  elementsConfigTabs,
  randomButtonSelector,
  randomSectionSelector,
  () => {
    getRandom();
    switcherRandom.showSection();

  }
);
switcherRandom.setEventListeners();

//init searchForm
const searchForm = new Form(
  searchSectionSelector,
  elementsConfigForm,
  (inputData) => {
    searchForm.renderButtonText('Searching...');
    console.log(inputData)
    api
      .search(inputData)
      .then(gifs => {
        searchGif.clearContainer();
        document.querySelector('.search-gif-section__search-text').textContent = `Here's some ${inputData}`.toUpperCase();
        searchGif.renderItems(gifs.data);
        searchValidator.resetErrors();
        masonrySearchInit()
      })
      .then(() => switcherSearch.showSection())
      .catch(err => console.log(err))
      .finally(() => searchForm.renderButtonText('Search'))
  }
  )

searchForm.setEventListeners();

const uploadForm = new Form(
  uploadSectionSelector,
  elementsConfigForm,
  (inputData) => {
    uploadForm.renderButtonText('Uploading...');
    Promise.all([api.upload(inputData), uploadGif.renderItem(inputData)])
      .then(() => switcherUpload.showSection())
      .catch(err => console.log(err))
      .finally(() => uploadForm.renderButtonText('Upload'))
  }
)
uploadForm.setEventListeners();

//init search reload button
const searchReloadButton = new ReloadButton(searchReloadButtonSelector,
  () => {
    searchRandom();
  },
  rotationAnimationClass
  )
searchReloadButton.setEventListeners();

//init random reload button
const randomReloadButton = new ReloadButton(randomReloadButtonSelector,
  () => {
    getRandom();
  },
  rotationAnimationClass
  );
randomReloadButton.setEventListeners();

//function rendering gif to a list
function addGifToList(item) {
  const gif = new Gif(item, '.cardList', elementsConfigGif);
  return gif.renderGif();
}

//function rendering single gif from server
function addSingleGif(item) {
  const gif = new Gif(item, '.single-gif', elementsConfigSingle, true);
  return gif.renderGif();
}

//init api
const api = new Api(key,
  {
    baseUrl: "https://api.giphy.com/v1/"
  })

//init Trending Section
const trendingGifs = new Section(
  {
    renderer: (item) => {
      const gif = addGifToList(item);
      trendingGifs.addItem(gif);
    }
  },
  containerSelectorTrending
)

//init Random Section
const randomGif = new Section(
  {
    renderer: (item) => {
      const gif = addSingleGif(item);
      randomGif.addItem(gif)
    }
  },
  containerSelectorRandom
)

//init Search Section
const searchGif = new Section(
  {
    renderer: (item) => {
      const gif = addGifToList(item);
      searchGif.addItem(gif);
    }
  },
  containerSelectorSearch
)

//init Upload Section
const uploadGif = new Section(
  {
    renderer: (url) => {
      const gif = addSingleGif(url);
      uploadGif.addItem(gif)
    }
  },
  containerSelectorUpload
)

window.addEventListener('load', () => {
  getTrending();
  switcherTrending.showSection();
})

document.querySelector('.upload-gif-section__submit-btn').addEventListener('submit', () => {
  api.uploadFile()
  .then((res) => console.log(res))
})
