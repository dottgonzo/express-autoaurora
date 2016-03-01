
import * as Promise from "bluebird";
import * as _ from "lodash";

let rp=require('request-promise-json');



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

export=function(datas:IAPI[],urlingecold:string){

  return new Promise<{data:boolean,success:boolean}>(function (resolve, reject) {

    if(datas&&datas.length==0&&urlingecold){


      resolve({data:false,success:true});

    } else if(datas&&datas.length>0&&urlingecold){


      resolve({data:true,success:true});


      _.map(datas,function(data){

        if(data.active){

          let unixtimeDate=new Date(data.updatedAt);

          // let getdsp='20150125-16:21:04 347.371857 0.585022 203.220169 392.127533 0.366211 143.601395 233.980713 0.684531 357.767487 49.972015 103.156067 24.220917 24.598938 29.784 67.234 0.000 157.034 157.034 12277.584    12277.584    OK';

          let getpower=data.date+' '+data.strings[0].voltage+' '+data.strings[0].current+' '+data.strings[0].power+' '+data.strings[1].voltage+' '+data.strings[1].current+' '+data.strings[1].power+' '+data.grid.voltage+' '+data.grid.current+' '+data.grid.power+' '+data.grid.hz+' '+data.DcAcCvrEff+' '+data.invTemp+' '+data.envTemp+' '+data.dailyEnergy+' '+data.weeklyEnergy+' '+data.last7DaysEnergy+' '+data.monthlyEnergy+' '+data.yearlyEnergy+' '+data.totalEnergy+' '+data.partialEnergy+' OK';

          let getdsp=data.bulkV+' '+data.bulkMV+' 0.000000 0.000000 '+data.bulkDC+' 0.000000 0.000000 '+data.isoRes+' '+data.gridVDC+' '+data.gridAvgV+' 0.000000 '+data.gridDCHz+' '+data.peakMax+' '+data.peakDay+' 0.000000 0.000000 0.000000 0.000000 0.000000 0.000000 0.000000 0.000000 0.000000 0.000000 0.000000 '+data.pin1W+' '+data.pin2W+' 0.000000 0.000000 0.000000 0.000000 OK';





          // res0=$(curl --data "active=true&bootid=$bootid&uid=$invuid" $postserver)
          let bootj = {active:"true",bootid:data.bootId,uid:data.uid};
          // let boots = 'active=true&bootid='+data.boot_id+'&uid='+data.uid;

          // res1=$(curl --data "dataset=$dataset&dataversion=$dataversion&data=$getpower&uid=$invuid" $postserver)
          let firstj = {dataset:'aurora',dataversion:'0.1',data:getpower,uid:data.uid};
          // let firsts = 'dataset=aurora&dataversion=0.1&data='+getpower+'&uid='+data.uid;


          // res2=$(curl --data "dataset=$dataset&dataversion=$dataversion&data=$getdsp&uid=$invuid&options=DSP" $postserver)
          let secondj = {dataset:'aurora',dataversion:'0.1',data:getdsp,options:'DSP',uid:data.uid};
          // let seconds = 'dataset=aurora&dataversion=0.1&data='+getdsp+'&uid='+data.uid+'&options=DSP';






          rp.post(urlingecold,bootj).then(function(){
            rp.post(urlingecold,firstj).then(function(){

              rp.post(urlingecold,secondj)

            })
          }).catch(function(err){
            console.log(err);
            console.log('error')

          })

        } else{
          let bootj = {active:"false",bootid:data.bootId,uid:data.uid};

          rp.post(urlingecold,bootj).then(function(){
            resolve({data:true,success:true});

          }).catch(function(err){
            console.log('error');

            console.log(err)
          })

        }

      })

    } else{
      reject({error:'no data'});


    }
  })
}
