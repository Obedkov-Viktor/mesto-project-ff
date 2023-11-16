import {openImagePopup} from "./modal";
// @todo: Темплейт карточки
const templateCards = document.querySelector('#card-template').content;

// @todo: Функция создания карточки
export function createCard(card, deleteCard, handleLike) {
    const cardElement = templateCards.querySelector('.card').cloneNode(true);
    const buttonDelete = cardElement.querySelector('.card__delete-button');
    const buttonLike = cardElement.querySelector('.card__like-button');

    cardElement.querySelector('.card__image').alt = card.name;
    cardElement.querySelector('.card__image').src = card.link;
    cardElement.querySelector('.card__title').textContent = card.name;

    // @todo: обрабочтик события клик на изображеение
    cardElement.querySelector('.card__image').addEventListener('click', () => {
        openImagePopup(card.link, card.name)
    });

    // @todo: удаления карточки
    buttonDelete.addEventListener('click', () => {
        deleteCard(cardElement)
    });

    // @todo: лайк карточки
    buttonLike.addEventListener('click', () => {
        handleLike(buttonLike);
    });

    return cardElement;
}