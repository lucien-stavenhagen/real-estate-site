const { User } = require("../models/UserModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const responseHelper = (msg, username, emailaddress, token, error) => {
  return {
    msg,
    username,
    emailaddress,
    token,
    error
  };
};
exports.delete_user = (request, response, next) => {
  User.findByIdAndDelete(request.params.id)
    .then(doc => response.json(doc))
    .catch(error =>
      response
        .status(400)
        .json({ msg: `error deleting user ${request.params.id}` })
    );
};
exports.get_users = (request, response, next) => {
  User.find({}, { username: 1, emailaddress: 1 })
    .then(doc => response.json(doc))
    .catch(error =>
      response.status(400).json({ msg: "error retrieving users" })
    );
};
exports.add_user = async (request, response, next) => {
  let ifuser = await User.find(
    { username: request.body.username },
    { username: 1 }
  );
  if (ifuser.length > 0) {
    response.status(400).json({
      msg: `username ${request.body.username} already taken`,
      error: true
    });
  } else {
    bcrypt
      .hash(request.body.password, 10)
      .then(hash => {
        const newuser = {
          username: request.body.username,
          emailaddress: request.body.emailaddress,
          password: hash
        };
        const userres = new User(newuser)
          .save()
          .then(doc => {
            response.json({ msg: "successfully added new user", error: null });
          })
          .catch(error => {
            response
              .status(400)
              .json({ msg: "problem in mongoose adding new user", error });
          });
      })
      .catch(error => {
        response
          .status(400)
          .json({ msg: "problem hashing password", error: error.message });
      });
  }
};
exports.login_user = (request, response, next) => {
  const document = User.findOne({
    username: request.body.username,
    emailaddress: request.body.emailaddress
  })
    .exec()
    .then(doc => {
      bcrypt
        .compare(request.body.password, doc.password)
        .then(res => {
          if (res) {
            jwt.sign(
              {
                username: request.body.username,
                emailaddress: request.body.emailaddress,
                userid: doc._id
              },
              process.env.SECRET_KEY,
              { expiresIn: "7d" },
              (error, token) => {
                if (error) {
                  response
                    .status(403)
                    .json(
                      responseHelper(
                        "NONSECURE: error signing token",
                        null,
                        null,
                        null,
                        error
                      )
                    );
                } else {
                  response.json(
                    responseHelper(
                      "user authenticated ok",
                      request.body.username,
                      request.body.emailaddress,
                      token,
                      null
                    )
                  );
                }
              }
            );
          } else {
            response
              .status(403)
              .json(
                responseHelper(
                  "NONSECURE: password mismatch",
                  null,
                  null,
                  null,
                  "truthy val"
                )
              );
          }
        })
        .catch(error => {
          response
            .status(403)
            .json(
              responseHelper(
                "NONSECURE: problem with bcrypt compare",
                null,
                null,
                null,
                error
              )
            );
        });
    })
    .catch(error => {
      response
        .status(404)
        .json(
          responseHelper(
            "user not found in DB, they should sign up?",
            null,
            null,
            null,
            null
          )
        );
    });
};
