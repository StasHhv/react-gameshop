import React from "react";
import CardItemComponent from "../components/CardItemComponent";
import {AppContext} from "../App";

function Favorites() {

  const {favorites, onAddToFavorite} = React.useContext(AppContext);

  return (
    <div className="content p-4">
      <div className="align-items-center d-flex mb-4 justify-content-between">
        <h1>Список бажань</h1>
      </div>
      <div className="d-flex flex-wrap justify-content-around">
        {favorites.map((item) => (
          <CardItemComponent
            id={item.id}
            card={item}
            price={item.price}
            name={item.name}
            imgurl={item.imgurl}
            favorited={true}
            onFavorite={onAddToFavorite}
          />
        ))}
      </div>
    </div>) }

export default Favorites;
