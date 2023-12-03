/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/card.js":
/*!********************************!*\
  !*** ./src/components/card.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   createCard: () => (/* binding */ createCard)\n/* harmony export */ });\n/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ \"./src/components/modal.js\");\n\n// @todo: Темплейт карточки\nvar templateCards = document.querySelector('#card-template').content;\n\n// @todo: Функция создания карточки\nfunction createCard(card, deleteCard, handleLike) {\n  var cardElement = templateCards.querySelector('.card').cloneNode(true);\n  var buttonDelete = cardElement.querySelector('.card__delete-button');\n  var buttonLike = cardElement.querySelector('.card__like-button');\n  cardElement.querySelector('.card__image').alt = card.name;\n  cardElement.querySelector('.card__image').src = card.link;\n  cardElement.querySelector('.card__title').textContent = card.name;\n\n  // @todo: обрабочтик события клик на изображеение\n  cardElement.querySelector('.card__image').addEventListener('click', function () {\n    (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openImagePopup)(card.link, card.name);\n  });\n\n  // @todo: удаления карточки\n  buttonDelete.addEventListener('click', function () {\n    deleteCard(cardElement);\n  });\n\n  // @todo: лайк карточки\n  buttonLike.addEventListener('click', function () {\n    handleLike(buttonLike);\n  });\n  return cardElement;\n}\n\n//# sourceURL=webpack://yandex.praktikum/./src/components/card.js?");

/***/ }),

/***/ "./src/components/cards.js":
/*!*********************************!*\
  !*** ./src/components/cards.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   initialCards: () => (/* binding */ initialCards)\n/* harmony export */ });\nvar initialCards = [{\n  name: \"Архыз\",\n  link: \"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg\"\n}, {\n  name: \"Челябинская область\",\n  link: \"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg\"\n}, {\n  name: \"Иваново\",\n  link: \"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg\"\n}, {\n  name: \"Камчатка\",\n  link: \"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg\"\n}, {\n  name: \"Холмогорский район\",\n  link: \"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg\"\n}, {\n  name: \"Байкал\",\n  link: \"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg\"\n}];\n\n//# sourceURL=webpack://yandex.praktikum/./src/components/cards.js?");

/***/ }),

/***/ "./src/components/constants.js":
/*!*************************************!*\
  !*** ./src/components/constants.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   popupImage: () => (/* binding */ popupImage),\n/* harmony export */   popupImageCaption: () => (/* binding */ popupImageCaption),\n/* harmony export */   popupImageElement: () => (/* binding */ popupImageElement)\n/* harmony export */ });\nvar popupImage = document.querySelector('.popup_type_image');\nvar popupImageElement = popupImage.querySelector('.popup__image');\nvar popupImageCaption = popupImage.querySelector('.popup__caption');\n\n//# sourceURL=webpack://yandex.praktikum/./src/components/constants.js?");

/***/ }),

