const InputPrompt = require("../models/input-prompt")
const openai = require("../config/openai")

module.exports = {
    async sendText(req, resp) {
        const openaiAPI = openai.configuration()
        const inputModel = new InputPrompt(req.body)

        try {
            const response = await openaiAPI.createCompletion(
                openai.textCompletion(inputModel)
            )

            return resp.status(200).json({
                success : true,
                data: response.data.choices[0].text
            })
        } catch (error) {
            return resp.status(400).json({
                success : false,
                error: error.response ? error.response.data : "there was an issueon the server"
            })
        }
    }
}