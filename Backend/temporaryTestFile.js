let minute = 0;
let date = new Date().toISOString().substring(0, 10) + " 10:";

function getEndDateForDuration(date, duration) {
    // Returns the end date (start date plus duration)
}

function getDate(duration, date) {
    let minStr = minute.toString();
    if (minStr.length == 1) minStr = "0" + minStr;
    let locDate = date + minStr + ":00.000";
    minute += duration;
    return locDate;
}

let path = [
    "TP 1",
    "TP 2",
    "QV 2",
    "TP 3",
    "TP 4",
    "QV 1",
    "TP 5",
    "TP 6",
    "QV 3",
    "TP 10",
    "QV 8",
    "TP 9",
    "TP 11",
    "QV 4",
    "TP 12",
    "TP 13",
    "TP 14",
    "QV 7",
    "TP 14.1",
    "TP 15",
    "QV 5",
    "TP 17",
    "QV 6",
    "TP 18",
    "TP 23",
    "TP 25",
];
// Loop start
let wishDate = new Date();
let idealPath = {};
let i = 0;
path.forEach((e) => {
    // e.startsWith("Q") ? idealPath.add(genQuery(e, 2, 2, wishDate)) : idealPath.add(genQuery(e, 2, 1, wishDate))

    if (e.startsWith("T")) {
        idealPath["palette 2"][stations].add(e);
        idealPath["palette 2"][date].add(getDate(1, wishDate));
    }

    // TP1      TP2         TP3
    // 0:0      0:1         0:3

    if (e.startsWith("Q")) {
        idealPath["palette 2"][stations].add(e);
        idealPath["palette 2"][date].add(getDate(5, wishDate));
    }

    idealPath.forEach((e) => {
        isStationOccupied();
    });
    i++;
});


// get Date

// somehow calculate when pallette will be at different positions

// pass Data calulate in previous step to function that checks if all positions are free

// if a given position is occupied

// Function where you pass a position and it retruns ausweichpositions

// get Path

// query path

// Loop end

function isStationOccupied(station, startDate, endDate) {
    // Query database for given station and
    // check between startDate and endDate
    // if there is an entry and its not the Pallette leaving
    // return false
    // This is the query to be used
    // SELECT LocationName, PalNo, TimeStamp FROM dbo.LocPalHistory
    // WHERE TimeStamp >= '2022-03-22 10:05:00' AND TimeStamp <= '2022-03-22 10:09:00'
    // ORDER BY TimeStamp asc;
}


let currentePaletteId = 2;
path.forEach((e)=>{
//   e.startsWith("Q") ? console.log(genQuery(e, currentePaletteId, 2, date)) : console.log(genQuery(e, currentePaletteId, 1, date))
  
  if(e.equals("TP 5")){
    queryDatabase("insert into dbo.PalDataMilestoneHistory (PalUnitAssigned) values (RemovedFromPalUnit)")
  }
  else if(e.equals("TP 6")){
    if(queryDatabase("select PalNo from dbo.PalDataBelHistory where PalNo = " + currentePaletteId) is empty){
      queryDatabase("insert into dbo.PalData (ProdSeqId) values ("+currentePaletteId+")")
      queryDatabase("insert into dbo.PalDataBelHistory (PalNo, TimeStamp) values ("+currentePaletteId+","+time+")")
      queryDatabase("insert into dbo.PalDataMilestoneHistory (PalUnitAssigned) values (ShutteringFinished)")
    }
  }
  else if(e.equals("TP 12")){
    queryDatabase("insert into dbo.PalDataMilestoneHistory (PalUnitAssigned) values (BarsPlaced)")
  }
  else if(e.equals("TP 13")){
    queryDatabase("insert into dbo.PalDataMilestoneHistory (PalUnitAssigned) values (GirdersPlaced)")
  }
  else if(e.equals("TP 23")){
    queryDatabase("insert into dbo.PalDataMilestoneHistory (PalUnitAssigned) values (ConcretingFinished)")
  }
  // LG bei Path einfuegen
  // Lagerplatz bestimmen
  else if(e.equals("LG 1")){
    queryDatabase("insert into dbo.PalDataMilestoneHistory (PalUnitAssigned) values (EnteredInDryingChamber)")
  }
  // Finished Variable bei Path einfuegen
  else if(e.equals("Vaffanculo")){
    queryDatabase("insert into dbo.PalDataMilestoneHistory (PalUnitAssigned) values (RemovedFromDryingChamber)")
  }
})