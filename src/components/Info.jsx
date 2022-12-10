import React from 'react'
import {AppContext} from "../App";

const Info = ({title, image, description}) => {
  const {setCartOpened} = React.useContext(AppContext);

  return(
    <div className="cartEmpty d-flex align-items-center justify-content-center flex-column">
      <img className="mb-20" width="120px" src={image} alt="Empty Cart"/>
      <h2>{title}</h2>
      <p className="opacity-25">{description}</p>
      <button onClick={() => setCartOpened(false)} className="greenButton">
        <img src="img/arrow.svg" alt="Arrow"/>
        Вернутись
      </button>
    </div>

  )

}

export default Info;
