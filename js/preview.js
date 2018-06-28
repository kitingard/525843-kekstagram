'use strict';

(function () {
  var AVATAR_MIN = 1;
  var AVATAR_MAX = 6;

  window.bigPictureElement = document.querySelector('.big-picture');
  window.bigPictureElement.querySelector('.likes-count').textContent = window.pictures[1].likes;
  window.bigPictureElement.querySelector('.comments-count').textContent = window.commentsList.length;
  window.bigPictureElement.querySelector('.social__caption').textContent = window.pictures[1].description;

  var socialPictures = window.bigPictureElement.querySelectorAll('.social__picture');
  for (window.i = 0; window.i < socialPictures.length; window.i++) {
    socialPictures[window.i].src = 'img/avatar-' + window.getRandom(AVATAR_MIN, AVATAR_MAX) + '.svg';
  }

  var socialText = window.bigPictureElement.querySelectorAll('.social__text');
  for (window.i = 0; window.i < socialText.length; window.i++) {
    socialText[window.i].textContent = window.pictures[window.i].comments;
  }

  window.bigPictureElement.querySelector('.social__comment-count').classList.add('visually-hidden');
  window.bigPictureElement.querySelector('.social__loadmore').classList.add('visually-hidden');
})();
