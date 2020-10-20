# Event-Notifier
A Firebase cloud function to notify about events through email

## Description
A Cron Job that runs once every day at 12am. It reads a shared Google Spreadsheet for any events on that particular date. If there is one, it sends an email to the receiver with details about that event.

## Pre requisites
- Make sure to have an email account which supports nodemailer. [(Check Article)](https://nodemailer.com/smtp/well-known/)
- Make sure you have node.js and npm already installed and clone this repository
- Save all event data in a google spreadsheet in the format [ Name | Day | Month | Event_Type ]. Example: [ Mom | 24 | 8 | Birthday ]
- Make sure you have firebase-cli installed. If not, enter the below command in your terminal to install it globally
```bash
npm install firebase-tools -g
```

## Installation and Usage
- Create a new project on Firebase, download the credntials and rename it to client_secret.json
- Move this file inside functions directory of the project
- Enable Google sheets API on GCP console under your project
- Add the 'client_email' from the downloaded credentials to your google spreadsheet
- Change your directory to 'functions' and enter the below command to install dependencies
```bash
npm install
```
Save all your credentials on firebase config environment. [(Check Article)](https://firebase.google.com/docs/functions/config-env)
```js
{
  "eventnotifier": {
    "smtp_config": {
      "smtp_port": "<your_smtp_port>",
      "smtp_host": "<your_smtp_host>",
      "email_id": "<your_email_id>",
      "email_password": "<email_password>",
      "smtp_service": "<your_smtp_service_provider>",
      "receiver_email_id": "<receiver_email_id>"
    },
    "spreadsheet_uri": "<your_spreadsheet_uri>"
  }
}
```
Enter the below command to deploy the function
```bash
firebase deploy --only functions
```