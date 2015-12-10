var config = require('./config');
var Firebase = require('firebase');
var gcm = require('node-gcm');
var subscriptionsRef = new Firebase(config.firebaseRef);
var q = require('q');
var GCM_API_KEY = config.gcmApiKey;
var sender = new gcm.Sender(GCM_API_KEY);

function extractRegistrationId(endpoint) {
    var registrationId;

    if (endpoint.startsWith('https://android.googleapis.com/gcm/send')) {
        var endpointParts = endpoint.split('/');
        registrationId = endpointParts[endpointParts.length - 1];
    }

    return registrationId;
}

function sendMessage(message, registrationIds) {
    var deferred = q.defer();

    sender.send(message, {
        registrationTokens: registrationIds
    }, function (err, response) {
        if (err) {
            console.error(err);
            deferred.reject(err);
            return;
        }

        console.log(response);
        deferred.resolve(response);
    });

    return deferred.promise;
}

subscriptionsRef.once('value', function (snapshot) {
    var message = new gcm.Message({
        notification: {
            title: 'Hello!',
            body: 'Web Push Notifications are GRRRREAT!!!'
        }
    });
    var subscriptions = snapshot.val();
    var registrationIds = [];

    if (!snapshot.numChildren()) {
        process.exit();
    }

    Object.keys(subscriptions).forEach(function (key) {
        var subscription = subscriptions[key];
        var registrationId = extractRegistrationId(subscription.endpoint);

        registrationIds.push(registrationId);
    });

    if (registrationIds.length) {
        sendMessage(message, registrationIds).finally(function () {
            process.exit();
        });
    } else {
        process.exit();
    }
});
