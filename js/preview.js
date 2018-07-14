'use strict';

(function () {
  var DESCRIPTION = 0;
  var FIRST_ELEM = 1;
  var AVATAR_MAX = 6;
  var bigPicturePreview = document.querySelector('.big-picture__preview');
  var bigPictureSocial = bigPicturePreview.querySelector('.big-picture__social');

  var getPictureInfo = function (pictures) {

    window.similarPictureElement.addEventListener('click', function () {
      var targetLink = event.target;
      if (targetLink.tagName === 'IMG') {
        var targetLinkElement = targetLink.parentElement;
        var targetLinkIndex = targetLinkElement.getAttribute('data-index');
      } else {
        return;
      }

      var renderPicture = function (picture) {
        var bigPictureLinkElement = bigPictureSocial.cloneNode(true);

        bigPictureLinkElement.querySelector('.likes-count').textContent = picture.likes;
        bigPictureLinkElement.querySelector('.comments-count').textContent = picture.comments.length;
        bigPictureLinkElement.querySelector('.social__caption').textContent = picture.comments[DESCRIPTION];

        var renderSocial = function () {
          var socialCommentElement = bigPictureLinkElement.querySelector('.social__comment').cloneNode(true);

          socialCommentElement.querySelector('.social__text').textContent = picture.comments[i];
          socialCommentElement.querySelector('.social__picture').src = 'img/avatar-' + window.getRandom(FIRST_ELEM, AVATAR_MAX) + '.svg';

          return socialCommentElement;
        };

        var socialFragment = document.createDocumentFragment();

        for (var i = 0; i < picture.comments.length; i++) {
          socialFragment.appendChild(renderSocial());
        }

        var socialComments = bigPictureLinkElement.querySelector('.social__comments');
        var commentsNodeList = bigPictureLinkElement.querySelectorAll('.social__comment');
        var commentsArray = Array.from(commentsNodeList);

        window.deleteElement(commentsArray, socialComments);

        socialComments.appendChild(socialFragment);

        commentsNodeList = bigPictureLinkElement.querySelectorAll('.social__comment');
        commentsArray = Array.from(commentsNodeList);

        if (picture.comments.length > 5) {
          for (i = 5; i < picture.comments.length; i++) {
            commentsArray[i].classList.add('visually-hidden');
            bigPictureLinkElement.querySelector('.social__comment-count').classList.remove('visually-hidden');
            bigPictureLinkElement.querySelector('.social__loadmore').classList.remove('visually-hidden');
          }
          bigPictureLinkElement.querySelector('.social__loadmore').addEventListener('click', function () {
            for (i = 5; i < picture.comments.length; i++) {
              commentsArray[i].classList.remove('visually-hidden');
              bigPictureLinkElement.querySelector('.social__comment-count').classList.add('visually-hidden');
              bigPictureLinkElement.querySelector('.social__loadmore').classList.add('visually-hidden');
            }
          });
        } else {
          bigPictureLinkElement.querySelector('.social__comment-count').classList.add('visually-hidden');
          bigPictureLinkElement.querySelector('.social__loadmore').classList.add('visually-hidden');
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
})();
