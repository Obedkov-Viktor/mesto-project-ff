import {handleEscClose} from "../index";

function openModal(popup) {
    const closeButton = popup.querySelector('.popup__close');
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscClose);
    closeButton.addEventListener('click', () => {
        closeModal(popup);
    });

}

function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscClose);
}

export {openModal, closeModal};