import { Link } from "react-router-dom";
import {AppContext} from "../App";
import React from "react";

function Header(props){

  const { cartItems } = React.useContext(AppContext)
  const totalPrice  = cartItems.reduce((sum, obj) => obj.price + sum, 0)


  return (
    <header className="header d-flex justify-content-between align-content-center p-4">
      <div className="d-flex align-items-center">
        <Link to="/">
          <img className="gamepad" alt="logo" width={50} height={50} src="img/logo.svg"/>
        </Link>
        <div>
          <h3 className="mb-0 fw-bold">GameShop</h3>
          <p className="mb-0 opacity-50">Магазин ігр</p>
        </div>
      </div>
      <ul className="d-flex align-items-center">
        <li onClick={props.onClickCart} className="mr-30 cu-p">
          <img className="m-2" alt="cart" width={35} height={35} src="img/cart.svg"/>
          <span>{totalPrice} грн.</span>
        </li>
        <li>
          <Link to="/favorites">
            <img className="cu-p mr-20" alt="heart" width={35} height={35} src="img/heart.svg"/>
          </Link>
        </li>
        <li>
          <Link to="/orders">
            <img className="cu-p" alt="user" width={35} height={35} src="img/user.svg"/>
          </Link>
        </li>
      </ul>
    </header >);
}

export default Header;
