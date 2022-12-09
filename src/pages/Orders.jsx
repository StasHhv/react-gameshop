import React from "react";
import CardItemComponent from "../components/CardItemComponent";
import axios from "axios";


function Orders() {
  const [orders, setOrders] = React.useState([]);

  React.useEffect( () => {
    (async () => {
      try
      {const {data} = await axios.get('https://636c2fe6ad62451f9fc53f91.mockapi.io/orders');
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
      } catch (error) {
        alert('Помилка')
        console.error(error);
      }
    })();
  }, []);


  return (
    <div className="content p-4">
      <div className="align-items-center d-flex mb-4 justify-content-between">
        <h1>Ваші замовлення</h1>
      </div>
      <div className="d-flex flex-wrap justify-content-around">
        {orders.map((item) => (
          <CardItemComponent
            id={item.id}
            card={item}
            price={item.price}
            name={item.name}
            imgurl={item.imgurl}
          />
        ))}
      </div>
    </div>) }

export default Orders;
