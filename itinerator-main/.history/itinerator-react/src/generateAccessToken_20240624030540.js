// generateAccessToken.js
const { google } = require('google-auth-library');
const fs = require('fs');
const path = require('path');

async function getAccessToken() {
  // Load the service account key JSON file.
  const keyFilePath = path.join(__dirname, 'ItineratorIAMAdmin.json');
  
  if (!fs.existsSync(keyFilePath)) {
    console.error('Key file does not exist:', keyFilePath);
    return;
  }

  const keyFile = fs.readFileSync(keyFilePath);
  let key;

  try {
    key = JSON.parse(keyFile);
  } catch (error) {
    console.error('Error parsing key file:', error);
    return;
  }

  // Check if the necessary properties exist
  if (!key.client_email || !key.private_key) {
    console.error('Invalid key file. Missing client_email or private_key.');
    return;
  }

  // Create a new JWT client using the service account key.
  const client = new google.auth.JWT({
    email: key.client_email,
    key: key.private_key,
    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
  });

  try {
    // Authorize the client and get the access token.
    const tokenResponse = await client.authorize();
    const accessToken = tokenResponse.access_token;
    console.log('Access Token:', accessToken);
    return accessToken;
  } catch (error) {
    console.error('Error getting access token:', error);
  }
}

getAccessToken().catch(console.error);