(function () {
  'use strict';

  // dpr->scale = 1 / dpr
  var docEl = document.documentElement,
    viewportEl = document.querySelector('meta[name="viewport"]'),
    dpr = window.devicePixelRatio || 1;

  dpr = dpr >= 3 ? 3 : (dpr >= 2 ? 2 : 1);

  docEl.setAttribute('data-dpr', dpr);


  var scale = 1 / dpr,
    content = 'width=device-width, initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no';

  if (viewportEl) {
    viewportEl.setAttribute('content', content);
  } else {
    viewportEl = document.createElement('meta');
    viewportEl.setAttribute('name', 'viewport');
    viewportEl.setAttribute('content', content);
    document.head.appendChild(viewportEl);
  }

  setRemUnit();

  window.addEventListener('resize', setRemUnit);
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      setRemUnit();
    }
  })

  function setRemUnit() {
    var ratio = 10;
    var viewWidth = docEl.getBoundingClientRect().width || window.innerWidth;

    docEl.style.fontSize = viewWidth / ratio + 'px';
  }
})();