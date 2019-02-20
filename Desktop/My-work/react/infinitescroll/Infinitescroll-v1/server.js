global.fetch = require("node-fetch");
const config = require("universal-config");

// Unsplash API
const Unsplash = require("unsplash-js").default;
const toJson = require("unsplash-js").toJson;
const unsplash = new Unsplash({
  applicationId: config.get("APPLACATION_ID"),
  secret: config.get("SECRET_KEY"),
  callbackUrl: config.get("CALLBACK_URL")
});

// Express
const express = require("express");
const app = express();

// PORT
const PORT = process.env.PORT || 5000;

app.get("/api/photos", (req, res) => {
  unsplash.photos
    .listPhotos(req.query.start, req.query.count)
    .then(toJson)
    .then(json => res.json(json));
});

app.listen(PORT, () => {
  console.log(`Server Run in PORT ${PORT}`);
});
