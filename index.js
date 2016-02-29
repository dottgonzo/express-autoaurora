"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var AuroraNet = require("express-aurorajs");
var timerdaemon = require("timerdaemon");
var rpj = require("request-promise-json");
var AutoAurora = (function (_super) {
    __extends(AutoAurora, _super);
    function AutoAurora(sensors, tz, options) {
        _super.call(this, sensors, tz);
        var _this = this;
        if (!options) {
            options = {};
        }
        if (!options.done) {
            options.done = function (d) {
                for (var i = 0; i < d.length; i++) {
                    var sensor = d[i];
                    rpj.post("http://localhost/db/sensors/" + sensor.uid, { data: sensor });
                }
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
module.exports = function (sensors, tz, options) {
    var AutoA = new AutoAurora(sensors, tz, options);
    return AutoA.Router();
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQU8sU0FBUyxXQUFXLGtCQUFrQixDQUFDLENBQUM7QUFFL0MsSUFBTyxXQUFXLFdBQVcsYUFBYSxDQUFDLENBQUM7QUFFNUMsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUM7QUFXMUM7SUFBeUIsOEJBQVM7SUFFOUIsb0JBQVksT0FBbUIsRUFBRSxFQUFVLEVBQUUsT0FBYztRQUN2RCxrQkFBTSxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFHbkIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBRWpCLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNYLE9BQU8sR0FBUyxFQUFFLENBQUE7UUFDdEIsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDaEIsT0FBTyxDQUFDLElBQUksR0FBRyxVQUFTLENBQUM7Z0JBRXJCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO29CQUVoQyxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBRWxCLEdBQUcsQ0FBQyxJQUFJLENBQUMsOEJBQThCLEdBQUcsTUFBTSxDQUFDLEdBQUcsRUFBRSxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsQ0FBQyxDQUFDO2dCQUV6RSxDQUFDO1lBR0wsQ0FBQyxDQUFBO1FBR0wsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztZQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1FBRXhDLFdBQVcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRTtZQUUxQixLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVMsQ0FBQztnQkFDeEIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBUyxHQUFHO2dCQUNqQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3JCLENBQUMsQ0FBQyxDQUFBO1FBRU4sQ0FBQyxDQUFDLENBQUM7SUFJUCxDQUFDO0lBRUwsaUJBQUM7QUFBRCxDQTdDQSxBQTZDQyxDQTdDd0IsU0FBUyxHQTZDakM7QUFHRCxpQkFBUyxVQUFTLE9BQW1CLEVBQUUsRUFBVSxFQUFFLE9BQWM7SUFFN0QsSUFBSSxLQUFLLEdBQUcsSUFBSSxVQUFVLENBQUMsT0FBTyxFQUFFLEVBQUUsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUVqRCxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO0FBRzFCLENBQUMsQ0FBQSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBdXJvcmFOZXQgPSByZXF1aXJlKFwiZXhwcmVzcy1hdXJvcmFqc1wiKTtcblxuaW1wb3J0IHRpbWVyZGFlbW9uID0gcmVxdWlyZShcInRpbWVyZGFlbW9uXCIpO1xuXG5sZXQgcnBqID0gcmVxdWlyZShcInJlcXVlc3QtcHJvbWlzZS1qc29uXCIpO1xuXG5pbnRlcmZhY2UgSUFkZHJlc3Mge1xuICAgIHV1aWQ6IHN0cmluZztcbiAgICBkZXY6IHN0cmluZztcbiAgICBhZGRyZXNzOiBudW1iZXI7XG59XG5pbnRlcmZhY2UgSW9wdCB7XG4gICAgdGltZT86IG51bWJlcjtcbiAgICBkb25lPzogRnVuY3Rpb247XG59XG5jbGFzcyBBdXRvQXVyb3JhIGV4dGVuZHMgQXVyb3JhTmV0IHtcblxuICAgIGNvbnN0cnVjdG9yKHNlbnNvcnM6IElBZGRyZXNzW10sIHR6OiBzdHJpbmcsIG9wdGlvbnM/OiBJb3B0KSB7XG4gICAgICAgIHN1cGVyKHNlbnNvcnMsIHR6KTtcblxuXG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKCFvcHRpb25zKSB7XG4gICAgICAgICAgICBvcHRpb25zID0gPElvcHQ+e31cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghb3B0aW9ucy5kb25lKSB7XG4gICAgICAgICAgICBvcHRpb25zLmRvbmUgPSBmdW5jdGlvbihkKSB7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGQubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgc2Vuc29yID0gZFtpXTtcblxuICAgICAgICAgICAgICAgICAgICBycGoucG9zdChcImh0dHA6Ly9sb2NhbGhvc3QvZGIvc2Vuc29ycy9cIiArIHNlbnNvci51aWQsIHtkYXRhOnNlbnNvcn0pO1xuXG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIW9wdGlvbnMudGltZSkgb3B0aW9ucy50aW1lID0gMzAwMDA7XG5cbiAgICAgICAgdGltZXJkYWVtb24ucHJlKG9wdGlvbnMudGltZSwgZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgIF90aGlzLmRhdGEoKS50aGVuKGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zLmRvbmUoZCk7XG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgfSlcblxuICAgICAgICB9KTtcblxuXG5cbiAgICB9XG5cbn1cblxuXG5leHBvcnQgPSBmdW5jdGlvbihzZW5zb3JzOiBJQWRkcmVzc1tdLCB0ejogc3RyaW5nLCBvcHRpb25zPzogSW9wdCkge1xuXG4gICAgbGV0IEF1dG9BID0gbmV3IEF1dG9BdXJvcmEoc2Vuc29ycywgdHosIG9wdGlvbnMpO1xuXG4gICAgcmV0dXJuIEF1dG9BLlJvdXRlcigpO1xuXG5cbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
