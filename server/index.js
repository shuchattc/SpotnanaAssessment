import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI  from "openai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

//request to openai for response
app.post("/api/response", async(req,res) => {
    try{
        const {prompt} = req.body;
        if(!prompt){
            return res.status(400).json(({error: "Prompt is required."}));
        }

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini", //use gpt-4o-mini model
            messages: [{ role: "user", content: prompt }], // role user is enduser making prompt, prompt is text prompt
        });

        const text = completion.choices[0].message.content;

        res.json({ text });
        } catch (error) {
            console.error(error);
            console.error(error.message);
            console.error(error.stack);
            res.status(500).json({ error: error.message });
        }

});

// confirmation server is running
app.listen(process.env.PORT || 5000, () => {
    console.log("API KEY " + process.env.OPENAI_API_KEY);
    console.log(`Server running on ${"PORT"}`);
})