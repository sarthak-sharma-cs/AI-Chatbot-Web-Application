// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// import { GoogleGenerativeAI } from "@google/generative-ai";

// dotenv.config();
// const app = express();

// app.use(cors());
// app.use(express.json());

// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// console.log("KEY:", process.env.GEMINI_API_KEY);

// app.get("/", (req, res) => {
//   res.send("Server is running");
// });

// // CHAT API (important)
// // app.post("/api/chat", (req, res) => {
// //   const userMessage = req.body.message;

// //   console.log("User:", userMessage);

// //   res.json({
// //     reply: "Hello from backend 👋",
// //   });
// // });


// app.post("/api/chat", async (req, res) => {
//   try {
//     const userMessage = req.body.message;

//     console.log("User:", userMessage);

//     const model = genAI.getGenerativeModel({ model: "gemini-pro" });

//     // const result = await model.generateContent(userMessage);
//     // const response = await result.response;
//     // const text = response.text();

// //       const result = await model.generateContent({
// //   contents: [
// //     {
// //       parts: [{ text: userMessage }],
// //     },
// //   ],
// // });


// const result = await model.generateContent(userMessage);
// const text = result.response.text();



//     res.json({
//       reply: text,
//     });

//   } catch (error) {
//     // console.error(error);
//     console.error("FULL ERROR:", error);
//     res.json({
//       // reply: "Error getting AI response",
//       reply: error.message,
//     });
//   }
// });

// app.listen(5000, () => {
//   console.log("Server running on port 5000");
// });




// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// async function listModels() {
//   const models = await genAI.listModels();
//   console.log(models);
// }

// listModels();








import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// ✅ Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// ✅ Test route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// ✅ Chat API
app.post("/api/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    console.log("User:", userMessage);

    if (!userMessage) {
      return res.json({ reply: "Please enter a message" });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-3-flash-preview",
    });

    const result = await model.generateContent({
      contents: [
        {
          parts: [{ text: userMessage }],
        },
      ],
    });

    const text = result.response.text();

    res.json({
      reply: text,
    });

  } catch (error) {
    console.error("FULL ERROR:", error);

    res.json({
      reply: error.message || "Something went wrong",
    });
  }
});

// ✅ Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});