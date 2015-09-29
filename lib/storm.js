var init = function (cb) {
    // load credentials
    var stormpath = require('stormpath'),
        homedir = (process.platform === 'win32') ? process.env.HOMEPATH : process.env.HOME,
        keyfile = homedir + '/.stormpath/apiKey.properties';

    stormpath.loadApiKey(keyfile, function apiKeyFileLoaded(err, apiKey) {
        if (err) return cb(err);

        client = new stormpath.Client({apiKey: apiKey});

        // get app
        client.getApplications({name:'style-api'}, function(err, applications) {
            if (err) throw err;

            app = applications.items[0];

            cb(null);
        });
    });
};

module.exports.init = init;