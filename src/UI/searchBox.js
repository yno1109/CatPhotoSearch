import SearchInput from "./searchInput.js";

const SearchBox = ({ $target, onSearch }) => {
  const $searchBox = document.createElement("section");
  $searchBox.className = "searchBox";
  $target.appendChild($searchBox);

  SearchInput({ $target: $searchBox, onSearch });

  const $searchHist = $searchBox.lastChild;
  window.addEventListener("click", (e) => {
    if (!$searchBox.contains(e.target)) {
      $searchHist.style.display = "none";
    }
  });
};

export default SearchBox;
