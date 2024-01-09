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
const newCardForm = document.querySelector('.popup_type_new-card .popup__form');
const profileForm = document.querySelector('#profileForm');
const placeForm = document.querySelector('#placeForm');
const updateAvatarForm = document.querySelector('#updateAvatarForm');


const currentUser = {
    _id: "cff51f679317655b47c725bd"
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
popupCardOpenButton.addEventListener('click', () => openModal(popupAddCard));
profileImage.addEventListener('click', () => openModal(popupAvatar));


// Функция для отображения карточек на странице
function displayInitialCards(currentUser, cardsArray) {
    if (Array.isArray(cardsArray)){
        cardsArray.forEach((carData) => {
            const cardElement = getCard(carData, currentUser, handleDeleteCardClick);
            cardContainer.appendChild(cardElement);
        });
    }else{
        console.log('Ожидался массив, получен другой тип данных');
    }
}

// Вызов метода getUserInfo() и getInitialCards() с помощью Promise.all()
Promise.all([getUserInfo(), getInitialCards()])
    .then(([userData, initialCards]) => {
        // Отображение начальных карточек после получения данных пользователя и карточек
        displayInitialCards(userData, initialCards);
    })
    .catch((error) => {
        console.log('Ошибка при загрузке данных:', error);
    });

// Редактирование профиля
// Функция для обработки события отправки формы профиля.
function handleProfileSubmit(evt) {
    evt.preventDefault(); // Предотвращает перезагрузку страницы при отправке данных

    // Получаем значение из полей ввода имени и описания пользователя
    const userName = nameInput.value;
    const userDescription = jobInput.value;

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
}

// @todo: Обработчик события submit для формы создания новой карточки
async function handleNewCardSubmit(event) {
    event.preventDefault();
    const placeName = newCardForm.querySelector('.popup__input_type_card-name').value;
    const link = newCardForm.querySelector('.popup__input_type_url').value;
    // Создаем объект новой карточки
    try {
        const newCardData = await addNewCard(placeName, link);
        const newCard = getCard(newCardData, currentUser); // Подставьте свою функцию для создания карточки
        cardContainer.appendChild(newCard);
        closeModal(popupAddCard);
        newCardForm.reset();
    } catch (error) {
        console.error('Ошибка при добавлении карточки:', error);
    }
}

// Обработчик события удаления карточки
function handleDeleteCardClick(cardId, cardElement) {
    deleteCard(cardId)
        .then(() => {
            cardElement.remove()
        })
        .catch((error) => {
            console.error('Ошибка при удалении карточки:', error);
        })
}

//@todo: Функция для обновления аватара пользователя
function handleUpdateAvatar(event) {
    event.preventDefault();// Предотвращает перезагрузку страницы при отправке формы

    // Получаем доступ к полю ввода URL аватара
    const avatarUrlInput = updateAvatarForm.querySelector('.popup__input_type_url');
    const avatarUrl = avatarUrlInput.value; // Получаем значение URL аватара

    // Вызываем функцию для обновления аватара пользователя и передаем в нее новый URL аватара
    updateAvatar(avatarUrl)
        .then((result) => {
            profileImage.src = result.avatar; // Обновляем отображаемый на странице аватар
            closeModal(popupAvatar); // Закрываем попап для обновления аватара
            updateAvatarForm.reset(); // Очищаем поля формы обновления аватара
        })
        .catch((err) => {
            console.log(err);
        });
}


// Получаем информацию о текущем пользователе с сервера
getUserInfo(currentUser._id)
    .then((userInfo) => {
        // Устанавливаем полученный аватар как задний фон изображения
        profileImage.style.backgroundImage = `url(${userInfo.avatar})`;
        // Устанавливаем имя пользователя в соответствующий элемент на странице
        profileName.textContent = userInfo.name;
        // Устанавливаем описание пользователя в соответствующий элемент на странице
        profileDescription.textContent = userInfo.about;

    })
    .catch((err) => {
        console.log(err);
    })

// Включение валидации
enableValidation(validationConfig);
profileForm.addEventListener('open', () => {
    clearValidation(profileForm, validationConfig);
});
placeForm.addEventListener('open', () => {
    clearValidation(profileForm, validationConfig);
})
updateAvatarForm.addEventListener('open', () => {
        clearValidation(updateAvatarForm, validationConfig)
    }
)
updateAvatarForm.addEventListener('submit', handleUpdateAvatar);
formProfile.addEventListener('submit', handleProfileSubmit);
newCardForm.addEventListener('submit', handleNewCardSubmit);