// @todo: Темплейт карточки
const templateCards = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesItem = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(card, deleteCard) {
    const cardElement = templateCards.querySelector('.card').cloneNode(true);
    const buttonDelete = cardElement.querySelector('.card__delete-button');
    cardElement.querySelector('.card__image').alt = card.name;
    cardElement.querySelector('.card__image').src = card.link;
    cardElement.querySelector('.card__title').textContent = card.name;

    // @todo: удаления карточки
    buttonDelete.addEventListener('click', () => {
        deleteCard(cardElement)
    });

    return cardElement;
}

// @todo: Функция удаления карточки
const deleteCard = (cardElement) => {
    cardElement.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function (card) {
    const newCardElement = createCard(card, deleteCard);
    placesItem.append(newCardElement);
});