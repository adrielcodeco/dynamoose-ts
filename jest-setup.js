const dynamoose = require("dynamoose");

module.exports = async () => {
  dynamoose.AWS.config.update({
    region: "us-east-1"
  });
  dynamoose.local();
};
