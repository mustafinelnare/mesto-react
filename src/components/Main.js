import React from "react";
import Card from "./Card";
import api from "../utils/Api";

function Main(props) {
  const [ userName, setUserName ] = React.useState('');
  const [ userDescription, setUserDescription ] = React.useState('');
  const [ userAvatar, setUserAvatar ] = React.useState('');
  const [ cards, setCards ] = React.useState([]);

  React.useEffect(() => {
    Promise.all([api.getDataUser(), api.getInitialCards()])
    .then((result) => {
        const [userData, initialCards] = result;
        setUserName(userData.name);
        setUserDescription(userData.about);
        setUserAvatar(userData.avatar);
        setCards(initialCards);
    })
    .catch((err) => {
        console.log(err);
    });
  }, []);

  return (
  <main className="content">
    <section className="profile">
      <img className="profile__avatar" src={userAvatar} alt="Аватар"/>
      <button className="profile__update" type="button" onClick={props.onEditAvatar}></button>
      <div className="profile__info">
        <div className="profile__place">
          <h1 className="profile__title">{userName}</h1>
          <button className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
        </div>
        <p className="profile__subtitle">{userDescription}</p>
      </div>
      <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
    </section>
    <section className="element">
      {cards.map((card) => <Card name={card.name} link={card.link} likes={card.likes} key={card._id} onCardClick={props.onCardClick}/>
      )}
    </section>
  </main>
  );
} 

export default Main;