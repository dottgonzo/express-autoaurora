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
    urlingecold?:string;
}
class AutoAurora extends AuroraNet {

    constructor(sensors: IAddress[], tz: string, options?: Iopt) {
        super(sensors, tz);


        let _this = this;

        if (!options) {
            options = <Iopt>{}
        }

        if (!options.done) {
            options.done = function(d) {

                for (let i = 0; i < d.length; i++) {

                    let sensor = d[i];

                    rpj.post("http://localhost/db/sensors/" + sensor.uid, {data:sensor});

                }


            }


        }

        if (!options.time) options.time = 30000;

        timerdaemon.pre(options.time, function() {

            _this.data().then(function(d) {
                
if(options.urlingecold){

    OldIngeco(d,options.urlingecold);
    
} 

    
                    options.done(d);

                
                

                
                
                
            }).catch(function(err) {
                console.log(err);
            })

        });



    }

}


export = function(sensors: IAddress[], tz: string, options?: Iopt) {

    let AutoA = new AutoAurora(sensors, tz, options);

    return AutoA.Router();


}