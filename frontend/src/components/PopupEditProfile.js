import PopupWithForm from "./PopupWithForm";
import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function PopupEditProfile({isOpen, onClose, onUpdateUser}) {

  const [name, setName] = useState('');
  const [description , setDescription ] = useState('');
  // Подписка на контекст
  const currentUser = useContext(CurrentUserContext);

  // После загрузки текущего пользователя из API
  // его данные будут использованы в управляемых компонентах.
  useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleChangeName(e) {
    setName(e.target.value);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();
  
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name,
      about: description,
    });
  }

  return(
    <PopupWithForm 
      name='edit' 
      title='Редактировать профиль' 
      buttonName='Сохранить' 
      isOpen={isOpen} 
      onClose={onClose}
      onSubmit={handleSubmit}>
      <div className="popup__label">
        <input 
          className="popup__input popup__input_type_name" 
          type="text" 
          placeholder="Имя" 
          name="name" 
          minLength="2" 
          maxLength="40" 
          required
          id="input-name" 
          onChange={handleChangeName}
          value={name || ''}/>
        <span className="popup__error-message input-name-error"></span>
      </div>
      <div className="popup__label">
        <input 
          className="popup__input popup__input_type_about" 
          type="text" 
          placeholder="О себе" 
          name="about" 
          minLength="2" 
          maxLength="200" 
          required
          id="input-about" 
          onChange={handleChangeDescription}
          value={description || ''}/>
        <span className="popup__error-message input-about-error"></span>
      </div>
    </PopupWithForm>
  )
} 

export default PopupEditProfile;