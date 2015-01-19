/**
 * Basic Pipeline
 * Copyright (c) 2013-2015. Donnovan Lewis
 * MIT License
 */

(function (global, module) {
    function Pipeline() {
        this._stack = [];
    }

    Pipeline.prototype.use = function (step) {
        this._stack.push(step);
        return this;
    };

    Pipeline.prototype.execute = function (context, cb) {
        var me = this,
            index = 0;

        cb = cb || function () {
        };

        function next(err) {
            var step = me._stack[index++];

            if (!step || err) {
                cb(err, context);
                return;
            }

            try {
                step(context, next);
            }
            catch (e) {
                cb(e, context);
            }
        }

        next();
    };

    //Define an AMD module if AMD is present
    if (typeof define === "function" && define.amd) {
        define("BasicPipeline", [], function () {
            return Pipeline;
        });
    }

    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = Pipeline;
    }
    else {
        global.BasicPipeline = Pipeline;
    }
}(typeof window !== "undefined" ? window : this, typeof module !== "undefined" ? module : undefined));