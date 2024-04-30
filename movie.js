const searchInput = document.getElementById("search-input");
const searchForm = document.getElementById("search");

// TMDB에서 영화 정보 가져오는 함수
const fetchMovieData = async () => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1NThhODc2ZTY5NDA4NWY4YTA1MmQyNjc5MTRhY2RlMiIsInN1YiI6IjYxYzNjZjY5MzdiM2E5MDBjMzQ2YzYyYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.pPkre3BdMQtujbkqtPmW7TC_022A-ZR2M_ZShzd_kDU",
    },
  };

  const response = await fetch("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&include_adult=false", options);

  const data = await response.json();
  console.log(data);
  return data.results;
};

const createMovieCards = async () => {
  // TMDB API에서 가져온 영화 정보 객체를 movies에 할당
  const movies = await fetchMovieData();
  console.log(movies);
  const cardList = document.querySelector(".card-list");

  movies.forEach((movie) => {
    const addTargetCard = document.createElement("div");
    addTargetCard.id = movie.id;
    addTargetCard.className = "movie-card";
    addTargetCard.innerHTML = `
    <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
    <h3 class="movie-title">${movie.title}</h3>
    <p class="movie-overview">${movie.overview}</p>
    <br>
    <p class="movie-rating">Rating: ${movie.vote_average}</p>`;
    cardList.appendChild(addTargetCard);
  });

  cardList.addEventListener("click", (event) => {
    const target = event.target;
    if (target === cardList) {
    } else {
      if (target.matches(".movie-card")) {
        alert("Movie id: " + target.id);
      } else {
        alert("Movie id: " + target.parentElement.id);
      }
    }
  });
};

// 검색 시 검색창에 있는 텍스트가 제목에 포함된 영화 카드만 화면에 표시되도록 하는 함수
const handleSearch = (event) => {
  event.preventDefault();
  const movieCards = document.querySelectorAll(".movie-card");

  const searchTerm = searchInput.value.toLowerCase();

  movieCards.forEach((card) => {
    const title = card.querySelector(".movie-title").textContent.toLowerCase();
    console.log(title);

    if (title.includes(searchTerm)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
};

searchForm.addEventListener("submit", handleSearch);

createMovieCards();
