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
        navigator.serviceWorker.register('/service-worker.js').then(initialize, function (err) {
            console.warn('Service workers aren\'t supported in this browser.');
            console.log(err);
        });
    }

    function initialize() {
        // if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
        //     console.warn('Notifications aren\'t supported.');
        //     return;
        // }
        //
        // if (Notification.permission === 'denied') {
        //     console.warn('The user has blocked notifications');
        //     return;
        // }
        //
        // if (!('PushManager' in window)) {
        //     console.warn('Push Messaging isn\'t supported.');
        //     return;
        // }
        //
        // navigator.serviceWorker.ready.then(function (serviceWorkerRegistration) {
        //     serviceWorkerRegistration.pushManager.subscribe({
        //         userVisibleOnly: true
        //     }).then(function (subscription) {
        //         console.log('endpoint:', subscription.endpoint);
        //     });
        // });
    }
}(document));
