'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var bigPictureCancel = document.querySelector('.big-picture__cancel');
  var imgUploadControl = document.querySelector('.img-upload__control');
  var imgUploadInput = document.querySelector('.img-upload__input');
  window.similarPictureElement = document.querySelector('.pictures');
  window.imgEditingPopup = document.querySelector('.img-upload__overlay');
  var imgEditingPopupCancel = document.querySelector('.img-upload__cancel');
  window.imgUploadScale = document.querySelector('.img-upload__scale');
  window.bodyTag = document.querySelector('body');
  var bigPictureElement = document.querySelector('.big-picture');

  var openPopup = function (openableElement) {
    openableElement.classList.remove('hidden');
    window.bodyTag.classList.add('modal-open');
    document.addEventListener('keydown', function (evt) {
      onEscPress(openableElement, evt);
    });
  };

  var onEscPress = function (openableElement, evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      if (window.textHashtags === evt.target || window.textDescription === evt.target) {
        return;
      } else {
        window.closePopup(openableElement);
      }
    }
  };

  window.onEnterPress = function (evt) {
    var targetElement = evt.target;
    if (targetElement === imgUploadInput) {
      getCleanEditingPopup();
      return;
    } else if (targetElement.tagName === 'IMG') {
      bigPictureElement.querySelector('img').src = targetElement.src;
    } else if (targetElement.tagName === 'A') {
      bigPictureElement.querySelector('img').src = targetElement.querySelector('img').src;
    } else {
      return;
    }
    openPopup(bigPictureElement);
  };

  window.onClickImgOpen = function (e) {
    var targetImg = e.target;
    if (window.bodyTag.classList.contains('modal-open')) {
      return;
    } else if (targetImg.tagName === 'IMG') {
      bigPictureElement.querySelector('img').src = targetImg.src;
      openPopup(bigPictureElement);
    }
  };

  window.closePopup = function (closingElement) {
    closingElement.classList.add('hidden');
    window.bodyTag.classList.remove('modal-open');
    document.removeEventListener('keydown', onEscPress);
  };

  var getCleanEditingPopup = function () {
    imgUploadInput.value = '';
    window.textHashtags.value = '';
    window.textDescription.value = '';
    window.imgUploadScale.classList.add('hidden');
    window.getCheckedEffect();
    window.removeEffectClasses();
    window.getCleanSize();
  };

  bigPictureCancel.addEventListener('click', function () {
    window.closePopup(bigPictureElement);
  });

  imgUploadControl.addEventListener('click', function () {
    getCleanEditingPopup();
  });

  imgUploadInput.addEventListener('change', function () {
    openPopup(window.imgEditingPopup);
  });

  imgEditingPopupCancel.addEventListener('click', function () {
    window.closePopup(window.imgEditingPopup);
  });
})();
