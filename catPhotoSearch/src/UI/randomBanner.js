import api from "../lib/api.js";

const randomBanner = ({ $target }) => {
  let data = [];
  let imgIdx = 0;

  const $randomBanner = document.createElement("section");
  $randomBanner.className = "randomBanner";
  $target.appendChild($randomBanner);
  api.fetchRandom().then(({ data }) => setState(data));

  const $bannerWrapper = document.createElement("article");
  $bannerWrapper.className = "bannerWrapper";
  $randomBanner.appendChild($bannerWrapper);

  const $bannerSlider = document.createElement("div");
  $bannerSlider.className = "bannerSlider";
  $bannerWrapper.appendChild($bannerSlider);

  const $btnGroup = document.createElement("buttons");
  $btnGroup.className = "btnGroup";
  $randomBanner.appendChild($btnGroup);

  const setState = (newData) => {
    data = newData.slice(0, 5);
    render();
  };

  const render = () => {
    $bannerSlider.innerHTML = data
      .map((cat) => `<img class="randomImg" src="${cat.url}">`)
      .join("");

    $btnGroup.innerHTML = `
      <button class="leftBtn"><</button>
      <button class="rightBtn">></button>
    `;

    const $leftBtn = $randomBanner.querySelector(".leftBtn");
    $leftBtn.addEventListener("click", () => {
      imgIdx -= 1;
      if (imgIdx < 0) {
        imgIdx += data.length;
      }
      $bannerSlider.style.transform = `translate(-${imgIdx * 100}%)`;
    });

    const $rightBtn = $randomBanner.querySelector(".rightBtn");
    $rightBtn.addEventListener("click", () => {
      imgIdx += 1;
      if (imgIdx > data.length - 1) {
        imgIdx -= data.length;
      }
      $bannerSlider.style.transform = `translate(-${imgIdx * 100}%)`;
    });
  };
};

export default randomBanner;
