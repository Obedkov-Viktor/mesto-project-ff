import {openImagePopup} from "./modal";
import {putLike, removeLike} from "./api";
// @todo: Темплейт карточки
const templateCards = document.querySelector('#card-template').content;

openImagePopup();
export function getCard(cardData, currentUser, handleDeleteCardClick) {
    const cardElement = templateCards.querySelector('.card').cloneNode(true);
    const likeButton = cardElement.querySelector('.card__like-button');
    const likeCount = cardElement.querySelector('.card__like-count');
    const deleteButton = cardElement.querySelector('.card__delete-button');
    const cardImage = cardElement.querySelector('.card__image');

    function updateLikeState() {
        if (cardData.likes.some(like => like._id === currentUser._id)) {
            likeButton.classList.add('card__like-button_is-active');
        } else {
            likeButton.classList.remove('card__like-button_is-active');
        }
    }

    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardElement.querySelector('.card__title').textContent = cardData.name;
    likeCount.textContent = cardData.likes.length;


    cardImage.addEventListener('click', function() {
        openImagePopup(cardData.link, cardData.name);
    });

    updateLikeState();

    likeButton.addEventListener('click', () => {
        const liked = likeButton.classList.toggle('card__like-button_is-active');

        if (likeButton.classList.toggle('card__like-button_is-active')) {
            removeLike(cardData._id)
                .then(data => {
                    cardData.likes = data.likes; // Обновляем информацию о лайках
                    likeCount.textContent = data.likes.length;
                    updateLikeState() // Переключаем состояние лайка
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        } else {
            putLike(cardData._id)
                .then(data => {
                    cardData.likes = data.likes; // Обновляем информацию о лайках
                    likeCount.textContent = data.likes.length;
                    updateLikeState(); // Переключаем состояние лайка
                })
                .catch(error => {
                    console.error('Error:', error);
                });

        }
    })
    // Этот код проверяет, является ли текущий пользователь владельцем карточки.
    // Если да, то показывается кнопка "удалить", которая позволяет пользователю удалить карточку.
    // Если текущий пользователь не является владельцем карточки, то кнопка "удалить" скрывается.
    // cardData.owner.id - id владельца карточки
    // currentUser.id - id текущего пользователя
    // handleDeleteCardClick - функция, которая вызывается при нажатии на кнопку "удалить" и удаляет карточку
    // cardElement - элемент карточки, к которой привязана кнопка "удалить"
    if (cardData.owner._id === currentUser._id) {
        deleteButton.addEventListener('click', () => {
            handleDeleteCardClick(cardData._id, cardElement);
        });
    }
    else {
        deleteButton.style.display = 'none';
    }

    return cardElement;
}




