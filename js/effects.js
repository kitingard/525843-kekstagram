'use strict';

(function () {
  window.RADIX_VALUE = 10;
  var SCALE_PIN_MIN = 0;
  var SCALE_VALUE_MIN = 0;
  var MARVIN_FILTER_MAX = 100;
  var MAX_PERCENT = 100;
  var PHOBOS_FILTER_MAX = 3;
  var HEAT_FILTER_MAX = 3;
  var imgEffects = document.querySelector('.img-upload__preview img');
  var effectsList = document.querySelector('.effects__list');
  var effects = ['none', 'chrome', 'sepia', 'marvin', 'phobos', 'heat'];
  var scaleLine = document.querySelector('.scale__line');
  var scalePin = document.querySelector('.scale__pin');
  var scaleLevel = document.querySelector('.scale__level');
  var scaleValue = document.querySelector('.scale__value');
  var effectsRadioNodeList = document.querySelectorAll('.effects__radio');
  var effectsRadioArray = Array.from(effectsRadioNodeList);
  var effectNoneInput = document.querySelector('#effect-none');

  var getImgEffect = function (effectSelector) {
    imgEffects.classList.add(effectSelector);
  };

  window.getCheckedEffect = function () {
    effectsRadioArray.forEach(function (item) {
      if (item.checked) {
        item.checked = false;
      }
      effectNoneInput.checked = true;
    });
  };

  window.removeEffectClasses = function () {
    effects.forEach(function (item) {
      if (imgEffects.classList.contains('effects__preview--' + item)) {
        imgEffects.classList.remove('effects__preview--' + item);
        imgEffects.style.filter = '';
        scaleValue.value = 100;
      }
    });
  };

  var getEffectTarget = function (targetEffect, e) {
    if (targetEffect.value === 'UL') {
      return;
    } else {
      if (imgEffects.classList.contains('effects__preview--none')) {
        window.imgUploadScale.classList.add('hidden');
      } else {
        if (window.imgUploadScale.classList.contains('hidden')) {
          window.imgUploadScale.classList.remove('hidden');
        }
      }
      window.removeEffectClasses();
      scalePin.style.left = scaleLine.offsetWidth + 'px';
      scaleLevel.style.width = scaleLine.offsetWidth + 'px';
      imgEffects.style.filter = '';
      getImgEffect('effects__preview--' + e.target.value);
      if (imgEffects.classList.contains('effects__preview--none')) {
        window.imgUploadScale.classList.add('hidden');
      }
    }
  };

  effectsList.addEventListener('click', function (e) {
    if (!e) {
      e = event;
    }
    var targetEffect = e.target;
    getEffectTarget(targetEffect, e);
  });

  scalePin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var coordX = moveEvt.clientX;
      var scaleLineIndent = Math.round(scaleLine.getBoundingClientRect().left);
      var scaleValueMax = scaleLine.offsetWidth - scalePin.offsetWidth / 2;
      var scaleMoveСalculation = (coordX - scaleLineIndent) + 'px';
      var scaleValueСalculation = coordX - scaleLineIndent - scalePin.offsetWidth / 2;

      scalePin.style.left = scaleMoveСalculation;
      scaleLevel.style.width = scaleMoveСalculation;

      if (parseInt(scalePin.style.left, window.RADIX_VALUE) <= SCALE_PIN_MIN) {
        scalePin.style.left = SCALE_PIN_MIN;
        scaleLevel.style.width = SCALE_PIN_MIN;
      } else if (parseInt(scalePin.style.left, window.RADIX_VALUE) >= parseInt(scaleLine.offsetWidth, window.RADIX_VALUE)) {
        scalePin.style.left = scaleLine.offsetWidth + 'px';
        scaleLevel.style.width = scaleLine.offsetWidth + 'px';
      }

      if (scaleValueСalculation <= SCALE_VALUE_MIN) {
        scaleValueСalculation = SCALE_VALUE_MIN;
      } else if (scaleValueСalculation >= parseInt(scaleLine.offsetWidth, window.RADIX_VALUE)) {
        scaleValueСalculation = scaleValueMax;
      }

      effects.forEach(function (item) {
        if (imgEffects.classList.contains('effects__preview--' + item)) {
          switch (item) {
            case ('chrome'):
              scaleValue.value = parseInt((scaleValueСalculation / scaleValueMax) * MAX_PERCENT, window.RADIX_VALUE);
              imgEffects.style.filter = 'grayscale(' + scaleValueСalculation / scaleValueMax + ')';
              break;
            case ('sepia'):
              scaleValue.value = parseInt((scaleValueСalculation / scaleValueMax) * MAX_PERCENT, window.RADIX_VALUE);
              imgEffects.style.filter = 'sepia(' + (scaleValueСalculation / scaleValueMax) + ')';
              break;
            case ('marvin'):
              scaleValue.value = parseInt(scaleValueСalculation * MARVIN_FILTER_MAX / scaleValueMax, window.RADIX_VALUE);
              imgEffects.style.filter = 'invert(' + (scaleValueСalculation * MARVIN_FILTER_MAX / scaleValueMax) + '%)';
              break;
            case ('phobos'):
              scaleValue.value = parseInt((scaleValueСalculation / scaleValueMax) * MAX_PERCENT, window.RADIX_VALUE);
              imgEffects.style.filter = 'blur(' + (scaleValueСalculation * PHOBOS_FILTER_MAX / scaleValueMax) + 'px)';
              break;
            case ('heat'):
              scaleValue.value = parseInt((scaleValueСalculation / scaleValueMax) * MAX_PERCENT, window.RADIX_VALUE);
              imgEffects.style.filter = 'brightness(' + (scaleValueСalculation * HEAT_FILTER_MAX / scaleValueMax) + ')';
              break;
          }
        }
      });
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      if (dragged === false) {
        scaleValue.value = evt.clientX - Math.round(scaleLine.getBoundingClientRect().left) - scalePin.offsetWidth / 2;
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseUp', onMouseUp);
      effectsList.removeEventListener('click', getEffectTarget);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
