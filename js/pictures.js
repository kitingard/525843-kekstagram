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
bigPictureElement.classList.remove('hidden');

bigPictureElement.querySelector('img').src = pictures[1].url;
bigPictureElement.querySelector('.likes-count').textContent = pictures[1].likes;
bigPictureElement.querySelector('.comments-count').textContent = commentsList.length;
bigPictureElement.querySelector('.social__caption').textContent = pictures[1].description;

bigPictureElement.querySelector('.social__picture').src = 'img/avatar-' + getRandom(AVATAR_MIN, AVATAR_MAX) + '.svg';
bigPictureElement.querySelector('.social__text').textContent = pictures[1].comments;

bigPictureElement.querySelector('.social__comment-count').classList.add('.visually-hidden');
bigPictureElement.querySelector('.social__loadmore').classList.add('.visually-hidden');
