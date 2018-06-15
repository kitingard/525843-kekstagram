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
    pictureLinkElement.querySelector(commentsSelector).textContent = pictures[i].comments;

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
      if (openableElement === imgEditingPopup) {
        uploadingFile.value = '';
        closePopup(openableElement);
      } else {
        closePopup(openableElement);
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

var imgEffects = document.querySelector('.img-upload__preview img');
var scalePin = document.querySelector('.scale__pin');
var scaleLine = document.querySelector('.img-upload__scale');
var effectNone = document.querySelector('#effect-none');
var effectChrome = document.querySelector('#effect-chrome');
var effectSepia = document.querySelector('#effect-sepia');
var effectMarvin = document.querySelector('#effect-marvin');
var effectPhobos = document.querySelector('#effect-phobos');
var effectHeat = document.querySelector('#effect-heat');

var getImgEffect = function (effectSelector) {
  imgEffects.classList.add(effectSelector);
};

effectNone.addEventListener('click', function () {
  getImgEffect('effects__preview--none');
  scaleLine.classList.add('hidden');
});

effectChrome.addEventListener('click', function () {
  getImgEffect('effects__preview--chrome');
});

effectSepia.addEventListener('click', function () {
  getImgEffect('effects__preview--sepia');
});

effectMarvin.addEventListener('click', function () {
  getImgEffect('effects__preview--marvin');
});

effectPhobos.addEventListener('click', function () {
  getImgEffect('effects__preview--phobos');
});

effectHeat.addEventListener('click', function () {
  getImgEffect('effects__preview--heat');
});


scalePin.addEventListener('mouseup', function () {

});


