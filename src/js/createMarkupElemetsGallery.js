export function createMarkupElemetsGallery({
  id,
  title,
  poster_path,
  release_date = [],
}) {
  return `<div class="photo-card"
  data-id=${id}
  >
  <a class="gallery__item">
    <img
      class="gallery__image"
      loading="lazy"
      src="https://image.tmdb.org/t/p/w1280${poster_path}"
      alt="${title}"

    />
  </a>

  <div class="info">
    <p class="info-title">${title}</p>
    <div class="info-other">
      <p class="info-item">Жанр: </b>Та хер знає</p>
      <p class="info-item">${release_date}</p>
    </div>
  </div>
</div>`;
}
