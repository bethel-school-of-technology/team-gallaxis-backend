var express = require("express");
var router = express.Router();
var models = require("../models"); //<--- Add models
var authService = require("../services/auth"); //<--- Add authentication service

router.get("/", function(req, res, next) {
  let token = req.cookies.jwt;
  if (token) {
    authService.verifyUser(token).then(user => {
      if (user) {
        models.buySell
          .findAll({
            where: { UserId: user.UserId }
          })
          .then(result => res.render("buySell", { buySell: result }));
        //console.log(user.buySell);
        //res.render("buySell", { buySell: user.buySell });
        //res.send(JSON.stringify(user));
      } else {
        res.status(401);
        res.send("Invalid authentication token");
      }
    });
  } else {
    res.status(401);
    res.send("Must be logged in");
  }
});

router.get("/:id", function(req, res, next) {
  let postId = parseInt(req.params.id);
  models.buySell.findOne({ where: { PostId: postId }, raw: true }).then(post => {
    console.log(post);
    res.send(JSON.stringify(post));  //res.send(JSON.stringify(user));
  });
});

router.post("/", function(req, res, next) {
  let token = req.cookies.jwt;
  if (token) {
    authService.verifyUser(token).then(user => {
      if (user) {
        models.buySell
          .findOrCreate({
            where: {
              PostTitle: req.body.postTitle,
            },
            defaults:{
              UserId: user.UserId,
              PostBody: req.body.postBody
            }
          })
          .spread((result, created) => {
            if(created){
              res.json({
                message: 'buySell created',
                status: 200,
                result

              });
            } else{
              res.json({
                message: 'buySell not created',
                status: 400,
                result
              });

            }

  
          });//res.send
      } else {
        res.status(401);
        res.send("Invalid authentication token");
      }
    });
  } else {
    res.status(401);
    res.send("Must be logged in");
  }
});

router.delete("/:id", function(req, res, next) {
  let postId = parseInt(req.params.id);
  models.buySell
    .update(
      { Deleted: true },
      {
        where: { PostId: postId }
      }
    )
    .then(result => res.redirect("/"));
});

router.put("/:id", function(req, res, next) {
  let postId = parseInt(req.params.id);
  console.log(req.body);
  console.log(postId);
  models.buySell
    .update(req.body, { where: { PostId: postId } })
    .then(result => res.redirect("/"));
});

module.exports = router;
