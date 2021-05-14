var express = require("express");
var router = express.Router();
var models = require("../models"); //<--- Add models
var authService = require("../services/auth"); //<--- Add authentication service
var Sequelize = require("sequelize");
const Op = Sequelize.Op;

//Get all posts
router.get("/", async function (req, res, next) {
  let myToken = req.headers.authorization;
  console.log(myToken);

  if (myToken) {
    let currentUser = await tokenService.verifyToken(myToken);
    console.log(currentUser);

    if (currentUser) {
      models.buySell
        .findAll({
          where: { UserId: user.UserId }
        })
        .then(result => res.render("buySell", { buySell: result }));
    }
    else {
      res.json({
        message: "Token was invalid or expired",
        status: 403,
      })
    }
  }
  else {
    res.json({
      message: "No token received",
      status: 403,
    })
  }
});

//Get one post
router.get("/:id", function (req, res, next) {
  let postId = parseInt(req.params.id);
  models.buySell.findOne({ where: { PostId: postId }, raw: true }).then(post => {
    res.send(JSON.stringify(post));  //res.send(JSON.stringify(user));
  });
});


//Create post
router.post("/newpost", function (req, res, next) {
  console.log(req.body);
  let token = req.headers.authorization;
  if (token) {
    authService.verifyUser(token).then(user => {
      if (user) {
        models.buySell
          .findOrCreate({
            where: {
              PostTitle: req.body.postTitle,
            },
            defaults: {
              UserId: user.UserId,
              PostBody: req.body.postBody
            }
          })
          .spread((result, created) => {
            if (created) {
              res.json({
                message: 'buySell created',
                status: 200,
                result

              });
            } else {
              res.json({
                message: 'buySell not created',
                status: 400,
                result
              });

            }


          });
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


//Delete post
router.delete("/:id", function (req, res, next) {
  let postId = parseInt(req.params.id);
  models.buySell
    .update(
      { Deleted: true },
      {
        where: { PostId: postId }
      }
    )
    .then(result => res.send("Deleted"));
});


//Update post by id
router.put("/:id",async function (req, res, next) {
  let myToken = req.headers.authorization;
  console.log(myToken);

  if (myToken) {
    let currentUser = await authService.verifyUser(myToken);
    console.log(currentUser);

    if (currentUser) {
      let postId = parseInt(req.params.id);
      console.log(req.body);
      console.log(postId);
      models.buySell
        .update(req.body, { where: { PostId: postId } })
        .then(result => res.send("Updated"));
    }
    else {
      res.json({
        message: "Token was invalid or expired",
        status: 403,
      })
    }
  }
  else {
    res.json({
      message: "No token received",
      status: 403,
    })
  }
});


//Search posts
router.get("/search/:search", function (req, res, next) {
  let item = parseInt(req.params.search);
  console.log(item);
  models.buySell
    .findAll({
      where: {
        [Op.or]: [
          { 'subject': { [Op.like]: '%' + item + '%' } },
          { '$Comment.body$': { [Op.like]: '%' + item + '%' } }
        ]
      },
      include: [{ model: Comment }]
    }

    )
    .then(result => {
      res.json({ result });
    })
});

module.exports = router;
