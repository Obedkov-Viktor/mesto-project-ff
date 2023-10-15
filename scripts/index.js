// @todo: Темплейт карточки
const templateCards = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesItem = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(card) {
    const cardElement = templateCards.querySelector('.card').cloneNode(true);
    cardElement.querySelector('.card__image').alt = card.name;
    cardElement.querySelector('.card__image').src = card.link;
    cardElement.querySelector('.card__title').textContent = card.name;
    return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(event) {
    const card = event.target.closest('.places__item');
    card.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function (card) {
    const newCardElement = createCard(card);
    const buttonDelete = newCardElement.querySelector('.card__delete-button');
    buttonDelete.addEventListener('click', deleteCard);
    placesItem.append(newCardElement);
});