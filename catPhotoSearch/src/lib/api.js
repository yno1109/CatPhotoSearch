const API_END_POINT =
  "https://q9d70f82kd.execute-api.ap-northeast-2.amazonaws.com/dev";

const checkStatus = async (url) => {
  try {
    const res = await fetch(url);
    if (res.status === 500) {
      throw new Error("서버 응답 오류");
    }
    return res.json();
  } catch (e) {
    console.error(`오류: ${e.message}`);
  }
};

const api = {
  fetchCats: (keyword) =>
    checkStatus(`${API_END_POINT}/api/cats/search?q=${keyword}`),
  fetchCat: (id) => checkStatus(`${API_END_POINT}/api/cats/${id}`),
  fetchRandom: () => checkStatus(`${API_END_POINT}/api/cats/random50`),
};

export default api;
