const express = require('express')
const app = express()
const PORT = 3001;

app.get('/hello',(req,res)=>{
    res.status(200),
    res.set('Content-Type','text/html')
    res.send("hello world")
})

app.listen(PORT,(error)=>{
    if(!error)
        console.log("express running on port "+ PORT)
    else
    console("server cant start:"+ error)
}) 

// const express = require('express')
// const PORT = 3001;
// const homeroute = require('./routes/home')
// const loginroute = require('./routes/login')
// const app = express()

// app.use('/',loginroute)
// app.use('/',homeroute)

// app.listen(PORT,(error)=>{
//     if(error)
//         console.log("server error"+ error)
//     else
//     console.log('server running on port'+ PORT) 
// })



// const express = require('express');
// const axios = require('axios');
// const cors = require('cors');
// const { google } = require('googleapis');
// const app = express();
// const PORT = 3001;

// const API_KEY = ""; // Replace with your YouTube API key
// const MAX_CHANNELS = 10;
// const CATEGORIES = ["Blogs", "People"];
// const REGIONS = ["US", "UK"];

// // Google Sheets setup
// const SPREADSHEET_ID = ''; // Replace with your Google Spreadsheet ID
// const SHEET_NAME = 'Sheet1'; // Replace with your sheet name
// const credentials = require('./veoo.json'); // Replace with the path to your credentials file

// const auth = new google.auth.GoogleAuth({
//     credentials,
//     scopes: ['https://www.googleapis.com/auth/spreadsheets']
// });
// const sheets = google.sheets({ version: 'v4', auth });

// app.use(cors());

// app.get('/channels', async (req, res) => {
//     try {
//         let channelsData = [];
//         let channelsFetched = 0;

//         for (let category of CATEGORIES) {
//             for (let region of REGIONS) {
//                 let nextPageToken = '';
//                 while (channelsFetched < MAX_CHANNELS) {
//                     const response = await fetchChannels(API_KEY, category, region, nextPageToken);
//                     const { items, nextPageToken: newNextPageToken } = response.data;

//                     channelsFetched += items.length;
//                     const channelIds = items.map(item => item.id.channelId).join(",");
//                     if (channelIds) {
//                         const channelDetails = await getChannelDetails(API_KEY, channelIds);
//                         channelsData.push(...channelDetails);
//                     }

//                     if (!newNextPageToken || channelsFetched >= MAX_CHANNELS) break;
//                     nextPageToken = newNextPageToken;
//                 }
//             }
//         }

//         channelsData = channelsData.filter(item => 
//             item.statistics.videoCount >= 40 && 
//             item.statistics.subscriberCount >= 60000
//         ).slice(0, MAX_CHANNELS);

//         await writeToGoogleSheet(channelsData);
        
//         res.json(channelsData);
//     } catch (error) {
//         console.error('Error fetching channels:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });

// async function fetchChannels(key, search, region, pageToken = '') {
//     return axios.get('https://www.googleapis.com/youtube/v3/search', {
//         params: {
//             key: key,
//             type: 'channel',
//             part: 'snippet',
//             maxResults: 50,
//             q: search,
//             regionCode: region,
//             pageToken: pageToken
//         }
//     });
// }

// async function getChannelDetails(key, channelIds) {
//     const response = await axios.get('https://www.googleapis.com/youtube/v3/channels', {
//         params: {
//             key: key,
//             part: 'snippet,statistics',
//             id: channelIds
//         }
//     });
//     return response.data.items;
// }

// async function writeToGoogleSheet(data) {
//     const values = data.map(item => [
//         item.snippet.title,
//         item.snippet.description,
//         item.statistics.viewCount,
//         item.statistics.subscriberCount,
//         item.statistics.videoCount
//     ]);

//     const resource = {
//         values
//     };

//     await sheets.spreadsheets.values.append({
//         spreadsheetId: SPREADSHEET_ID,
//         range: `${SHEET_NAME}!A2`,
//         valueInputOption: 'RAW',
//         resource
//     });
// }

// app.listen(PORT, (error) => {
//     if (!error) {
//         console.log(`Express server running on port ${PORT}`);
//     } else {
//         console.error(`Server can't start: ${error}`);
//     }
// });
