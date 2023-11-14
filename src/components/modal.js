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

//@todo Функция открытыя попапа
function openModal(popup) {
    const closeButton = popup.querySelector('.popup__close');
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscClose);
    closeButton.addEventListener('click', handleCloseButtonClick);
    popup.addEventListener('click', handleCloseOverlayClick);
}
//@todo Функция закрывает кнопки нажатие
function handleCloseButtonClick() {
    const popup = this.closest('.popup');
    closeModal(popup);
}

//@todo Функция закрытия попапа
function closeModal(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscClose);

    popup.removeEventListener('click', handleCloseOverlayClick);
}

//@todo Создать функции openImagePopup, которая будет открывать попап с картинкой:
function openImagePopup(imageLink, caption) {
    const popupImage = document.querySelector('.popup_type_image');
    const popupImageElement = popupImage.querySelector('.popup__image');
    const popupImageCaption = popupImage.querySelector('.popup__caption');

    popupImageElement.src = imageLink;
    popupImageElement.alt = caption;
    popupImageCaption.textContent = caption;
    openModal(popupImage);
}

export {openModal, closeModal, openImagePopup};