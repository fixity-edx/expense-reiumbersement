const Groq = require('groq-sdk');
const dotenv = require('dotenv');

dotenv.config();

const groq = new Groq({
    apiKey: process.env.GROK_API_KEY
});

const summarizeClaim = async (description, amount) => {
    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are an helpful assistant that summarizes expense claims briefly."
                },
                {
                    role: "user",
                    content: `Summarize this expense claim description: "${description}" with amount: ${amount}. Return a short 1-sentence summary.`
                }
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.5,
            max_tokens: 100,
            top_p: 1,
            stream: false,
            stop: null
        });

        return chatCompletion.choices[0]?.message?.content || "No summary available.";
    } catch (error) {
        console.error("Groq AI Error:", error);
        return "AI Summary unavailable due to error.";
    }
};

const nodemailer = require('nodemailer');

// Email Transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MAIL_USER, // Set these in .env
        pass: process.env.MAIL_PASS
    }
});

const sendEmail = async (to, subject, text) => {
    try {
        if (!process.env.MAIL_USER || !process.env.MAIL_PASS) {
            console.log("Email credentials missing. Skipping email.");
            return;
        }
        await transporter.sendMail({
            from: process.env.MAIL_USER,
            to,
            subject,
            text
        });
        console.log("Email sent to " + to);
    } catch (error) {
        console.error("Email error:", error);
    }
};

module.exports = { summarizeClaim, sendEmail };
