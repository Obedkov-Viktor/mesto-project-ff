import './styles/index.css';
import {initialCards} from "./components/cards";
import {createCard} from "./components/card";
import {closeModal, openModal} from "./components/modal";


// @todo: DOM узлы
const placesItem = document.querySelector('.places__list');

// @todo: редактировать  тип всплывающего окна
const popupProfile = document.querySelector('.popup_type_edit');

// @todo: кнопки профиль  редактировать тип всплывающего окна
const popupProfileOpenButton = document.querySelector('.profile__edit-button');

// @todo: кнопки добавить card тип всплывающего окна
const popupAddCard = document.querySelector('.popup_type_new-card');

// @todo: кнопки профиль  добавить тип всплывающего окна
const popupCardOpenButton = document.querySelector('.profile__add-button');

// @todo: querySelector forms
const formProfile = document.querySelector('form[name="edit-profile"]');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

//@todo Обработчик события submit для формы создания новой карточки.
const newCardForm = document.querySelector('.popup_type_new-card .popup__form');
const cardContainer = document.querySelector('.places__list');
popupProfileOpenButton.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    openModal(popupProfile);
});
popupCardOpenButton.addEventListener('click', () => openModal(popupAddCard));

// @todo: Функция лайк карточки
function handleLike(button) {
    button.classList.toggle('card__like-button_is-active')
}

// @todo: Обработчик события submit для формы создания новой карточки
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
    closeModal(popupAddCard);
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

// @todo: нажатия кнопки «Сохранить» информация на странице обновляется, а попап автоматически закрывается
function handleFormProfileSubmit(evt) {
    evt.preventDefault();
    const nameValue = nameInput.value;
    const jobValue = jobInput.value;
    profileName.textContent = nameValue;
    profileDescription.textContent = jobValue;
    closeModal(popupProfile);
}

formProfile.addEventListener('submit', handleFormProfileSubmit);
