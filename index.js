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
                    rpj.post("http://localhost/db/sensors/" + sensor.uid, sensor);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQU8sU0FBUyxXQUFXLGtCQUFrQixDQUFDLENBQUM7QUFFL0MsSUFBTyxXQUFXLFdBQVcsYUFBYSxDQUFDLENBQUM7QUFFNUMsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUM7QUFXMUM7SUFBeUIsOEJBQVM7SUFFOUIsb0JBQVksT0FBbUIsRUFBRSxFQUFVLEVBQUUsT0FBYztRQUN2RCxrQkFBTSxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFHbkIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBRWpCLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNYLE9BQU8sR0FBUyxFQUFFLENBQUE7UUFDdEIsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDaEIsT0FBTyxDQUFDLElBQUksR0FBRyxVQUFTLENBQUM7Z0JBRXJCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO29CQUVoQyxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBRWxCLEdBQUcsQ0FBQyxJQUFJLENBQUMsOEJBQThCLEdBQUcsTUFBTSxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztnQkFFbEUsQ0FBQztZQUdMLENBQUMsQ0FBQTtRQUdMLENBQUM7UUFFRCxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7WUFBQyxPQUFPLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztRQUV4QyxXQUFXLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUU7WUFFMUIsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFTLENBQUM7Z0JBQ3hCLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDcEIsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVMsR0FBRztnQkFDakIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNyQixDQUFDLENBQUMsQ0FBQTtRQUVOLENBQUMsQ0FBQyxDQUFDO0lBSVAsQ0FBQztJQUVMLGlCQUFDO0FBQUQsQ0E3Q0EsQUE2Q0MsQ0E3Q3dCLFNBQVMsR0E2Q2pDO0FBR0QsaUJBQVMsVUFBUyxPQUFtQixFQUFFLEVBQVUsRUFBRSxPQUFjO0lBRTdELElBQUksS0FBSyxHQUFHLElBQUksVUFBVSxDQUFDLE9BQU8sRUFBRSxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFFakQsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUcxQixDQUFDLENBQUEiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQXVyb3JhTmV0ID0gcmVxdWlyZShcImV4cHJlc3MtYXVyb3JhanNcIik7XG5cbmltcG9ydCB0aW1lcmRhZW1vbiA9IHJlcXVpcmUoXCJ0aW1lcmRhZW1vblwiKTtcblxubGV0IHJwaiA9IHJlcXVpcmUoXCJyZXF1ZXN0LXByb21pc2UtanNvblwiKTtcblxuaW50ZXJmYWNlIElBZGRyZXNzIHtcbiAgICB1dWlkOiBzdHJpbmc7XG4gICAgZGV2OiBzdHJpbmc7XG4gICAgYWRkcmVzczogbnVtYmVyO1xufVxuaW50ZXJmYWNlIElvcHQge1xuICAgIHRpbWU/OiBudW1iZXI7XG4gICAgZG9uZT86IEZ1bmN0aW9uO1xufVxuY2xhc3MgQXV0b0F1cm9yYSBleHRlbmRzIEF1cm9yYU5ldCB7XG5cbiAgICBjb25zdHJ1Y3RvcihzZW5zb3JzOiBJQWRkcmVzc1tdLCB0ejogc3RyaW5nLCBvcHRpb25zPzogSW9wdCkge1xuICAgICAgICBzdXBlcihzZW5zb3JzLCB0eik7XG5cblxuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgIGlmICghb3B0aW9ucykge1xuICAgICAgICAgICAgb3B0aW9ucyA9IDxJb3B0Pnt9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIW9wdGlvbnMuZG9uZSkge1xuICAgICAgICAgICAgb3B0aW9ucy5kb25lID0gZnVuY3Rpb24oZCkge1xuXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBkLmxlbmd0aDsgaSsrKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgbGV0IHNlbnNvciA9IGRbaV07XG5cbiAgICAgICAgICAgICAgICAgICAgcnBqLnBvc3QoXCJodHRwOi8vbG9jYWxob3N0L2RiL3NlbnNvcnMvXCIgKyBzZW5zb3IudWlkLCBzZW5zb3IpO1xuXG4gICAgICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIW9wdGlvbnMudGltZSkgb3B0aW9ucy50aW1lID0gMzAwMDA7XG5cbiAgICAgICAgdGltZXJkYWVtb24ucHJlKG9wdGlvbnMudGltZSwgZnVuY3Rpb24oKSB7XG5cbiAgICAgICAgICAgIF90aGlzLmRhdGEoKS50aGVuKGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgICAgICAgICBvcHRpb25zLmRvbmUoZCk7XG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgICAgfSlcblxuICAgICAgICB9KTtcblxuXG5cbiAgICB9XG5cbn1cblxuXG5leHBvcnQgPSBmdW5jdGlvbihzZW5zb3JzOiBJQWRkcmVzc1tdLCB0ejogc3RyaW5nLCBvcHRpb25zPzogSW9wdCkge1xuXG4gICAgbGV0IEF1dG9BID0gbmV3IEF1dG9BdXJvcmEoc2Vuc29ycywgdHosIG9wdGlvbnMpO1xuXG4gICAgcmV0dXJuIEF1dG9BLlJvdXRlcigpO1xuXG5cbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
