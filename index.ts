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

    constructor(obj: { addresses: IAddress[], tz: string, options?: Iopt }) {
        super(obj.addresses, obj.tz);


        let _this = this;

        if (!obj.options) {
            obj.options = <Iopt>{}
        }

        if (!obj.options.done) {
            obj.options.done = function(d) {

                for (let i = 0; i < d.length; i++) {

                    let sensor = d[i];

                    rpj.post("http://localhost/db/sensors/" + sensor.uid, { data: sensor });

                }


            }


        }

        if (!obj.options.time) obj.options.time = 30000;

        timerdaemon.pre(obj.options.time, function() {

            _this.data().then(function(d) {

                if (obj.options.urlingecold) {

                    OldIngeco(d, obj.options.urlingecold);

                }


                obj.options.done(d);







            }).catch(function(err) {
                console.log(err);
            })

        });



    }

}


export = function(obj: { addresses: IAddress[], tz: string, options?: Iopt }) {

    let AutoA = new AutoAurora(obj);

    return AutoA.Router();


}