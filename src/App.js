import api from "./lib/api.js";
import SearchBox from "./UI/searchBox.js";
import RandomBanner from "./UI/randomBanner.js";
import SearchResult from "./UI/searchResult.js";
import ImageInfo from "./UI/imageInfo.js";

const App = ($target) => {
  let data = [];

  const onSearch = (keyword) => {
    api
      .fetchCats(keyword)
      .then(({ data }) => setState({ data, keyword, loading: true }));
  };

  const onClick = (image) => {
    api.fetchCat(image.id).then(({ data }) =>
      $imageInfo.setState({
        visible: true,
        image: data,
      })
    );
  };

  const $searchBox = SearchBox({
    $target,
    onSearch: (keyword) => onSearch(keyword),
  });

  const $randomBanner = RandomBanner({ $target });

  const $searchResult = SearchResult({
    $target,
    initialData: data,
    onClick: (image) => onClick(image),
  });

  const $imageInfo = ImageInfo({
    $target,
    initialData: {
      visible: false,
      image: null,
    },
  });

  const setState = (nextData) => {
    data = nextData;
    $searchResult.setState(nextData);
  };

  window.addEventListener("load", () => {
    const keyword = localStorage.getItem("keyword");
    if (keyword !== null) {
      const $searchInput = $target.querySelector(".searchInput");
      $searchInput.value = keyword;
      $searchInput.blur();
      onSearch(keyword);
    }
  });
};

export default App;
