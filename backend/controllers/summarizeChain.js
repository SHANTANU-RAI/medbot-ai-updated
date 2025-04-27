const { ChatGroq } = require("@langchain/groq");
const { ChatPromptTemplate } = require("@langchain/core/prompts");
const { StringOutputParser } = require("@langchain/core/output_parsers");
const axios = require("axios");
const User = require("../models/User"); // Adjust the path as needed

/**
 * Summarize a medical chatbot conversation, analyze its sentiment, and store in database.
 *
 * @param {string} conversationHistory - The conversation text
 * @param {string} userEmail - User's email for tracking
 * @returns {Promise<string>} The summary
 */
async function createSummarizeChain(conversationHistory, userEmail) {
    try {
        const groq = new ChatGroq({
            apiKey: process.env.GROQ_API_KEY || "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",
            model: "deepseek-r1-distill-llama-70b",
            temperature: 0.3,
        });

        const summaryPrompt = ChatPromptTemplate.fromTemplate(`
            You are an expert medical conversation analyst. Your task is to create a comprehensive yet concise 
            summary of a medical chatbot conversation between a user and MedBot (an AI medical assistant).

            The summary should:
            1. Highlight the main medical topics discussed
            2. Note any symptoms or conditions mentioned
            3. Summarize advice or explanations provided by the bot
            4. Identify any follow-up actions recommended to the user
            5. Maintain medical accuracy while being concise

            Conversation History:
            ==================
            ${conversationHistory}
            ==================

            Please provide a professional medical conversation summary in 3-5 key points.
        `);

        const chain = summaryPrompt.pipe(groq).pipe(new StringOutputParser());

        console.log(`🔄 Executing summary chain for ${userEmail}...`);
        let summary = await chain.invoke({});

        if (typeof summary === "object") {
            summary = JSON.stringify(summary, null, 2);
        }

        console.log(`✅ Summary generated.`);

        // Default sentiment in case analysis fails
        let sentimentData = {
            predicted_label: "neutral",
            confidence: 0
        };

        // Analyze sentiment
        try {
            const response = await axios.post("http://localhost:8000/analyze", {
                text: summary
            });

            sentimentData = response.data;
            console.log(`🧠 Sentiment: ${sentimentData.predicted_label}`);
            console.log(`📊 Confidence: ${sentimentData.confidence}`);
        } catch (sentimentError) {
            console.warn("⚠️ Sentiment analysis failed:", sentimentError.message);
        }

        // Save to database
        try {
            // Find the user by email
            const user = await User.findOne({ email: userEmail });
            
            if (user) {
                // Add the summary and sentiment to the user's conversation history
                user.conversationHistory.push({
                    summary: summary,
                    sentiment: {
                        label: sentimentData.predicted_label,
                        confidence: sentimentData.confidence
                    }
                });
                
                // Save the updated user document
                await user.save();
                console.log(`💾 Summary and sentiment saved to database for ${userEmail}`);
            } else {
                console.warn(`⚠️ User with email ${userEmail} not found in database`);
            }
        } catch (dbError) {
            console.error("🔥 ERROR: Failed to save to database", dbError);
        }

        return summary;
    } catch (error) {
        console.error("🔥 ERROR: Failed to summarize conversation", error);
        return "Unable to generate conversation summary due to an error.";
    }
}

module.exports = { createSummarizeChain };


// const { ChatGroq } = require("@langchain/groq");
// const { ChatPromptTemplate } = require("@langchain/core/prompts");
// const { StringOutputParser } = require("@langchain/core/output_parsers");
// const axios = require("axios");

// /**
//  * Summarize a medical chatbot conversation and analyze its sentiment.
//  *
//  * @param {string} conversationHistory - The conversation text
//  * @param {string} userEmail - User's email for tracking
//  * @returns {Promise<string>} The summary only
//  */
// async function createSummarizeChain(conversationHistory, userEmail) {
//     try {
//         const groq = new ChatGroq({
//             apiKey: process.env.GROQ_API_KEY || "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",
//             model: "deepseek-r1-distill-llama-70b",
//             temperature: 0.3,
//         });

//         const summaryPrompt = ChatPromptTemplate.fromTemplate(`
//             You are an expert medical conversation analyst. Your task is to create a comprehensive yet concise 
//             summary of a medical chatbot conversation between a user and MedBot (an AI medical assistant).

//             The summary should:
//             1. Highlight the main medical topics discussed
//             2. Note any symptoms or conditions mentioned
//             3. Summarize advice or explanations provided by the bot
//             4. Identify any follow-up actions recommended to the user
//             5. Maintain medical accuracy while being concise

//             Conversation History:
//             ==================
//             ${conversationHistory}
//             ==================

//             Please provide a professional medical conversation summary in 3-5 key points.
//         `);

//         const chain = summaryPrompt.pipe(groq).pipe(new StringOutputParser());

//         console.log(`🔄 Executing summary chain for ${userEmail}...`);
//         let summary = await chain.invoke({});

//         if (typeof summary === "object") {
//             summary = JSON.stringify(summary, null, 2);
//         }

//         console.log(`✅ Summary generated.`);

//         // Just log the sentiment, don’t return it
//         try {
//             const response = await axios.post("http://localhost:8000/analyze", {
//                 text: summary
//             });

//             const sentimentResult = response.data;

//             console.log(`🧠 Sentiment: ${sentimentResult.predicted_label}`);
//             console.log(`📊 Confidence: ${sentimentResult.confidence}`);
//         } catch (sentimentError) {
//             console.warn("⚠️ Sentiment analysis failed:", sentimentError.message);
//         }

//         console.log(`${userEmail} STILL THERE`);

//         return summary;
//     } catch (error) {
//         console.error("🔥 ERROR: Failed to summarize conversation", error);
//         return "Unable to generate conversation summary due to an error.";
//     }
// }

// module.exports = { createSummarizeChain };
