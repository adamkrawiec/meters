const { fork } = require("child_process")
const fs = require("fs");
const { parse } = require("csv-parse");

fs.createReadStream("./meters.csv")
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", (meterBlock) => {
    childProcess = fork("./meter.js");
    childProcess.send(meterBlock)
  })
  .on("end", () => console.log("finished"))
  .on("error", (error) => console.log(error.message))
