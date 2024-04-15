# Airbnb clone

![airbnb clone](airbnb-client/public/desc-main.png)

![airbnb clone](airbnb-client/public/desc.png)

**Demo Video:** [youtube.com](https://youtu.be/vzwhi890_mQ)

## Guide

1. Create _airbnb-server/.env_ file with following content:

   ```
   MONGO_URL=<Your_MongoDB_URL>
   PORT=8080
   JWT=<Your_Secret_Key>
   ORIGIN="http://localhost:5173"
   ```

2. Add your firebase config in _airbnb-client/src/firebase/firebase.jsx_

3. Install dependencies and run:

   Open Terminal

   ```
   cd airbnb-client
   npm install
   npm run dev
   ```

   Open new Terminal

   ```
   cd airbnb-server
   npm install
   npm run dev
   ```

4. Import fake data to your MongoDB Compass if needed

   _test.bookings.json_

   _test.places.json_

   _test.users.json_