/***/ "./src/components/modal.js":
/*!*********************************!*\
  !*** ./src/components/modal.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   closeModal: () => (/* binding */ closeModal),\n/* harmony export */   openImagePopup: () => (/* binding */ openImagePopup),\n/* harmony export */   openModal: () => (/* binding */ openModal)\n/* harmony export */ });\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constants */ \"./src/components/constants.js\");\n\nfunction handleEscClose(event) {\n  if (event.key === 'Escape') {\n    var popup = document.querySelector('.popup_is-opened');\n    closeModal(popup);\n  }\n}\n\n// @todo Функция закрытия попапа по клику на оверлей\nfunction handleCloseOverlayClick(event) {\n  if (event.target.classList.contains('popup')) {\n    // Проверяем, что клик был именно по оверлею\n    var popup = document.querySelector('.popup_is-opened');\n    closeModal(popup);\n  }\n}\nfunction handleCloseButtonClick() {\n  var openedPopup = document.querySelector('.popup_is-opened');\n  if (openedPopup) {\n    closeModal(openedPopup);\n  }\n}\n//@todo Функция открытыя попапа\nfunction openModal(popup) {\n  var closeButton = popup.querySelector('.popup__close');\n  closeButton.addEventListener('click', handleCloseButtonClick);\n  popup.classList.add('popup_is-opened');\n  document.addEventListener('keydown', handleEscClose);\n  popup.addEventListener('mousedown', handleCloseOverlayClick);\n}\n//@todo Функция закрытия попапа\nfunction closeModal(popup) {\n  var closeButton = popup.querySelector('.popup__close');\n  closeButton.removeEventListener('click', handleCloseButtonClick);\n  popup.classList.remove('popup_is-opened');\n  document.removeEventListener('keydown', handleEscClose);\n  popup.removeEventListener('click', handleCloseOverlayClick);\n}\n\n//@todo Создать функции openImagePopup, которая будет открывать попап с картинкой:\nfunction openImagePopup(imageLink, caption) {\n  _constants__WEBPACK_IMPORTED_MODULE_0__.popupImageElement.src = imageLink;\n  _constants__WEBPACK_IMPORTED_MODULE_0__.popupImageElement.alt = caption;\n  _constants__WEBPACK_IMPORTED_MODULE_0__.popupImageCaption.textContent = caption;\n  openModal(_constants__WEBPACK_IMPORTED_MODULE_0__.popupImage);\n}\n\n\n//# sourceURL=webpack://yandex.praktikum/./src/components/modal.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _styles_index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/index.css */ \"./src/styles/index.css\");\n/* harmony import */ var _components_cards__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/cards */ \"./src/components/cards.js\");\n/* harmony import */ var _components_card__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/card */ \"./src/components/card.js\");\n/* harmony import */ var _components_modal__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/modal */ \"./src/components/modal.js\");\n\n\n\n\nvar placesItem = document.querySelector('.places__list');\nvar popupProfile = document.querySelector('.popup_type_edit');\nvar popupProfileOpenButton = document.querySelector('.profile__edit-button');\nvar popupAddCard = document.querySelector('.popup_type_new-card');\nvar popupCardOpenButton = document.querySelector('.profile__add-button');\nvar formProfile = document.querySelector('form[name=\"edit-profile\"]');\nvar nameInput = document.querySelector('.popup__input_type_name');\nvar jobInput = document.querySelector('.popup__input_type_description');\nvar profileName = document.querySelector('.profile__title');\nvar profileDescription = document.querySelector('.profile__description');\nvar newCardForm = document.querySelector('.popup_type_new-card .popup__form');\nvar cardContainer = document.querySelector('.places__list');\npopupProfileOpenButton.addEventListener('click', function () {\n  nameInput.value = profileName.textContent;\n  jobInput.value = profileDescription.textContent;\n  (0,_components_modal__WEBPACK_IMPORTED_MODULE_3__.openModal)(popupProfile);\n});\npopupCardOpenButton.addEventListener('click', function () {\n  return (0,_components_modal__WEBPACK_IMPORTED_MODULE_3__.openModal)(popupAddCard);\n});\n\n// @todo: Функция лайк карточки\nfunction handleLike(button) {\n  button.classList.toggle('card__like-button_is-active');\n}\n\n// @todo: Обработчик события submit для формы создания новой карточки\nfunction handleNewCardSubmit(event) {\n  event.preventDefault();\n  // Получаем значения полей формы\n  var placeNameInput = newCardForm.querySelector('.popup__input_type_card-name');\n  var linkInput = newCardForm.querySelector('.popup__input_type_url');\n  var placeName = placeNameInput.value;\n  var link = linkInput.value;\n  // Создаем объект новой карточки\n  var newCard = {\n    name: placeName,\n    link: link\n  };\n  // Создаем новую карточку с помощью функции createCard\n  var newCardElement = (0,_components_card__WEBPACK_IMPORTED_MODULE_2__.createCard)(newCard, deleteCard, handleLike);\n  // Добавляем новую карточку в начало контейнера с карточками\n  cardContainer.prepend(newCardElement);\n  // Закрываем диалоговое окно и очищаем форму\n  (0,_components_modal__WEBPACK_IMPORTED_MODULE_3__.closeModal)(popupAddCard);\n  newCardForm.reset();\n}\nnewCardForm.addEventListener('submit', handleNewCardSubmit);\n\n// @todo: Функция удаления карточки\nvar deleteCard = function deleteCard(cardElement) {\n  cardElement.remove();\n};\n\n// @todo: Вывести карточки на страницу\n_components_cards__WEBPACK_IMPORTED_MODULE_1__.initialCards.forEach(function (card) {\n  var newCardElement = (0,_components_card__WEBPACK_IMPORTED_MODULE_2__.createCard)(card, deleteCard, handleLike);\n  placesItem.append(newCardElement);\n});\n\n// @todo: нажатия кнопки «Сохранить» информация на странице обновляется, а попап автоматически закрывается\nfunction handleFormProfileSubmit(evt) {\n  evt.preventDefault();\n  var nameValue = nameInput.value;\n  var jobValue = jobInput.value;\n  profileName.textContent = nameValue;\n  profileDescription.textContent = jobValue;\n  (0,_components_modal__WEBPACK_IMPORTED_MODULE_3__.closeModal)(popupProfile);\n}\n\n//@todo: валидатор\n\nfunction showInputError() {}\nfunction hideInputError() {}\nfunction validateInput() {}\nformProfile.addEventListener('submit', handleFormProfileSubmit);\n\n//# sourceURL=webpack://yandex.praktikum/./src/index.js?");

/***/ }),

/***/ "./src/styles/index.css":
/*!******************************!*\
  !*** ./src/styles/index.css ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://yandex.praktikum/./src/styles/index.css?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;