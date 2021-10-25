import Cors from "cors";
import initMiddleware from "../../lib/init-middleware";
import { compareKey } from "../../lib/compareKey";
import { WRONG_KEY } from "../../utils/errorMessages";
import {getReaction} from "../../src/services/getReaction"

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ["GET"],
  })
);

export default async function handler(req, res) {
  try {
    // Run cors
    await cors(req, res);
    const { apiKey } = req.query;
    if (!compareKey(apiKey)) await Promise.reject(WRONG_KEY);
    const resultUsersData = await getReaction();

    // Rest of the API logic
    res.json(resultUsersData);
    // res.json(dataBase);
  } catch (error) {
    res.send({
      error,
    });
  }
}
