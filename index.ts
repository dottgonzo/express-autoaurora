import AuroraNet = require("express-aurorajs");

import timerdaemon = require("timerdaemon");

let rpj = require("request-promise-json");

interface IAddress {
    uuid: string;
    dev: string;
    address: number;
}
interface Iopt {
    time?: number;
    done?: Function;
}
export = class AutoAurora extends AuroraNet {

    constructor(sensors: IAddress[], tz: string, options?: Iopt) {
        super(sensors, tz);

        let _this = this;

        if (!options) {
            options = <Iopt>{}
        }

        if (!options.done) {
            options.done = function(d) {
                rpj.post("http://localhost/db/sensor/receive", d);
            }


        }

        if (!options.time) options.time = 30000;

        timerdaemon.pre(options.time, function() {

            _this.data().then(function(d) {
                options.done(d);
            }).catch(function(err) {
                console.log(err);
            })

        });



    }

}