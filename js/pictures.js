'use strict';

(function () {
  var NEW_LENGHT = 10;
  var FIRST_ELEM = 0;
  var TIME_FOR_ERROR = 10000;
  window.similarPictureElement = document.querySelector('.pictures');
  var similarPictureLinkTemplate = document.querySelector('#picture').content.querySelector('.picture__link');
  var imgFiltersForm = document.querySelector('.img-filters__form');
  var filterPopular = document.querySelector('#filter-popular');
  var filterNew = document.querySelector('#filter-new');
  var filterDiscussed = document.querySelector('#filter-discussed');
  var pictures = [];

  window.getRandom = function (min, max) {
    return (Math.round(Math.random() * (max - min) + min));
  };

  var renderPictures = function (picture) {
    window.pictureLinkElement = similarPictureLinkTemplate.cloneNode(true);

    window.pictureLinkElement.querySelector('img').src = picture.url;
    window.pictureLinkElement.querySelector('.picture__stat--likes').textContent = picture.likes;
    window.pictureLinkElement.querySelector('.picture__stat--comments').textContent = picture.comments.length;

    return window.pictureLinkElement;
  };

  var getPictures = function (array) {
    var fragment = document.createDocumentFragment();

    array.forEach(function (item, i) {
      fragment.appendChild(renderPictures(item));
      window.pictureLinkElement.setAttribute('data-index', i);
      window.pictureLinkElement.querySelector('img').setAttribute('tabindex', FIRST_ELEM);
      pictures.push(window.pictureLinkElement);
    });

    window.similarPictureElement.appendChild(fragment);
  };

  var getActive = function (activeButton, buttonOffOne, buttonOffTwo) {
    if (activeButton.classList.contains('img-filters__button--active') === false) {
      activeButton.classList.add('img-filters__button--active');
      buttonOffOne.classList.remove('img-filters__button--active');
      buttonOffTwo.classList.remove('img-filters__button--active');
    }
  };

  window.deleteElement = function (array, parent) {
    array.forEach(function (item) {
      parent.removeChild(item);
    });
  };

  var getFilter = function (filterId) {
    var imagesNodeList = window.similarPictureElement.querySelectorAll('a');
    var imagesArray = Array.from(imagesNodeList);

    switch (filterId) {
      case 'filter-popular':
        getActive(filterPopular, filterNew, filterDiscussed);
        window.deleteElement(imagesArray, window.similarPictureElement);

        window.filterArray = pictures;
        break;
      case 'filter-new':
        getActive(filterNew, filterPopular, filterDiscussed);
        window.deleteElement(imagesArray, window.similarPictureElement);

        var picturesNew = [];

        var randomElements = pictures.slice();
        for (var a = 0; picturesNew.length < NEW_LENGHT; a++) {
          var randomElementIndex = window.getRandom(FIRST_ELEM, randomElements.length - 1);
          picturesNew[a] = randomElements[randomElementIndex];
          randomElements.splice(randomElementIndex, 1);
        }
        window.filterArray = picturesNew;
        break;
      case 'filter-discussed':
        getActive(filterDiscussed, filterNew, filterPopular);
        window.deleteElement(imagesArray, window.similarPictureElement);

        var discussedPictures = function (commentsA, commentsB) {
          return commentsB.querySelector('.picture__stat--comments').textContent - commentsA.querySelector('.picture__stat--comments').textContent;
        };
        var picturesDiscussed = pictures.slice().sort(discussedPictures);
        window.filterArray = picturesDiscussed;
        break;
    }

    window.filterArray.forEach(function (item) {
      window.similarPictureElement.appendChild(item);
    });
  };

  var onSuccess = function (data) {
    document.querySelector('.img-filters').classList.remove('img-filters--inactive');
    getPictures(data);
    window.getPreviewPicture(data);

    if (filterPopular.classList.contains('img-filters__button--active')) {
      window.filterArray = pictures;
    }

    imgFiltersForm.addEventListener('click', function (e) {
      if (!e) {
        e = event;
      }
      var targetFilter = e.target;
      debounceFunct(targetFilter);
    });
  };

  var debounceFunct = window.debounce(function (targetFilter) {
    getFilter(targetFilter.id);
  });


  var onError = function (errorMessage) {
    var errorMessageTemplate = document.querySelector('#picture').content.querySelector('.img-upload__message--error');
    var errorMessageElement = errorMessageTemplate.cloneNode(false);
    errorMessageElement.classList.remove('hidden');
    errorMessageElement.style.position = 'fixed';
    errorMessageElement.textContent = errorMessage;

    var errorMessageParent = document.querySelector('main');
    errorMessageParent.appendChild(errorMessageElement);

    setTimeout(function () {
      errorMessageElement.parentNode.removeChild(errorMessageElement);
    }, TIME_FOR_ERROR);
  };

  window.load(onSuccess, onError);
})();
