const toggleButtonState = (inputList, buttonElement, {inactiveButtonClass}) => {
    const isValidForm = inputList.every(input => input.validity.valid);
    buttonElement.disabled = !isValidForm;
    if (buttonElement.disabled) {
        buttonElement.classList.add(inactiveButtonClass);
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
    }

}

const showInputError = (formElement, inputElement, errorMessage, {inputErrorClass, errorClass}) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, {inputErrorClass, errorClass}) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
};

const isValid = (formElement, inputElement, {inputErrorClass, errorClass}) => {
    let errorMessage = '';
    if (inputElement.validity.patternMismatch) {
        errorMessage = inputElement.dataset.customError || inputElement.dataset.customDescriptionError || inputElement.dataset.customPlaceNameError;
    } else if (inputElement.validity.tooShort) {
        errorMessage = inputElement.dataset.customError || inputElement.dataset.customDescriptionError || inputElement.dataset.customPlaceNameError;
    } else if (inputElement.validity.tooLong) {
        errorMessage = inputElement.dataset.customError || inputElement.dataset.customDescriptionError || inputElement.dataset.customPlaceNameError;
    } else if (inputElement.validity.typeMismatch) {
       errorMessage =  inputElement.dataset.customPlaceUrlError || inputElement.dataset.customUpdateAvatarError;
    }
    if (errorMessage) {
        showInputError(formElement, inputElement, errorMessage, {inputErrorClass, errorClass});
    } else {
        hideInputError(formElement, inputElement , {inputErrorClass, errorClass});
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
        setEventListeners(form, validationConfig);
    })

};
const clearValidation = (formElement, validationConfig) => {
    const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
    const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, validationConfig);
    inputList.forEach((inputElement) => {
        hideInputError(formElement, inputElement, validationConfig)
    });
};

export {enableValidation, clearValidation};