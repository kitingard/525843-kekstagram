'use strict';

(function () {
  var imgEffects = document.querySelector('.img-upload__preview img');
  var effectsList = document.querySelector('.effects__list');
  var effects = ['none', 'chrome', 'sepia', 'marvin', 'phobos', 'heat'];

  var getImgEffect = function (effectSelector) {
    imgEffects.classList.add(effectSelector);
  };

  var removeEffectClasses = function () {
    for (var i = 0; i < effects.length; i++) {
      if (imgEffects.classList.contains('effects__preview--' + effects[window.i])) {
        imgEffects.classList.remove('effects__preview--' + effects[window.i]);
      }
    }
  };

  effectsList.addEventListener('click', function () {
    var targetEffect = event.target;
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
      removeEffectClasses();
      scalePin.style.left = scaleLine.offsetWidth + 'px';
      scaleLevel.style.width = scaleLine.offsetWidth + 'px';
      imgEffects.style.filter = '';
      getImgEffect('effects__preview--' + event.target.value);
      if (imgEffects.classList.contains('effects__preview--none')) {
        window.imgUploadScale.classList.add('hidden');
      }
    }
  });

  var scaleLine = document.querySelector('.scale__line');
  var scalePin = document.querySelector('.scale__pin');
  var scaleLevel = document.querySelector('.scale__level');
  var scaleValue = document.querySelector('.scale__value');
  window.RADIX_VALUE = 10;

  scalePin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var coordX = moveEvt.clientX;
      var scaleLineIndent = Math.round(scaleLine.getBoundingClientRect().left);
      var scaleValueMax = scaleLine.offsetWidth - scalePin.offsetWidth / 2;
      var SCALE_PIN_MIN = 0;
      var SCALE_VALUE_MIN = 0;
      var MARVIN_FILTER_MAX = 100;
      var PHOBOS_FILTER_MAX = 3;
      var HEAT_FILTER_MAX = 3;
      var scaleMoveСalculation = (coordX - scaleLineIndent) + 'px';
      var scaleValueСalculation = coordX - scaleLineIndent - scalePin.offsetWidth / 2;

      scalePin.style.left = scaleMoveСalculation;
      scaleLevel.style.width = scaleMoveСalculation;
      scaleValue.value = scaleValueСalculation;

      if (parseInt(scalePin.style.left, window.RADIX_VALUE) <= SCALE_PIN_MIN) {
        scalePin.style.left = SCALE_PIN_MIN;
        scaleLevel.style.width = SCALE_PIN_MIN;
      } else if (parseInt(scalePin.style.left, window.RADIX_VALUE) >= parseInt(scaleLine.offsetWidth, window.RADIX_VALUE)) {
        scalePin.style.left = scaleLine.offsetWidth + 'px';
        scaleLevel.style.width = scaleLine.offsetWidth + 'px';
      }

      if (scaleValue.value <= SCALE_VALUE_MIN) {
        scaleValue.value = SCALE_VALUE_MIN;
      } else if (scaleValue.value >= parseInt(scaleLine.offsetWidth, window.RADIX_VALUE)) {
        scaleValue.value = scaleValueMax;
      }

      for (window.i = 0; window.i < effects.length; window.i++) {
        if (imgEffects.classList.contains('effects__preview--' + effects[window.i])) {
          switch (effects[window.i]) {
            case ('chrome'):
              imgEffects.style.filter = 'grayscale(' + (scaleValue.value / scaleValueMax) + ')';
              break;
            case ('sepia'):
              imgEffects.style.filter = 'sepia(' + (scaleValue.value / scaleValueMax) + ')';
              break;
            case ('marvin'):
              imgEffects.style.filter = 'invert(' + (scaleValue.value * MARVIN_FILTER_MAX / scaleValueMax) + '%)';
              break;
            case ('phobos'):
              imgEffects.style.filter = 'blur(' + (scaleValue.value * PHOBOS_FILTER_MAX / scaleValueMax) + 'px)';
              break;
            case ('heat'):
              imgEffects.style.filter = 'brightness(' + (scaleValue.value * HEAT_FILTER_MAX / scaleValueMax) + ')';
              break;
          }
        }
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      if (dragged === false) {
        scaleValue.value = evt.clientX - Math.round(scaleLine.getBoundingClientRect().left) - scalePin.offsetWidth / 2;
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseUp', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
