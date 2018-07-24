'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var bigPictureCancel = document.querySelector('.big-picture__cancel');
  var imgUploadControl = document.querySelector('.img-upload__control');
  var imgUploadInput = document.querySelector('.img-upload__input');
  window.imgEditingPopup = document.querySelector('.img-upload__overlay');
  var imgEditingPopupCancel = document.querySelector('.img-upload__cancel');
  window.imgUploadScale = document.querySelector('.img-upload__scale');
  window.bodyTag = document.querySelector('body');
  var bigPictureElement = document.querySelector('.big-picture');

  var onEscPress = function (openableElement) {
    document.addEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        if (window.textHashtags === evt.target || window.textDescription === evt.target) {
          return;
        } else {
          window.closePopup(openableElement);
        }
      }
    });
  };

  var openPopup = function (openableElement) {
    openableElement.classList.remove('hidden');
    window.bodyTag.classList.add('modal-open');
  };

  var onEnterPressAct = function (evt) {
    if (evt.keyCode === window.ENTER_KEYCODE) {
      var targetElement = evt.target;
      if (targetElement === imgUploadInput) {
        getCleanEditingPopup();
      } else if (targetElement.tagName === 'A' || targetElement.tagName === 'IMG') {
        if (targetElement.tagName === 'IMG') {
          bigPictureElement.querySelector('img').src = targetElement.src;
        } else {
          bigPictureElement.querySelector('img').src = targetElement.querySelector('img').src;
        }
        openPopup(bigPictureElement);
        onEscPress(bigPictureElement);
      }
    }
  };

  var onEnterPress = function () {
    document.addEventListener('keypress', function (evt) {
      onEnterPressAct(evt);
    });
  };

  window.closePopup = function (closingElement) {
    closingElement.classList.add('hidden');
    window.bodyTag.classList.remove('modal-open');
    document.removeEventListener('keydown', function (evt) {
      if (evt.keyCode === ESC_KEYCODE) {
        if (window.textHashtags === evt.target || window.textDescription === evt.target) {
          return;
        } else {
          window.closePopup(closingElement);
        }
      }
    });

  };

  var getCleanEditingPopup = function () {
    window.textHashtags.value = '';
    window.textDescription.value = '';
    window.imgUploadScale.classList.add('hidden');
    imgUploadInput.value = '';
    window.getCheckedEffect();
    window.removeEffectClasses();
    window.getCleanSize();
  };

  window.similarPictureElement.addEventListener('click', function (e) {
    if (!e) {
      e = event;
    }
    var targetImg = e.target;
    if (window.bodyTag.classList.contains('modal-open')) {
      return;
    } else if (targetImg.tagName === 'IMG') {
      bigPictureElement.querySelector('img').src = targetImg.src;
      openPopup(bigPictureElement);
      onEscPress(bigPictureElement);
    }
  });

  bigPictureCancel.addEventListener('click', function () {
    window.closePopup(bigPictureElement);
  });

  imgUploadControl.addEventListener('click', function () {
    getCleanEditingPopup();
  });

  imgUploadInput.addEventListener('change', function () {
    openPopup(window.imgEditingPopup);
    onEscPress(window.imgEditingPopup);
  });

  imgEditingPopupCancel.addEventListener('click', function () {
    window.closePopup(window.imgEditingPopup);
  });

  onEnterPress();
})();
