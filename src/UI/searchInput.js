import SearchHist from "./searchHist.js";

const SearchInput = ({ $target, onSearch }) => {
  const $searchInput = document.createElement("input");
  $searchInput.placeholder = "고양이를 검색해보세요.|";

  $searchInput.className = "searchInput";
  $target.appendChild($searchInput);
  $searchInput.focus();

  const searchHist = SearchHist({ $target, onSearch });
  const $searchHist = document.querySelector(".searchHist");
  $searchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      onSearch(e.target.value);
      $searchInput.blur();

      searchHist.setKeywords(e.target.value);
      $searchHist.style.display = "none";
    }
  });

  $searchInput.addEventListener("focus", (e) => {
    if (e.target.value !== "") {
      e.target.value = null;
    }
    searchHist.render();
  });
};

export default SearchInput;
