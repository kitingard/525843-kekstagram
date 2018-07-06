'use strict';

(function () {
  window.commentsList = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  window.PHOTOS_QUANTITY = 25;
  window.similarPictureElement = document.querySelector('.pictures');
  var similarPictureLinkTemplate = document.querySelector('#picture').content.querySelector('.picture__link');

  window.getRandom = function (min, max) {
    return (Math.round(Math.random() * (max - min) + min));
  };

  var renderPictures = function (picture) {
    var pictureLinkElement = similarPictureLinkTemplate.cloneNode(true);

    pictureLinkElement.querySelector('img').src = picture.url;
    pictureLinkElement.querySelector('.picture__stat--likes').textContent = picture.likes;
    pictureLinkElement.querySelector('.picture__stat--comments').textContent = picture.comments.length;

    return pictureLinkElement;
  };

  var onSuccess = function (pictures) {
    var fragment = document.createDocumentFragment();

    for (window.i = 0; window.i < window.PHOTOS_QUANTITY; window.i++) {
      fragment.appendChild(renderPictures(pictures[window.i]));
    }
    window.similarPictureElement.appendChild(fragment);
  };

  window.load(onSuccess);
})();
