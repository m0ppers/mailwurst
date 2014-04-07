var linger = require('linger');
var simplesmtp = require("simplesmtp");

module.exports = function(opts) {
    var server = simplesmtp.createServer({"validateRecipient": true});
    server.listen(opts.port, function(err) {
        if (err) {
            throw new Error("Couldn't bind to port " + opts.port + ": " + err);
        }
    });
    // mop: hmmm the other events won't offer an async callback (need to wait for client connection :S)
    server.on("validateRecipient", function(connection, email, callback) {
        var serverOptions = {};
        if (opts.user) {
            var auth = {'user': opts.user, 'pass': opts.password};
            serverOptions['auth'] = auth;
        }

        var client = simplesmtp.connect(opts.relayport, opts.relayserver, serverOptions);
        client.on("error", function(err) {
            callback(err);
            linger("Error: " + err);
        });
        client.once("idle", function() {
            var to = [];
            if (opts.rewriteto) {
                to.push(opts.rewriteto);
            } else {
                to.push(email);
            }
            client.useEnvelope({
                from: opts.rewritefrom || connection.from,
                to: to
            });
            client.on("message", function() {
                callback();
            });
        });
        connection.client = client;
    });

    server.on("data", function(connection, chunk) {
        connection.client.write(chunk);
    });

    server.on("dataReady", function(connection, callback) {
        connection.client.end();
        connection.client.quit();
        linger("Last sent mail: " + connection.from + " to " + connection.to.join(", ") + " at " + (new Date()));
        callback(null, "Bratwurst");
    });


    linger('Mailwurst ready at port ' + opts.port + ' ...' );
}
