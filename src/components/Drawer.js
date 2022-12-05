import React from 'react';
import Info from "./Info";
import {AppContext} from "../App";
import axios from "axios";

function Drawer({onClose, onRemove, items = []}) {

  const {setCartItems, cartItems} = React.useContext(AppContext);
  const  [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const  [orderId, setOrderId] = React.useState(null);
  const totalPrice  = cartItems.reduce((sum, obj) => obj.price + sum, 0)


  const onClickOrder = async () => {
    try {
    const {data} = await axios.post('https://636c2fe6ad62451f9fc53f91.mockapi.io/orders', {
      items: cartItems
  });
      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete('https://636c2fe6ad62451f9fc53f91.mockapi.io/cart/' + item.id)
      }
    } catch (error) {
      alert('Не вдалось зробити замовлення');
    }
  };

  return (
    <div className="overlay">
      <div className="drawer">
        <h2 className="mb-4 d-flex justify-content-between">Кошик
          <img onClick={onClose} src="/img/btn-remove.svg" alt= "Remove"/>
        </h2>

        {items.length > 0 ? (
          <div className="d-flex flex-column flex">
          <div className="items">
              {
                items.map((obj) => (
                  <div key={obj.id} className="mb-3 cartItem align-items-center">
                    <div style={{backgroundImage: `url(${obj.imgurl})`}}
                         className="cartItemImg"></div>
                    <div className="mr-20">
                      <p className="mb-0">{obj.name}</p>
                      <b>{obj.price} грн</b>
                    </div>
                    <img onClick={() => onRemove(obj.id)} className="removeBtn" src="/img/btn-remove.svg" alt= "Remove"/>
                  </div>
                ))
              }
            </div>

            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Разом:</span>
                  <div></div>
                  <b>{totalPrice} грн.</b>
                </li>
              </ul>
              <button onClick={onClickOrder} className="greenButton">Оформити замовлення<img src="/img/arrow.svg" alt="arrow"/></button>
            </div>
          </div>
          ): (<Info title={isOrderComplete ? "Замовлення оформлено!" : "Кошик пустий"}
                    description={isOrderComplete ? `Ваше замовлення №${orderId} скоро надійде вам на електронну пошту`:"Добавте хоча б одну гру, щоб зробити замовлення"}
                    image={isOrderComplete ? "/img/complete-order.jpg":"/img/empty-cart.jpg"}/>)}

          </div>
        }




    </div>
  )
}
export default Drawer;
