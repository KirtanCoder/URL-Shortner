const crypto = require("crypto");
const URL = require("../models/url");

async function generateNewShortURL(req, res) {
  const body = req.body;
  if (!body.url) return res.status(400).json({ error: "url is required" });

  // Check if this user already shortened the same URL
  const existing = await URL.findOne({
    redirectedURL: body.url,
    createdBy: req.user._id,
  });

  if (existing) {
    const allUrls = await URL.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
    return res.render("home", {
      urls: allUrls,
      user: req.user,
      warning: "This link already exists!",
      existingId: existing.shortId,
    });
  }

  const shortId = crypto.randomBytes(4).toString("hex"); // 8 char hex id

  await URL.create({
    shortId: shortId,
    redirectedURL: body.url,
    visitHistory: [],
    createdBy: req.user._id,
  });

  return res.redirect("/");
}

async function handleGetAnalytics(req, res) {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });
  if (!result) return res.status(404).json({ error: "URL not found" });
  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
}

module.exports = {
  generateNewShortURL,
  handleGetAnalytics,
};