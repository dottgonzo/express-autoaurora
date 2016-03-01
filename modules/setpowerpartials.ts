import * as moment from 'moment-timezone';
import * as Promise from "bluebird";
import * as _ from "lodash";


let async = require('asyncawait/async');
let await = require('asyncawait/await');
let PouchDB = require('pouchdb');

let config = require('../conf.json');
let localdb='data';

function check_day(data:IAPI,timezone:string,localdb,partialsdb){
  return new Promise(function (resolve, reject) {


    let localDB=new PouchDB(localdb);
    let partialsDB=PouchDB(partialsdb+'_'+data.uid+'_day',{auto_compaction: true});


    let dateDay=parseInt(data.date[6]+data.date[7]);
    let dateMonth=parseInt(data.date[4]+data.date[5]);
    let dateforYear=parseInt(data.date[0]+data.date[1]+data.date[2]+data.date[3]);

    let dateBeginningOfDay=moment.tz(dateforYear+' '+dateMonth+' '+dateDay,"YYYY MM DD",timezone).valueOf();
    let dateBeginningOfMonth=moment.tz(dateforYear+' '+dateMonth+' 01',"YYYY MM DD",timezone).valueOf();
    let dateBeginningOfYear=moment.tz(dateforYear+' 01 01',"YYYY MM DD",timezone).valueOf();

    let dateforDay=parseInt(dateforYear+data.date[4]+data.date[5]+data.date[6]+data.date[7]);
    let dateforMonth=parseInt(dateforYear+data.date[4]+data.date[5]);







        partialsDB.get('daily_'+data.uid).then(function(dayPower){


          if( dayPower.dateBeginningOfDay != dateBeginningOfDay ){



            let dailynew={
              _id:'daily_'+data.uid+'_'+dayPower.dateforDay,
              power:dayPower.power,
              updatedAt:dayPower.dateBeginningOfDay
            };

            localDB.put(dailynew).then(function(doc){
              console.log(doc)

              dayPower.power=data.dailyEnergy;
              dayPower.dateBeginningOfDay=dateBeginningOfDay;
              dayPower.dateforDay=dateforDay;

partialsDB.destroy().then(function(){
  let partialsDB=PouchDB(partialsdb+'_'+data.uid+'_day',{auto_compaction: true});

  delete dayPower._rev;

              partialsDB.put(dayPower).then(function(){
                resolve(true);

              }).catch(function(err){
                console.log(err,"error","save daily");

                reject(err);
              });
});
            }).catch(function(err){
              reject(err);
            });

          } else{
            dayPower.power=data.dailyEnergy;
            dayPower.dateBeginningOfDay=dateBeginningOfDay;
            dayPower.dateforDay=dateforDay;
            partialsDB.destroy().then(function(){
              let partialsDB=PouchDB(partialsdb+'_'+data.uid+'_day',{auto_compaction: true});

              delete dayPower._rev;
            partialsDB.put(dayPower).then(function(){

              resolve(true);
            }).catch(function(err){
              console.log(err,"error","save daily partial");

              reject(err);
            });
              });
          }




        }).catch(function(){
          let daily={
            _id:'daily_'+data.uid,
            dateBeginningOfDay:dateBeginningOfDay,
            power:data.dailyEnergy,
            dateforDay:dateforDay
          };


          partialsDB.put(daily).then(function(){

            resolve(true);
          }).catch(function(err){
                          console.log(err,"error","save first daily")
            reject(err);

          });
        });




});
}
function check_month(data:IAPI,timezone:string,localdb,partialsdb){
  return new Promise(function (resolve, reject) {


    let localDB=PouchDB(localdb);
    let partialsDB=PouchDB(partialsdb+'_'+data.uid+'_month',{auto_compaction: true});

    let dateDay=parseInt(data.date[6]+data.date[7]);
    let dateMonth=parseInt(data.date[4]+data.date[5]);
    let dateforYear=parseInt(data.date[0]+data.date[1]+data.date[2]+data.date[3]);

    let dateBeginningOfDay=moment.tz(dateforYear+' '+dateMonth+' '+dateDay,"YYYY MM DD",timezone).valueOf();
    let dateBeginningOfMonth=moment.tz(dateforYear+' '+dateMonth+' 01',"YYYY MM DD",timezone).valueOf();
    let dateBeginningOfYear=moment.tz(dateforYear+' 01 01',"YYYY MM DD",timezone).valueOf();

    let dateforDay=parseInt(dateforYear+data.date[4]+data.date[5]+dateDay);
    let dateforMonth=parseInt(dateforYear+data.date[4]+data.date[5]);


        partialsDB.get('monthly_'+data.uid).then(function(monthPower){


          if( monthPower.dateBeginningOfMonth != dateBeginningOfMonth ){



            let monthlynew={
              _id:'monthly_'+data.uid+'_'+monthPower.dateforMonth,
              power:monthPower.power,
              updatedAt:monthPower.dateBeginningOfMonth
            }

            localDB.put(monthlynew).then(function(doc){
              monthPower.power=data.monthlyEnergy;
              monthPower.dateBeginningOfMonth=dateBeginningOfMonth;
              monthPower.dateforMonth=dateforMonth;


              partialsDB.destroy().then(function(){
                let partialsDB=PouchDB(partialsdb+'_'+data.uid+'_month',{auto_compaction: true});

                delete monthPower._rev
              partialsDB.put(monthPower).then(function(){

                resolve(true);
              }).catch(function(err){
                reject(err);
              });


});

            }).catch(function(err){
              reject(err);
            });

          } else{
            monthPower.power=data.monthlyEnergy;
            monthPower.dateBeginningOfMonth=dateBeginningOfMonth;
            monthPower.dateforMonth=dateforMonth;
            partialsDB.destroy().then(function(){
              let partialsDB=PouchDB(partialsdb+'_'+data.uid+'_month',{auto_compaction: true});

              delete monthPower._rev
            partialsDB.put(monthPower).then(function(){

              resolve(true);
            }).catch(function(err){
              reject(err);
            });
      });
          }



        }).catch(function(){
          let monthly={
            _id:'monthly_'+data.uid,
            dateBeginningOfMonth:dateBeginningOfMonth,
            power:data.monthlyEnergy,
            dateforMonth:dateforMonth
          };
          partialsDB.put(monthly).then(function(){

            resolve(true);
          }).catch(function(err){
            reject(err);
          });
        });





})
}
function check_year(data:IAPI,timezone:string,localdb,partialsdb){
  return new Promise(function (resolve, reject) {
    let localDB=PouchDB(localdb);
    let partialsDB=PouchDB(partialsdb+'_'+data.uid+'_year',{auto_compaction: true});



    let dateDay=parseInt(data.date[6]+data.date[7]);
    let dateMonth=parseInt(data.date[4]+data.date[5]);
    let dateforYear=parseInt(data.date[0]+data.date[1]+data.date[2]+data.date[3]);

    let dateBeginningOfDay=moment.tz(dateforYear+' '+dateMonth+' '+dateDay,"YYYY MM DD",timezone).valueOf();
    let dateBeginningOfMonth=moment.tz(dateforYear+' '+dateMonth+' 01',"YYYY MM DD",timezone).valueOf();
    let dateBeginningOfYear=moment.tz(dateforYear+' 01 01',"YYYY MM DD",timezone).valueOf();

    let dateforDay=parseInt(dateforYear+data.date[4]+data.date[5]+dateDay);
    let dateforMonth=parseInt(dateforYear+data.date[4]+data.date[5]);




        partialsDB.get('yearly_'+data.uid).then(function(yearPower){


          if( yearPower.dateBeginningOfYear != dateBeginningOfYear ){



            let yearlynew={
              _id:'yearly_'+data.uid+'_'+yearPower.dateforYear,
              power:yearPower.power,
              updatedAt:yearPower.dateBeginningOfYear
            };

            localDB.put(yearlynew).then(function(doc){

              yearPower.power=data.yearlyEnergy;
              yearPower.dateBeginningOfYear=dateBeginningOfYear;
              yearPower.dateforYear=dateforYear;


              partialsDB.destroy().then(function(){
                let partialsDB=PouchDB(partialsdb+'_'+data.uid+'_year',{auto_compaction: true});

                delete yearPower._rev
              partialsDB.put(yearPower).then(function(){

                resolve(true);
              }).catch(function(err){
                reject(err);
              });
});

            }).catch(function(err){
reject(err);
            });

          } else{
            yearPower.power=data.yearlyEnergy;
            yearPower.dateBeginningOfYear=dateBeginningOfYear;
            yearPower.dateforYear=dateforYear;
            partialsDB.destroy().then(function(){
              let partialsDB=PouchDB(partialsdb+'_'+data.uid+'_year',{auto_compaction: true});

              delete yearPower._rev
            partialsDB.put(yearPower).then(function(){

              resolve(true);
            }).catch(function(err){
              reject(err);
            });
  });
          }



        }).catch(function(){
          let yearly={
            _id:'yearly_'+data.uid,
            dateBeginningOfYear:dateBeginningOfYear,
            power:data.yearlyEnergy,
            dateforYear:dateforYear
          };
          partialsDB.put(yearly).then(function(){

            resolve(true);
          }).catch(function(err){
            reject(err);
          });
        });




})
}


