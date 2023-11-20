import {popupImageCaption, popupImageElement, popupImage} from "./constants";

function handleEscClose(event) {
    if (event.key === 'Escape') {
        const popup = document.querySelector('.popup_is-opened');
        closeModal(popup);
    }
}

// @todo Функция закрытия попапа по клику на оверлей
function handleCloseOverlayClick(event) {
    if(event.target.classList.contains('popup')){// Проверяем, что клик был именно по оверлею
        const popup = document.querySelector('.popup_is-opened');
        closeModal(popup);
    }
}

function handleCloseButtonClick() {
    const openedPopup = document.querySelector('.popup_is-opened');
    if (openedPopup) {
        closeModal(openedPopup);
    }
}
//@todo Функция открытыя попапа
function openModal(popup) {
    const closeButton = popup.querySelector('.popup__close');
    closeButton.addEventListener('click', handleCloseButtonClick);
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscClose);
    popup.addEventListener('mousedown', handleCloseOverlayClick);
}
//@todo Функция закрытия попапа
function closeModal(popup) {
    const closeButton = popup.querySelector('.popup__close');
    closeButton.removeEventListener('click', handleCloseButtonClick);
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscClose);
    popup.removeEventListener('click', handleCloseOverlayClick);
}

//@todo Создать функции openImagePopup, которая будет открывать попап с картинкой:
function openImagePopup(imageLink, caption) {
    popupImageElement.src = imageLink;
    popupImageElement.alt = caption;
    popupImageCaption.textContent = caption;
    openModal(popupImage);
}

export {openModal, closeModal, openImagePopup};