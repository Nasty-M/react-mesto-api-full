function PopupWithForm({name, title, buttonName, children, isOpen, onClose, onSubmit}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen && 'popup_is-active'}`}>
      <div className="popup__content">
        <button className="popup__close" type="button" aria-label="Закрыть" onClick={onClose}></button>
        <h3 className="popup__title">{title}</h3>
        <form className="popup__form" name={name} onSubmit={onSubmit}>
          {children}
          <button className="popup__button popup__button-save" type="submit">{buttonName}</button>
        </form>
      </div>
    </div>
  )
}

export default PopupWithForm;