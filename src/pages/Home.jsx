import CardItemComponent from "../components/CardItemComponent";
import React from "react";


function Home({ items,
                searchValue,
                onChangeSearchInput,
                onAddToFavorite,
                onAddToCart,
              })
{

  return (
    <div className="content p-4">
      <div className="align-items-center d-flex mb-4 justify-content-between">
        <h1>Всі ігри</h1>
        <div className="search-block">
          <img src="/img/search.svg" alt="Search"/>
          <input onChange={onChangeSearchInput} value={searchValue} placeholder="Пошук.."/>
        </div>
      </div>
      <div className="d-flex flex-wrap justify-content-around">
        {items
          .filter((item) => item.name.toLowerCase().includes(searchValue.toString().toLowerCase()))
          .map((item) => {
            return (
              <CardItemComponent
                id={item.id}
                card={item}
                price={item.price}
                name={item.name}
                imgurl={item.imgurl}
                onPlus={(obj) => onAddToCart(obj)}
                onFavorite={(obj) => onAddToFavorite(obj)}

              />
            );
          })}
      </div>
    </div>) }

export default Home;
