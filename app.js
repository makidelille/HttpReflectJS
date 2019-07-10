'use strict';
const express = require("express");

const app = express();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});

app.use((req, res, next) => {
    
    let tmpData = "";
    req.setEncoding('utf8');
    req.on('data', function(chunk){
        tmpData += chunk;
    });

    req.on('end', () => {
        req.body = tmpData;
        try{
            req.body = JSON.parse(tmpData);
        } catch(err){}
        next();
    });
});

app.all('/*', (req, res) => {
    let verb = req.method;
    let query = req.query;
    let host = req.host;
    let httpVersion = req.httpVersion;
    let path = req.path;
    let headers = req.headers;
    let body = req.body;
    
    console.log(`${verb}/${httpVersion}: ${path} from ${host}`);
    res.contentType('json');
    return res.status(200).send({
        verb,
        query,
        body,
        host,
        httpVersion,
        path,
        headers
    });
});