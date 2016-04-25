var glob = require("glob");
var fs = require('fs');
var object = require('lodash/fp/object');

var availableTranslations = ['ru'];

var fileHeader = "module.exports = ";

glob("translations/**/*.json", function (er, files) {
  var messagesResult = {};
  files.map(function(file) {
    var messagesArray = require('./'+file);
    messagesArray.map(function(message) {
      messagesResult[message.id] = message.defaultMessage;
    });
  });
  writeTranslation('default', fileHeader + JSON.stringify(messagesResult, null, "\t"));
  availableTranslations.map(function(translation) {
    var fileName = './src/translation-'+translation+'.js';
    fs.stat(fileName, function(err, stat) {
        if(err == null) {
            var availableTranslation = require(fileName);
            writeTranslation(translation, fileHeader + JSON.stringify(object.merge(messagesResult, availableTranslation), null, "\t"));
        } else if(err.code == 'ENOENT') {
            writeTranslation(translation, fileHeader + JSON.stringify(messagesResult, null, "\t"));
        } else {
            console.log('Some other error: ', err.code);
        }
    });
  })

});

function writeTranslation(translation, content) {
  fs.writeFile("./src/translation-"+translation+".js", content, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("The "+translation+" translation file was created successfully.");
  });
}
