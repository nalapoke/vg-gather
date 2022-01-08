const igdb = require('igdb-api-node').default
const twitchAuthenticator = require('../lib/twitch-authenticator')

const clientId = process.env.TWITCH_CLIENT_ID

searchGames = async (req, res) => {
  if (!req.query.q) {
    return res.status(400).json({ success: false, error: "Missing required query parameter 'q'" })
  }

  try {
    const accessToken = await twitchAuthenticator.getAccessCode()

    const client = igdb(clientId, accessToken)

    const result = await client
      .limit(10)
      .fields(['id', 'name', 'first_release_date'])
      .search(req.query.q)
      .request('/games') // execute the query and return a response object

    res.status(200).json({ success: true, data: result.data })

  } catch(err) {
    console.error(err)
    res.status(500).json({ success: false, error: "Oops. Something went wrong!" })
  }
}

module.exports = {
  searchGames
}