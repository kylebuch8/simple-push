(function (document) {
    'use strict';

    var app = document.querySelector('#app');

    app.onDataRouteClick = function () {
        var drawerPanel = document.querySelector('#paperDrawerPanel');
        if (drawerPanel.narrow) {
            drawerPanel.closeDrawer();
        }
    };

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('../service-worker.js').then(function () {}, function (err) {
            console.warn('Service workers aren\'t supported in this browser.');
            console.log(err);
        });
    }
}(document));
