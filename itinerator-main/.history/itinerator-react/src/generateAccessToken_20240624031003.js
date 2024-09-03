// generateAccessToken.js
const { google } = require('google-auth-library');
const fs = require('fs');
const path = require('path');

async function getAccessToken() {
  // Load the service account key JSON file.
  const keyFilePath = path.join(__dirname, 'ItineratorIAMAdmin.json');
  const keyFile = fs.readFileSync(keyFilePath);
  const key = JSON.parse(keyFile);

  // Create a new JWT client using the service account key.
  const client = new google.auth.JWT({
    email: key.client_email,
    key: key.private_key,
    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
  });

  // Authorize the client and get the access token.
  const tokenResponse = await client.authorize();
  const accessToken = tokenResponse.access_token;
  console.log('Access Token:', accessToken);
  return accessToken;
}

getAccessToken().catch(console.error);