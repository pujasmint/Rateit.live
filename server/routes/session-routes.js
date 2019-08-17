const express = require("express");
const router = express.Router();
const Session = require("../models/session-model");
const fs = require("fs");
var randomstring = require("randomstring");

router.post("/create", function(req, res, next) {
  if (req.isAuthenticated()) {
    let newSession = {
      name: req.body.name,
      invitekey: randomstring.generate({
        length: 5,
        readable: true,
        charset: "alphanumeric",
        capitalization: "uppercase"
      }),
      status: "NOTSTARTED",
      creator: req.user._id
    };
    Session.create(newSession)
      .then(session => {
        res.status(200).json(session);
      })
      .catch(() => {
        res.send("error");
      });
  } else {
    res.status(403).json({ message: "Unauthorized" });
  }
});

router.post("/update", function(req, res, next) {
  if (req.isAuthenticated()) {
    Session.findOne({ _id: req.body.id }).then(session => {
      if (session.creator.toString() === req.user._id.toString()) {
        Session.findOneAndUpdate(
          { _id: req.body.id },
          { status: req.body.status },
          { upsert: true, new: true },
          function(err, session) {
            if (err) return res.send(500, { error: err });
            return res.status(200).json(session);
          }
        );
      } else {
        res.status(403).json({ message: "Unauthorized" });
      }
    });
  } else {
    res.status(403).json({ message: "Unauthorized" });
  }
});

module.exports = router;
