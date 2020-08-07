export default async (req, res) => {
  res.writeHead(301, { Location: 'https://www.taskforse.it/oas/' })
  res.end()
}
