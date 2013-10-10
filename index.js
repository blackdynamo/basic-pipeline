/**
 * Basic Pipeline
 * Copyright (c) 2013. Donnovan Lewis
 * MIT License
 */

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

module.exports = Pipeline;