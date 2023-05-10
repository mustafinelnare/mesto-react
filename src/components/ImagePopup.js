export default function ImagePopup(card) {
  return (
    <div
      className={`popup popup_open-image ${
        card.card.name ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container popup__container_image">
        <button
          className="popup__close-button"
          type="button"
          onClick={card.onClose}
        ></button>
        <div className="popup__place-image">
          <img
            className="popup__image"
            src={card.card.link}
            alt={card.card.name}
          />
          <p className="popup__subtitle">{card.card.name}</p>
        </div>
      </div>
    </div>
  );
}
