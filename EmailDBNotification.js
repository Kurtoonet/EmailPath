//APP WEB MODULE: .JSW
//email.jsw
import {sendWithService} from 'backend/sendGrid';

export function sendEmail(subject, body) {
  const key = "API KEY";
  const sender = "@gmail.com";
  const recipient = "@gmail.com";
  return sendWithService(key, sender, recipient, subject, body);
}

export function sendEmailWithRecipient(subject, body, recipient) {
  const key = "API KEY";
  const sender = "@gmail.com";
  return sendWithService(key, sender, recipient, subject, body);
}


//APP WEB MODULE: .JS
//sendGrid.js

import {fetch} from 'wix-fetch';

export function sendWithService(key, sender, recipient, subject, body) {
  const url = "https://api.sendgrid.com/api/mail.send.json";

  const headers = {
    "Authorization": "Bearer " + key,
    "Content-Type": "application/x-www-form-urlencoded"
  };

  const data = `from=${sender}&to=${recipient}&subject=${subject}&text=${body}`;

  const request = {
    "method": "post",
    "headers": headers,
    "body": data
  };

  return fetch(url, request)
   .then(response => response.json());
}



//PAGE CODE

import {sendEmail, sendEmailWithRecipient} from 'backend/email';

$w.onReady(function () {
  $w("#formBookStripper").onAfterSave(sendFormData);
});

function sendFormData() {
  const subject = `Submission successful for ${$w("#fullname").value}`;
  const body = `Party: ${$w("#partytype").value}
  \rName: ${$w("#fullname").value}
  \rEmail: ${$w("#email").value}
  \rPhone: ${$w("#phone").value}
  \rLocation: ${$w("#eventlocation").value}
  \rDate: ${$w("#eventdate").value}
  \rNationality: ${$w("#customercountry").value}
  \rPeople: ${$w("#people").value}`;
  const recipient = $w("#email").value;

  sendEmailWithRecipient(subject, body, recipient)
    .then(response => console.log(response));

  sendEmail(subject, body)
    .then(response => console.log(response));
}
