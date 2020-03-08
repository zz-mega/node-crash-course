const fs = require("fs");
const http = require("http");
const url = require("url");

const json = fs.readFileSync(`${__dirname}/data/data.json`, "utf-8");
const laptopData = JSON.parse(json);


//console.log(laptopData);

const server = http.createServer( (req, res) => {

    const pathName = url.parse(req.url, true).pathname;
    const id = url.parse(req.url, true).query.id;
    console.log(pathName);
    //if(pathName === '/products' ||"/") { why is this always true?
      if(pathName === '/products' || pathName === "/") {
        res.writeHead("200", {"Content-type": "text/html"});
        res.end("This is the PRODUCTS page");
    }

    else if (pathName === "/laptop" && id < laptopData.length) {
            res.writeHead("200", {"Content-type": "text/html"});
            res.end(`This is the LAPTOP page ${id}`);
        
    }

    else {
            res.writeHead("404", {"Content-type": "text/html"});
            res.end("Page not found");
        
    }
    //console.log(req.url);


    res.writeHead("200", {'Content-type': "text/html"});
    res.end('This is the response');// the header must be set before the response.
});

server.listen(1337, '127.0.0.1', () => {
    console.log("Listening for requests...");
});