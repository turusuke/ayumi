import Cors from "cors";
import initMiddleware from "../../lib/init-middleware";
import { getDataBase } from "../../src/services/getDataBase";
import { compareKey } from "../../lib/compareKey";
import { MISSING_KEY, WRONG_KEY } from "../../utils/errorMessages";

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ["GET", "POST"],
  })
);

const actions = (method) => {
  return {
    GET: (async () => {
      return await getDataBase();
    })(),

    POST: {},
  }[method];
};

export default async function handler(req, res) {
  try {
    // Run cors
    await cors(req, res);
    const { apiKey } = req.query;
    if (!apiKey) await Promise.reject(MISSING_KEY);
    if (!compareKey(apiKey)) await Promise.reject(WRONG_KEY);
    const result = await actions(req.method);
    res.json(result);
  } catch (error) {
    res.send({
      error,
    });
  }
}
