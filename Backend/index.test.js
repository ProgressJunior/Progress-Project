var moment = require("moment");
const index = require('./index.js');

// jest.mock('moment', () => {
//     return () => jest.requireActual('moment')('2020-01-01T00:00:00.000Z');
//   });


test('genQuery', async () => {
    let arr = []
    arr.push("INSERT INTO LocPalHistory (LocationName, PalNo, TimeStamp) VALUES ('TP 2', 3, '2022-03-27 11:00:00.000');");
    arr.push("INSERT INTO LocPalHistory (LocationName, PalNo, TimeStamp) VALUES ('TP 2', 0, '2022-03-27 11:02:00.000');");
    let date1 = moment("2022-03-27T09:00:00.000Z");
    let date2 = moment("2022-03-27T09:02:00.000Z");
    expect(await index.genQuery(new Array(), 'TP 2', 3, date1, date2)).toContain(arr);
});