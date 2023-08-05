const ImageInfo = ({ $target, initialData }) => {
  let data = initialData;

  const $imageInfo = document.createElement("div");
  $imageInfo.className = "imageInfo";
  $target.appendChild($imageInfo);

  const setState = (nextData) => {
    data = nextData;
    render();
  };

  const closeModal = () => {
    $imageInfo.style.display = "none";
    $target.parentElement.classList.remove("noScroll");
  };

  const render = () => {
    if (data.visible) {
      const { name, url, temperament, origin } = data.image;
      $target.parentElement.classList.add("noScroll");

      $imageInfo.innerHTML = `
        <article class="contentWrap">
          <div class="title">
            <span>${name}</span>
            <button class="closeBtn">x</button>
          </div>
          <img src="${url}" alt="${name}"/>        
          <div class="descript">
            <div>성격: ${temperament}</div>
            <div>태생: ${origin}</div>
          </div>
        </article>`;

      $imageInfo.style.display = "block";

      window.addEventListener("click", (e) => {
        if (
          e.target.className === "imageInfo" ||
          e.target.className === "closeBtn"
        ) {
          closeModal();
        }
      });

      window.addEventListener("keyup", (e) => {
        if (e.key === "Escape") {
          closeModal();
        }
      });
    } else {
      closeModal();
    }
  };

  render();

  return { setState };
};

export default ImageInfo;
