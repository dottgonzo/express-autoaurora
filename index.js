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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQU8sU0FBUyxXQUFXLGtCQUFrQixDQUFDLENBQUM7QUFFL0MsSUFBTyxXQUFXLFdBQVcsYUFBYSxDQUFDLENBQUM7QUFFNUMsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUM7QUFZMUMsaUJBQVM7SUFBeUIsOEJBQVM7SUFFdkMsb0JBQVksT0FBbUIsRUFBRSxFQUFVLEVBQUUsT0FBYztRQUN2RCxrQkFBTSxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFbkIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBRWpCLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNYLE9BQU8sR0FBUyxFQUFFLENBQUE7UUFDdEIsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDaEIsT0FBTyxDQUFDLElBQUksR0FBRyxVQUFTLENBQUM7Z0JBQ3JCLEdBQUcsQ0FBQyxJQUFJLENBQUMsb0NBQW9DLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDdEQsQ0FBQyxDQUFBO1FBR0wsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztZQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1FBRXhDLFdBQVcsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRTtZQUUxQixLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVMsQ0FBQztnQkFDeEIsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBUyxHQUFHO2dCQUNqQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3JCLENBQUMsQ0FBQyxDQUFBO1FBRU4sQ0FBQyxDQUFDLENBQUM7SUFJUCxDQUFDO0lBRUwsaUJBQUM7QUFBRCxDQW5DUyxBQW1DUixDQW5DaUMsU0FBUyxFQW1DMUMsQ0FBQSIsImZpbGUiOiJpbmRleC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBBdXJvcmFOZXQgPSByZXF1aXJlKFwiZXhwcmVzcy1hdXJvcmFqc1wiKTtcblxuaW1wb3J0IHRpbWVyZGFlbW9uID0gcmVxdWlyZShcInRpbWVyZGFlbW9uXCIpO1xuXG5sZXQgcnBqID0gcmVxdWlyZShcInJlcXVlc3QtcHJvbWlzZS1qc29uXCIpO1xuXG5pbnRlcmZhY2UgSUFkZHJlc3Mge1xuICAgIHV1aWQ6IHN0cmluZztcbiAgICBkZXY6IHN0cmluZztcbiAgICBhZGRyZXNzOiBudW1iZXI7XG59XG5pbnRlcmZhY2UgSW9wdCB7XG4gICAgdGltZT86IG51bWJlcjtcbiAgICBkb25lPzogRnVuY3Rpb25cblxufVxuZXhwb3J0ID0gY2xhc3MgQXV0b0F1cm9yYSBleHRlbmRzIEF1cm9yYU5ldCB7XG5cbiAgICBjb25zdHJ1Y3RvcihzZW5zb3JzOiBJQWRkcmVzc1tdLCB0ejogc3RyaW5nLCBvcHRpb25zPzogSW9wdCkge1xuICAgICAgICBzdXBlcihzZW5zb3JzLCB0eik7XG5cbiAgICAgICAgbGV0IF90aGlzID0gdGhpcztcblxuICAgICAgICBpZiAoIW9wdGlvbnMpIHtcbiAgICAgICAgICAgIG9wdGlvbnMgPSA8SW9wdD57fVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFvcHRpb25zLmRvbmUpIHtcbiAgICAgICAgICAgIG9wdGlvbnMuZG9uZSA9IGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgICAgICBycGoucG9zdChcImh0dHA6Ly9sb2NhbGhvc3QvZGIvc2Vuc29yL3JlY2VpdmVcIiwgZCk7XG4gICAgICAgICAgICB9XG5cblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFvcHRpb25zLnRpbWUpIG9wdGlvbnMudGltZSA9IDMwMDAwO1xuXG4gICAgICAgIHRpbWVyZGFlbW9uLnByZShvcHRpb25zLnRpbWUsIGZ1bmN0aW9uKCkge1xuXG4gICAgICAgICAgICBfdGhpcy5kYXRhKCkudGhlbihmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgICAgb3B0aW9ucy5kb25lKGQpO1xuICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgfSk7XG5cblxuXG4gICAgfVxuXG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
