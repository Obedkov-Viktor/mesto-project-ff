import './styles/index.css';
import {initialCards} from "./components/cards";
import {openModal, closeModal} from "./components/modal";

// @todo: Темплейт карточки
const templateCards = document.querySelector('#card-template').content;

// @todo: DOM узлы
const placesItem = document.querySelector('.places__list');

// @todo: редактировать  тип всплывающего окна
const editPopup = document.querySelector('.popup_type_edit');

// @todo: кнопки профиль  редактировать тип всплывающего окна
const editButton = document.querySelector('.profile__edit-button');

// @todo: кнопки добавить card тип всплывающего окна
const newCard = document.querySelector('.popup_type_new-card');

// @todo: кнопки профиль  добавить тип всплывающего окна
const addButton = document.querySelector('.profile__add-button');

// @todo: закрывать тип всплывающего окна
const closeButton = document.querySelector('.popup__close');

// @todo: querySelector forms
const formElement = document.querySelector(".popup__form");
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

editButton.addEventListener('click', () => openModal(editPopup));
addButton.addEventListener('click', () => openModal(newCard));

// @todo: Функция создания карточки
function createCard(card, deleteCard, handleLike) {
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

//@todo Создайте функцию openImagePopup, которая будет открывать попап с картинкой:
function openImagePopup(imageLink, caption) {
    const popupImage = document.querySelector('.popup_type_image');
    const popupImageElement = popupImage.querySelector('.popup__image');
    const popupImageCaption = popupImage.querySelector('.popup__caption');

    popupImageElement.src = imageLink;
    popupImageElement.alt = caption;
    popupImageCaption.textContent = caption;
    openModal(popupImage);
}

// @todo: Функция лайк карточки
function handleLike(button) {
    button.classList.toggle('card__like-button_is-active')
}

//@todo Обработчик события submit для формы создания новой карточки.
const newCardForm = document.querySelector('.popup_type_new-card .popup__form');
const cardContainer = document.querySelector('.places__list');

// Обработчик события submit для формы создания новой карточки
function handleNewCardSubmit(event) {
    event.preventDefault();

    // Получаем значения полей формы
    const placeNameInput = newCardForm.querySelector('.popup__input_type_card-name');
    const linkInput = newCardForm.querySelector('.popup__input_type_url');
    const placeName = placeNameInput.value;
    const link = linkInput.value;
    // Создаем объект новой карточки
    const newCard = {
        name: placeName,
        link: link
    };
    // Создаем новую карточку с помощью функции createCard
    const newCardElement = createCard(newCard, deleteCard, handleLike);
    // Добавляем новую карточку в начало контейнера с карточками
    cardContainer.prepend(newCardElement);
    // Закрываем диалоговое окно и очищаем форму
    const popup = document.querySelector('.popup_is-opened');
    closeModal(popup);
    newCardForm.reset();
}

newCardForm.addEventListener('submit', handleNewCardSubmit);

// @todo: Функция удаления карточки
const deleteCard = (cardElement) => {
    cardElement.remove();
}

// @todo: Вывести карточки на страницу
initialCards.forEach(function (card) {
    const newCardElement = createCard(card, deleteCard, handleLike);
    placesItem.append(newCardElement);
});

// @todo Закрытие попапа кликом на "Esc"
function handleEscClose(event) {
    if (event.key === 'Escape') {
        const popup = document.querySelector('.popup_is-opened');
        closeModal(popup);
    }
}

// @todo: При открытии формы поля «Имя» и «О себе»
nameInput.value = profileName.textContent;
jobInput.value = profileDescription.textContent;

// @todo: нажатия кнопки «Сохранить» информация на странице обновляется, а попап автоматически закрывается
function handleFormSubmit(evt) {
    evt.preventDefault();
    const nameValue = nameInput.value;
    const jobValue = jobInput.value;
    profileName.textContent = nameValue;
    profileDescription.textContent = jobValue;

    const popup = document.querySelector('.popup_is-opened');
    closeModal(popup);
}

formElement.addEventListener('submit', handleFormSubmit);

// @todo: экспортировать
export {handleEscClose};