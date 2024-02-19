const http = require('http');

let urlparams = {
  host: 'localhost',
  port: 3001,
  path: '/readouts',
  method: 'POST',
  headers: {
      'Content-Type': 'application/json'
  }
};

process.on("message", async (meterBlock) => {
  let meter = new Meter(
    meterBlock[0],
    meterBlock[1],
    new Date(meterBlock[2]),
    new Date(meterBlock[3])
  )
  await meter.run();
});

class Meter {
  constructor(meterId, valueType, startDate, endDate) {
    this.meterId = meterId;
    this.valueType = valueType;
    this.startDate = startDate;
    this.endDate = endDate;
  }

  sendRequest(datatosend) {
    function OnResponse(response) {
      var data = '';
      response.on('end', function() {
          console.log(data);
      });
    }
    let request = http.request(urlparams, OnResponse);
  
    request.end(datatosend);
    request.on('error', (e) => {
      console.error(`problem with request: server offline`);
    });
  };

  async sendMessage(readout, date) {
    const message = { meterId: this.meterId, readout, date };
    console.log(message);
    await this.sendRequest(JSON.stringify(message));
  }

  generateReadout(lastReadout) {
    return lastReadout + Math.random() * 10;;
  }

  async run() {
    const timer = ms => new Promise(res => setTimeout(res, ms))
    
    let lastReadout = Math.random() * 10;
    let currentDate = this.startDate;
  
    while (currentDate < this.endDate) {;
      await this.sendMessage(lastReadout, currentDate);

      lastReadout = await this.generateReadout(lastReadout)
      currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
      await timer(2000);
    };
  };
}