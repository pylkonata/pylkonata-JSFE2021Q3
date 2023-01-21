// import './index.sass';
import data from "./js/data";
import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';
import { createSlider } from './js/slider';
import { showTimeLeft } from './js/showtime';
import { ToysCards, showFavorites, sortAscDesc } from './js/toyssection';

const sliderQuantity = document.getElementById('slider-quantity')  as noUiSlider.target;
const sliderYear = document.getElementById('slider-year')  as noUiSlider.target;

const sliderQuantityMin = sliderQuantity.parentElement?.querySelector('.count-min') as noUiSlider.target;
const sliderQuantityMax = sliderQuantity.parentElement?.querySelector('.count-max') as noUiSlider.target;
const rangeQuantity = [sliderQuantityMin, sliderQuantityMax];
const sliderYearMin = sliderYear.parentElement?.querySelector('.count-min') as noUiSlider.target;
const sliderYearMax = sliderYear.parentElement?.querySelector('.count-max') as noUiSlider.target;
const rangeYear = [sliderYearMin, sliderYearMax];

const toysWrapper = document.querySelector('.toys-wrapper') as HTMLElement;
const filtersValue = document.querySelector('.filters-value') as HTMLElement;

const filterSortSelect = document.querySelector('.filter-sort__select') as HTMLSelectElement;
const btnResetSettings = document.querySelector('.reset__btn-settings') as HTMLElement;
const headerNav = document.querySelector('.header-nav') as HTMLElement;
const startPageSection = document.querySelector('.start-page') as HTMLElement;
const toysSection = document.querySelector('.toys') as HTMLElement;
const btnStartPage = document.querySelector('.start-page__btn') as HTMLElement;
const searchField = document.querySelector('.search') as HTMLInputElement;
let arrFavorite: Array<string> = [];
let quantityArr = [1, 12];
let yearArr = [1940, 2020];


function setFavoritesLocalStorage (arrFavorite) {
  localStorage.setItem('arrFavorite', JSON.stringify(arrFavorite));
}

function highlightFavorites() {
  if (localStorage.getItem('arrFavorite')) {
    arrFavorite = JSON.parse(((localStorage as Storage).getItem('arrFavorite')) as string) ;
    showFavorites(arrFavorite);
    
    toyCards.forEach(item => {
      let dataNum = (item as HTMLElement).dataset.num as string;
      if (arrFavorite.includes(dataNum)) {
        (item as HTMLElement).classList.add('favorite');
      }        
    });
  } 
}
createSlider(sliderQuantity, quantityArr[0], quantityArr[1], rangeQuantity);
createSlider(sliderYear, yearArr[0], yearArr[1], rangeYear);
showTimeLeft();

const baseArr = data.slice();
let renderArr = baseArr.slice();
const toyCard = new ToysCards;
let toyCards = document.querySelectorAll('.toy-card') as NodeList;
function startPage(renderArr) {
  toyCard.makeCards(renderArr);
  toyCards = document.querySelectorAll('.toy-card') as NodeList;
  highlightFavorites();
  // console.log('update page from startPage code');
}
sortAscDesc(renderArr);
startPage(renderArr);
const filterFunctions = {
  ball: item => item.shape === 'шар',
  bell: item => item.shape === 'колокольчик',
  cone: item => item.shape === 'шишка',
  snowflake: item => item.shape === 'снежинка',
  figurine: item => item.shape === 'фигурка',
  white: item => item.color === 'белый',
  yellow: item => item.color === 'желтый',
  red: item => item.color === 'красный',
  blue: item => item.color === 'синий',
  green: item => item.color === 'зелёный',
  big: item => item.size === 'большой',
  middle: item => item.size === 'средний',
  small: item => item.size === 'малый',
  lovely: item => item.favorite === true,
  quantity: item => (item.count >= startQ && item.count <= endQ) ? true : false,
  year: item => (item.year >= startY && item.year <= endY) ? true : false,
};
let filterShapeArr: Array<string> = [];
let filterColorArr: Array<string> = [];
let filterSizeArr: Array<string> = [];
let filterLoveArr: Array<string> = [];
let sliderQuantityArr: Array<string>= [];
let sliderYearArr: Array<string> = [];
let allFilterArr = [filterShapeArr, filterColorArr, filterSizeArr, filterLoveArr, sliderQuantityArr,sliderYearArr];

function btnFilterShape(target, filterShapeArr) {  
  toggleActiveState(target, filterShapeArr);
}

function btnFilterColor(target, filterColorArr) {   
  toggleActiveState(target, filterColorArr);
}

function btnFilterSize(target, filterSizeArr) {   
  toggleActiveState(target, filterSizeArr);
}

