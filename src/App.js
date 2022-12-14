import React from 'react';
import axios from "axios";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";

export const AppContext = React.createContext({});

function App() {

  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false);

  React.useEffect(() => {
    async function fetchData(){
      const cartResponse = await  axios.get('https://636c2fe6ad62451f9fc53f91.mockapi.io/cart');
      const favoritesResponse = await  axios.get('https://636c2fe6ad62451f9fc53f91.mockapi.io/favorites');
      const itemsResponse = await axios.get('https://636c2fe6ad62451f9fc53f91.mockapi.io/items');


      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
      setItems(itemsResponse.data);
    }
    fetchData()
  }, []);

  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
      if (findItem) {
        setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
        await axios.delete(`https://636c2fe6ad62451f9fc53f91.mockapi.io/cart/${findItem.id}`);
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post('https://636c2fe6ad62451f9fc53f91.mockapi.io/cart/', obj);
        setCartItems((prev) => prev.map((item) => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
            return item;
          }),
        );
      }
    } catch (error) {
      alert('Помилка при добавленні в кошик');
      console.error(error);
    }
  };

  const onAddToFavorite = async (obj) => {
    try {
      if(favorites.find((item) => Number(item.id) === Number(obj.id))) {
        axios.delete(`https://636c2fe6ad62451f9fc53f91.mockapi.io/favorites/${obj.id}`);
        setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
      } else {
        const {data} = await axios.post('https://636c2fe6ad62451f9fc53f91.mockapi.io/favorites', obj);
        setFavorites((prev) =>[...prev, data]);
      }}
    catch(error) {
      alert('Не вдалось додати');
    }
  }

  const onRemoveItem = (id) => {
    axios.delete(`https://636c2fe6ad62451f9fc53f91.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter(item => item.id !== id ));
  }

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  }

  const isItemAdded = (name) => {
    return cartItems.some(obj => obj.name === name);
  }

  const isFavorite = (name) => {
    return favorites.some(obj => obj.name === name);
  }


  return (
    <AppContext.Provider value={{items, cartItems, favorites, isItemAdded, onAddToFavorite, setCartOpened, onAddToCart , setCartItems, isFavorite}}>
      <div className="wrapper">
        {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened (false)} onRemove={onRemoveItem}/> }
        <Header onClickCart={() => setCartOpened (true)}  />

        <Routes>
          <Route path="" element={<Home
            items={items}
            cartItems={cartItems}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onChangeSearchInput={onChangeSearchInput}
            onAddToFavorite={onAddToFavorite}
            onAddToCart={onAddToCart} />}
          />
          <Route path="favorites" element={
            <Favorites/>}
          />
          <Route path="orders" element={
            <Orders/>}
          />
        </Routes>


      </div>
    </AppContext.Provider>
  );
}

export default App;
