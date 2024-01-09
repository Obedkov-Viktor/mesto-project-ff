import {createCard} from "./card";

const BASE_URL = 'https://mesto.nomoreparties.co';
const token = 'b502401a-5959-4d37-8c6e-aabf6ee75488';
const cohortId = 'wff-cohort-4';
const user = '/users/me';
const cards = '/cards';
const cardId = '/cardId';

// Загрузка информации о пользователе с сервера
export function getUserInfo() {
    const targetUrl = BASE_URL + '/v1/' + cohortId + user;
    return fetch(targetUrl, {
        method: 'GET',
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Что-то пошло не так: ${res.status}`)
        })
        .then((result) => {
            // console.log('успешно запустил сервера', result);
            return result;
        })
        .catch((err) => {
            console.log(err);
        })
}


// Загрузка карточек с сервера
export function getInitialCards() {
    const targetUrl = BASE_URL + '/v1/' + cohortId + cards;
    return fetch(targetUrl, {
        method: 'GET',
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Что-то пошло не так: ${res.status}`)
        })
        .then((result) => {
            // console.log('успешно запустил сервера', result);
            return result;
        })

        .catch((err) => {
            console.log(err);
        })
}

// Редактирование профиля
export function editUserProfile(name, about) {
    const targetUrl = BASE_URL + '/v1/' + cohortId + user;
    return fetch(targetUrl, {
        method: 'PATCH',
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            about: about
        })
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Что-то пошло не так: ${res.status}`)
        })
        .then((result) => {
            // console.log('успешно запустил сервера', result);
            return result;
        })
        .catch((err) => {
            console.log(err);
        })
}


// Добавление новой карточки
export async function addNewCard(name, link) {
    const targetUrl = BASE_URL + '/v1/' + cohortId + cards;
    try {
        const response = await fetch(targetUrl, {
            method: 'POST',
            headers: {
                authorization: token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                link: link
            })
        });
        if (response.ok) {
            const result = await response.json();
            console.log('успешно запустил сервера', result);
            return result;
        } else {
            return Promise.reject(`Что-то пошло не так: ${response.status}`);
        }
    } catch (err) {
        console.log(err);
        return err;
    }
}
// Удаление карточки
export function deleteCard(cardId){
    const targetUrl = BASE_URL + '/v1/' + cohortId + cards + '/' + cardId;

    return fetch(targetUrl, {
        method: 'DELETE',
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        }
    })
        .then(res => {
            if (res.ok) {
                // если сервер вернул успешный ответ, удаляем карточку из интерфейса
                const cardElement = document.getElementById(cardId);
                cardElement.remove();
            }else {
                // обрабатываем возможные ошибки
                throw new Error('Failed to delete card');
            }
        })
        .catch((err) => {
            console.log(err);
        })
}

export function putLike(cardId) {
    const targetUrl = BASE_URL + '/v1/' + cohortId + cards + '/likes/' + cardId;
    console.log(targetUrl)
    return fetch(targetUrl, {
        method: 'PUT',
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        },
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Что-то пошло не так: ${res.status}`)
        })
        .then((result) => {
            // console.log('успешно запустил сервера', result);
            return result;
        })
        .catch((err) => {
            console.log(err);
        })
}

export function removeLike(cardId) {
    const targetUrl = BASE_URL + '/v1/' + cohortId + cards + '/likes/' + cardId;
    return fetch(targetUrl, {
        method: 'DELETE',
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        },
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Что-то пошло не так: ${res.status}`)
        })
        .then((result) => {
            // console.log('успешно запустил сервера', result);
            return result;
        })
        .catch((err) => {
            console.log(err);
        })
}

export function updateAvatar(newAvatarUrl){
    const targetUrl = BASE_URL + '/v1/' + cohortId + user + '/avatar';
    return fetch(targetUrl, {
        method: 'PATCH',
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ avatar: newAvatarUrl })
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Что-то пошло не так: ${res.status}`)
        })
        .then((result) => {
            // console.log('успешно запустил сервера', result);
            return result;
        })
        .catch((err) => {
            console.log(err);
        })
}

