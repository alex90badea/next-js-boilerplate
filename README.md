# Next.js React.js Boilerplate

### Installation

- run `npm install`
- create `cert.pem` and `key.pem` in folder `/private` - or test the existing ones if they work for you.

The certificate files are necessary for running the server on https.
You need to navigate to /private folder and create the .pem files using the 
OpenSSL command below and fill in the information when asked.
<br>

`openssl req -newkey rsa:2048 -new -nodes -x509 -days 3650 -keyout key.pem -out cert.pem`

- in root folder run `npm run dev`
- the application should be running on `https://localhost:8000`

| Functionalities                   |Done |
| --------------------------------- |:---:|
| Login                             | yes |
| Register                          | yes |
| Forgot password                   | no  |
| Facebook Login                    | yes |
| Google Login                      | yes |
| Twitter Login                     | no  |
| Demo data from API page           | yes |
| Demo filters                      | yes |
| Demo protected page with auth HOC | yes |
| Demo form validation              | yes |
| Demo route page for item          | yes |
