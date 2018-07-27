'use strict';

(function () {
  var DESCRIPTION = 0;
  var FIRST_ELEM = 1;
  var AVATAR_MAX = 6;
  var DEFAULT_OPEN_COMMENTS_VALUE = 5;
  window.ENTER_KEYCODE = 13;
  var bigPicturePreview = document.querySelector('.big-picture__preview');
  var bigPictureSocial = bigPicturePreview.querySelector('.big-picture__social');
  var imgUploadOverlay = document.querySelector('.img-upload__overlay');
  var targetLinkIndex;

  var renderPicture = function (picture) {
    var bigPictureLinkElement = bigPictureSocial.cloneNode(true);
    var openCommentsCount = bigPictureLinkElement.querySelector('.social__comment-count');

    var renderSocial = function (item) {
      var socialCommentElement = bigPictureLinkElement.querySelector('.social__comment').cloneNode(true);

      socialCommentElement.querySelector('.social__text').textContent = item;
      socialCommentElement.querySelector('.social__picture').src = 'img/avatar-' + window.getRandom(FIRST_ELEM, AVATAR_MAX) + '.svg';

      return socialCommentElement;
    };

    var socialFragment = document.createDocumentFragment();

    picture.comments.forEach(function (item) {
      socialFragment.appendChild(renderSocial(item));
    });

    var socialComments = bigPictureLinkElement.querySelector('.social__comments');
    var commentsNodeList = bigPictureLinkElement.querySelectorAll('.social__comment');
    var commentsArray = Array.from(commentsNodeList);

    window.deleteElement(commentsArray, socialComments);

    socialComments.appendChild(socialFragment);

    commentsNodeList = bigPictureLinkElement.querySelectorAll('.social__comment');
    commentsArray = Array.from(commentsNodeList);

    var deleteButtons = function () {
      bigPictureLinkElement.querySelector('.social__comment-count').classList.add('visually-hidden');
      bigPictureLinkElement.querySelector('.social__loadmore').classList.add('visually-hidden');
    };

    var sortComments = function (array) {
      var hiddenComments = array.filter(function (item) {
        return item.classList.contains('visually-hidden');
      });

      if (hiddenComments.length > DEFAULT_OPEN_COMMENTS_VALUE) {
        openCommentsCount.innerHTML = (array.length - hiddenComments.length + DEFAULT_OPEN_COMMENTS_VALUE) + ' из <span class="comments-count">' + array.length + '</span> комментариев';
        for (i = 0; i < DEFAULT_OPEN_COMMENTS_VALUE; i++) {
          hiddenComments[i].classList.remove('visually-hidden');
        }
      } else {
        hiddenComments.forEach(function (item) {
          item.classList.remove('visually-hidden');
          deleteButtons();
        });
      }
    };

    if (commentsArray.length <= DEFAULT_OPEN_COMMENTS_VALUE) {
      deleteButtons();
    } else {
      bigPictureLinkElement.querySelector('.social__comment-count').classList.remove('visually-hidden');
      bigPictureLinkElement.querySelector('.social__loadmore').classList.remove('visually-hidden');
      openCommentsCount.innerHTML = DEFAULT_OPEN_COMMENTS_VALUE + ' из <span class="comments-count">' + commentsArray.length + '</span> комментариев';
      for (var i = DEFAULT_OPEN_COMMENTS_VALUE; i < commentsArray.length; i++) {
        commentsArray[i].classList.add('visually-hidden');
      }
      bigPictureLinkElement.querySelector('.social__loadmore').addEventListener('click', function () {
        sortComments(commentsArray);
      });
    }

    bigPictureLinkElement.querySelector('.likes-count').textContent = picture.likes;
    bigPictureLinkElement.querySelector('.social__caption').textContent = picture.comments[DESCRIPTION];

    return bigPictureLinkElement;
  };

  var getPreview = function (pictures, e) {
    if (!e) {
      e = event;
    }
    if (imgUploadOverlay.classList.contains('hidden')) {
      var targetLink = e.target;
      if (targetLink.tagName === 'IMG') {
        var targetLinkElement = targetLink.parentElement;
        targetLinkIndex = targetLinkElement.getAttribute('data-index');
      } else if (targetLink.tagName === 'A') {
        targetLinkIndex = targetLink.getAttribute('data-index');
      } else {
        return;
      }

      var bigFragment = document.createDocumentFragment();
      bigFragment.appendChild(renderPicture(pictures[targetLinkIndex]));

      bigPictureSocial = bigPicturePreview.querySelector('.big-picture__social');
      bigPicturePreview.replaceChild(bigFragment, bigPictureSocial);
    } else {
      return;
    }
  };

  var getEnterClick = function (pictures, evt) {
    if (evt.keyCode === window.ENTER_KEYCODE) {
      window.onEnterPress(evt);
      getPreview(pictures, evt);
      window.similarPictureElement.removeEventListener('keydown', getEnterClick);
    }
  };

  var getMouseClick = function (pictures, e) {
    window.onClickImgOpen(e);
    getPreview(pictures, e);
    window.similarPictureElement.removeEventListener('click', getMouseClick);
  };

  window.getPreviewPicture = function (pictures) {
    window.similarPictureElement.addEventListener('click', function (e) {
      getMouseClick(pictures, e);
    });
    window.similarPictureElement.addEventListener('keydown', function (evt) {
      getEnterClick(pictures, evt);
    });
  };
})();
