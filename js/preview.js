'use strict';

(function () {
  var MIN_DESCRIPTION = 0;
  // var AVATAR_MIN = 1;
  var AVATAR_MAX = 6;
  var descriptionList = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];
  window.bigPictureElement = document.querySelector('.big-picture');
  var bigPictureSocial = document.querySelector('.big-picture__social');


  // var socialPictures = window.bigPictureElement.querySelectorAll('.social__picture');
  // for (window.i = 0; window.i < socialPictures.length; window.i++) {
  //   socialPictures[window.i].src = 'img/avatar-' + window.getRandom(AVATAR_MIN, AVATAR_MAX) + '.svg';
  // }

  // var socialText = window.bigPictureElement.querySelectorAll('.social__text');
  // for (window.i = 0; window.i < socialText.length; window.i++) {
  //   socialText[window.i].textContent = window.pictures[window.i].comments;
  // }


  var renderPicture = function (picture) {
    var bigPictureLinkElement = bigPictureSocial.cloneNode(true);

    bigPictureLinkElement.querySelector('.likes-count').textContent = picture.likes;
    bigPictureLinkElement.querySelector('.comments-count').textContent = picture.comments.length;
    bigPictureLinkElement.querySelector('.social__caption').textContent = descriptionList[window.getRandom(MIN_DESCRIPTION, AVATAR_MAX)];

    return bigPictureLinkElement;
  };

  var getPictureInfo = function (pictures) {
    var bigFragment = document.createDocumentFragment();

    for (window.i = 0; window.i < window.PHOTOS_QUANTITY; window.i++) {
      bigFragment.appendChild(renderPicture(pictures[window.i]));
    }
    bigPictureSocial.appendChild(bigFragment);
  };

  window.load(getPictureInfo);

  window.bigPictureElement.querySelector('.social__comment-count').classList.add('visually-hidden');
  window.bigPictureElement.querySelector('.social__loadmore').classList.add('visually-hidden');
})();
