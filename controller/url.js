const URL = require("../models/URL");
const { generateRandomString } = require("../utils/util.js");

exports.postShortenURL = async function (req, res) {
  let { url } = req.body;
  let newURL = new URL({
    originalURL: url,
    shortURL: `${process.env.WEB_URI}/${generateRandomString()}`,
  });
  newURL = await newURL.save();

  req.flash("message", "New short url created.");
  req.flash("newURL", newURL);
  // req.flash("newURL", newURL.shortURL);

  res.redirect("/");
};

exports.getOriginalURL = async function (req, res) {
  let param = req.params;
  let url = await URL.findOneAndUpdate(
    { shortURL: `${process.env.WEB_URI}/${param.id}` },
    { $inc: { clicks: 1 } }
  );

  if (url?.length === 0 || !url) {
    res.send("URL doesn't exist");
    return;
  }
  res.redirect(url.originalURL);
};

exports.deleteOriginalURL = async function (req, res) {
  let param = req.params;
  await URL.findOneAndDelete({
    shortURL: `${process.env.WEB_URI}/${param.id}`,
  });

  res.redirect("/");
};
