import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import { Liked } from "./component/Liked";

import close from "./assets/VectorClose.svg";
import like from "./assets/like.svg";
import favorite from "./assets/favorite.svg";

function App() {
  const [filter, setFilter] = useState(false);

  const URL = "https://cataas.com";

  useEffect(() => {
    for (let i = 0; i < 25; i++) {
      axios
        .get("https://cataas.com/cat?json=true")
        .then(({ data }) => addImg(URL + data.url, data.createdAt, data._id));
    }
  }, []);

  const dispatch = useDispatch();
  const dataLists = useSelector((state) => state.dataLists);

  console.log(dataLists);
  const addImg = (url, date, id) => {
    var dateNew = new Date(date);
    const img = {
      url: url,
      date: dateNew.toLocaleString("ru"),
      like: false,
      id: id,
    };
    dispatch({ type: "ADD__DATA", payload: img });
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
      <button onClick={() => setFilter(e => !e)}>Filter</button>
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
                {list.like ? <img
                  src={favorite}
                  alt="favorite"
                  onClick={() => likeCard(list.id)}
                  className="content__cards__card__like"
                /> :  <img
                src={like}
                alt="like"
                onClick={() => likeCard(list.id)}
                className="content__cards__card__like"
              />}
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
