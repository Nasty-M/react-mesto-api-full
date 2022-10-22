function PopupWithoutForm({name, title, isOpen, onClose, children}){
  return (
    <div className={`popup popup_type_${name} ${isOpen && 'popup_is-active'}`}>
      <div className="popup__content popup__content_withoutform">
        <button className="popup__close" type="button" aria-label="Закрыть" onClick={onClose}></button>
        {children}
        <h2 className="popup__title popup__title_withoutform">{title}</h2>
      </div>
    </div>
  )
}

export default PopupWithoutForm;