function btnFilterLove(target, filterLoveArr) {
  const filterValue = target.dataset.filter;
  const filterLovedInput = document.querySelector('.filter-loved__input') as HTMLInputElement;

  if (filterLovedInput.checked) {
    filterLoveArr.push(filterValue);
  } else {
    filterLoveArr.splice(0, 1);
  }
}

function toggleActiveState(target, arr) {
  const filterValue = target.dataset.filter;
  if (target && filterValue && target.classList.contains('active')) {
    const numOfArr = arr.indexOf(filterValue);
    if (numOfArr < 0) {
      console.log("item wasnt founded");
    } else {
      arr.splice(numOfArr, 1);
    }
    target.classList.remove('active');
  } else if (target && filterValue) {
    arr.push(filterValue);
    target.classList.add('active');
  }
}

function filterData(data, array) {
  let temporaryArr = [];
  for (let i = 0; i < array.length; i++) {
    if (i === 0) {
      temporaryArr = data.filter(filterFunctions[array[i]]);
    } else {
      temporaryArr = temporaryArr.concat(...data.filter(filterFunctions[array[i]]));
    }  
  }
  return temporaryArr;
}

function generalFiltration(arr, allFilterArr) {
  let generalArr = arr.slice();
  for (let i = 0; i < allFilterArr.length; i++) {
    if (allFilterArr[i].length) {
      generalArr = filterData(generalArr, allFilterArr[i]);
    } else continue;
  }
  if (generalArr.length < 1) {
    alert("Sorry, no matches found")
  }
  sortAscDesc(generalArr);
  return generalArr;  
}
/*Add EventListener to Filters */
filtersValue.addEventListener('click', (event) => {
  const target = event.target as HTMLElement;
  let targetValue = target.dataset.f;
  switch (targetValue) {
    case 'shape':
      btnFilterShape(target, filterShapeArr);
      break;
    case 'color':
      btnFilterColor(target,  filterColorArr);
      break;
    case 'size':
      btnFilterSize(target,  filterSizeArr);
      break;
    case 'love':
      btnFilterLove(target, filterLoveArr);
      break;
  }  
  renderArr = generalFiltration(baseArr, allFilterArr);
  startPage(renderArr);
  // console.log('update page from filters code');
})


/*Add Listener to Sliders */
let startQ: number;
let endQ: number;
let startY: number;
let endY: number;

(sliderQuantity.noUiSlider as noUiSlider.API).on('update', function (values) {
  startQ = Number(values[0]);
  endQ = Number(values[1]);
  sliderQuantityArr[0] = 'quantity';
  renderArr = generalFiltration(baseArr, allFilterArr);
  
  toyCard.makeCards(renderArr);
  toyCards = document.querySelectorAll('.toy-card') as NodeList;
  highlightFavorites();
  // console.log('update page from sliderquantity code');
});

(sliderYear.noUiSlider as noUiSlider.API).on('update', function (values) {
  
  startY = Number(values[0]);
  endY = Number(values[1]);
  sliderYearArr[0] = 'year';
  renderArr = generalFiltration(baseArr, allFilterArr);
  startPage(renderArr);
  // console.log('update page from sliderYear code');
});
/*Add EventListener to Sorter */
filterSortSelect.addEventListener('change', () => {
  renderArr = generalFiltration(baseArr, allFilterArr);
  startPage(renderArr);
  // console.log('update page from filterSortSelect code');
});

/*Add EventListener to toys wrapper */

toysWrapper.addEventListener('click', (event) => {
  const target = event.target as HTMLElement;
  const card = target.closest(".toy-card") as HTMLElement;
  if (target && card && card.classList.contains('favorite')) {
    const numElement: string = <string>(card as HTMLElement).dataset.num;
    const numOfArr = arrFavorite.indexOf(numElement);

    if (numOfArr < 0) {
      console.log("item wasnt founded");
    } else {
      arrFavorite.splice(numOfArr, 1);
      setFavoritesLocalStorage(arrFavorite);
      showFavorites(arrFavorite);
      card.classList.remove('favorite');
    }
    
  } else if (card && arrFavorite.length < 20) {
    toyCards.forEach(item => {
      if (card === item) {
        card.classList.add('favorite');
        arrFavorite.push(((item as HTMLElement).dataset.num as string));
        setFavoritesLocalStorage(arrFavorite);
        showFavorites(arrFavorite);
      }
    });
  } else if(card){
    alert("Извините, все слоты заполнены");
    return;
  }
});

//Button Reset filters

