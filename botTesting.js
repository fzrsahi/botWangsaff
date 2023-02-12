const botGpt = require("./botChatGpt");
botGpt(
  "misalkan variabel nomor berisi array.buatkan regex untuk mengambil semua nilai dalam array kecuali index ke 0"
)
  .then((result) => {
    console.log(result);
  })
  .catch((err) => {
    console.log(err.message);
  });
