const express = require('express');
const app = express();

const port = process.env.PORT || 8080;

const path = require('path')

// faz o express procurar na pasta 'public' pelos assets (css/js/img)
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
   res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/index.html', function (req, res) {
   res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, function () {
   console.log('Server is running on http://localhost:' + port);
});