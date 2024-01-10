
# Voosh Portal

It is a simple web app with a login/registration page along with a homepage with two options for seeing all the previous orders and submitting a new order.

All the pages have the added benefit of JWT authentication and authorisation.

You can experience this site [here](https://voosh-portal.aayush65.com).

## JWT Authentication and Authorisation

As soon as a person successfully logs in, he is provided with two tokens from the server i.e. `AccessToken` and `RefreshToken`.

The Expiry of both the tokens are 10 mins and 1 day respectively.

The server will reply positively to `url/get-order` or `url/add-order` only if the request is sent with valid and not expired tokens.

Even after shutting down the application or the device, this website is persistent and maintains its logged-in state for the duration of the refreshToken life i.e. 1 day. And if the user again comes back to the site within this timeframe, the tokens get renewed.


## Features

Some of the key feature includes:

## Tech Stack (Frontend)

- ReactJS
- TypeScript
- Tailwind
- JWT

# Tech Stack (Backend)

 - NodeJS
 - Express
 - TypeScript
 - JWT
 - MongoDB

## Environment Variables (Server)

To run the server, you will need to add the following environment variables to your .env file in the server folder

**MongoDB Atlas**:

`PORT`
`MONGO_URL`
`SECRET_KEY`

## Deployment

First, clone this repo on your local machine
```bash
  git clone https://github.com/Aayush65/voosh-portal
  cd voosh-portal
```

To deploy this project, we first have to deploy the server.
To deploy this server, run (after initialising the .env file)

```bash
  npm install
  npm run dev
``` 

After deploying the server, replace the following with the location of your hosted server. It can be found in `client > src > constants > index.ts > siteLoc`:

`[https://grievance-server.aayush65.com/ping](https://voosh-server-9mpk.onrender.com)` to  `http://localhost:5173/`

To deploy the website, run

```bash
  npm install
  npm run dev
```

Now you can `ctrl + click` on the highlighted url on your terminal by `vite` to visit the website.
