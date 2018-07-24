'use strict';

(function () {
  var CONTROL_STEP = 25;
  var MIN_VALUE = '25%';
  var MAX_VALUE = '100%';
  var imgUploadPreview = document.querySelector('.img-upload__preview');
  var minusControl = document.querySelector('.resize__control--minus');
  var plusControl = document.querySelector('.resize__control--plus');
  var controlValue = document.querySelector('.resize__control--value');

  minusControl.addEventListener('click', function () {
    if (controlValue.value === MIN_VALUE) {
      return;
    } else {
      controlValue.value = parseInt(controlValue.value, window.RADIX_VALUE) - CONTROL_STEP + '%';
      imgUploadPreview.style.transform = 'scale(0.' + parseInt(controlValue.value, window.RADIX_VALUE) + ')';
    }
  });

  plusControl.addEventListener('click', function () {
    if (controlValue.value === MAX_VALUE) {
      return;
    } else {
      controlValue.value = parseInt(controlValue.value, window.RADIX_VALUE) + CONTROL_STEP + '%';
      if (controlValue.value === MAX_VALUE) {
        imgUploadPreview.style.transform = 'scale(1)';
      } else {
        imgUploadPreview.style.transform = 'scale(0.' + parseInt(controlValue.value, window.RADIX_VALUE) + ')';
      }
    }
  });

  window.getCleanSize = function () {
    imgUploadPreview.style.transform = '';
    controlValue.value = MAX_VALUE;
  };
})();
