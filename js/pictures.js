'use strict';

var commentsList = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
var descriptionList = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];
var PHOTOS_QUANTITY = 25;
var LIKES_MIN = 15;
var LIKES_MAX = 200;
var AVATAR_MIN = 1;
var AVATAR_MAX = 6;


var getRandom = function (min, max) {
  return (Math.round(Math.random() * (max - min) + min));
};

var pictures = [];

for (var i = 0; i < PHOTOS_QUANTITY; i++) {
  pictures[i] = {
    url: 'photos/' + (i + 1) + '.jpg',
    likes: getRandom(LIKES_MIN, LIKES_MAX),
    comments: commentsList[getRandom(0, (commentsList.length - 1))],
    description: descriptionList[getRandom(0, (descriptionList.length - 1))]
  };
}

var similarPictureElement = document.querySelector('.pictures');
var similarPictureLinkTemplate = document.querySelector('#picture').content.querySelector('.picture__link');

var getPictureElement = function (template, imgSelector, likesSelector, commentsSelector, element) {
  for (i = 0; i < pictures.length; i++) {
    var pictureLinkElement = template.cloneNode(true);

    pictureLinkElement.querySelector(imgSelector).src = pictures[i].url;
    pictureLinkElement.querySelector(likesSelector).textContent = pictures[i].likes;
    pictureLinkElement.querySelector(commentsSelector).textContent = commentsList.length;

    element.appendChild(pictureLinkElement);
  }
};

getPictureElement(similarPictureLinkTemplate, 'img', '.picture__stat--likes', '.picture__stat--comments', similarPictureElement);

var bigPictureElement = document.querySelector('.big-picture');
var bigPictureCancel = document.querySelector('.big-picture__cancel');
var body = document.querySelector('body');
var uploadingFile = document.querySelector('#upload-file');
var imgEditingPopup = document.querySelector('.img-upload__overlay');
var imgEditingPopupCancel = document.querySelector('.img-upload__cancel');
var ESC_KEYCODE = 27;

var openPopup = function (openableElement) {
  openableElement.classList.remove('hidden');
  body.classList.add('.modal-open');
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      if (textHashtags === evt.target || textDescription === evt.target) {
        return;
      } else {
        if (openableElement === imgEditingPopup) {
          uploadingFile.value = '';
          closePopup(openableElement);
        } else {
          closePopup(openableElement);
        }
      }
    }
  });
};

var closePopup = function (closingElement) {
  closingElement.classList.add('hidden');
  body.classList.remove('.modal-open');
  document.removeEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup(closingElement);
    }
  });
};

similarPictureElement.addEventListener('click', function () {
  var targetImg = event.target;
  if (body.classList.contains('.modal-open')) {
    return;
  } else if (targetImg.tagName === 'IMG') {
    bigPictureElement.querySelector('img').src = targetImg.src;
    openPopup(bigPictureElement);
  }
});

bigPictureCancel.addEventListener('click', function () {
  closePopup(bigPictureElement);
});

uploadingFile.addEventListener('change', function () {
  openPopup(imgEditingPopup);
});

imgEditingPopupCancel.addEventListener('click', function () {
  closePopup(imgEditingPopup);
  uploadingFile.value = '';
});

bigPictureElement.querySelector('.likes-count').textContent = pictures[1].likes;
bigPictureElement.querySelector('.comments-count').textContent = commentsList.length;
bigPictureElement.querySelector('.social__caption').textContent = pictures[1].description;

var socialPictures = bigPictureElement.querySelectorAll('.social__picture');
for (i = 0; i < socialPictures.length; i++) {
  socialPictures[i].src = 'img/avatar-' + getRandom(AVATAR_MIN, AVATAR_MAX) + '.svg';
}

var socialText = bigPictureElement.querySelectorAll('.social__text');
for (i = 0; i < socialText.length; i++) {
  socialText[i].textContent = pictures[i].comments;
}

bigPictureElement.querySelector('.social__comment-count').classList.add('visually-hidden');
bigPictureElement.querySelector('.social__loadmore').classList.add('visually-hidden');

