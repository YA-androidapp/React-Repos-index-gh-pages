const express = require("express");
const router = express.Router();

// POST data
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
// POST data

const app = express()
router.use((req, res, next) => {
  Object.setPrototypeOf(req, app.request)
  Object.setPrototypeOf(res, app.response)
  req.res = res
  res.req = req
  next()
})

router.get("/", (req, res) => {
  res.status(200).json({
    message: "Server runs"
  });
});

router.get("/site/:id", (req, res) => {
  console.log("id(get):", req.params.id)
  res.status(200).json({
    message: "Success",
    id: `${req.params.id}`
  });
});

router.post("/site", jsonParser, (req, res, nuxt) => {
  console.log("id(post):", req.body.id)
  res.status(200).json({
    message: "Success",
    id: `${req.body.id}`
  });
});

module.exports = {
  path: '/api',
  handler: router
}
