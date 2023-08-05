const SearchHist = ({ $target, onSearch }) => {
  const localKeywords = localStorage.getItem("keywords");
  let keywords =
    typeof localKeywords?.split(",") === "undefined"
      ? []
      : localKeywords.split(",");
  let htmlStr = "";

  const $searchHist = document.createElement("div");
  $searchHist.className = "searchHist";
  $target.appendChild($searchHist);

  const setKeywords = (value) => {
    keywords = keywords.filter(
      (keyword) => keyword !== value && keyword !== ""
    );
    keywords.push(value);
    localStorage.setItem("keywords", keywords);
  };

  const render = () => {
    htmlStr = "";

    localStorage
      .getItem("keywords")
      ?.split(",")
      .reverse()
      .some((keyword, index) => {
        if (index < 5)
          htmlStr += `
          <article class="keyword">
            <span>${keyword}</span>
            <button class="closeBtn">X</button>
          </article>
        `;
      });

    $searchHist.innerHTML = htmlStr;

    $searchHist.style.display = "block";

    $searchHist.querySelectorAll(".keyword")?.forEach(($keyword) => {
      $keyword.addEventListener("click", (e) => {
        if (e.target.className === "closeBtn") {
          keywords = keywords.filter(
            (keyword) =>
              e.target.previousElementSibling.innerText !== keyword &&
              keyword !== ""
          );
          localStorage.setItem("keywords", keywords);
          render();
        } else {
          const keyword = $keyword.querySelector("span").innerText;
          $target.firstChild.value = keyword;
          setKeywords(keyword);
          onSearch(keyword);
          $searchHist.style.display = "none";
        }
      });
    });
  };

  return { setKeywords, render };
};

export default SearchHist;
