'use strict';

(function () {
  var MIN_DESCRIPTION = 0;
  var MAX_DESCRIPTION = 5;
  var AVATAR_MIN = 1;
  var AVATAR_MAX = 6;
  var descriptionList = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];
  window.bigPictureElement = document.querySelector('.big-picture');
  var bigPicturePreview = document.querySelector('.big-picture__preview');
  var bigPictureSocial = bigPicturePreview.querySelector('.big-picture__social');

  var getPictureInfo = function (pictures) {
    window.similarPictureElement.addEventListener('click', function () {
      var targetLink = event.target;
      if (targetLink.tagName === 'IMG') {
        var targetLinkElement = targetLink.parentElement;
        var targetLinkIndex = targetLinkElement.getAttribute('data-index');
      }

      var renderPicture = function (picture) {
        var bigPictureLinkElement = bigPictureSocial.cloneNode(true);

        bigPictureLinkElement.querySelector('.likes-count').textContent = picture.likes;
        bigPictureLinkElement.querySelector('.comments-count').textContent = picture.comments.length;
        bigPictureLinkElement.querySelector('.social__caption').textContent = descriptionList[window.getRandom(MIN_DESCRIPTION, MAX_DESCRIPTION)];
        var socialPictures = bigPictureLinkElement.querySelectorAll('.social__picture');

        var socialText = bigPictureLinkElement.querySelectorAll('.social__text');
        for (i = 0; i < socialText.length; i++) {
          socialText[i].textContent = picture.comments[i];
        }

        for (var i = 0; i < socialPictures.length; i++) {
          socialPictures[i].src = 'img/avatar-' + window.getRandom(AVATAR_MIN, AVATAR_MAX) + '.svg';
        }

        return bigPictureLinkElement;
      };

      var bigFragment = document.createDocumentFragment();
      bigFragment.appendChild(renderPicture(pictures[targetLinkIndex]));

      bigPictureSocial = bigPicturePreview.querySelector('.big-picture__social');
      bigPicturePreview.replaceChild(bigFragment, bigPictureSocial);
    });
  };

  window.load(getPictureInfo);

  window.bigPictureElement.querySelector('.social__comment-count').classList.add('visually-hidden');
  window.bigPictureElement.querySelector('.social__loadmore').classList.add('visually-hidden');
})();
