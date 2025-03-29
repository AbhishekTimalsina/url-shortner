const URL = require("../models/URL");

exports.getHomePage = async function (req, res) {
  let urls = await URL.find({});
  //   console.log("this should hit");
  return res.render("home.ejs", {
    urls,
    message: req.flash("message")[0],
    newURL: req.flash("newURL")[0],
  });
};
