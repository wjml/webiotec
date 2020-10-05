const express = require("express"),
    app = express(),
    // compression = require("compression"),
    port = process.env.PORT || 3e3,
    path = require("path");
// app.use(compression()), app.use((req, res, next) => {
//     (req.headers["x-forwarded-proto"] || "").endsWith("http") ? res.redirect(`https://${req.headers.host}${req.url}`) : next()
// }), 
app.use(express.static(__dirname + "/public")), app.get("/", (function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"))
})), app.get("/index.html", (function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"))
})), app.listen(port, (function () {
    console.log("Server is running on http://localhost:" + port)
}));