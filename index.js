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
                for (var i = 0; i < d.length; i++) {
                    var sensor = d[i];
                    rpj.post("http://localhost/db/sensors/" + sensor.uid + "/receive", sensor);
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQU8sU0FBUyxXQUFXLGtCQUFrQixDQUFDLENBQUM7QUFFL0MsSUFBTyxXQUFXLFdBQVcsYUFBYSxDQUFDLENBQUM7QUFFNUMsSUFBSSxHQUFHLEdBQUcsT0FBTyxDQUFDLHNCQUFzQixDQUFDLENBQUM7QUFXMUMsaUJBQVM7SUFBeUIsOEJBQVM7SUFFdkMsb0JBQVksT0FBbUIsRUFBRSxFQUFVLEVBQUUsT0FBYztRQUN2RCxrQkFBTSxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFbkIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBRWpCLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNYLE9BQU8sR0FBUyxFQUFFLENBQUE7UUFDdEIsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDaEIsT0FBTyxDQUFDLElBQUksR0FBRyxVQUFTLENBQUM7Z0JBRXJCLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO29CQUVoQyxJQUFJLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBRWxCLEdBQUcsQ0FBQyxJQUFJLENBQUMsOEJBQThCLEdBQUcsTUFBTSxDQUFDLEdBQUcsR0FBRyxVQUFVLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBRS9FLENBQUM7WUFHTCxDQUFDLENBQUE7UUFHTCxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7UUFFeEMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFO1lBRTFCLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBUyxDQUFDO2dCQUN4QixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFTLEdBQUc7Z0JBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDckIsQ0FBQyxDQUFDLENBQUE7UUFFTixDQUFDLENBQUMsQ0FBQztJQUlQLENBQUM7SUFFTCxpQkFBQztBQUFELENBNUNTLEFBNENSLENBNUNpQyxTQUFTLEVBNEMxQyxDQUFBIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEF1cm9yYU5ldCA9IHJlcXVpcmUoXCJleHByZXNzLWF1cm9yYWpzXCIpO1xuXG5pbXBvcnQgdGltZXJkYWVtb24gPSByZXF1aXJlKFwidGltZXJkYWVtb25cIik7XG5cbmxldCBycGogPSByZXF1aXJlKFwicmVxdWVzdC1wcm9taXNlLWpzb25cIik7XG5cbmludGVyZmFjZSBJQWRkcmVzcyB7XG4gICAgdXVpZDogc3RyaW5nO1xuICAgIGRldjogc3RyaW5nO1xuICAgIGFkZHJlc3M6IG51bWJlcjtcbn1cbmludGVyZmFjZSBJb3B0IHtcbiAgICB0aW1lPzogbnVtYmVyO1xuICAgIGRvbmU/OiBGdW5jdGlvbjtcbn1cbmV4cG9ydCA9IGNsYXNzIEF1dG9BdXJvcmEgZXh0ZW5kcyBBdXJvcmFOZXQge1xuXG4gICAgY29uc3RydWN0b3Ioc2Vuc29yczogSUFkZHJlc3NbXSwgdHo6IHN0cmluZywgb3B0aW9ucz86IElvcHQpIHtcbiAgICAgICAgc3VwZXIoc2Vuc29ycywgdHopO1xuXG4gICAgICAgIGxldCBfdGhpcyA9IHRoaXM7XG5cbiAgICAgICAgaWYgKCFvcHRpb25zKSB7XG4gICAgICAgICAgICBvcHRpb25zID0gPElvcHQ+e31cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghb3B0aW9ucy5kb25lKSB7XG4gICAgICAgICAgICBvcHRpb25zLmRvbmUgPSBmdW5jdGlvbihkKSB7XG5cbiAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGQubGVuZ3RoOyBpKyspIHtcblxuICAgICAgICAgICAgICAgICAgICBsZXQgc2Vuc29yID0gZFtpXTtcblxuICAgICAgICAgICAgICAgICAgICBycGoucG9zdChcImh0dHA6Ly9sb2NhbGhvc3QvZGIvc2Vuc29ycy9cIiArIHNlbnNvci51aWQgKyBcIi9yZWNlaXZlXCIsIHNlbnNvcik7XG5cbiAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgfVxuXG5cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghb3B0aW9ucy50aW1lKSBvcHRpb25zLnRpbWUgPSAzMDAwMDtcblxuICAgICAgICB0aW1lcmRhZW1vbi5wcmUob3B0aW9ucy50aW1lLCBmdW5jdGlvbigpIHtcblxuICAgICAgICAgICAgX3RoaXMuZGF0YSgpLnRoZW4oZnVuY3Rpb24oZCkge1xuICAgICAgICAgICAgICAgIG9wdGlvbnMuZG9uZShkKTtcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICB9KVxuXG4gICAgICAgIH0pO1xuXG5cblxuICAgIH1cblxufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
