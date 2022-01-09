const igdb = require('igdb-api-node').default
const twitchAuthenticator = require('../lib/twitch-authenticator')

const clientId = process.env.TWITCH_CLIENT_ID

searchGames = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ success: false, error: "Missing required request body" })
  }
  if (!req.body.q) {
    return res.status(400).json({ success: false, error: "Request body must provide a search query 'q'" })
  }

  try {
    const accessToken = await twitchAuthenticator.getAccessCode()

    const client = igdb(clientId, accessToken)

    const result = await client
      .limit(10)
      .fields(['id', 'name', 'first_release_date'])
      .search(req.body.q)
      .request('/games') // execute the query and return a response object

    res.status(200).json({ success: true, data: result.data })

  } catch(err) {
    console.error(err)
    res.status(500).json({ success: false, error: "Oops. Something went wrong!" })
  }
}

getGameById = async (req, res) => {
  try {
    const accessToken = await twitchAuthenticator.getAccessCode()

    const client = igdb(clientId, accessToken)

    const result = await client
      .fields(['name', 'summary', 'platforms.name', 'release_dates.human', 'screenshots.url'])
      .where(`id = ${req.params.id}`)
      .request('/games')

    console.log(result.data)
    if (!result.data || result.data.length == 0) {
      return res.status(404).json({ success: false, error: "Game not found for id" })
    }

    res.status(200).json({ success: true, data: result.data })

  } catch (err) {
    console.error(err)
    res.status(500).json({ success: false, error: "Oops. Something went wrong!" })
  }
}

module.exports = {
  searchGames,
  getGameById
}