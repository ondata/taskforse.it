import {
  API_VERSION
} from '../../config'

export default async (req, res) => {
  res.writeHead(302, { Location: `https://www.taskforse.it/api/${API_VERSION}` })
  res.end()
}
