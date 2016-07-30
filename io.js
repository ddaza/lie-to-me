// Socket configuration

const keys = require('./keys.json'); // need to add your keys
var lie = require('./lie')(keys);

module.exports = function (app){
    lie.init();
    lie.start(function onLies(data) {
        var keys = Object.keys(data);
        for (var i = 0; i < keys.length; i++) {
            app.io.emit(keys[i], data[keys[i]]);
        }
    });
};
