import Cors from 'cors'
import initMiddleware from '../../lib/init-middleware'
import { getUsers } from '../../src/services/getUsers'

// Initialize the cors middleware
const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['GET'],
  })
)

export default async function handler(req, res) {
  // Run cors
  await cors(req, res)

  const resultUsersData = await getUsers();

  // Rest of the API logic
  res.json(resultUsersData);
  // res.json(dataBase);
}
