module.exports = require("nomnom")
    .option("port", {
        default: 25,
        help: "Port to listen on"
    })
    .option("relayserver", {
        required: true,
        help: "Relay server"
    })
    .option("relayport", {
        default: 25,
        help: "Relay port"
    })
    .option("rewritefrom", {
        help: "From address which should be used when relaying mail"
    })
    .option("rewriteto", {
        help: "To address which should be used when relaying mail"
    })
    .option("user", {
        help: "Username used in SMTP Authentication"
    })
    .option("password", {
        flag: true,
        help: "Password used in SMTP Authentication"
    })
    .nom();

