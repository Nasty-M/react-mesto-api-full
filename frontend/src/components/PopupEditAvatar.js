import PopupWithForm from "./PopupWithForm";
import { useRef } from "react";

function PopupEditAvatar({isOpen, onClose, onUpdateAvatar}) {
  
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
  
    onUpdateAvatar({
      avatar: avatarRef.current.value /* Значение инпута, полученное с помощью рефа */,
    });
  }

  return(
    <PopupWithForm 
      name='avatar' 
      title='Обновить аватар' 
      buttonName='Сохранить' 
      isOpen={isOpen} 
      onClose={onClose}
      onSubmit={handleSubmit}>
      <div className="popup__label">
        <input 
          className="popup__input popup__input_type_avatar-link" 
          type="url" 
          placeholder="Ссылка на фото" 
          name="avatar"
          required
          id="input-avatar" 
          ref={avatarRef}/>
        <span className="popup__error-message input-avatar-error"></span>
      </div>
    </PopupWithForm>
  )
} 

export default PopupEditAvatar;