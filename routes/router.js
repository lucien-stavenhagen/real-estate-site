const express = require("express");
const router = express.Router();

router.get("/all", (request, response) => {
  response.json({
    msg: "hello"
  });
});

module.exports = router;
