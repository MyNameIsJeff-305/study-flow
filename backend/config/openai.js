const openaiConfig = {
    apiKey: process.env.OPEN_API_KEY
};

const { Configuration, default: OpenAI } = require('openai');

const openai = new OpenAI(openaiConfig)

module.exports = openai;