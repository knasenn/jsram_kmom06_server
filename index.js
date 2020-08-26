const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)

const fetch = require("node-fetch");


// const sqlite3 = require('sqlite3').verbose();
// const DbMethods = require('./models/Databaze');
//
// //DB connect
// let db = new sqlite3.Database('./db/texts.sqlite', (err) => {
//   if (err) {
//     console.error(err.message);
// } else {
//     console.log("connected to DB");
// }
// });

//added time
io.on('connection', socket => {
  // let userWords = await VoiceMethods.getUserWords(userBackupId);
  socket.on('message', ({ name, message, time }) => {
    // DbMethods.addToChat(name, message,time);
    let kombined = name + "(" + time + "): " + message;
    const dataz = {
        chatm: kombined
    }
    postData('http://me-api.thisisabad.site/savechat', dataz)
    io.emit('message', { name, message, time  })
  })
})

const dataz = {
    name: "namez",
    message: "messagez",
    time: "timez"
}
// Example POST method implementation:
async function postData(url, data) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}








http.listen(8333, function() {
  console.log('listening on port 8333')
})
