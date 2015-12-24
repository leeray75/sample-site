System.register([], function(exports_1) {
    var HelloWorld;
    return {
        setters:[],
        execute: function() {
            HelloWorld = (function () {
                function HelloWorld() {
                }
                HelloWorld.prototype.words = function () {
                    return "Hello World!";
                };
                HelloWorld.prototype.say = function (words) {
                    console.log(words);
                };
                return HelloWorld;
            })();
            exports_1("HelloWorld", HelloWorld);
        }
    }
});
