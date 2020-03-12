const fs = require("fs");
const http = require("http");
const url = require("url");

const json = fs.readFileSync(`${__dirname}/data/data.json`, "utf-8");
const laptopData = JSON.parse(json);
"use strict";

//console.log(laptopData);

const server = http.createServer( (req, res) => {

    const pathName = url.parse(req.url, true).pathname;
    const id = url.parse(req.url, true).query.id;

    //PRODUCTS OVERVIEW

      if(pathName === '/products' || pathName === "/") {
        res.writeHead("200", {"Content-type": "text/html"});
        let cardHtml = "";


        
        fs.readFile(`${__dirname}/templates/template-overview.html`, "utf-8",(err, data) => {

            let overviewHtml = data;
            if(err) throw err;
            

            fs.readFile(`${__dirname}/templates/template-card.html`, "utf-8", (err, data) =>  {
                if(err) throw err;
                cardHtml = data;
               // console.log(data);

                if(err) throw err;
                let productCards = "";
                let newCard = "";
                for(let i = 0; i < laptopData.length; i++) {
                    newCard = replaceTemplate(cardHtml, laptopData[i]);
                    productCards +=  "\n" + newCard;
                }
                
                overviewHtml = overviewHtml.replace('{%CARDS%}', productCards);
                res.end(overviewHtml);
            });

        });

    }


    //LAPTOP DETAIL
    else if (pathName === "/laptop" &&  id < laptopData.length ) {
            res.writeHead("200", {"Content-type": "text/html"});

            fs.readFile(`${__dirname}/templates/template-laptop.html`, "utf-8",(err, data) => {
                if (err) throw err;
                const laptop = laptopData[id];
                const output = replaceTemplate(data, laptop);
                 res.end(output);
            });
        
    }

    // IMAGES
    else if ( (/\.(jpg|jpeg|png|gif)$/i).test(pathName) ) {
        fs.readFile(`${__dirname}/data/img${pathName}`, (err, data) => {
            res.writeHead(200, {'Content-type': 'image/jpg'});
            res.end(data);
        });
    }

    //URL not Found
    else {
            res.writeHead("404", {"Content-type": "text/html"});
            res.end("Page not found");
        
    }
    //console.log(req.url);


   //res.writeHead("200", {'Content-type': "text/html"});
    //res.end('This is the response');// the header must be set before the response.
});

server.listen(1337, '127.0.0.1', () => {
    console.log("Listening for requests...");
});

function replaceTemplate(originalHtml, laptop) {
    let output = originalHtml.replace(/{%PRODUCTNAME%}/g, laptop.productName);
    output = output.replace(/{%IMAGE%}/g, laptop.image);
    output = output.replace(/{%PRICE%}/g, laptop.price);
    output = output.replace(/{%SCREEN%}/g, laptop.screen);
    output = output.replace(/{%CPU%}/g, laptop.cpu);
    output = output.replace(/{%STORAGE%}/g, laptop.storage);
    output = output.replace(/{%RAM%}/g, laptop.ram);
    output = output.replace(/{%DESCRIPTION%}/g, laptop.description);
    output = output.replace(/{%ID%}/g, laptop.id);
    return output;

}