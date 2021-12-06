const jwt = require("jsonwebtoken");

const generateJWT = (uid = "") => {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "365d" },
      (err, token) => {
        if (err) {
          console.log(err);
          reject('Error generating JWT');
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = {
    generateJWT
};