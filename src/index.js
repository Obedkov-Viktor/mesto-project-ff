import './styles/index.css';
import {getCard} from "./components/card";
import {closeModal, openModal, openImagePopup} from "./components/modal";
import {enableValidation, clearValidation} from "./components/validate";
import {addNewCard, deleteCard, editUserProfile, getInitialCards, getUserInfo, updateAvatar} from "./components/api";

const cardContainer = document.querySelector('.places__list');
const popupProfile = document.querySelector('.popup_type_edit');
const popupProfileOpenButton = document.querySelector('.profile__edit-button');
const popupAddCard = document.querySelector('.popup_type_new-card');
const popupCardOpenButton = document.querySelector('.profile__add-button');
const popupAvatar = document.querySelector('.popup_type_update_avatar');
const formProfile = document.querySelector('form[name="edit-profile"]');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const profileImage = document.querySelector('.profile__image');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const newCardForm = document.querySelector('.popup_type_new-card');
const profileForm = document.querySelector('#profileForm');
const placeForm = document.querySelector('#placeForm');
const updateAvatarForm = document.querySelector('#updateAvatarForm');

const currentUser = {
    _id: ""
}
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
};
popupProfileOpenButton.addEventListener('click', () => {
    nameInput.value = profileName.textContent;
    jobInput.value = profileDescription.textContent;
    openModal(popupProfile);
});
popupCardOpenButton.addEventListener('click', () => {
    openModal(popupAddCard);
});
profileImage.addEventListener('click', () => openModal(popupAvatar));


// Функция для отображения карточек на странице
function displayInitialCards(currentUser, cardsArray) {
    if (Array.isArray(cardsArray)) {
        cardsArray.forEach((carData) => {
            const cardElement = getCard(carData, currentUser, handleDeleteCardClick);
            cardContainer.append(cardElement);
        });
    } else {
        console.log('Ожидался массив, получен другой тип данных');
    }
}

// Вызов метода getUserInfo() и getInitialCards() с помощью Promise.all()
Promise.all([getUserInfo(currentUser._id), getInitialCards()])
    .then(([userData, initialCards]) => {
        // Установка _id для currentUser
        currentUser._id = userData._id;
        // Устанавливаем полученный аватар как задний фон изображения
        profileImage.style.backgroundImage = `url(${userData.avatar})`;
        // Устанавливаем имя пользователя в соответствующий элемент на странице
        profileName.textContent = userData.name;
        // Устанавливаем описание пользователя в соответствующий элемент на странице
        profileDescription.textContent = userData.about;
        // Отображение начальных карточек после получения данных пользователя и карточек
        displayInitialCards(userData, initialCards);
    })
    .catch((err) => {
        console.log(err);
    });
// Редактирование профиля
// Функция для обработки события отправки формы профиля.
function handleProfileSubmit(evt) {
    evt.preventDefault(); // Предотвращает перезагрузку страницы при отправке данных

    // Получаем значение из полей ввода имени и описания пользователя
    const userName = nameInput.value;
    const userDescription = jobInput.value;

    // Изменяем надпись на кнопке
    profileForm.querySelector('.popup__button').textContent = 'Сохранение...';

    // Вызываем функцию для обновления профиля пользователя и передаем в нее новые данные.
    editUserProfile(userName, userDescription)
        .then((result) => {
            // После успешного обновления профиля обновляем отображаемое имя и описание пользователя
            profileName.textContent = result.name;
            profileDescription.textContent = result.about;
            // Закрываем попап с формой редактирования профиля
            closeModal(popupProfile);
        })
        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            // Восстанавливаем первоначальную надпись на кнопке
            profileForm.querySelector('.popup__button').textContent = 'Сохранить';
        });
}

// @todo: Обработчик события submit для формы создания новой карточки
function handleNewCardSubmit(event) {
    event.preventDefault();

    const placeNameInput = newCardForm.querySelector('.popup__input_type_name');
    const linkInput = newCardForm.querySelector('.popup__input_type_url');
    const submitButton = newCardForm.querySelector('.popup__button');


    const placeName = placeNameInput.value;
    const link = linkInput.value;
    submitButton.textContent = 'Сохранение...';

    // Создаем объект новой карточки
    addNewCard(placeName, link)
        .then(newCardData => {
            const newCard = getCard(newCardData, currentUser, handleDeleteCardClick); // Подставьте свою функцию для создания карточки
            cardContainer.prepend(newCard); // Используем метод prepend для добавления новой карточки
            closeModal(popupAddCard);

            placeNameInput.value = '';
            linkInput.value = '';
            submitButton.setAttribute('disabled', true);

        })
        .catch(error => {
            console.error('Ошибка при добавлении карточки:', error);
        })
        .finally(() => {
            // Восстанавливаем первоначальную надпись на кнопке
            newCardForm.querySelector('.popup__button').textContent = 'Сохранить';
        });
}

// Обработчик события удаления карточки
function handleDeleteCardClick(cardId, cardElement) {
    deleteCard(cardId)
        .then(() => {
            cardElement.remove()
        })
        .catch(error => {
            console.error('Ошибка при удаление карточки:', error);
        })
}

//@todo: Функция для обновления аватара пользователя
function handleUpdateAvatar(event) {
    event.preventDefault();// Предотвращает перезагрузку страницы при отправке формы

    const submitButton = updateAvatarForm.querySelector('.popup__button'); // Предполагаем, что это кнопка сабмита
    const originalButtonText = submitButton.textContent; // Сохраняем оригинальный текст кнопки
    submitButton.textContent = 'Сохранение...'; // Меняем надпись на кнопке на "Сохранение..."

    // Получаем доступ к полю ввода URL аватара

    const avatarUrlInput = updateAvatarForm.querySelector('.popup__input_type_url');
    const avatarUrl = avatarUrlInput.value; // Получаем значение URL аватара

    // Вызываем функцию для обновления аватара пользователя и передаем в нее новый URL аватара
    updateAvatar(avatarUrl)
        .then((result) => {
            profileImage.style.backgroundImage = `url('${result.avatar}')`;// Обновляем отображаемый на странице аватар
            closeModal(popupAvatar); // Закрываем попап для обновления аватара
            updateAvatarForm.reset(); // Очищаем поля формы обновления аватара
            updateAvatarForm.querySelector('.popup__button').disabled = true;
        })
        .catch(error => {
            console.error('Ошибка при обновление картинки:', error);
        })
        .finally(() => {
            submitButton.textContent = originalButtonText; // Возвращаем исходный текст кнопки
        });
}

// Включение валидации
enableValidation(validationConfig);

updateAvatarForm.addEventListener('submit', handleUpdateAvatar);
formProfile.addEventListener('submit', handleProfileSubmit);
newCardForm.addEventListener('submit', handleNewCardSubmit);