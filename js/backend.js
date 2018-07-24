'use strict';

(function () {
  var POST_URL = 'https://js.dump.academy/kekstagram';
  var GET_URL = 'https://js.dump.academy/kekstagram/data';

  var getResponse = function (element, onLoad, onError) {
    element.addEventListener('load', function () {
      switch (element.status) {
        case 200:
          onLoad(element.response);
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
          onError('Cтатус ответа: : ' + element.status + ' ' + element.statusText);
      }
    });

    element.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    element.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + element.timeout + 'мс');
    });
  };

  window.save = function (data, onLoad, onError) {
    var xhrSave = new XMLHttpRequest();
    xhrSave.responseType = 'json';

    getResponse(xhrSave, onLoad, onError);

    xhrSave.timeout = 3000;

    xhrSave.open('POST', POST_URL);
    xhrSave.send(data);
  };

  window.load = function (onLoad, onError) {
    var xhrLoad = new XMLHttpRequest();
    xhrLoad.responseType = 'json';

    xhrLoad.open('GET', GET_URL);

    getResponse(xhrLoad, onLoad, onError);

    xhrLoad.timeout = 3000;
    xhrLoad.send();
  };

})();
