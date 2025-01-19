# keap-client

> This library is currently under development.


This library is a wrapper for the [Keap/Infusionsoft REST API](https://developer.infusionsoft.com/docs/rest/). It provides a set of classes and interfaces to make it easier for you to interact with the API from your code.


## Installation
```
$ npm install keap-client
```

## Usage

```ts
import { KeapClient } from 'keap-client';

let apiKey = 'Your_api_key', //your api key from Keap/infusionsoft (REQUIRED)
  requestTimeout = 3000, // the time limit to wait for a response from the api (OPTIONAL)
  retries = 3; // amount of retries you want the api to do if the request failed (OPTIONAL)

//requestTimeout and retries are optional
const keap = new KeapClient({ apiKey, requestTimeout, retries }) 

// each model
const contact = await keap.Contact.getContact(1); 

// use the instance
contact.update({ email_opted_in: true });
contact.applyTags(['tag1', 'tag2']);
```

## Available models


- ✅  Account Info
- ⬜️ Affiliate
- ⬜️ Appointment
- ⬜️ Campaign
- ⬜️ Company
- ✅ Contact
- ✅ E-Commerce
- ✅ Email
- ⬜️ Email Address
- ✅ File
- ⬜️ Locale
- ⬜️ Merchant
- ⬜️ Note
- ✅ Opportunity
- ✅ Product
- ⬜️ REST Hooks
- ⬜️ Setting
- ⬜️ Tags
- ⬜️ Task
- ⬜️ User Info
- ✅ Users 

## Next Steps

- FEATURE Implement Tags Model.
- FEATURE Implement Task Model
- REFACTOR Add support for throwables and error handling.
