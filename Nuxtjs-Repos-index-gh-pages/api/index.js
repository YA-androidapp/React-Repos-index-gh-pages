import axios from 'axios'

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

router.post("/site", jsonParser, async (req, res, nuxt) => {
  const URL_SS_API = 'https://www.googleapis.com/pagespeedonline/v2/runPagespeed?screenshot=true&strategy=desktop&url=';

  console.log('POST /site', 'req.body.url', req.body.url);
  // res.status(200).json({
  //   message: "Success",
  //   url: `${req.body.url}`
  // });

  const url = URL_SS_API + req.body.url;
  console.log('POST /site', 'url', url);

  const api_response = await axios.get(url);
  const json_data = api_response.data;
  // console.log('POST /site', 'json_data', json_data);
  const image_mimetype = json_data.screenshot.mime_type;
  console.log('POST /site', 'image_mimetype', image_mimetype);
  const image_base64 = json_data.screenshot.data;
  let image_urlsafe_base64 = image_base64.split('_').join('/');
  image_urlsafe_base64 = image_urlsafe_base64.split('-').join('+');
  console.log('POST /site', 'image_base64', image_base64);
  console.log('POST /site', 'image_urlsafe_base64', image_urlsafe_base64);

  res.status(200).json({
    message: "Success",
    url: url,
    image: image_urlsafe_base64,
    src: 'data:' + image_mimetype + ';base64,' + image_urlsafe_base64
  });
});

module.exports = {
  path: '/api',
  handler: router
}
