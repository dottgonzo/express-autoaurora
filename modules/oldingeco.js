"use strict";
var Promise = require("bluebird");
var _ = require("lodash");
var rp = require('request-promise-json');
module.exports = function (datas, urlingecold) {
    return new Promise(function (resolve, reject) {
        if (datas && datas.length == 0 && urlingecold) {
            resolve({ data: false, success: true });
        }
        else if (datas && datas.length > 0 && urlingecold) {
            resolve({ data: true, success: true });
            _.map(datas, function (data) {
                if (data.active) {
                    var unixtimeDate = new Date(data.updatedAt);
                    var getpower = data.date + ' ' + data.strings[0].voltage + ' ' + data.strings[0].current + ' ' + data.strings[0].power + ' ' + data.strings[1].voltage + ' ' + data.strings[1].current + ' ' + data.strings[1].power + ' ' + data.grid.voltage + ' ' + data.grid.current + ' ' + data.grid.power + ' ' + data.grid.hz + ' ' + data.DcAcCvrEff + ' ' + data.invTemp + ' ' + data.envTemp + ' ' + data.dailyEnergy + ' ' + data.weeklyEnergy + ' ' + data.last7DaysEnergy + ' ' + data.monthlyEnergy + ' ' + data.yearlyEnergy + ' ' + data.totalEnergy + ' ' + data.partialEnergy + ' OK';
                    var getdsp = data.bulkV + ' ' + data.bulkMV + ' 0.000000 0.000000 ' + data.bulkDC + ' 0.000000 0.000000 ' + data.isoRes + ' ' + data.gridVDC + ' ' + data.gridAvgV + ' 0.000000 ' + data.gridDCHz + ' ' + data.peakMax + ' ' + data.peakDay + ' 0.000000 0.000000 0.000000 0.000000 0.000000 0.000000 0.000000 0.000000 0.000000 0.000000 0.000000 ' + data.pin1W + ' ' + data.pin2W + ' 0.000000 0.000000 0.000000 0.000000 OK';
                    var bootj = { active: "true", bootid: data.bootId, uid: data.uid };
                    var firstj_1 = { dataset: 'aurora', dataversion: '0.1', data: getpower, uid: data.uid };
                    var secondj_1 = { dataset: 'aurora', dataversion: '0.1', data: getdsp, options: 'DSP', uid: data.uid };
                    rp.post(urlingecold, bootj).then(function () {
                        rp.post(urlingecold, firstj_1).then(function () {
                            rp.post(urlingecold, secondj_1);
                        });
                    }).catch(function (err) {
                        console.log(err);
                        console.log('error');
                    });
                }
                else {
                    var bootj = { active: "false", bootid: data.bootId, uid: data.uid };
                    rp.post(urlingecold, bootj).then(function () {
                        resolve({ data: true, success: true });
                    }).catch(function (err) {
                        console.log('error');
                        console.log(err);
                    });
                }
            });
        }
        else {
            reject({ error: 'no data' });
        }
    });
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZXMvb2xkaW5nZWNvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDQSxJQUFZLE9BQU8sV0FBTSxVQUFVLENBQUMsQ0FBQTtBQUNwQyxJQUFZLENBQUMsV0FBTSxRQUFRLENBQUMsQ0FBQTtBQUU1QixJQUFJLEVBQUUsR0FBQyxPQUFPLENBQUMsc0JBQXNCLENBQUMsQ0FBQztBQWlEdkMsaUJBQU8sVUFBUyxLQUFZLEVBQUMsV0FBa0I7SUFFN0MsTUFBTSxDQUFDLElBQUksT0FBTyxDQUFpQyxVQUFVLE9BQU8sRUFBRSxNQUFNO1FBRTFFLEVBQUUsQ0FBQSxDQUFDLEtBQUssSUFBRSxLQUFLLENBQUMsTUFBTSxJQUFFLENBQUMsSUFBRSxXQUFXLENBQUMsQ0FBQSxDQUFDO1lBR3RDLE9BQU8sQ0FBQyxFQUFDLElBQUksRUFBQyxLQUFLLEVBQUMsT0FBTyxFQUFDLElBQUksRUFBQyxDQUFDLENBQUM7UUFFckMsQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUEsQ0FBQyxLQUFLLElBQUUsS0FBSyxDQUFDLE1BQU0sR0FBQyxDQUFDLElBQUUsV0FBVyxDQUFDLENBQUEsQ0FBQztZQUc1QyxPQUFPLENBQUMsRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDO1lBR2xDLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFDLFVBQVMsSUFBSTtnQkFFdkIsRUFBRSxDQUFBLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFBLENBQUM7b0JBRWQsSUFBSSxZQUFZLEdBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUkxQyxJQUFJLFFBQVEsR0FBQyxJQUFJLENBQUMsSUFBSSxHQUFDLEdBQUcsR0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBQyxHQUFHLEdBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUMsR0FBRyxHQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFDLEdBQUcsR0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sR0FBQyxHQUFHLEdBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEdBQUMsR0FBRyxHQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxHQUFDLEdBQUcsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBQyxHQUFHLEdBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUMsR0FBRyxHQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxHQUFDLEdBQUcsR0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBQyxHQUFHLEdBQUMsSUFBSSxDQUFDLFVBQVUsR0FBQyxHQUFHLEdBQUMsSUFBSSxDQUFDLE9BQU8sR0FBQyxHQUFHLEdBQUMsSUFBSSxDQUFDLE9BQU8sR0FBQyxHQUFHLEdBQUMsSUFBSSxDQUFDLFdBQVcsR0FBQyxHQUFHLEdBQUMsSUFBSSxDQUFDLFlBQVksR0FBQyxHQUFHLEdBQUMsSUFBSSxDQUFDLGVBQWUsR0FBQyxHQUFHLEdBQUMsSUFBSSxDQUFDLGFBQWEsR0FBQyxHQUFHLEdBQUMsSUFBSSxDQUFDLFlBQVksR0FBQyxHQUFHLEdBQUMsSUFBSSxDQUFDLFdBQVcsR0FBQyxHQUFHLEdBQUMsSUFBSSxDQUFDLGFBQWEsR0FBQyxLQUFLLENBQUM7b0JBRXJlLElBQUksTUFBTSxHQUFDLElBQUksQ0FBQyxLQUFLLEdBQUMsR0FBRyxHQUFDLElBQUksQ0FBQyxNQUFNLEdBQUMscUJBQXFCLEdBQUMsSUFBSSxDQUFDLE1BQU0sR0FBQyxxQkFBcUIsR0FBQyxJQUFJLENBQUMsTUFBTSxHQUFDLEdBQUcsR0FBQyxJQUFJLENBQUMsT0FBTyxHQUFDLEdBQUcsR0FBQyxJQUFJLENBQUMsUUFBUSxHQUFDLFlBQVksR0FBQyxJQUFJLENBQUMsUUFBUSxHQUFDLEdBQUcsR0FBQyxJQUFJLENBQUMsT0FBTyxHQUFDLEdBQUcsR0FBQyxJQUFJLENBQUMsT0FBTyxHQUFDLHNHQUFzRyxHQUFDLElBQUksQ0FBQyxLQUFLLEdBQUMsR0FBRyxHQUFDLElBQUksQ0FBQyxLQUFLLEdBQUMseUNBQXlDLENBQUM7b0JBT3JYLElBQUksS0FBSyxHQUFHLEVBQUMsTUFBTSxFQUFDLE1BQU0sRUFBQyxNQUFNLEVBQUMsSUFBSSxDQUFDLE1BQU0sRUFBQyxHQUFHLEVBQUMsSUFBSSxDQUFDLEdBQUcsRUFBQyxDQUFDO29CQUk1RCxJQUFJLFFBQU0sR0FBRyxFQUFDLE9BQU8sRUFBQyxRQUFRLEVBQUMsV0FBVyxFQUFDLEtBQUssRUFBQyxJQUFJLEVBQUMsUUFBUSxFQUFDLEdBQUcsRUFBQyxJQUFJLENBQUMsR0FBRyxFQUFDLENBQUM7b0JBSzdFLElBQUksU0FBTyxHQUFHLEVBQUMsT0FBTyxFQUFDLFFBQVEsRUFBQyxXQUFXLEVBQUMsS0FBSyxFQUFDLElBQUksRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLEtBQUssRUFBQyxHQUFHLEVBQUMsSUFBSSxDQUFDLEdBQUcsRUFBQyxDQUFDO29CQVExRixFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUM7d0JBQzlCLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFDLFFBQU0sQ0FBQyxDQUFDLElBQUksQ0FBQzs0QkFFL0IsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUMsU0FBTyxDQUFDLENBQUE7d0JBRTlCLENBQUMsQ0FBQyxDQUFBO29CQUNKLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFTLEdBQUc7d0JBQ25CLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBQ2pCLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUE7b0JBRXRCLENBQUMsQ0FBQyxDQUFBO2dCQUVKLENBQUM7Z0JBQUMsSUFBSSxDQUFBLENBQUM7b0JBQ0wsSUFBSSxLQUFLLEdBQUcsRUFBQyxNQUFNLEVBQUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxJQUFJLENBQUMsTUFBTSxFQUFDLEdBQUcsRUFBQyxJQUFJLENBQUMsR0FBRyxFQUFDLENBQUM7b0JBRTdELEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQzt3QkFDOUIsT0FBTyxDQUFDLEVBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQztvQkFFcEMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLFVBQVMsR0FBRzt3QkFDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQzt3QkFFckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtvQkFDbEIsQ0FBQyxDQUFDLENBQUE7Z0JBRUosQ0FBQztZQUVILENBQUMsQ0FBQyxDQUFBO1FBRUosQ0FBQztRQUFDLElBQUksQ0FBQSxDQUFDO1lBQ0wsTUFBTSxDQUFDLEVBQUMsS0FBSyxFQUFDLFNBQVMsRUFBQyxDQUFDLENBQUM7UUFHNUIsQ0FBQztJQUNILENBQUMsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBIiwiZmlsZSI6Im1vZHVsZXMvb2xkaW5nZWNvLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXG5pbXBvcnQgKiBhcyBQcm9taXNlIGZyb20gXCJibHVlYmlyZFwiO1xuaW1wb3J0ICogYXMgXyBmcm9tIFwibG9kYXNoXCI7XG5cbmxldCBycD1yZXF1aXJlKCdyZXF1ZXN0LXByb21pc2UtanNvbicpO1xuXG5cblxuaW50ZXJmYWNlIElzdHJpbmcge1xuICAgIHZvbHRhZ2U6IG51bWJlcjtcbiAgICBjdXJyZW50OiBudW1iZXI7XG4gICAgcG93ZXI6IG51bWJlcjtcbn1cblxuaW50ZXJmYWNlIElBUEkge1xuXG4gICAgX2lkOiBzdHJpbmc7XG4gICAgdWlkOiBzdHJpbmc7XG4gICAgYm9vdElkOiBzdHJpbmc7XG4gICAgYm9vdFRpbWU6IG51bWJlcjtcbiAgICBhY3RpdmU6IGJvb2xlYW47XG4gICAgdXBkYXRlZEF0OiBudW1iZXI7XG4gICAgZGF0ZTogc3RyaW5nO1xuICAgIHN0cmluZ3M6IElzdHJpbmdbXTtcbiAgICBncmlkOiB7XG4gICAgICAgIHZvbHRhZ2U6IG51bWJlcjtcbiAgICAgICAgY3VycmVudDogbnVtYmVyO1xuICAgICAgICBwb3dlcjogbnVtYmVyO1xuICAgICAgICBoejogbnVtYmVyO1xuICAgIH07XG4gICAgRGNBY0N2ckVmZjogbnVtYmVyO1xuICAgIGludlRlbXA6IG51bWJlcjtcbiAgICBlbnZUZW1wOiBudW1iZXI7XG4gICAgZGFpbHlFbmVyZ3k6IG51bWJlcjtcbiAgICB3ZWVrbHlFbmVyZ3k6IG51bWJlcjtcbiAgICBsYXN0N0RheXNFbmVyZ3k6IG51bWJlcjtcbiAgICBtb250aGx5RW5lcmd5OiBudW1iZXI7XG4gICAgeWVhcmx5RW5lcmd5OiBudW1iZXI7XG4gICAgdG90YWxFbmVyZ3k6IG51bWJlcjtcbiAgICBwYXJ0aWFsRW5lcmd5OiBudW1iZXI7XG4gICAgYnVsa1Y6IG51bWJlcjtcbiAgICBidWxrTVY6IG51bWJlcjtcbiAgICBidWxrREM6IG51bWJlcjtcbiAgICBpc29SZXM6IG51bWJlcjtcbiAgICBncmlkVkRDOiBudW1iZXI7XG4gICAgZ3JpZEF2Z1Y6IG51bWJlcjtcbiAgICBncmlkRENIejogbnVtYmVyO1xuICAgIHBlYWtNYXg6IG51bWJlcjtcbiAgICBwZWFrRGF5OiBudW1iZXI7XG4gICAgcGluMVc6IG51bWJlcjtcbiAgICBwaW4yVzogbnVtYmVyO1xufVxuXG5leHBvcnQ9ZnVuY3Rpb24oZGF0YXM6SUFQSVtdLHVybGluZ2Vjb2xkOnN0cmluZyl7XG5cbiAgcmV0dXJuIG5ldyBQcm9taXNlPHtkYXRhOmJvb2xlYW4sc3VjY2Vzczpib29sZWFufT4oZnVuY3Rpb24gKHJlc29sdmUsIHJlamVjdCkge1xuXG4gICAgaWYoZGF0YXMmJmRhdGFzLmxlbmd0aD09MCYmdXJsaW5nZWNvbGQpe1xuXG5cbiAgICAgIHJlc29sdmUoe2RhdGE6ZmFsc2Usc3VjY2Vzczp0cnVlfSk7XG5cbiAgICB9IGVsc2UgaWYoZGF0YXMmJmRhdGFzLmxlbmd0aD4wJiZ1cmxpbmdlY29sZCl7XG5cblxuICAgICAgcmVzb2x2ZSh7ZGF0YTp0cnVlLHN1Y2Nlc3M6dHJ1ZX0pO1xuXG5cbiAgICAgIF8ubWFwKGRhdGFzLGZ1bmN0aW9uKGRhdGEpe1xuXG4gICAgICAgIGlmKGRhdGEuYWN0aXZlKXtcblxuICAgICAgICAgIGxldCB1bml4dGltZURhdGU9bmV3IERhdGUoZGF0YS51cGRhdGVkQXQpO1xuXG4gICAgICAgICAgLy8gbGV0IGdldGRzcD0nMjAxNTAxMjUtMTY6MjE6MDQgMzQ3LjM3MTg1NyAwLjU4NTAyMiAyMDMuMjIwMTY5IDM5Mi4xMjc1MzMgMC4zNjYyMTEgMTQzLjYwMTM5NSAyMzMuOTgwNzEzIDAuNjg0NTMxIDM1Ny43Njc0ODcgNDkuOTcyMDE1IDEwMy4xNTYwNjcgMjQuMjIwOTE3IDI0LjU5ODkzOCAyOS43ODQgNjcuMjM0IDAuMDAwIDE1Ny4wMzQgMTU3LjAzNCAxMjI3Ny41ODQgICAgMTIyNzcuNTg0ICAgIE9LJztcblxuICAgICAgICAgIGxldCBnZXRwb3dlcj1kYXRhLmRhdGUrJyAnK2RhdGEuc3RyaW5nc1swXS52b2x0YWdlKycgJytkYXRhLnN0cmluZ3NbMF0uY3VycmVudCsnICcrZGF0YS5zdHJpbmdzWzBdLnBvd2VyKycgJytkYXRhLnN0cmluZ3NbMV0udm9sdGFnZSsnICcrZGF0YS5zdHJpbmdzWzFdLmN1cnJlbnQrJyAnK2RhdGEuc3RyaW5nc1sxXS5wb3dlcisnICcrZGF0YS5ncmlkLnZvbHRhZ2UrJyAnK2RhdGEuZ3JpZC5jdXJyZW50KycgJytkYXRhLmdyaWQucG93ZXIrJyAnK2RhdGEuZ3JpZC5oeisnICcrZGF0YS5EY0FjQ3ZyRWZmKycgJytkYXRhLmludlRlbXArJyAnK2RhdGEuZW52VGVtcCsnICcrZGF0YS5kYWlseUVuZXJneSsnICcrZGF0YS53ZWVrbHlFbmVyZ3krJyAnK2RhdGEubGFzdDdEYXlzRW5lcmd5KycgJytkYXRhLm1vbnRobHlFbmVyZ3krJyAnK2RhdGEueWVhcmx5RW5lcmd5KycgJytkYXRhLnRvdGFsRW5lcmd5KycgJytkYXRhLnBhcnRpYWxFbmVyZ3krJyBPSyc7XG5cbiAgICAgICAgICBsZXQgZ2V0ZHNwPWRhdGEuYnVsa1YrJyAnK2RhdGEuYnVsa01WKycgMC4wMDAwMDAgMC4wMDAwMDAgJytkYXRhLmJ1bGtEQysnIDAuMDAwMDAwIDAuMDAwMDAwICcrZGF0YS5pc29SZXMrJyAnK2RhdGEuZ3JpZFZEQysnICcrZGF0YS5ncmlkQXZnVisnIDAuMDAwMDAwICcrZGF0YS5ncmlkRENIeisnICcrZGF0YS5wZWFrTWF4KycgJytkYXRhLnBlYWtEYXkrJyAwLjAwMDAwMCAwLjAwMDAwMCAwLjAwMDAwMCAwLjAwMDAwMCAwLjAwMDAwMCAwLjAwMDAwMCAwLjAwMDAwMCAwLjAwMDAwMCAwLjAwMDAwMCAwLjAwMDAwMCAwLjAwMDAwMCAnK2RhdGEucGluMVcrJyAnK2RhdGEucGluMlcrJyAwLjAwMDAwMCAwLjAwMDAwMCAwLjAwMDAwMCAwLjAwMDAwMCBPSyc7XG5cblxuXG5cblxuICAgICAgICAgIC8vIHJlczA9JChjdXJsIC0tZGF0YSBcImFjdGl2ZT10cnVlJmJvb3RpZD0kYm9vdGlkJnVpZD0kaW52dWlkXCIgJHBvc3RzZXJ2ZXIpXG4gICAgICAgICAgbGV0IGJvb3RqID0ge2FjdGl2ZTpcInRydWVcIixib290aWQ6ZGF0YS5ib290SWQsdWlkOmRhdGEudWlkfTtcbiAgICAgICAgICAvLyBsZXQgYm9vdHMgPSAnYWN0aXZlPXRydWUmYm9vdGlkPScrZGF0YS5ib290X2lkKycmdWlkPScrZGF0YS51aWQ7XG5cbiAgICAgICAgICAvLyByZXMxPSQoY3VybCAtLWRhdGEgXCJkYXRhc2V0PSRkYXRhc2V0JmRhdGF2ZXJzaW9uPSRkYXRhdmVyc2lvbiZkYXRhPSRnZXRwb3dlciZ1aWQ9JGludnVpZFwiICRwb3N0c2VydmVyKVxuICAgICAgICAgIGxldCBmaXJzdGogPSB7ZGF0YXNldDonYXVyb3JhJyxkYXRhdmVyc2lvbjonMC4xJyxkYXRhOmdldHBvd2VyLHVpZDpkYXRhLnVpZH07XG4gICAgICAgICAgLy8gbGV0IGZpcnN0cyA9ICdkYXRhc2V0PWF1cm9yYSZkYXRhdmVyc2lvbj0wLjEmZGF0YT0nK2dldHBvd2VyKycmdWlkPScrZGF0YS51aWQ7XG5cblxuICAgICAgICAgIC8vIHJlczI9JChjdXJsIC0tZGF0YSBcImRhdGFzZXQ9JGRhdGFzZXQmZGF0YXZlcnNpb249JGRhdGF2ZXJzaW9uJmRhdGE9JGdldGRzcCZ1aWQ9JGludnVpZCZvcHRpb25zPURTUFwiICRwb3N0c2VydmVyKVxuICAgICAgICAgIGxldCBzZWNvbmRqID0ge2RhdGFzZXQ6J2F1cm9yYScsZGF0YXZlcnNpb246JzAuMScsZGF0YTpnZXRkc3Asb3B0aW9uczonRFNQJyx1aWQ6ZGF0YS51aWR9O1xuICAgICAgICAgIC8vIGxldCBzZWNvbmRzID0gJ2RhdGFzZXQ9YXVyb3JhJmRhdGF2ZXJzaW9uPTAuMSZkYXRhPScrZ2V0ZHNwKycmdWlkPScrZGF0YS51aWQrJyZvcHRpb25zPURTUCc7XG5cblxuXG5cblxuXG4gICAgICAgICAgcnAucG9zdCh1cmxpbmdlY29sZCxib290aikudGhlbihmdW5jdGlvbigpe1xuICAgICAgICAgICAgcnAucG9zdCh1cmxpbmdlY29sZCxmaXJzdGopLnRoZW4oZnVuY3Rpb24oKXtcblxuICAgICAgICAgICAgICBycC5wb3N0KHVybGluZ2Vjb2xkLHNlY29uZGopXG5cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyKXtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnZXJyb3InKVxuXG4gICAgICAgICAgfSlcblxuICAgICAgICB9IGVsc2V7XG4gICAgICAgICAgbGV0IGJvb3RqID0ge2FjdGl2ZTpcImZhbHNlXCIsYm9vdGlkOmRhdGEuYm9vdElkLHVpZDpkYXRhLnVpZH07XG5cbiAgICAgICAgICBycC5wb3N0KHVybGluZ2Vjb2xkLGJvb3RqKS50aGVuKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICByZXNvbHZlKHtkYXRhOnRydWUsc3VjY2Vzczp0cnVlfSk7XG5cbiAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnIpe1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ2Vycm9yJyk7XG5cbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGVycilcbiAgICAgICAgICB9KVxuXG4gICAgICAgIH1cblxuICAgICAgfSlcblxuICAgIH0gZWxzZXtcbiAgICAgIHJlamVjdCh7ZXJyb3I6J25vIGRhdGEnfSk7XG5cblxuICAgIH1cbiAgfSlcbn1cbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==