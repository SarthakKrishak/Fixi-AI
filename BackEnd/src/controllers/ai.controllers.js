const generateContent = require("../serivces/ai.service");



module.exports.getReview = async (req, res) => {
    const code = req.body.code;
    if (!code) {
        res.status(400).send({ message: "Prompt is required" });
    }

    const response = await generateContent(code);
    res.send(response)
}