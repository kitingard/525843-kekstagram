'use strict';

(function () {
  window.commentsList = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
  var descriptionList = ['Тестим новую камеру!', 'Затусили с друзьями на море', 'Как же круто тут кормят', 'Отдыхаем...', 'Цените каждое мгновенье. Цените тех, кто рядом с вами и отгоняйте все сомненья. Не обижайте всех словами......', 'Вот это тачка!'];
  var PHOTOS_QUANTITY = 25;
  var LIKES_MIN = 15;
  var LIKES_MAX = 200;

  window.getRandom = function (min, max) {
    return (Math.round(Math.random() * (max - min) + min));
  };

  window.pictures = [];

  for (window.i = 0; window.i < PHOTOS_QUANTITY; window.i++) {
    window.pictures[window.i] = {
      url: 'photos/' + (window.i + 1) + '.jpg',
      likes: window.getRandom(LIKES_MIN, LIKES_MAX),
      comments: window.commentsList[window.getRandom(0, (window.commentsList.length - 1))],
      description: descriptionList[window.getRandom(0, (descriptionList.length - 1))]
    };
  }

  window.similarPictureElement = document.querySelector('.pictures');
  var similarPictureLinkTemplate = document.querySelector('#picture').content.querySelector('.picture__link');

  var getPictureElement = function (template, imgSelector, likesSelector, commentsSelector, element) {
    for (window.i = 0; window.i < window.pictures.length; window.i++) {
      var pictureLinkElement = template.cloneNode(true);

      pictureLinkElement.querySelector(imgSelector).src = window.pictures[window.i].url;
      pictureLinkElement.querySelector(likesSelector).textContent = window.pictures[window.i].likes;
      pictureLinkElement.querySelector(commentsSelector).textContent = window.commentsList.length;

      element.appendChild(pictureLinkElement);
    }
  };

  getPictureElement(similarPictureLinkTemplate, 'img', '.picture__stat--likes', '.picture__stat--comments', window.similarPictureElement);
})();
