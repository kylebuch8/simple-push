console.log('Started', self);

self.addEventListener('install', function (event) {
    console.log('Installed', event);
});

self.addEventListener('activated', function (event) {
    console.log('Activated', event);
});

self.addEventListener('push', function (event) {
    console.log('Push message received', event);
    var title = 'Security Vulnerability';

    event.waitUntil(
        fetch('message.json').then(function (response) {
            return response.json();
        }).then(function (json) {
            return self.registration.showNotification(json.title, {
                body: json.body,
                icon: json.icon,
                tag: json.tag,
                data: json
            });
        })
    );
});

self.addEventListener('notificationclick', function (event) {
    var url = event.notification.data.url || 'https://access.redhat.com/';

    event.notification.close();

    event.waitUntil(
        clients.matchAll({
            type: 'window'
        }).then(function (windowClients) {
            // var i = 0,
            //     length = windowClients.length;
            //
            // for (i; i < length; i += 1) {
            //     var client = windowClients[i];
            //     if (client.url === url && 'focus' in client) {
            //         return client.focus();
            //     }
            //
            //     if (clients.openWindow) {
            //         return clients.openWindow(url);
            //     }
            // }
            if (clients.openWindow) {
                return clients.openWindow(url);
            }
        })
    );
});
