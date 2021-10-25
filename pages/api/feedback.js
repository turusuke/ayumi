import Cors from "cors";
import initMiddleware from "../../lib/init-middleware";
import { compareKey } from "../../lib/compareKey";
import { addFeedback } from "../../src/services/addFeedBack";
import { MISSING_KEY, WRONG_KEY } from "../../utils/errorMessages";

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ["POST"],
  })
);

export default async function handler(req, res) {
  try {
    // Run cors
    await cors(req, res);
    const { apiKey } = req.body;
    if (!apiKey) await Promise.reject(MISSING_KEY);
    if (!compareKey(apiKey)) await Promise.reject(WRONG_KEY);

    const { summary, member, reaction, url, content } = req.body;

    const result = await addFeedback({
      summary,
      member,
      reaction,
      url,
      content,
    });

    // Rest of the API logic
    res.json(result);
    // res.json(dataBase);
  } catch (error) {
    res.send({
      error,
    });
  }
}
