import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({onCardClick, card, onCardLike, onCardDelete}) {

  const currentUser = useContext(CurrentUserContext);
  // Определяем, являемся ли мы владельцем текущей карточки
  const isOwn = card.owner === currentUser._id;

  // Создаём переменную, которую после зададим в `className` для кнопки удаления
  const cardDeleteButtonClassName = (
    `gallery__delete ${isOwn && 'gallery__delete_visible'}`
  );

  // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
  const isLiked = card.likes.some(i => i === currentUser._id);

  // Создаём переменную, которую после зададим в `className` для кнопки лайка
  const cardLikeButtonClassName = (
    `gallery__like ${isLiked && 'like-is-active'}`
  );

  function handleClick() {
    onCardClick(card);
  } 

  function handleLikeClick() {
    onCardLike(card);
  }

  function handleCardDelete() {
    onCardDelete(card);
  }

  return(
    <li className="gallery__element">
      <button type="button" className={cardDeleteButtonClassName} onClick={handleCardDelete} aria-label="Удалить"></button>
      <div className="gallery__container">
        <a href="#" className="gallery__link" onClick={handleClick}>
          <img className="gallery__picture" src={card.link} alt={card.name}/>
        </a>
      </div>
      <div className="gallery__card">
        <h2 className="gallery__title">{card.name}</h2>
        <div className="gallery__like-info">
          <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick} aria-label="Лайк"></button>
          <p className="gallery__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </li>
  ) 
}

export default Card;