function removeActiveFromFilters() {
  const filterItems = filtersValue.querySelectorAll('.filter-item');
  filterItems.forEach(item => {
    if (item.classList.contains('active')) {
      item.classList.remove('active');
    }
  });
  const filterLovedInput = document.querySelector('.filter-loved__input') as HTMLInputElement;
  filterLovedInput.checked = false;
  sliderQuantity.noUiSlider?.set([1, 12]);
  sliderYear.noUiSlider?.set([1940, 2020]);
}
function clearAllFiltersArr() {
  allFilterArr.forEach(item => item.splice(0, item.length));
}
function resetFilters() {
  removeActiveFromFilters();
  clearAllFiltersArr();
  
  renderArr = generalFiltration(baseArr, allFilterArr);
  startPage(renderArr);
  // console.log('reset filters done');
}
const btnReset = document.querySelector('.reset__btn') as HTMLElement;
btnReset.addEventListener('click', resetFilters);

//Save filters, sorters to localStorage
interface GeneralSettings {
  quantityArr: Array<number>;
  yearArr: Array<number>;
  allFilterArr: string [][];
  filterSortSelect: string
}
let settingsInLocalStorage: GeneralSettings;
function setLocalStorage() {
  quantityArr = sliderQuantity.noUiSlider?.get(true) as Array<number>;
  quantityArr = quantityArr.map(n => Math.trunc(n));
  yearArr = sliderYear.noUiSlider?.get(true) as Array<number>;
  settingsInLocalStorage = {
    quantityArr: quantityArr,
    yearArr: yearArr,
    allFilterArr: allFilterArr,
    filterSortSelect: filterSortSelect.value
  };
  // console.log(settingsInLocalStorage);
  localStorage.setItem('settingsInLocalStorage', JSON.stringify(settingsInLocalStorage));
}
function addActiveToFilters() {
  const filterItems = filtersValue.querySelectorAll('.filter-item');
  allFilterArr.forEach(item => {
    item.forEach(() => {
      for (let i = 0; i < filterItems.length; i++) {
        if (item.includes((filterItems[i] as HTMLElement).dataset.filter as string)) {
          filterItems[i].classList.add('active');
        }
        if (item.includes('lovely')) {
          const filterLovedInput = document.querySelector('.filter-loved__input') as HTMLInputElement;
          filterLovedInput.checked = true;
        }
      }
    })
  });
  
}
function setDataFromLocal() {
  filterSortSelect.value = settingsInLocalStorage.filterSortSelect;
  sliderQuantity.noUiSlider?.set([settingsInLocalStorage.quantityArr[0], settingsInLocalStorage.quantityArr[1]]);
  sliderYear.noUiSlider?.set([settingsInLocalStorage.yearArr[0], settingsInLocalStorage.yearArr[1]]);
  allFilterArr.forEach((item, i) => {
    item.splice(0, item.length, ...settingsInLocalStorage.allFilterArr[i]);
  });
}
window.addEventListener('beforeunload', setLocalStorage);
function getLocalStorage() {
  if (localStorage.getItem('settingsInLocalStorage')) {
    settingsInLocalStorage = JSON.parse(((localStorage as Storage).getItem('settingsInLocalStorage')) as string);
  }
}
window.addEventListener('load', () => {
  getLocalStorage();
  setDataFromLocal();
  addActiveToFilters();
  renderArr = generalFiltration(baseArr, allFilterArr);
  startPage(renderArr);
  // console.log('update page from load code');
});
btnResetSettings.addEventListener('click', (event) => {
  if (event.target) {
    localStorage.clear();
    filterSortSelect.value = 'ascendingByName';
    resetFilters();
  }
})
searchField.addEventListener('input', () => {
  renderArr = generalFiltration(baseArr, allFilterArr);
  renderArr = renderArr.filter(item => item.name.toLowerCase().includes(searchField.value));
  // console.log('update page from search code');
  startPage(renderArr);
})
function toggleSection(target) {
  if (target && target.classList.contains('header-nav__logo')) {
    if (startPageSection.classList.contains('hide')) {
      startPageSection.classList.add('show');
      startPageSection.classList.remove('hide');
      toysSection.classList.remove('show');
      toysSection.classList.add('hide');
    } 
  } else if (target && target.classList.contains('toys-page')) {
    if (toysSection.classList.contains('hide')) {
      toysSection.classList.add('show');
      toysSection.classList.remove('hide');
      startPageSection.classList.remove('show');
      startPageSection.classList.add('hide');
    }
  } else if (target && target.classList.contains('start-page__btn')) {
    toysSection.classList.add('show');
    toysSection.classList.remove('hide');
    startPageSection.classList.remove('show');
    startPageSection.classList.add('hide');  
  }
}
headerNav.addEventListener('click', (event) => {
  const target = event.target as HTMLElement;
  toggleSection(target);
})
btnStartPage.addEventListener('click', (event) => {
  const target = event.target as HTMLElement;
  toggleSection(target);
})
