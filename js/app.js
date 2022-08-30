let elSelect = document.querySelector(".movies__select");
let elInput = document.querySelector(".movies__input");
let elTemplate = document.querySelector("#movies__template").content;
let elList = document.querySelector(".movies__list");
let elItem = document.querySelector(".movies__item");

movies = movies.slice(0, 80);

let newArr = [];

let elMoviesArr = movies.forEach(movie => {
  newArr.push({
    title: movie.fulltitle,
    img: `http://i3.ytimg.com/vi/${movie.ytid}/hqdefault.jpg`,
    category: `<b>Categorys:</b> ${movie.Categories}`,
    summary: movie.summary,
    ytid: movie.ytid,
    reting: `Reting film:  ${movie.imdb_rating}`,
    newRaiting: movie.imdb_rating
  })
})

movies.slice(0, 100)

let createElement = (movie) => {
  let newItem = elTemplate.cloneNode(true);
  newItem.querySelector(".movie__reting").textContent = movie.reting;
  newItem.querySelector(".movie__img").src = movie.img;
  newItem.querySelector(".movie__category").textContent = movie.summary.split(" ").slice(0, 15).join(" ")
  newItem.querySelector(".movie__img").alt = movie.title;
  newItem.querySelector(".movie__title").textContent = movie.title;
  return newItem;
}

let renderFilms = (movies) => {
  elList.innerHTML = null;
  let elNewWrapper = document.createDocumentFragment();

  movies.forEach(movie => {
    if (movie.ytid != "") {
      elNewWrapper.append(createElement(movie));
    }
  })
  elList.appendChild(elNewWrapper);
}

renderFilms(newArr);

let categorys = [...new Set(movies.map(movie => movie.Categories.split("|")).flat())];

categorys.forEach(movie => {
  let categoryOption = document.createElement("option");
  categoryOption.textContent = movie;
  categoryOption.value = movie;
  elSelect.appendChild(categoryOption);
})

elSelect.addEventListener("change", () => {
  let filt = newArr.filter(movie => movie.category.includes(elSelect.value));

  if (elSelect.value == "choose-category") {
    renderFilms(newArr);
  } else {
    renderFilms(filt);
  };
});
let arrExtra = newArr.slice(0, 80);

elInput.oninput = () => {
  let inputValue = elInput.value;
  let regExp = new RegExp(inputValue.trim(), "gi")
  let filmName = newArr.filter(movie => regExp.test(movie.title));
  renderFilms(filmName);
}
let elSortSelect = document.querySelector(".extra-select");

elSortSelect.addEventListener("change", function () {
  if (this.value == "default-option") {
    renderFilms(arrExtra);
  } else if (this.value == "a-z-option") {
    newArr = newArr.sort((a, b) => {
      let movieName1 = a.title.toLowerCase();
      let movieName2 = b.title.toLowerCase();
      if (movieName1 < movieName2) return -1
      return 1
    });
    renderFilms(newArr);
  } else if (this.value == "z-a-option") {
    newArr = newArr.sort((a, b) => {
      let movieName3 = a.title.toLowerCase();
      let movieName4 = b.title.toLowerCase();
      if (movieName3 < movieName4) return 1
      return -1
    });
    renderFilms(newArr);
  } else if (this.value == "option-0-10") {
    newArr = newArr.sort((a, b) => a.newRaiting - b.newRaiting);
    renderFilms(newArr);
  } else if (this.value == "option-10-0") {
    newArr = newArr.sort((a, b) => b.newRaiting - a.newRaiting);
    renderFilms(newArr);
  }
})