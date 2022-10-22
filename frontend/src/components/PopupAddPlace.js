import PopupWithForm from "./PopupWithForm";
import { useState, useEffect } from "react";

function PopupAddPlace({isOpen, onClose, onAddPlace}) {
  
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    setName('');
    setLink('');
  }, [isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
  
    // Передаём значения управляемых компонентов во внешний обработчик
    onAddPlace({
      name,
      link,
    });
  }

  return(
    <PopupWithForm 
      name='add' 
      title='Новое место' 
      buttonName='Создать' 
      isOpen={isOpen} 
      onClose={onClose}
      onSubmit={handleSubmit}>
      <div className="popup__label">
        <input 
          className="popup__input popup__input_type_place-title" 
          id="input-title" 
          type="text" 
          placeholder="Название" 
          name="name" 
          minLength="2" 
          maxLength="30" 
          required 
          onChange={handleChangeName} 
          value={name}/>
        <span className="popup__error-message input-title-error"></span>
      </div>
      <div className="popup__label">
        <input 
          className="popup__input popup__input_type_place-link" 
          type="url" 
          placeholder="Ссылка на картинку" 
          name="link"
          required
          id="input-link" 
          onChange={handleChangeLink} 
          value={link}/>
        <span className="popup__error-message input-link-error"></span>
      </div>
    </PopupWithForm>
  )
} 

export default PopupAddPlace;