function each_check(data:IAPI,timezone:string,localdb,partialsdb){
  return new Promise(function (resolve, reject) {

  if (data.active){



check_day(data,timezone,localdb,partialsdb).then(function(){

  check_month(data,timezone,localdb,partialsdb).then(function(){
    check_year(data,timezone,localdb,partialsdb).then(function(){
resolve(true)
    }).catch(function(){
      reject("year error");

    });
  }).catch(function(){
    check_year(data,timezone,localdb,partialsdb).then(function(){
      reject("month error")

    }).catch(function(){
      reject("month and year error");

    });
  });
}).catch(function(){

  check_month(data,timezone,localdb,partialsdb).then(function(){
    check_year(data,timezone,localdb,partialsdb).then(function(){
      reject("day error");

    }).catch(function(){
      reject("day and year error");

    });
  }).catch(function(){
    check_year(data,timezone,localdb,partialsdb).then(function(){
      reject("day and month error")

    }).catch(function(){

      reject("can't save partials at all")

    });
  });
});


  } else{
    resolve({status:'off'});

  }
})
}


interface Istring {
    voltage: number;
    current: number;
    power: number;
}

interface IAPI {

    _id: string;
    uid: string;
    bootId: string;
    bootTime: number;
    active: boolean;
    updatedAt: number;
    date: string;
    strings: Istring[];
    grid: {
        voltage: number;
        current: number;
        power: number;
        hz: number;
    };
    DcAcCvrEff: number;
    invTemp: number;
    envTemp: number;
    dailyEnergy: number;
    weeklyEnergy: number;
    last7DaysEnergy: number;
    monthlyEnergy: number;
    yearlyEnergy: number;
    totalEnergy: number;
    partialEnergy: number;
    bulkV: number;
    bulkMV: number;
    bulkDC: number;
    isoRes: number;
    gridVDC: number;
    gridAvgV: number;
    gridDCHz: number;
    peakMax: number;
    peakDay: number;
    pin1W: number;
    pin2W: number;
}
export=function(data:any,timezone:string,localdb,partialsdb){


    if (!_.isArray(data)){
      return each_check(data,timezone,localdb,partialsdb)
    } else {
      let serial_check = async (function () {

      _.map(data,function(d:IAPI){
        if(d.active){
        let aa = await (each_check(d,timezone,localdb,partialsdb));
      }
      });
    });
    return serial_check();


    }


}
