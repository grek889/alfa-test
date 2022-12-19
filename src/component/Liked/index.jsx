import React from "react";
import { useDispatch, useSelector } from "react-redux";

import close from "../../assets/VectorClose.svg";
import like from "../../assets/like.svg";
import favorite from "../../assets/favorite.svg";

export const Liked = () => {
  const dataLists = useSelector((state) => state.dataLists);

  const dispatch = useDispatch();

  const newList = dataLists.filter((list) => list.like === true);

  const removeCard = (id) => {
    dispatch({ type: "DELETE__DATA", payload: id });
  };
  const likeCard = (id) => {
    dispatch({ type: "LIKE", payload: id });
  };

  return (
    <div>
      <ul className="content__cards">
        {newList.map((list, index) => (
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
    </div>
  );
};
