'use strict';

(function () {
  var POST_URL = 'https://js.dump.academy/kekstagram';
  var GET_URL = 'https://js.dump.academy/kekstagram/data';
  var errorMessageParent = document.querySelector('.img-upload__text');

  var onError = function (message) {
    var div = document.createElement('div');
    div.innerHTML = message;
    div.style.textAlign = 'center';
    div.style.color = 'yellow';
    div.style.fontWeight = 'bold';
    div.style.backgroundColor = 'rgba(255, 248, 200, 0.5)';
    div.style.width = '180px';
    div.style.height = '50px';
    div.style.marginLeft = '200px';
    div.style.paddingTop = '15px';
    div.style.borderRadius = '10px';

    errorMessageParent.insertBefore(div, window.imgUploadSubmit.children[2]);

    setTimeout(function () {
      div.parentNode.removeChild(div);
    }, 10000);
  };

  window.save = function (data, onLoad) {
    var xhrSave = new XMLHttpRequest();
    xhrSave.responseType = 'json';

    xhrSave.addEventListener('load', function () {
      switch (xhrSave.status) {
        case 200:
          onLoad(xhrSave.response);
          break;

        case 400:
          onError('Неверный запрос');
          break;
        case 401:
          onError('Пользователь не авторизован');
          break;
        case 404:
          onError('Ничего не найдено');
          break;

        default:
          onError('Cтатус ответа: : ' + xhrSave.status + ' ' + xhrSave.statusText);
      }
    });
    xhrSave.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhrSave.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhrSave.timeout + 'мс');
    });

    xhrSave.timeout = 3000;

    xhrSave.open('POST', POST_URL);
    xhrSave.send(data);
  };

  window.load = function (onLoad) {
    var xhrLoad = new XMLHttpRequest();
    xhrLoad.responseType = 'json';

    xhrLoad.open('GET', GET_URL);

    xhrLoad.addEventListener('load', function () {
      switch (xhrLoad.status) {
        case 200:
          onLoad(xhrLoad.response);
          break;

        case 400:
          onError('Неверный запрос');
          break;
        case 401:
          onError('Пользователь не авторизован');
          break;
        case 404:
          onError('Ничего не найдено');
          break;

        default:
          onError('Cтатус ответа: : ' + xhrLoad.status + ' ' + xhrLoad.statusText);
      }
    });

    xhrLoad.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhrLoad.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhrLoad.timeout + 'мс');
    });

    xhrLoad.timeout = 3000;
    xhrLoad.send();
  };

})();
