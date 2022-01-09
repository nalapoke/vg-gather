const axios = require('axios')

const twitchAuthUri = process.env.TWITCH_AUTH_URL
const clientId = process.env.TWITCH_CLIENT_ID
const clientSecret = process.env.TWTICH_CLIENT_SECRET

getAccessCode = async () => {
  try {
    let accessCode = process.env.TWITCH_ACCESS_CODE
    
    if (accessCode) {
      return accessCode
    }

    const uri = twitchAuthUri
      + `?grant_type=client_credentials`
      + `&client_id=${clientId}`
      + `&client_secret=${clientSecret}`
      
    const result = await axios.post(uri);

    if (!result.data) {
      console.error(`Failure authenticating with Twitch. No access_token received`)
    } else {
      process.env.TWITCH_ACCESS_CODE = result.data.access_token
    }

    return result.data.access_token

  } catch (err) {
    console.log(`Failure authenticating with Twitch: ${err}`)
  }
}

module.exports = {
  getAccessCode
}