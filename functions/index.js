const functions = require('firebase-functions');
const sendMail = require('./helpers/sendMail.js');
const { getSpreadsheetData } = require('./helpers/spreadsheet.js');

// Run once everyday at 6 am Indian Standard Time
exports.checkForEvents = functions.region('asia-south1').pubsub.schedule('0 6 * * *').timeZone('Asia/Kolkata').onRun(async context => {
  const { spreadsheet_uri, smtp_config } = functions.config().eventnotifier;
  const { err, data: eventData } = await getSpreadsheetData(spreadsheet_uri);

  if (err) return sendMail({ err, smtp_config });

  // current Date
  const currentDate = new Date();
  const day = currentDate.getUTCDate();
  const month = currentDate.getUTCMonth() + 1;

  // Check if there is any event today
  eventData.forEach(entry => {
    const [eventPerson, eventDay, eventMonth, eventType] = entry;
    if (Number(eventDay) === day && Number(eventMonth) === month) {
      sendMail({
        event: { message: `Wish ${eventPerson}, A Happy ${eventType} today i.e., on ${day}/${month}`, eventType },
        smtp_config: smtp_config
      });
    }
  });
});