//Information taken from Mikhail Timofeev's class
const req = require('express/lib/request');
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
router.use(express.urlencoded({extended: true}));
router.use(express.json());

function XMLtoJSON(filename, cb){
    var filepath = path.normalize(path.join(__dirname, filename));
    fs.readFile(filepath, 'utf8', function(err, xmlStr) {
        if(err) throw (err);
        xml2js.parseString(xmlStr, {}, cb);
    });
}

function JSONtoXML(filename, obj, cb){
    var filepath = path.normalize(path.join(__dirname, filename));
    var builder = new xml2js.Builder();
    var xml = builder.buildObject(obj);
    fs.unlinkSync(filepath);
    fs.writeFile(filepath, xml, cb);
}

router.get('/get/html', function(req, res){
    res.writeHead(200, {'Content-Type' : 'text/html'});

    let xml = fs.readFileSync('DieselRecords.xml', 'utf8'),
        xsl = fs.readFileSync('DieselRecords.xsl', 'utf8');
    
    let doc = xmlParse(xml),
        stylesheet = xmlParse(xsl);

    let result = xsltProcess(doc, stylesheet);

    res.end(result.toString());

})

const { body, validationResult } = require('express-validator');

// function appendHTML(obj){
    
//     let errors = [];

//     alert("hey")
//     console.log(obj)

//     $.getJSON('obj', function(data){
//         $.each(data.errors, function(i,f){
//             let msg = "<p>" + f.msg + "</p>"
//             $(msg).appendTo('#'+f.parm)
//         })
//     })
// }

router.post(
    '/post/json',
    body('item').not().isEmpty().trim().escape(),
    body('price').isFloat({min:0}).escape(),
    function (req, res){
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json({ errors: errors.array() })
            //appendHTML()
        }
        function appendJSON(obj) {
            console.log(obj)
            XMLtoJSON('DieselRecords.xml', 
            function(err, result) {
                if(err) throw (err);            
                result.store.section[obj.sec_n].option.push({'item': obj.item, 'price': obj.price});
                console.log(JSON.stringify(result, null, "  "));
                JSONtoXML('DieselRecords.xml', result, function(err){
                    if(err) throw (err);
                });
            });
        };
        
        appendJSON(req.body);
        res.redirect('back');
    });
    

router.post('/post/delete', function (req, res){
    function deleteJSON(obj) {
        console.log(obj)
        XMLtoJSON('DieselRecords.xml', function(err, result) {
            if(err) throw (err);
            delete result.store.section[obj.section].option[obj.entree];
            console.log(JSON.stringify(result, null, "  "));
            JSONtoXML('DieselRecords.xml', result, function(err){
                if(err) throw (err);
            });
        });
    };

    deleteJSON(req.body);
    res.redirect('back');
});

server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
    const addr = server.address();
    console.log("Server listening at", addr.address + ":" + addr.port);
})