"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AuroraNet = require("express-aurorajs");
var timerdaemon = require("timerdaemon");
var OldIngeco = require("./modules/oldingeco");
var rpj = require("request-promise-json");
var AutoAurora = (function (_super) {
    __extends(AutoAurora, _super);
    function AutoAurora(obj) {
        _super.call(this, obj.conf.addresses, obj.conf.tz);
        var _this = this;
        if (!obj.options) {
            obj.options = {};
        }
        if (!obj.options.done) {
            obj.options.done = function (d) {
                rpj.post("http://localhost/heartbeat");
                for (var i = 0; i < d.length; i++) {
                    var sensor = d[i];
                    if (sensor.active)
                        rpj.post("http://localhost/sensors/" + sensor.uid, { data: sensor });
                }
            };
        }
        if (!obj.options.time)
            obj.options.time = 30000;
        setTimeout(function () {
            timerdaemon.pre(obj.options.time, function () {
                console.log('queryng...');
                _this.data().then(function (d) {
                    if (obj.options.urlingecold) {
                        console.log('sending to oldingeco...');
                        OldIngeco(d, obj.options.urlingecold);
                    }
                    obj.options.done(d);
                }).catch(function (err) {
                    console.log(err);
                });
            });
        }, 30000);
    }
    return AutoAurora;
}(AuroraNet));
module.exports = function (obj) {
    var AutoA = new AutoAurora(obj);
    return AutoA.Router();
};

//# sourceMappingURL=data:application/json;base64,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c291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEF1cm9yYU5ldCA9IHJlcXVpcmUoXCJleHByZXNzLWF1cm9yYWpzXCIpO1xuaW1wb3J0ICogYXMgXyBmcm9tIFwibG9kYXNoXCI7XG5pbXBvcnQgdGltZXJkYWVtb24gPSByZXF1aXJlKFwidGltZXJkYWVtb25cIik7XG5cbmltcG9ydCBPbGRJbmdlY28gPSByZXF1aXJlKFwiLi9tb2R1bGVzL29sZGluZ2Vjb1wiKTtcbmltcG9ydCBQb3dlclBhcnRpYWxzID0gcmVxdWlyZShcIi4vbW9kdWxlcy9zZXRwb3dlcnBhcnRpYWxzXCIpO1xuXG5sZXQgcnBqID0gcmVxdWlyZShcInJlcXVlc3QtcHJvbWlzZS1qc29uXCIpO1xuXG5pbnRlcmZhY2UgSUFkZHJlc3Mge1xuICAgIHV1aWQ6IHN0cmluZztcbiAgICBkZXY6IHN0cmluZztcbiAgICBhZGRyZXNzOiBudW1iZXI7XG59XG5pbnRlcmZhY2UgSW9wdCB7XG4gICAgdGltZT86IG51bWJlcjtcbiAgICBkb25lPzogRnVuY3Rpb247XG4gICAgdXJsaW5nZWNvbGQ/OiBzdHJpbmc7XG59XG5jbGFzcyBBdXRvQXVyb3JhIGV4dGVuZHMgQXVyb3JhTmV0IHtcblxuICAgIGNvbnN0cnVjdG9yKG9iajogeyBjb25mOiB7IGFkZHJlc3NlczogSUFkZHJlc3NbXSwgdHo6IHN0cmluZyB9LCBvcHRpb25zPzogSW9wdCB9KSB7XG4gICAgICAgIHN1cGVyKG9iai5jb25mLmFkZHJlc3Nlcywgb2JqLmNvbmYudHopO1xuXG5cbiAgICAgICAgbGV0IF90aGlzID0gdGhpcztcblxuICAgICAgICBpZiAoIW9iai5vcHRpb25zKSB7XG4gICAgICAgICAgICBvYmoub3B0aW9ucyA9IDxJb3B0Pnt9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIW9iai5vcHRpb25zLmRvbmUpIHtcbiAgICAgICAgICAgIG9iai5vcHRpb25zLmRvbmUgPSBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHJwai5wb3N0KFwiaHR0cDovL2xvY2FsaG9zdC9oZWFydGJlYXRcIik7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHNlbnNvciA9IGRbaV07XG5cbiAgICAgICAgICAgICAgICAgICBpZiAoc2Vuc29yLmFjdGl2ZSkgcnBqLnBvc3QoXCJodHRwOi8vbG9jYWxob3N0L3NlbnNvcnMvXCIgKyBzZW5zb3IudWlkLCB7IGRhdGE6IHNlbnNvciB9KTtcblxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghb2JqLm9wdGlvbnMudGltZSkgb2JqLm9wdGlvbnMudGltZSA9IDMwMDAwO1xuXG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICB0aW1lcmRhZW1vbi5wcmUob2JqLm9wdGlvbnMudGltZSwgZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ3F1ZXJ5bmcuLi4nKVxuICAgICAgICAgICAgICAgIF90aGlzLmRhdGEoKS50aGVuKGZ1bmN0aW9uKGQpIHtcblxuICAgICAgICAgICAgICAgICAgICBpZiAob2JqLm9wdGlvbnMudXJsaW5nZWNvbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzZW5kaW5nIHRvIG9sZGluZ2Vjby4uLicpXG4gICAgICAgICAgICAgICAgICAgICAgICBPbGRJbmdlY28oZCwgb2JqLm9wdGlvbnMudXJsaW5nZWNvbGQpO1xuXG4gICAgICAgICAgICAgICAgICAgIH1cblxuXG4gICAgICAgICAgICAgICAgICAgIG9iai5vcHRpb25zLmRvbmUoZCk7XG5cblxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICB9LCAzMDAwMCk7XG5cblxuICAgIH1cblxufVxuXG5cbmV4cG9ydCA9IGZ1bmN0aW9uKG9iajogeyBjb25mOiB7IGFkZHJlc3NlczogSUFkZHJlc3NbXSwgdHo6IHN0cmluZyB9LCBvcHRpb25zPzogSW9wdCB9KSB7XG5cbiAgICBsZXQgQXV0b0EgPSBuZXcgQXV0b0F1cm9yYShvYmopO1xuXG4gICAgcmV0dXJuIEF1dG9BLlJvdXRlcigpO1xuXG5cbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
