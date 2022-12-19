import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import { Liked } from "./component/Liked";

import close from "./assets/VectorClose.svg";
import like from "./assets/like.svg";
import favorite from "./assets/favorite.svg";

function App() {
  const [filter, setFilter] = useState(false);
  const [currentCount, setCurrentCount] = useState(20);
  const [fetching, setFetching] = useState(true);

  const URL = "https://cataas.com/cat/";

  const dispatch = useDispatch();
  const dataLists = useSelector((state) => state.dataLists);

  useEffect(() => {
    if (fetching && !filter) {
      axios
        .get(`https://cataas.com/api/cats?limit=${currentCount}`)
        .then(({ data }) => {
          addImg(data.slice(currentCount - 20))
          setCurrentCount((prev) => prev + 20);
        })
        .finally(() => setFetching(false));
    }
  }, [fetching]);

  
  useEffect(() => {
    document.addEventListener("scroll", scrollHandler);
    return () => {
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      setFetching(true);
    }
  };


  const addImg = (data) => {
    for (let i in data) {
      var dateNew = new Date(data[i].createdAt);
      const img = {
        url: URL + data[i]._id,
        date: dateNew.toLocaleString("ru"),
        like: false,
        id: data[i]._id,
      };
      dispatch({ type: "ADD__DATA", payload: img });
    }
  };

  const removeCard = (id) => {
    dispatch({ type: "DELETE__DATA", payload: id });
  };
  const likeCard = (id) => {
    dispatch({ type: "LIKE", payload: id });
  };

  return (
    <div className="App">
      <header>
        <h1>Все любят котиков</h1>
      </header>
      <button onClick={() => setFilter((e) => !e)}>Filter</button>
      <div className="content">
        {filter ? (
          <Liked />
        ) : (
          <ul className="content__cards">
            {dataLists.map((list, index) => (
              <li className="content__cards__card" key={index}>
                <img
                  src={close}
                  onClick={() => removeCard(list.id)}
                  alt="close"
                  className="content__cards__card__close"
                />
                {list.like ? (
                  <img
                    src={favorite}
                    alt="favorite"
                    onClick={() => likeCard(list.id)}
                    className="content__cards__card__like"
                  />
                ) : (
                  <img
                    src={like}
                    alt="like"
                    onClick={() => likeCard(list.id)}
                    className="content__cards__card__like"
                  />
                )}
                <img
                  src={list.url}
                  alt="img"
                  className="content__cards__card__cat"
                />
                <span>{list.date}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default App;
