import "./pages/index.css";
import Api from "./scripts/components/Api";

import Gif from "./scripts/components/Gif.js";
import Section from "./scripts/components/Section.js";
import TabSwitcher from "./scripts/components/TabSwitcher.js";
import Form from "./scripts/components/Form.js";
import RandomGif from "./scripts/components/RandomGif.js";

import { key } from "./scripts/utils/key.js";

import Masonry from "./scripts/lib/masonry.js";
import ImagesLoaded from "./scripts/lib/imagesLoaded.js"

import {
  elementsConfigGif,
  elementsConfigRandom,
  elementsConfigTabs,
  elementsConfigForm,
  containerSelectorTrending,
  containerSelectorRandom,
  containerSelectorSearch,
  randomButtonSelector,
  trendingButtonSelector,
  searchButtonSelector,
  trendingSectionSelector,
  randomSectionSelector,
  searchSectionSelector
} from "./scripts/utils/constants.js"
import masonry from "./scripts/lib/masonry.js";

// //init Loaded
// const loaded = new ImagesLoaded( document.querySelector('.cardImg'), function onAlways ( instance ) {
//   console.log('all images are loaded');
//   masonryInit();
// });

// // bind with .on()
// loaded.on( 'always', onAlways );
// // unbind with .off()
// loaded.off( 'always', onAlways );


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
    api.getTrendingGifs()
   .then(gifs => {
      console.log(gifs.data);
      trendingGifs.clearContainer();
      trendingGifs.renderItems(gifs.data);
    })
    .then(() => switcherTrending.showSection())
    .then(() => masonryInit())

  .catch(err => console.log(err))
  }
  );

switcherTrending.setEventListeners();

//init Search Switcher
const switcherSearch = new TabSwitcher(
  elementsConfigTabs,
  searchButtonSelector,
  searchSectionSelector,
  () => {
    api.getSearches()
      .then(list => {
        const randomSearch = list.data[Math.floor(Math.random() * list.data.length)];
        api.search(randomSearch)

          .then(gifs => {
          searchGif.clearContainer();
          document.querySelector('.search-gif__search-text').textContent = `Someone's searching: "${randomSearch}"`.toUpperCase();
          searchGif.renderItems(gifs.data);
          masonrySearchInit()
        })})
    .then(() => switcherSearch.showSection())
    //.then(() => masonrySearchInit())
    .catch(err => console.log(err))
  }
  );
switcherSearch.setEventListeners();

//init Random switcher
const switcherRandom = new TabSwitcher(
  elementsConfigTabs,
  randomButtonSelector,
  randomSectionSelector,
  () => {
    api.getRandomGif()
  .then(gif => {
    randomGif.clearContainer();
    randomGif.renderItem(gif.data)
  })
  .then(() => switcherRandom.showSection())
  .catch(err => console.log(err))
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
        document.querySelector('.search-gif__search-text').textContent = `Here's some ${inputData}`.toUpperCase();
        searchGif.renderItems(gifs.data)
        masonrySearchInit()
      })
      .then(() => switcherSearch.showSection())
      .catch(err => console.log(err))
      .finally(() => searchForm.renderButtonText('Search'))
  }
  )

searchForm.setEventListeners();

//function rendering gif to a list
function addGifToList(item) {
  const gif = new Gif(item, '.testCard', elementsConfigGif,);
  return gif.renderGif();
}

//function rendering single gif
function addRandomGif(item) {
  const gif = new RandomGif(item, '.randomCard', elementsConfigRandom,);
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
      //trendingGifs.clearContainer();
      trendingGifs.addItem(gif);
    }
  },
  containerSelectorTrending
)

//init Random Section
const randomGif = new Section(
  {
    renderer: (item) => {
      console.log(item)
      const gif = addRandomGif(item);
      //randomGif.clearContainer();
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
      //trendingGifs.clearContainer();
      searchGif.addItem(gif);
    }
  },
  containerSelectorSearch
)


