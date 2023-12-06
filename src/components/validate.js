const toggleButtonState = (inputList, buttonElement, {inactiveButtonClass}) => {
    const isValidForm = inputList.every(input => input.validity.valid);
    buttonElement.disabled = !isValidForm;
    if (buttonElement.disabled) {
        buttonElement.classList.add(inactiveButtonClass);
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
    }
}
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('input-error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('form__input-error_active');
};

const hideInputError = (formElement, inputElement, validationConfig) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('input-error');
    errorElement.classList.remove('form__input-error_active');
    errorElement.textContent = '';
};

const isValid = (formElement, inputElement, {nameRegExp, aboutRegExp, placeNameRegExp, urlRegExp}) => {
    nameRegExp = /^[A-Za-zА-Яа-яЁё\s\-]{2,40}$/;
    placeNameRegExp = /^[A-Za-zА-Яа-яЁё\s\-]{2,40}$/;
    aboutRegExp = /^[A-Za-zА-Яа-яЁё\s\-]{2,200}$/;
    urlRegExp = /^(https?:\/\/)[\w\-._~:\/?#[\]@!$&'()*+,;=]+$/;
    let errorMessage = '';

    if (!inputElement.value.length) {
        errorMessage = 'Это поля обязательное';
    } else if ((inputElement.name === 'name' && !nameRegExp.test(inputElement.value))) {
        errorMessage = 'В поле "Имя" должно быть от 2 до 40 символов';
    } else if ((inputElement.name === 'description' && !aboutRegExp.test(inputElement.value))) {
        errorMessage = 'В поле "О себе" должно быть от 2 до 200 символов'
    } else if ((inputElement.name === 'place-name' && !placeNameRegExp.test(inputElement.value))) {
        errorMessage = 'В поле "Название" должно быть от 2 до 30 символов';
    } else if (((inputElement.name === 'link' && !urlRegExp.test(inputElement.value)))) {
        errorMessage = 'В поле «Ссылка на картинку» должен быть URL';
    } else if (inputElement.validity.tooShort || inputElement.validity.tooLong) {
        errorMessage = `Длина должна быть от ${inputElement.minLength} до ${inputElement.maxLength} символов`;
    }
    if (errorMessage) {
        showInputError(formElement, inputElement, errorMessage)
    } else {
        hideInputError(formElement, inputElement);
    }
}

const setEventListeners = (formElement, validationConfig) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement, validationConfig);
            toggleButtonState(inputList, buttonElement, validationConfig);
        });
    });
    toggleButtonState(inputList, buttonElement, validationConfig);
};

const enableValidation = (validationConfig) => {
    const formList = Array.from(document.querySelectorAll(`${validationConfig.formSelector}`));

    formList.forEach(form => {
        setEventListeners(form,validationConfig);
    })
};

const clearValidation = (profileForm, validationConfig) => {
    const inputList = Array.from(profileForm.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = profileForm.querySelector(validationConfig.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, validationConfig);
    inputList.forEach((inputElement) => {
        hideInputError(profileForm, inputElement, validationConfig)
    });
};

export { enableValidation, clearValidation };