var imgUploadScale = document.querySelector('.img-upload__scale');
var imgEffects = document.querySelector('.img-upload__preview img');
var effectsList = document.querySelector('.effects__list');
var effects = ['none', 'chrome', 'sepia', 'marvin', 'phobos', 'heat'];

var getImgEffect = function (effectSelector) {
  imgEffects.classList.add(effectSelector);
};

var removeEffectClasses = function () {
  for (i = 0; i < effects.length; i++) {
    if (imgEffects.classList.contains('effects__preview--' + effects[i])) {
      imgEffects.classList.remove('effects__preview--' + effects[i]);
    }
  }
};

effectsList.addEventListener('click', function () {
  var targetEffect = event.target;
  if (targetEffect.value === 'UL') {
    return;
  } else {
    if (imgEffects.classList.contains('effects__preview--none')) {
      imgUploadScale.classList.add('hidden');
    } else {
      if (imgUploadScale.classList.contains('hidden')) {
        imgUploadScale.classList.remove('hidden');
      }
    }
    removeEffectClasses();
    getImgEffect('effects__preview--' + event.target.value);
    if (imgEffects.classList.contains('effects__preview--none')) {
      imgUploadScale.classList.add('hidden');
    }
  }
});

var imgUploadPreview = document.querySelector('.img-upload__preview');
var minusControl = document.querySelector('.resize__control--minus');
var plusControl = document.querySelector('.resize__control--plus');
var controlValue = document.querySelector('.resize__control--value');
var CONTROL_STEP = 25;
var RADIX_VALUE = 10;

minusControl.addEventListener('click', function () {
  if (controlValue.value === '25%') {
    return;
  } else {
    controlValue.value = parseInt(controlValue.value, RADIX_VALUE) - CONTROL_STEP + '%';
    imgUploadPreview.style.transform = 'scale(0.' + parseInt(controlValue.value, RADIX_VALUE) + ')';
  }
});

plusControl.addEventListener('click', function () {
  if (controlValue.value === '100%') {
    return;
  } else {
    controlValue.value = parseInt(controlValue.value, RADIX_VALUE) + CONTROL_STEP + '%';
    if (controlValue.value === '100%') {
      imgUploadPreview.style.transform = 'scale(1)';
    } else {
      imgUploadPreview.style.transform = 'scale(0.' + parseInt(controlValue.value, RADIX_VALUE) + ')';
    }
  }
});

var textHashtags = document.querySelector('.text__hashtags');
var textDescription = document.querySelector('.text__description');
var imgUploadSubmit = document.querySelector('.img-upload__submit');

var getHashtagsValidation = function () {
  var hashtags = (textHashtags.value.split(' '));
  var hashtagComparison = [];
  for (i = 0; i < hashtags.length; i++) {
    var hashtag = hashtags[i];

    if (hashtag.length < 2) {
      textHashtags.setCustomValidity('Имя должно состоять минимум из 2-х символов');
      getInvalidInput(textHashtags);
    } else if (hashtag.length > 20) {
      textHashtags.setCustomValidity('Имя не должно превышать 20-ти символов, включая #');
      getInvalidInput(textHashtags);
    } else if (/,/.test(hashtag) === true) {
      textHashtags.setCustomValidity('Хэш-теги разделяются пробелами');
      getInvalidInput(textHashtags);
    } else if (hashtag.charAt(0) !== '#') {
      textHashtags.setCustomValidity('Хэш-тег должен начинаться со знака #');
      getInvalidInput(textHashtags);
    } else if (hashtags.length > 5) {
      textHashtags.setCustomValidity('Хэш-тегов не может быть больше пяти');
      getInvalidInput(textHashtags);
    } else if (hashtagComparison.indexOf(hashtag.toLowerCase()) === -1) {
      hashtagComparison.push(hashtag.toLowerCase());
    } else {
      textHashtags.setCustomValidity('Один и тот же хэш-тег не может быть использован дважды');
      getInvalidInput(textHashtags);
    }
  }
};

var getInvalidInput = function (inputSelector) {
  inputSelector.style.borderColor = 'red';
};

imgUploadSubmit.addEventListener('click', function () {
  getHashtagsValidation();
  textHashtags.addEventListener('change', function () {
    textHashtags.setCustomValidity('');
    textHashtags.style.borderColor = 'transparent';
  });
});
