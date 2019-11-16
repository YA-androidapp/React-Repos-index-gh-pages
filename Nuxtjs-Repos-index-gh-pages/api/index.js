const express = require("express");
const router = express.Router();

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
  console.log("id:", req.params.id)
  res.status(200).json({
    message: "Success",
    id: `${req.params.id}`
  });
});

module.exports = {
  path: '/api',
  handler: router
}
