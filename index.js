const qrcode = require("qrcode-terminal");
const clc = require("cli-color");
const { Client, LocalAuth } = require("whatsapp-web.js");
const botGpt = require("./botChatGpt");

const client = new Client({
  authStrategy: new LocalAuth(),
});

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

client.on("message", (msg) => {
  const result = msg.body.split(" ");
  if (result[0] === "@bot") {
    const messageBody = msg.body.replace("@bot", "");
    console.log(messageBody);
    botGpt(messageBody).then((result) => {
      msg.reply(result);
    });
    // msg.reply("bo orang ganteng yang bisa ba pake ini bot");
  }
});
// client.on("message", (message) => {
//   if (message.body === "!halo") {
//     console.log(`dari ${message.notifyName}`);
//     message.reply("halo jek");
//   } else if (message.body === "yoo") {
//     message.reply("halo juga");
//   } else if (message.body === "ajul") {
//     message.reply("joww");
//   }
// });

// client.on("message", (message) => {
//   if (message.body === "!ping") {
//     client.sendMessage(message.from, "pong");
//   }
// });

client.initialize();
