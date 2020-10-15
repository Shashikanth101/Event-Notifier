const { GoogleSpreadsheet } = require('google-spreadsheet');
const credentials = require('./client_secret.json');

const getSpreadsheetData = async (SPREADSHEET_URI) => {
  try {
    const doc = new GoogleSpreadsheet(SPREADSHEET_URI);
    await doc.useServiceAccountAuth(credentials);
    await doc.loadInfo();
    
    // Get the first sheet from the document
    const sheet = doc.sheetsByIndex[0];

    // Get and format row data
    const rows = await sheet.getRows();
    const data = rows.map(row => [...row._rawData]);
    return { data };
  } catch (err) {
    return { err };
  }
}

module.exports = { getSpreadsheetData };