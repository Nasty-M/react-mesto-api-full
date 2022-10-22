import PopupWithoutForm from "./PopupWithoutForm";
import successIcon from '../images/success.png';
import errorIcon from '../images/fail.png';

function InfoToolTip(props) {
  return (
    <PopupWithoutForm
      name="result"
      title={
        props.answer
          ? "Вы успешно зарегистрировались!"
          : "Что-то пошло не так! Попробуйте ещё раз."
      }
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <img src={props.answer ? successIcon : errorIcon} alt={props.answer ? "Успех" : "Ошибка"} className="popup__icon" />
    </PopupWithoutForm>
  )  
}

export default InfoToolTip;