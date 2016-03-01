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
                for (var i = 0; i < d.length; i++) {
                    var sensor = d[i];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImluZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLElBQU8sU0FBUyxXQUFXLGtCQUFrQixDQUFDLENBQUM7QUFFL0MsSUFBTyxXQUFXLFdBQVcsYUFBYSxDQUFDLENBQUM7QUFFNUMsSUFBTyxTQUFTLFdBQVcscUJBQXFCLENBQUMsQ0FBQztBQUdsRCxJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQztBQVkxQztJQUF5Qiw4QkFBUztJQUU5QixvQkFBWSxHQUFvRTtRQUM1RSxrQkFBTSxHQUFHLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBR3ZDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQztRQUVqQixFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ2YsR0FBRyxDQUFDLE9BQU8sR0FBUyxFQUFFLENBQUE7UUFDMUIsQ0FBQztRQUVELEVBQUUsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3BCLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLFVBQVMsQ0FBQztnQkFFekIsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUM7b0JBRWhDLElBQUksTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFFbEIsR0FBRyxDQUFDLElBQUksQ0FBQywyQkFBMkIsR0FBRyxNQUFNLENBQUMsR0FBRyxFQUFFLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUM7Z0JBRXpFLENBQUM7WUFFTCxDQUFDLENBQUE7UUFHTCxDQUFDO1FBRUQsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztZQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztRQUVoRCxVQUFVLENBQUM7WUFDUCxXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFO2dCQUM5QixPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFBO2dCQUN6QixLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVMsQ0FBQztvQkFFeEIsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO3dCQUMxQixPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQUE7d0JBQ3RDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztvQkFFMUMsQ0FBQztvQkFHRCxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFHeEIsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVMsR0FBRztvQkFDakIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDckIsQ0FBQyxDQUFDLENBQUM7WUFFUCxDQUFDLENBQUMsQ0FBQztRQUVQLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUdkLENBQUM7SUFFTCxpQkFBQztBQUFELENBeERBLEFBd0RDLENBeER3QixTQUFTLEdBd0RqQztBQUdELGlCQUFTLFVBQVMsR0FBb0U7SUFFbEYsSUFBSSxLQUFLLEdBQUcsSUFBSSxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFaEMsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztBQUcxQixDQUFDLENBQUEiLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQXVyb3JhTmV0ID0gcmVxdWlyZShcImV4cHJlc3MtYXVyb3JhanNcIik7XG5pbXBvcnQgKiBhcyBfIGZyb20gXCJsb2Rhc2hcIjtcbmltcG9ydCB0aW1lcmRhZW1vbiA9IHJlcXVpcmUoXCJ0aW1lcmRhZW1vblwiKTtcblxuaW1wb3J0IE9sZEluZ2VjbyA9IHJlcXVpcmUoXCIuL21vZHVsZXMvb2xkaW5nZWNvXCIpO1xuaW1wb3J0IFBvd2VyUGFydGlhbHMgPSByZXF1aXJlKFwiLi9tb2R1bGVzL3NldHBvd2VycGFydGlhbHNcIik7XG5cbmxldCBycGogPSByZXF1aXJlKFwicmVxdWVzdC1wcm9taXNlLWpzb25cIik7XG5cbmludGVyZmFjZSBJQWRkcmVzcyB7XG4gICAgdXVpZDogc3RyaW5nO1xuICAgIGRldjogc3RyaW5nO1xuICAgIGFkZHJlc3M6IG51bWJlcjtcbn1cbmludGVyZmFjZSBJb3B0IHtcbiAgICB0aW1lPzogbnVtYmVyO1xuICAgIGRvbmU/OiBGdW5jdGlvbjtcbiAgICB1cmxpbmdlY29sZD86IHN0cmluZztcbn1cbmNsYXNzIEF1dG9BdXJvcmEgZXh0ZW5kcyBBdXJvcmFOZXQge1xuXG4gICAgY29uc3RydWN0b3Iob2JqOiB7IGNvbmY6IHsgYWRkcmVzc2VzOiBJQWRkcmVzc1tdLCB0ejogc3RyaW5nIH0sIG9wdGlvbnM/OiBJb3B0IH0pIHtcbiAgICAgICAgc3VwZXIob2JqLmNvbmYuYWRkcmVzc2VzLCBvYmouY29uZi50eik7XG5cblxuICAgICAgICBsZXQgX3RoaXMgPSB0aGlzO1xuXG4gICAgICAgIGlmICghb2JqLm9wdGlvbnMpIHtcbiAgICAgICAgICAgIG9iai5vcHRpb25zID0gPElvcHQ+e31cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghb2JqLm9wdGlvbnMuZG9uZSkge1xuICAgICAgICAgICAgb2JqLm9wdGlvbnMuZG9uZSA9IGZ1bmN0aW9uKGQpIHtcblxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgZC5sZW5ndGg7IGkrKykge1xuXG4gICAgICAgICAgICAgICAgICAgIGxldCBzZW5zb3IgPSBkW2ldO1xuXG4gICAgICAgICAgICAgICAgICAgIHJwai5wb3N0KFwiaHR0cDovL2xvY2FsaG9zdC9zZW5zb3JzL1wiICsgc2Vuc29yLnVpZCwgeyBkYXRhOiBzZW5zb3IgfSk7XG5cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIH1cblxuXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIW9iai5vcHRpb25zLnRpbWUpIG9iai5vcHRpb25zLnRpbWUgPSAzMDAwMDtcblxuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgdGltZXJkYWVtb24ucHJlKG9iai5vcHRpb25zLnRpbWUsIGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdxdWVyeW5nLi4uJylcbiAgICAgICAgICAgICAgICBfdGhpcy5kYXRhKCkudGhlbihmdW5jdGlvbihkKSB7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKG9iai5vcHRpb25zLnVybGluZ2Vjb2xkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnc2VuZGluZyB0byBvbGRpbmdlY28uLi4nKVxuICAgICAgICAgICAgICAgICAgICAgICAgT2xkSW5nZWNvKGQsIG9iai5vcHRpb25zLnVybGluZ2Vjb2xkKTtcblxuICAgICAgICAgICAgICAgICAgICB9XG5cblxuICAgICAgICAgICAgICAgICAgICBvYmoub3B0aW9ucy5kb25lKGQpO1xuXG5cbiAgICAgICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgfSwgMzAwMDApO1xuXG5cbiAgICB9XG5cbn1cblxuXG5leHBvcnQgPSBmdW5jdGlvbihvYmo6IHsgY29uZjogeyBhZGRyZXNzZXM6IElBZGRyZXNzW10sIHR6OiBzdHJpbmcgfSwgb3B0aW9ucz86IElvcHQgfSkge1xuXG4gICAgbGV0IEF1dG9BID0gbmV3IEF1dG9BdXJvcmEob2JqKTtcblxuICAgIHJldHVybiBBdXRvQS5Sb3V0ZXIoKTtcblxuXG59Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
