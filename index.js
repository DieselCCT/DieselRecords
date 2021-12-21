//Information taken from Mikhail Timofeev's class
const   http = require('http'),
        path = require('path'),
        express = require('express'),
        fs = require('fs'),
        xmlParse = require('xslt-processor').xmlParse,
        xsltProcess = require('xslt-processor').xmlProcess,
        xml2js = require('xml2js')