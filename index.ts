import AuroraNet = require("express-aurorajs");
import * as _ from "lodash";
import timerdaemon = require("timerdaemon");

import OldIngeco = require("./modules/oldingeco");
import PowerPartials = require("./modules/setpowerpartials");

let rpj = require("request-promise-json");

interface IAddress {
    uuid: string;
    dev: string;
    address: number;
}
interface Iopt {
    time?: number;
    done?: Function;
    urlingecold?: string;
}
class AutoAurora extends AuroraNet {

    constructor(obj: { conf: { addresses: IAddress[], tz: string }, options?: Iopt }) {
        super(obj.conf.addresses, obj.conf.tz);


        let _this = this;

        if (!obj.options) {
            obj.options = <Iopt>{}
        }

        if (!obj.options.done) {
            obj.options.done = function(d) {
                
                    rpj.post("http://localhost/heartbeat");
                for (let i = 0; i < d.length; i++) {

                    let sensor = d[i];

                    rpj.post("http://localhost/sensors/" + sensor.uid, { data: sensor });

                }

            }


        }

        if (!obj.options.time) obj.options.time = 30000;

        setTimeout(function() {
            timerdaemon.pre(obj.options.time, function() {
                console.log('queryng...')
                _this.data().then(function(d) {

                    if (obj.options.urlingecold) {
                        console.log('sending to oldingeco...')
                        OldIngeco(d, obj.options.urlingecold);

                    }


                    obj.options.done(d);


                }).catch(function(err) {
                    console.log(err);
                });

            });

        }, 30000);


    }

}


export = function(obj: { conf: { addresses: IAddress[], tz: string }, options?: Iopt }) {

    let AutoA = new AutoAurora(obj);

    return AutoA.Router();


}