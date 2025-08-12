const express = require("express");
const router = express.Router();
require("dotenv").config();
const {
  Send
} = require("../controller/user");


router.get("/", async (_req, res) => {
  res.render("index");
});
router.get("/about", async (_req, res) => {
  res.render("about");
});
router.get("/residential-service", async (_req, res) => {
  res.render("residential-service");
});
router.get("/book-us-now", async (_req, res) => {
  res.render("quote");
});
router.get("/end-of-tenancy-service", async (_req, res) => {
  res.render("end-of-tenancy-service");
});
router.get("/commercial-service", async (_req, res) => {
  res.render("commercial-service");
});

router.get("/portfolio", async (_req, res) => {
  res.render("portfolio");
});

router.get("/event-service", async (_req, res) => {
  res.render("event-service");
});
router.get("/gallery", async (_req, res) => {
  res.render("gallery");
});
router.get("/our-values", async (_req, res) => {
  res.render("values");
});
router.get("/our-mission", async (_req, res) => {
  res.render("mission");
});
router.get("/our-vision", async (_req, res) => {
  res.render("vision");
});
router.get("/contact", async (_req, res) => {
  res.render("contact");
});

router.post('/api/send', Send)


module.exports = router;
