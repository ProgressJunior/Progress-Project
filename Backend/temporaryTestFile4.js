for(let i = 1; i < path.length-1; i++){
    console.log("\n================================================================\n\n");
    console.log("Station: " + path[i])
    console.log("Itteration: " + i + "  EndTime beginning " + currentEndTime.toISOString())
    
    currentStartTime = moment(currentEndTime)

    let duration = 0;
    path[i].startsWith("Q") ? duration = 2 : duration = 1;
    console.log("Duration " + duration)

    currentEndTime = moment(currentStartTime).add(duration, 'minutes').toDate();
    console.log("EndTime afer duartion: " + currentEndTime.toISOString())


    let nextFreeTs = await sql.query`select Max(Timestamp) from dbo.LocPalHistory where LocationName like ${path[i+1]} and PalNo = 0`
    nextFreeTs = nextFreeTs.recordset[0][""]

    console.log("Next free timestamp: ")
    console.log(nextFreeTs)

    if (moment(currentEndTime).isBefore((nextFreeTs))){
      console.log("Palette has to wait");
      console.log("Next free timestamp inside IF: " + nextFreeTs.toISOString())

      currentEndTime = nextFreeTs
    }
    console.log("Final Endtime: " + currentEndTime.toISOString())
    console.log("\n\n\n\n\n");
    // console.log(path[i] + " geht von " + currentStartTime.toISOString() + " bis " + currentEndTime.toISOString());
    await genQuery(path[i], 3, moment(currentStartTime.toISOString()), moment(currentEndTime.toISOString()))
  }

  console.log(queries);