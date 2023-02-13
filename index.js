const qrcode = require("qrcode-terminal");
const clc = require("cli-color");
const { Client, LocalAuth } = require("whatsapp-web.js");
const botGpt = require("./botChatGpt");

const client = new Client();

client.on("qr", (qr) => {
  qrcode.generate(qr, { small: true });
});

client.on("ready", () => {
  console.log(clc.bgBlackBright.red("Ready..."));
});

client.on("message", async (message) => {
  const contact = await message.getContact();
  const name = clc.bgWhite.blackBright(contact.pushname);
  console.log(`${name} : ${message.body}`);
});

client.on("message", async (msg) => {
  const result = msg.body.split(" ");
  if (result[0] === "@bot") {
    const messageBody = msg.body.substring(5);
    botGpt(messageBody)
      .then((result) => {
        const resultFix = result.substring(2).trim();
        console.log(resultFix);
        msg.reply(resultFix);
      })
      .catch((err) => {
        msg.reply(`Bot Error!!! : ${err.message}`);
      });
  } else if (result[0] === "@sticker") {
    if (msg.hasMedia) {
      const stickerName = msg.body.substring(9);
      console.log(stickerName);
      const media = await msg.downloadMedia();
      msg.reply(media, msg.from, {
        sendMediaAsSticker: true,
        stickerName: stickerName,
        stickerAuthor: "pengodinghandal",
      });
    }
  } else if (result[0] === "@menu") {
    msg.reply(
      "list command :\n\n@bot : pertanyaan umum\n@sticker : membuat sticker\n"
    );
  }
});

client.initialize();
