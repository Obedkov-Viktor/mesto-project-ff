const formElement = document.querySelector('.popup__form');
const formInput = formElement.querySelector('.popup__input');


const nameRegExp = /^[A-Za-zА-Яа-яЁё\s\-]{2,40}$/;
const aboutRegExp = /^[A-Za-zА-Яа-яЁё\s\-]{2,200}$/;
const urlRegExp = /^(https?:\/\/)[\w\-._~:\/?#[\]@!$&'()*+,;=]+$/;


const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add('input-error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('form__input-error_active');
};

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove('input-error');
    errorElement.classList.add('form__input-error_active');
    errorElement.textContent = '';
};

const isValid = (formElement, inputElement) => {
    if(!inputElement.validity.valid){
        showInputError(formElement, inputElement, inputElement.validationMessage)
    }else{
        hideInputError(formElement,inputElement);
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

const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup__form'));
    formList.forEach((formElement) => {
        setEventListeners(formElement);
    });
};

const   clearValidation = () => {

}

enableValidation();