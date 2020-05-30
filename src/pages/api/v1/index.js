export default async (req, res) => {
    res.writeHead(301, { Location: "/oas" })
    res.end()
}
