import Main from './Main';
import ImagePopup from './ImagePopup';
import { useEffect, useState } from 'react';
import PopupEditProfile from './PopupEditProfile';
import PopupAddPlace from './PopupAddPlace';
import PopupEditAvatar from './PopupEditAvatar';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import ProtectedRoute from "./ProtectedRoute";
import { api } from '../utils/Api';
import { Switch, Route, withRouter } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import registerApi from '../utils/RegisterApi';
import InfoToolTip from './InfoToolTip';

function App(props) {

  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [pageData, setPageData] = useState(false);
  const [popupOpened, setPopupOpened] = useState(false);
  const [popupWithoutForm, setPopupWithoutForm] = useState(false);
  const isOpen = isEditAvatarPopupOpen || isEditProfilePopupOpen || isAddPlacePopupOpen || selectedCard.link


  useEffect(() => {
    if (loggedIn) {
      api.getUserInfo()
      .then((userInfo) => {
        setCurrentUser(userInfo);
      })
      .catch((err) => {
        console.log(`Ошибка ${err}. Запрос не выполнен`);
      })
    }
    
  }, [loggedIn])

  useEffect(() => {
    if (loggedIn) {
      api.getInitialCards()
      .then((data) => {
        setCards(data);
      })
      .catch((err) => {
        console.log(`Ошибка ${err}. Запрос не выполнен`);
      })
    }
  }, [loggedIn])

  function handleCardLike(card) {
    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.toggleLike(card._id, isLiked).then((newCard) => {
        setCards((state) => state.map((c) => {
          return c._id === card._id ? newCard : c}));
    })
    .catch((err) => {
      console.log(`Ошибка ${err}. Запрос не выполнен`);
    })    
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(() => {
      setCards((state) => state.filter(item => item._id !== card._id))
    })
    .catch((err) => {
      console.log(`Ошибка ${err}. Запрос не выполнен`);
    })
  }
  
  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  };
  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  };
  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  };
  function handlePopupWithoutForm(result) {
    setPopupOpened(result);
    setPopupWithoutForm(true);
  };
  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard({});
  };
  function handleCardClick(card) {
    setSelectedCard(card)
  };

  useEffect(() => {
    function closeByEscape(evt) {
      if(evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    if(isOpen) {
      document.addEventListener('keydown', closeByEscape);
      return () => {
        document.removeEventListener('keydown', closeByEscape);
      }
    }
  }, [isOpen]) 


  function handleUpdateUser(data) {
    api.editUserInfo(data)
    .then((userInfo) => {
      setCurrentUser(userInfo);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(`Ошибка ${err}. Запрос не выполнен`);
    })
  }

  function handleUpdateAvatar(data) {
    api.updAvatar(data)
    .then((userInfo) => {
      setCurrentUser(userInfo);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(`Ошибка ${err}. Запрос не выполнен`);
    })
  }

  function handleAddPlaceSubmit(data) {
    api.addNewCard(data)
    .then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(`Ошибка ${err}. Запрос не выполнен`);
    })
  }

  function handleRegisterUser(data) {
    registerApi.register(data)
    .then((res) => {
      handlePopupWithoutForm(true);
      return res;
    })
    .catch((err) => {
      handlePopupWithoutForm(false);
      console.log(`Ошибка ${err}. Запрос не выполнен`);
    })
  }

  function handleLoginUser(data) {
    registerApi.auth(data)
    .then((res) => {
      setLoggedIn(true);
      props.history.push('/');
    })
    .catch((err) => {
      handlePopupWithoutForm(false);
      console.log(`Ошибка ${err}. Запрос не выполнен`);
    })
  }

  function checkToken() {
    api.getUserInfo()
    .then((data) => {
      if (data) {
        setCurrentUser(data)
        const userData = {
          'email': data.email,
        }
        setPageData(userData);
        setLoggedIn(true)
        props.history.push('/')
        
      }
    })
    .catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    checkToken();
  }, [])

  function logout() {
    api.logout()
    .then(() => {
      document.cookie = "access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      setLoggedIn(false);
      props.history.push('/sign-in');
    })
    .catch((err) => {
      console.log(err);
    })
  }

  function closePopupWithoutForm() {
    setPopupWithoutForm(false);
    props.history.push('/');
  }
  
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Switch>
          <Route path="/sign-in">
            <Login onLoginUser={handleLoginUser} />
          </Route>
          <Route path="/sign-up">
            <Register onRegisterUser={handleRegisterUser} />
          </Route>
          <ProtectedRoute exact 
            path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditAvatar={handleEditAvatarClick} 
            onEditProfile={handleEditProfileClick} 
            onAddPlace={handleAddPlaceClick}
            onCardClick={handleCardClick}
            cards={cards}
            onCardLike={handleCardLike}
            onCardDelete={handleCardDelete}
            headerLinkName='Выйти'
            headerLinkUrl='/sign-in'
            onClick={logout}
            pageData={pageData.email}
          />
        </Switch>
        
        <ImagePopup 
          name='image' 
          card={selectedCard} 
          onClose={closeAllPopups}/>
        <PopupEditProfile isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/>
        <PopupAddPlace isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
        <PopupEditAvatar isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <InfoToolTip isOpen={popupWithoutForm} onClose={closePopupWithoutForm} answer={popupOpened} />
      </div>
    </CurrentUserContext.Provider>
    
  );
}

export default withRouter(App);
