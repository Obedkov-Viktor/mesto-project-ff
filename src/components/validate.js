const formElement = document.querySelector('.popup__form');
export const formInput = document.querySelector('.popup__input');
export const formError = formElement.querySelector(`.${formInput.id}-error`);

export const showInputError = (inputElement, errorElement) => {
    inputElement.classList.add('input-error');
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add('input-error_active');
};

export const hideInputError = (inputElement, errorElement) => {
    inputElement.classList.remove('input-error');
    errorElement.textContent = '';
    errorElement.classList.remove('input-error_active');
};