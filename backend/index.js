var config = require('./config');
var Firebase = require('firebase');
var webPush = require('web-push');
var subscriptionsRef = new Firebase(config.firebaseRef);
var q = require('q');
var GCM_API_KEY = config.gcmApiKey;

webPush.setGCMAPIKey(GCM_API_KEY);

function sendMessage(endpoint) {
    return webPush.sendNotification(endpoint);
}

subscriptionsRef.once('value', function (snapshot) {
    var subscriptions = snapshot.val();
    var promises = [];

    if (!snapshot.numChildren()) {
        process.exit();
    }

    Object.keys(subscriptions).forEach(function (key) {
        var subscription = subscriptions[key];

        promises.push(sendMessage(subscription.endpoint));
    });

    q.all(promises).then(function () {
        console.log('All Done!');
        process.exit();
    });
});
