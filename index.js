//Information taken from Mikhail Timofeev's class
const   http = require('http'),
        path = require('path'),
        express = require('express'),
        fs = require('fs'),
        xmlParse = require('xslt-processor').xmlParse,
        xsltProcess = require('xslt-processor').xsltProcess,
        xml2js = require('xml2js');

const   router = express(),
        server = http.createServer(router);

router.use(express.static(path.resolve(__dirname,'views')));

router.get('/get/html', function(req, res){
    res.writeHead(200, {'Content-Type' : 'text/html'});

    let xml = fs.readFileSync('DieselRecords.xml', 'utf8'),
        xsl = fs.readFileSync('DieselRecords.xsl', 'utf8');
    
    let doc = xmlParse(xml),
        stylesheet = xmlParse(xsl);

    let result = xsltProcess(doc, stylesheet);

    res.end(result.toString());

})

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
    const addr = server.address();
    console.log("Server listening at", addr.address + ":" + addr.port);
})