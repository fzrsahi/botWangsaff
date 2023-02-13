require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
async function example(textWhatsapp) {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: textWhatsapp,
    max_tokens: 100,
    temperature: 0,
  });
  return response.data.choices[0].text;
}

module.exports = example;
