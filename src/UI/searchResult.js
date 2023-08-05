import lazyLoad from "../lib/lazyLoad.js";

const SearchResult = ({ $target, initialData, onClick }) => {
  let loading = false;
  let keyword = null;
  let data = initialData;

  const $searchResult = document.createElement("section");
  $searchResult.className = "searchResult";
  $target.appendChild($searchResult);

  const setState = (nextData) => {
    loading = nextData.loading;
    keyword = nextData.keyword;
    data = nextData.data;
    render();
    lazyLoad();
  };

  const render = () => {
    const $randomBanner = $searchResult.previousElementSibling;
    if (loading && data.length !== 0) {
      $randomBanner.style.display = "flex";
      localStorage.setItem("keyword", keyword);
      $searchResult.innerHTML = data
        .map(
          (cat) => `
          <article class="item">
            <img class="lazy" data-src=${cat.url} alt=${cat.name} />
            <span>${cat.name}</span>
          </article>
        `
        )
        .join("");

      $searchResult.querySelectorAll(".item").forEach(($item, index) => {
        $item.addEventListener("click", () => {
          onClick(data[index]);
        });
      });
    } else if (loading && data.length === 0) {
      $randomBanner.style.display = "none";
      localStorage.setItem("keyword", keyword);
      $searchResult.innerHTML = `
        <div>'${keyword}'라는 키워드를 찾을 수 없습니다.</div>
      `;
    }
  };

  render();
  lazyLoad();

  return { setState };
};

export default SearchResult;
