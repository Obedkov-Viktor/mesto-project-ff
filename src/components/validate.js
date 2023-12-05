// const validNameRegex = /^[a-zA-Zа-яА-ЯёЁ\s-]{2,40}$/;
// const validJobRegex = /^[a-zA-Zа-яА-ЯёЁ\s-]{2,200}$/;
//
// // Функция валидации инпута
// function validateInput(input, regex, errorMsg) {
//     let errorElement = input.nextElementSibling; // строка с сообщением об ошибке идет сразу после input
//
//     if (!input.value.trim()) {
//         // Проверка на заполненность
//         errorElement.textContent = 'This field is required.';
//         return false;
//     } else if (!regex.test(input.value.trim())) {
//         // Проверка на соответствие паттерну
//         errorElement.textContent = errorMsg;
//         return false;
//     } else {
//         // Прошли валидацию
//         errorElement.textContent = '';
//         return true;
//     }
// }
//
// // Функция обновления состояния кнопки и сообщений об ошибках
// function updateButtonState(form, button, isValid) {
//     button.disabled = !isValid; // Блокировка или разблокировка кнопки
// }
//
// // Функция валидации формы профиля
// function validateProfileForm() {
//     const isNameValid = validateInput(nameInput, validNameRegex, 'Name must be 2-40 characters long and can only contain letters, hyphens, and spaces.');
//     const isJobValid = validateInput(jobInput, validJobRegex, 'Description must be 2-200 characters long and can only contain letters, hyphens, and spaces.');
//
//     // Обновляем состояние кнопки
//     const submitButton = formProfile.querySelector('.popup__save');
//     updateButtonState(formProfile, submitButton, isNameValid && isJobValid);
// }
//
// // Вызовем валидацию при каждом изменении полей формы
// nameInput.addEventListener('input', validateProfileForm);
// jobInput.addEventListener('input', validateProfileForm);
//
// // Очистка ошибок валидации при открытии модального окна
// function resetValidationErrors() {
//     nameInput.nextElementSibling.textContent = '';
//     jobInput.nextElementSibling.textContent = '';
//     updateButtonState(formProfile, formProfile.querySelector('.popup__save'), true); // Разблокируем кнопку при открытии окна
// }
//
// popupProfileOpenButton.addEventListener('click', () => {
//     resetValidationErrors(); // Очистить сообщения об ошибках
//     nameInput.value = profileName.textContent;
//     jobInput.value = profileDescription.textContent;
//     validateProfileForm(); // Здесь мы валидируем форму, чтобы обновить состояние кнопки
//     openModal(popupProfile);
// });
