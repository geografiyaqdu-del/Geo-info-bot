import TelegramBot from "node-telegram-bot-api";
import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// 🧠 Oddiy chat funksiyasi
bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text?.trim();

  if (!text) return;

  if (text === "/start") {
    return bot.sendMessage(
      chatId,
      "Assalomu alaykum! 🤖\nMen Geo Info botman.\nSiz menga savol yozing, men ChatGPT orqali javob beraman!"
    );
  }

  try {
    const response = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: text }],
    });

    const answer = response.choices[0].message.content;
    await bot.sendMessage(chatId, answer);
  } catch (err) {
    console.error("Xatolik:", err);
    await bot.sendMessage(chatId, "⚠️ Xatolik yuz berdi, keyinroq urinib ko‘ring.");
  }
});