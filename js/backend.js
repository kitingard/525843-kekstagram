'use strict';

(function () {
  var POST_URL = 'https://js.dump.academy/kekstagram';
  var GET_URL = 'https://js.dump.academy/kekstagram/data';

  window.save = function (data, onLoad, onError) {
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

  window.load = function (onLoad, onError) {
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
