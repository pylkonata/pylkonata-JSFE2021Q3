export function showFavorites(arr) {
  const favorites = document.querySelector('.header-info__favorite');
  favorites.innerText = '';
  favorites.innerText = arr.length;
}
export function sortAscDesc(arr) {
  const sorterFunctions = {
    ascendingByName: (a, b) => a.name > b.name ? 1: -1,
    descendingByName: (a, b) => b.name > a.name ? 1: -1,
    ascendingByQuantity: (a, b) => a.count - b.count,
    descendingByQuantity: (a, b) => b.count - a.count,
  };
  
  const filterSortSelect = document.querySelector(".filter-sort__select");
  let currentSorter = sorterFunctions[filterSortSelect.value];
  arr.sort(currentSorter);
  // console.log(arr);
  // console.log(filterSortSelect.value);
}
export class ToysCards {
  
  makeCards(data) {
    const fragment = document.createDocumentFragment();
    const toyCardTemp = document.querySelector('#toyCardTemp');
    const toysWrapper = document.querySelector('.toys-wrapper');
    
    data.forEach((item, id) => {
      const cardClone = toyCardTemp.content.cloneNode(true);
      const toyCard = cardClone.querySelector('.toy-card');
      const title = cardClone.querySelector('.title');
      const toyImg = cardClone.querySelector('.toy-img');
      const quantity = cardClone.querySelector('.quantity');
      const year = cardClone.querySelector('.year');
      const shape = cardClone.querySelector('.shape');
      const color = cardClone.querySelector('.color');
      const size = cardClone.querySelector('.size');
      const loved = cardClone.querySelector('.loved');
      
      toyCard.dataset.num = data[id].num;
      title.textContent = data[id].num+" "+data[id].name;
      quantity.textContent = data[id].count;
      year.textContent = data[id].year;
      shape.textContent = data[id].shape;
      color.textContent = data[id].color;
      size.textContent = data[id].size;
      loved.textContent = data[id].favorite ? 'Да' : 'Нет';
      toyImg.setAttribute("src", `./assets/images/toys/${data[id].num}.webp`);
      toyImg.setAttribute("alt", `Christmas toys ${data[id].num}`);

      fragment.append(cardClone);
    });
    toysWrapper.innerHTML = '';
    toysWrapper.appendChild(fragment);
  }

}

