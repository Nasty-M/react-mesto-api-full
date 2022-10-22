function ImagePopup({name, card, onClose}) {
  return (
    <div className={`popup popup_type_${name} ${card.name && 'popup_is-active'}`}>
      <div className="popup__card-image">
        <button className="popup__close" type="button" aria-label="Закрыть" onClick={onClose}></button>
        <img src={card.link} alt={card.name} className="popup__image" />
        <p className="popup__image-title">{card.name}</p>
      </div>
    </div>
  )
}

export default ImagePopup;