const API_KEY = 'DEMO_KEY'; 
const API_URL = 'https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos';

let currentPage = 1;
let currentDate = '2015-07-02';

// Get references to elements
const searchBtn = document.getElementById('search-btn');
const earthDateInput = document.getElementById('earth-date');
const photosTableBody = document.getElementById('photos-table').querySelector('tbody');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const pageNumDisplay = document.getElementById('page-num');
const photoImg = document.getElementById('photo-img');
const photoInfo = document.getElementById('photo-info');

searchBtn.addEventListener('click', () => {
  currentDate = earthDateInput.value;
  currentPage = 1;
  fetchPhotos();
});

prevBtn.addEventListener('click', () => {
  if (currentPage > 1) {
    currentPage--;
    fetchPhotos();
  }
});

nextBtn.addEventListener('click', () => {
  currentPage++;
  fetchPhotos();
});

function fetchPhotos() {
  const url = `${API_URL}?earth_date=${currentDate}&api_key=${API_KEY}&page=${currentPage}`;
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      displayPhotos(data.photos);
      updatePagination();
    })
    .catch(error => console.error('Error fetching data:', error));
}

function displayPhotos(photos) {
  photosTableBody.innerHTML = '';
  if (photos.length > 0) {
    photos.forEach(photo => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${photo.id}</td>
        <td>${photo.rover.name}</td>
        <td>${photo.camera.name}</td>
        <td><button id="more-btn" onclick="showPhotoDetail(${photo.id}, '${photo.img_src}', '${photo.earth_date}', '${photo.camera.full_name}')">More</button></td>
      `;
      photosTableBody.appendChild(row);
    });
    showPhotoDetail(photos[0].id, photos[0].img_src, photos[0].earth_date, photos[0].camera.full_name);
  } else {
    photosTableBody.innerHTML = '<tr><td colspan="4">No photos found.</td></tr>';
  }
}

function updatePagination() {
  pageNumDisplay.textContent = `Page: ${currentPage}`;
}

function showPhotoDetail(id, imgSrc, earthDate, camera) {
  photoImg.src = imgSrc;
  photoInfo.textContent = `ID: ${id}, Earth Date: ${earthDate}, Camera: ${camera}`;
}


document.addEventListener("DOMContentLoaded", function () {
    const earthDateInput = document.getElementById("earth-date");
  
    // Configura la fecha inicial
    if (!earthDateInput.value) {
      earthDateInput.value = "2015-07-02";
    }
  
    // Agregar un botón de reset para restablecer la fecha predeterminada
    const resetBtn = document.createElement("button");
    resetBtn.textContent = "Reset Date";
    resetBtn.id = "reset-btn";
    document.querySelector(".search").appendChild(resetBtn);
  
    // Evento para resetear la fecha
    resetBtn.addEventListener("click", function () {
      earthDateInput.value = "2015-07-02";
    });
  });
  


// carga inicial
fetchPhotos();
