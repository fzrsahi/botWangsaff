const botGpt = require("./botChatGpt");
botGpt(
  "buatkan 5 vocabulary tentang tidur"
)
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err.message);
  });
