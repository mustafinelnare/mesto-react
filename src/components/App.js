import React from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import api from '../utils/Api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {

  const [ isEditProfilePopupOpen, setIsEditProfilePopupOpen ] = React.useState(false);
  const [ isAddPlacePopupOpen, setIsAddPlacePopupOpen ] = React.useState(false);
  const [ isEditAvatarPopupOpen, setIsEditAvatarPopupOpen ] = React.useState(false);
  const [ selectedCard, setSelectedCard ] = React.useState({});
  const [ currentUser, setCurrentUser] = React.useState({ name: '', about: '' });
  const [ cards, setCards ] = React.useState([]);

  React.useEffect(() => {
    api.getDataUser().then((userData) => {
      setCurrentUser(userData);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  React.useEffect(() => {
    api.getInitialCards()
      .then((initialCards) => {
          setCards(initialCards);
      })
      .catch((err) => {
          console.log(err);
      });
  }, []);

  function handleCardLike(cardId, likes) {
    const isLiked = likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(cardId, !isLiked).then((newCard) => {
        setCards((state) => state.map((c) => c._id === cardId ? newCard : c));
    });
  }

  function handleAddPlaceSubmit(cardData) {
    api.addCard(cardData).then((newCard) => {
      setCards([newCard, ...cards]);
      closeAllPopups();
    }).catch((err) => {
      console.log(err);
    });
  }

  function handleUpdateUser(userData) {
    api.saveDataInfo(userData).then((updateUser) => {
      setCurrentUser(updateUser);
      closeAllPopups();
    })
    .catch((error) => {
      console.log(error);
    })
  }

  function handleUpdateAvatar(userData) {
    api.saveDataProfile(userData).then((userAvatar) => {
      setCurrentUser(userAvatar);
      closeAllPopups();
    })
    .catch((error) => {
      console.log(error);
    })
  }

  function handleCardDelete(cardId) {
    api.deleteCard(cardId).then(() => {
      setCards((state) => state.filter((card) => card._id !== cardId));
    })
    .catch((error) => {
      console.log(error);
    })
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(false);
  }

  return (
    <div className="page root">
    <CurrentUserContext.Provider value={currentUser}>
    <Header/>
    <Main
    onEditAvatar={setIsEditAvatarPopupOpen}
    onEditProfile={setIsEditProfilePopupOpen}
    onAddPlace={setIsAddPlacePopupOpen}
    onCardClick={handleCardClick}
    onCardLike={handleCardLike}
    onCardDelete={handleCardDelete}
    cards={cards}
    />
    <Footer/>
    <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
    <AddPlacePopup onAddPlace={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}/>
    <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
    <PopupWithForm name='delete' title='Вы уверены?' button='Да'></PopupWithForm>
    <ImagePopup card={selectedCard} onClose={closeAllPopups}></ImagePopup>
    </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
