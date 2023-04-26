import React from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {

  const [ isEditProfilePopupOpen, setIsEditProfilePopupOpen ] = React.useState(false);
  const [ isAddPlacePopupOpen, setIsAddPlacePopupOpen ] = React.useState(false);
  const [ isEditAvatarPopupOpen, setIsEditAvatarPopupOpen ] = React.useState(false);
  const [ selectedCard, setSelectedCard ] = React.useState({});

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
    
    <Header/>
    <Main
    onEditAvatar={setIsEditAvatarPopupOpen}
    onEditProfile={setIsEditProfilePopupOpen}
    onAddPlace={setIsAddPlacePopupOpen}
    onCardClick={handleCardClick}
    />
    <Footer/>
    <PopupWithForm name='edit' title='Редактировать профиль' button='Сохранить' isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}>
          <input className="popup__input popup__input_type_name" type="text" id="nameInput" name="name" minLength="2"
            maxLength="40" placeholder="Имя пользователя" required/>
          <span className="popup__error_type_name popup__error"></span>
          <input className="popup__input popup__input_type_job" type="text" id="jobInput" name="job" minLength="2"
            maxLength="200" placeholder="Название профессии" required/>
          <span className="popup__error_type_job popup__error popup__error_active"></span>
    </PopupWithForm>

    <PopupWithForm name='add' title='Новое место' button='Создать' isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}>
          <input className="popup__input popup__input_type_title" type="text" id="titleInput" name="title" minLength="2"
            maxLength="30" placeholder="Название" required/>
          <span className="popup__error_type_title popup__error"></span>
          <input className="popup__input popup__input_type_link" type="url" id="linkInput" name="link"
            placeholder="Ссылка на картинку" required/>
          <span className="popup__error_type_link popup__error"></span>
    </PopupWithForm>

    <PopupWithForm name='update' title='Обновить аватар' button='Сохранить' isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
          <input className="popup__input popup__input_type_link" type="url" id="linkAvatar" name="linkAvatar"
            placeholder="Ссылка на картинку" required/>
          <span className="popup__error_type_link popup__error"></span>
    </PopupWithForm>

    <PopupWithForm name='delete' title='Вы уверены?' button='Да'></PopupWithForm>
    <ImagePopup card={selectedCard} onClose={closeAllPopups}></ImagePopup>
    </div>
  );
}

export default App;
