const formElement = document.querySelector('.popup__form');
const formInput = formElement.querySelector('.popup__input');


const nameRegExp = /^[A-Za-zА-Яа-яЁё\s\-]{2,40}$/;
const aboutRegExp = /^[A-Za-zА-Яа-яЁё\s\-]{2,200}$/;
const urlRegExp = /^(https?:\/\/)[\w\-._~:\/?#[\]@!$&'()*+,;=]+$/;

const toggleButtonState = (inputList, buttonElement, validationConfig) => {

}
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('input-error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('form__input-error_active');
};

const hideInputError = (profileForm, inputElement, validationConfig) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('input-error');
    errorElement.classList.remove('form__input-error_active');
    errorElement.textContent = '';
};

const isValid = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage)
    } else {
        hideInputError(formElement, inputElement);
    }
}

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            isValid(formElement, inputElement)
        })
    })
}

export const enableValidation = (validationConfig) => {
    const formList = Array.from(document.querySelectorAll(`${validationConfig.formSelector}`));

    formList.forEach(form => {
        setEventListeners(form,
            validationConfig.inputSelector,
            validationConfig.submitButtonSelector,
            validationConfig.inactiveButtonClass,
            validationConfig.inputErrorClass,
            validationConfig.errorClass
        );
    })
};

export const clearValidation = (profileForm, validationConfig) => {
    const  inputList = Array.from(profileForm.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = profileForm.querySelector(validationConfig.submitButtonSelector);

    toggleButtonState(inputList, buttonElement, validationConfig);
    inputList.forEach((inputElement) => {
        hideInputError(profileForm, inputElement,validationConfig)
    });
};

enableValidation();