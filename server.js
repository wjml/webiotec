const express = require('express');
const app = express();

const port = process.env.PORT || 3000;

const path = require('path')

app.use((req, res, next) => { //Cria um middleware onde todas as requests passam por ele 
   if ((req.headers["x-forwarded-proto"] || "").endsWith("http")) //Checa se o protocolo informado nos headers é HTTP 
       res.redirect(`https://${req.headers.host}${req.url}`); //Redireciona pra HTTPS 
   else //Se a requisição já é HTTPS 
       next(); //Não precisa redirecionar, passa para os próximos middlewares que servirão com o conteúdo desejado 
});

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