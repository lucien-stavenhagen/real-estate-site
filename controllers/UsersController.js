const { User } = require("../models/UserModels");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const responseHelper = (msg, token, error) => {
  return {
    msg,
    token,
    error
  };
};
exports.add_user = (request, response, next) => {
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
      response.status(400).json({ msg: "problem hashing password", error });
    });
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
              { expiresIn: "1d" },
              (error, token) => {
                if (error) {
                  response
                    .status(403)
                    .json(
                      responseHelper(
                        "NONSECURE: error signing token",
                        null,
                        error
                      )
                    );
                } else {
                  response.json(
                    responseHelper("user authenticated ok", token, null)
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
            null
          )
        );
    });
};
