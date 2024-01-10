
# Voosh Portal

You can experience this site [here](voosh-portal.aayush65.com).

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

First clone this repo on your local machine
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
