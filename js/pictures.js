'use strict';

(function () {
  window.similarPictureElement = document.querySelector('.pictures');
  var similarPictureLinkTemplate = document.querySelector('#picture').content.querySelector('.picture__link');

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

  var getPictures = function (pictures) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < pictures.length; i++) {
      fragment.appendChild(renderPictures(pictures[i]));
      window.pictureLinkElement.setAttribute('data-index', i);
    }
    window.similarPictureElement.appendChild(fragment);
  };

  var imgFiltersForm = document.querySelector('.img-filters__form');
  var filterPopular = document.querySelector('#filter-popular');
  var filterNew = document.querySelector('#filter-new');
  var filterDiscussed = document.querySelector('#filter-discussed');
  var NEW_LENGHT = 10;
  var pictures = [];

  var getActive = function (activeButton, buttonOffOne, buttonOffTwo) {
    if (activeButton.classList.contains('img-filters__button--active') === false) {
      activeButton.classList.add('img-filters__button--active');
      buttonOffOne.classList.remove('img-filters__button--active');
      buttonOffTwo.classList.remove('img-filters__button--active');
    }
  };

  window.deleteElement = function (array, parent) {
    for (var i = 0; i < array.length; i++) {
      parent.removeChild(array[i]);
    }
  };

  var onSuccess = function (data) {

    pictures = data;
    var filterArray;

    imgFiltersForm.addEventListener('click', function () {
      var targetFilter = event.target;
      var imagesNodeList = window.similarPictureElement.querySelectorAll('a');
      var imagesArray = Array.from(imagesNodeList);

      switch (targetFilter.id) {
        case 'filter-popular':
          getActive(filterPopular, filterNew, filterDiscussed);
          window.deleteElement(imagesArray, window.similarPictureElement);

          filterArray = pictures;
          getPictures(filterArray);
          break;
        case 'filter-new':
          getActive(filterNew, filterPopular, filterDiscussed);
          window.deleteElement(imagesArray, window.similarPictureElement);

          var picturesNew = [];
          for (var i = 0; i < NEW_LENGHT; i++) {
            picturesNew[i] = pictures[window.getRandom(0, pictures.length - 1)];
          }
          filterArray = picturesNew;
          getPictures(filterArray);
          break;
        case 'filter-discussed':
          getActive(filterDiscussed, filterNew, filterPopular);
          window.deleteElement(imagesArray, window.similarPictureElement);

          var likesPictures = function (likesA, likesB) {
            return likesB.likes - likesA.likes;
          };

          var picturesDiscussed = pictures.slice().sort(likesPictures);
          filterArray = picturesDiscussed;
          getPictures(filterArray);
          break;
      }
    });

    getPictures(pictures);
  };


  var onDefects = function (errorMessage) {
    var errorMessagePlace = document.querySelector('.img-filters__form');
    var error = document.createElement('div');
    error.innerHTML = errorMessage;
    error.style.textAlign = 'center';
    error.style.color = 'red';
    error.style.fontWeight = 'bold';
    error.style.fontSize = '20px';
    error.style.backgroundColor = 'white';
    error.style.width = '350px';
    error.style.height = '50px';
    error.style.marginTop = '10px';
    error.style.paddingTop = '15px';
    error.style.borderRadius = '5px';

    errorMessagePlace.appendChild(error);

    setTimeout(function () {
      error.parentNode.removeChild(error);
    }, 10000);
  };

  window.load(onSuccess, onDefects);

  document.querySelector('.img-filters').classList.remove('img-filters--inactive');
})();
