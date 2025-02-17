const generateContent = require("../serivces/ai.service");



module.exports.getResponse = async (req, res) => {
    const prompt = req.body.prompt;
    if (!prompt) {
        res.status(400).send({ message: "Prompt is required" });
    }

    const response = await generateContent(prompt);
    res.send(response)
}