const BASE_URL = 'https://mesto.nomoreparties.co';
const token = 'b502401a-5959-4d37-8c6e-aabf6ee75488';
const cohortId = 'wff-cohort-4';
const user = '/users/me';
const cards = '/cards';
const targetUrl = (endpoint) => {
    return `${BASE_URL}/v1/${cohortId}${endpoint}`;
};

// Загрузка информации о пользователе с сервера
export function getUserInfo() {

    return fetch(targetUrl(user), {
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
}


// Загрузка карточек с сервера
export function getInitialCards() {
    return fetch(targetUrl(cards), {
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
        });
}

// Редактирование профиля
export function editUserProfile(name, about) {
    return fetch(targetUrl(user), {
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
        });
}


// Добавление новой карточки
export async function addNewCard(name, link) {

    return fetch(targetUrl(cards), {
        method: 'POST',
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            link: link
        })
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                return Promise.reject(`Что-то пошло не так: ${response.status}`);
            }
        });
}

// Удаление карточки
export function deleteCard(cardId) {
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
                return res.json();
            } else {
                return Promise.reject(`Что-то пошло не так: ${res.status}`);
            }
        });
}

export function putLike(cardId) {
    const targetUrl = BASE_URL + '/v1/' + cohortId + cards + '/likes/' + cardId;
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
        });
}

export function updateAvatar(newAvatarUrl) {
    const targetUrl = BASE_URL + '/v1/' + cohortId + user + '/avatar';
    return fetch(targetUrl, {
        method: 'PATCH',
        headers: {
            authorization: token,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({avatar: newAvatarUrl})
    })
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Что-то пошло не так: ${res.status}`)
        });
}