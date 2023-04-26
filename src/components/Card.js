export default function Card(card) {

  function handleClick() {
    card.onCardClick({ name: card.name, link: card.link });
  }  

  return (
    <article className="element__item">
        <img className="element__image" src={card.link} alt={card.name} onClick={handleClick}/>
        <button className="element__trash" type="button"></button>
        <div className="element__description">
          <h2 className="element__title">{card.name}</h2>
          <div className="element__place">
            <button className="element__button" type="button"></button>
            <p className="element__likes">{card.likes.length}</p>
          </div>
        </div>
      </article>
  )
}