require('dotenv').config();

const express = require('express');
const axios = require('axios');
const cors = require('cors');
const { google } = require('googleapis');
const app = express();
const PORT = process.env.PORT || 3002;

const API_KEY = process.env.YOUTUBE_API_KEY;
console.log('YouTube API Key:', API_KEY); // Log the API key

const MAX_CHANNELS = 500; // Update the max channels to 500
const CATEGORIES = ["Blogs", "People"];
const REGIONS = ["US", "UK"];

// Google Sheets setup
const SPREADSHEET_ID = process.env.SPREADSHEET_ID;
const SHEET_NAME = 'Sheet1'; // Replace with your sheet name

// let credentials;
// try {
//     credentials = require('./veocha.json'); // Replace with the path to your credentials file
   
// } catch (error) {
//     console.error('Error loading credentials:', error);
//     process.exit(1); // Exit the process if the credentials file cannot be loaded
// }

// const auth = new google.auth.GoogleAuth({
//     credentials,
//     scopes: ['https://www.googleapis.com/auth/spreadsheets']
// });
// const sheets = google.sheets({ version: 'v4', auth });

app.use(cors());

app.get('/channels', async (req, res) => {
    try {
        console.log('Request received for /channels endpoint');
        // console.log('Using YouTube API Key:', API_KEY); // Log the API key to ensure it is received

        let channelsData = [];
        let channelsFetched = 0;

        for (let category of CATEGORIES) {
            for (let region of REGIONS) {
                let nextPageToken = '';
                while (channelsFetched < MAX_CHANNELS) {
                    console.log(`Fetching channels for category: ${category}, region: ${region}, pageToken: ${nextPageToken}`);
                    const response = await fetchChannels(API_KEY, category, region, nextPageToken);
                    const { items, nextPageToken: newNextPageToken } = response.data;

                    channelsFetched += items.length;
                    const channelIds = items.map(item => item.id.channelId).join(",");
                    if (channelIds) {
                        const channelDetails = await getChannelDetails(API_KEY, channelIds);
                        channelsData.push(...channelDetails);
                    }

                    if (!newNextPageToken || channelsFetched >= MAX_CHANNELS) break;
                    nextPageToken = newNextPageToken;
                }
                if (channelsFetched >= MAX_CHANNELS) break;
            }
            if (channelsFetched >= MAX_CHANNELS) break;
        }

        channelsData = channelsData.filter(item => 
            item.statistics.videoCount >= 40 && 
            item.statistics.subscriberCount >= 60000
        ).slice(0, MAX_CHANNELS);

        res.json(channelsData);
    } catch (error) {
        console.error('Error fetching channels:', error);
        res.status(500).send('Internal Server Error');
    }
});

async function fetchChannels(key, search, region, pageToken = '') {
    console.log('Fetching channels with API Key:', key); // Log the API key here
    return axios.get('https://www.googleapis.com/youtube/v3/search', {
        params: {
            key: key,
            type: 'channel',
            part: 'snippet',
            maxResults: 50,
            q: search,
            regionCode: region,
            pageToken: pageToken
        }
    });
}

async function getChannelDetails(key, channelIds) {
    console.log('Fetching channel details with API Key:', key); // Log the API key here
    const response = await axios.get('https://www.googleapis.com/youtube/v3/channels', {
        params: {
            key: key,
            part: 'snippet,statistics',
            id: channelIds
        }
    });
    return response.data.items;
}

app.listen(PORT, (error) => {
    if (!error) {
        console.log(`Express server running on port ${PORT}`);
    } else {
        console.error(`Server can't start: ${error}`);
    }
});
