"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AuroraNet = require("express-aurorajs");
var timerdaemon = require("timerdaemon");
var rpj = require("request-promise-json");
module.exports = (function (_super) {
    __extends(AutoAurora, _super);
    function AutoAurora(sensors, tz, options) {
        _super.call(this, sensors, tz);
        var _this = this;
        if (!options) {
            options = {};
        }
        if (!options.done) {
            options.done = function (d) {
                rpj.post("http://localhost/db/sensor/receive", d);
            };
        }
        if (!options.time)
            options.time = 30000;
        timerdaemon.pre(options.time, function () {
            _this.data().then(function (d) {
                options.done(d);
            }).catch(function (err) {
                console.log(err);
            });
        });
    }
    return AutoAurora;
}(AuroraNet));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQU8sU0FBUyxXQUFXLGtCQUFrQixDQUFDLENBQUM7QUFFL0MsSUFBTyxXQUFXLFdBQVcsYUFBYSxDQUFDLENBQUM7QUFFNUMsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUM7QUFXMUMsaUJBQVM7SUFBeUIsOEJBQVM7SUFFdkMsb0JBQVksT0FBbUIsRUFBRSxFQUFVLEVBQUUsT0FBYztRQUN2RCxrQkFBTSxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFbkIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBRWpCLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNYLE9BQU8sR0FBUyxFQUFFLENBQUE7UUFDdEIsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDaEIsT0FBTyxDQUFDLElBQUksR0FBRyxVQUFTLENBQUM7Z0JBQ3JCLEdBQUcsQ0FBQyxJQUFJLENBQUMsb0NBQW9DLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDdEQsQ0FBQyxDQUFBO1FBR0wsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztZQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1FBRXhDLFdBQVcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRTtZQUUxQixLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVMsQ0FBQztnQkFDeEIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBUyxHQUFHO2dCQUNqQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3JCLENBQUMsQ0FBQyxDQUFBO1FBRU4sQ0FBQyxDQUFDLENBQUM7SUFJUCxDQUFDO0lBRUwsaUJBQUM7QUFBRCxDQW5DUyxBQW1DUixDQW5DaUMsU0FBUyxFQW1DMUMsQ0FBQSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBdXJvcmFOZXQgPSByZXF1aXJlKFwiZXhwcmVzcy1hdXJvcmFqc1wiKTtcblxuaW1wb3J0IHRpbWVyZGFlbW9uID0gcmVxdWlyZShcInRpbWVyZGFlbW9uXCIpO1xuXG5sZXQgcnBqID0gcmVxdWlyZShcInJlcXVlc3QtcHJvbWlzZS1qc29uXCIpO1xuXG5pbnRlcmZhY2UgSUFkZHJlc3Mge1xuICAgIHV1aWQ6IHN0cmluZztcbiAgICBkZXY6IHN0cmluZztcbiAgICBhZGRyZXNzOiBudW1iZXI7XG59XG5pbnRlcmZhY2UgSW9wdCB7XG4gICAgdGltZT86IG51bWJlcjtcbiAgICBkb25lPzogRnVuY3Rpb247XG59XG5leHBvcnQgPSBjbGFzcyBBdXRvQXVyb3JhIGV4dGVuZHMgQXVyb3JhTmV0IHtcblxuICAgIGNvbnN0cnVjdG9yKHNlbnNvcnM6IElBZGRyZXNzW10sIHR6OiBzdHJpbmcsIG9wdGlvbnM/OiBJb3B0KSB7XG4gICAgICAgIHN1cGVyKHNlbnNvcnMsIHR6KTtcblxuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgIGlmICghb3B0aW9ucykge1xuICAgICAgICAgICAgb3B0aW9ucyA9IDxJb3B0Pnt9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIW9wdGlvbnMuZG9uZSkge1xuICAgICAgICAgICAgb3B0aW9ucy5kb25lID0gZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICAgIHJwai5wb3N0KFwiaHR0cDovL2xvY2FsaG9zdC9kYi9zZW5zb3IvcmVjZWl2ZVwiLCBkKTtcbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIW9wdGlvbnMudGltZSkgb3B0aW9ucy50aW1lID0gMzAwMDA7XG5cbiAgICAgICAgdGltZXJkYWVtb24ucHJlKG9wdGlvbnMudGltZSwgZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgIF90aGlzLmRhdGEoKS50aGVuKGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zLmRvbmUoZCk7XG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgfSlcblxuICAgICAgICB9KTtcblxuXG5cbiAgICB9XG5cbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
