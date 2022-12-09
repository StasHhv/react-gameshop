import React from 'react';
import {Card} from "react-bootstrap";
import styles from './CardItemComponent.module.scss'
import {AppContext} from "../../App";



function CardItemComponent({id, name, imgurl, price, onPlus, onFavorite, favorited = false }) {

  const {isItemAdded} = React.useContext(AppContext);
  const [isFavorite, setIsFavorite] = React.useState(favorited);
  const obj = { id, parentId: id, name, imgurl, price };

  const onClickPlus = () => {
    onPlus(obj);
  };

  const onClickFavorite = () => {
    setIsFavorite(!isFavorite);
    onFavorite(obj);
  };

  return (
    <div className="col-xl-3 mr-30 mb-4">
      <div className={styles.card} >
        <Card>
          <div className={styles.favorite}  onClick={onClickFavorite}>
            {onFavorite && (<img width={60} src={isFavorite ? "/img/liked.svg" : "img/unliked.svg"} alt="Unliked"/>)}
          </div>
          <Card.Img variant="top" src={imgurl}/>
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>
              <span>Ціна</span>
              <br/>
              <strong>{price} грн.</strong>
            </Card.Text>
            {onPlus && ( <img className={styles.plus}
                              onClick={onClickPlus} width={60} height={60}
                              src={isItemAdded(name) ? "/img/btn-checked.svg" : "/img/btn-plus.svg"} alt="Plus"/>)}
          </Card.Body>
        </Card>
      </div>
    </div>
  )
}
export default CardItemComponent;
