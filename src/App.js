import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [searchvalue, setSearchValue] = useState();
  const [data, setdata] = useState([]);
  let timerId;
  function debounce(e, cbfunc, delay) {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
      cbfunc(e);
    }, delay);
  }
  const getData = async (e = 0) => {
    try {
      let data = await fetch(
        `http://localhost:8000/getAds?searchValue=${e ? e.target.value : ""}`
      );
      data = await data.json();
      setdata(data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    let data = getData();

    console.log("l");
  }, []);
  return (
    <div className="App">
      <input
        type="search"
        placeholder="search ads"
        onInput={(e) => debounce(e, getData, 2000)}
      />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "20px",
          marginLeft: "20px",
          marginTop: "20px",
        }}
      >
        {data.map((el) => {
          return (
            <>
              <div className="card" style={{ width: "18rem" }}>
                <img src={el.imageUrl} className="card-img-top" alt="..." />
                <div className="card-body">
                  <h5 className="card-title">{el.primaryText}</h5>
                  <p className="card-text">
                    {el.description ? el.description : el.headline}
                  </p>
                  <a href="#" className="btn btn-primary">
                    Go somewhere
                  </a>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
}

export default App;
