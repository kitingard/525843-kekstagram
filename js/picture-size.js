'use strict';

(function () {
  var imgUploadPreview = document.querySelector('.img-upload__preview');
  var minusControl = document.querySelector('.resize__control--minus');
  var plusControl = document.querySelector('.resize__control--plus');
  var controlValue = document.querySelector('.resize__control--value');
  var CONTROL_STEP = 25;

  minusControl.addEventListener('click', function () {
    if (controlValue.value === '25%') {
      return;
    } else {
      controlValue.value = parseInt(controlValue.value, window.RADIX_VALUE) - CONTROL_STEP + '%';
      imgUploadPreview.style.transform = 'scale(0.' + parseInt(controlValue.value, window.RADIX_VALUE) + ')';
    }
  });

  plusControl.addEventListener('click', function () {
    if (controlValue.value === '100%') {
      return;
    } else {
      controlValue.value = parseInt(controlValue.value, window.RADIX_VALUE) + CONTROL_STEP + '%';
      if (controlValue.value === '100%') {
        imgUploadPreview.style.transform = 'scale(1)';
      } else {
        imgUploadPreview.style.transform = 'scale(0.' + parseInt(controlValue.value, window.RADIX_VALUE) + ')';
      }
    }
  });
})();
