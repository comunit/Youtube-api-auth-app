// options
const CLIENT_ID = '651963850695-clhp42a8e8hn3ddrhkkmhe3l21i8s7u7.apps.googleusercontent.com';
const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"];
const SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';

const authorizeButton = document.getElementById('authorize-button');
const signoutButton = document.getElementById('signout-button');
const content = document.getElementById('content');
const channelForm = document.getElementById('channel-form');
const channelInput = document.getElementById('channel-input');
const videoContainer = document.getElementById('video-container');
const defaultChannel = 'Bodybuilding.com';

// load auth2 library
function handleClientLoad() {
  gapi.load('client:auth2', initClient);
}

// init api client library and setup sign in listeners
function initClient() {
  gapi.client.init({
    discovery_docs: DISCOVERY_DOCS,
    clientId: CLIENT_ID,
    scope: SCOPES
  }).then(() => {
    // listen for sign in state changes
    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
    // handle initial sign in state
    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
    authorizeButton.onclick = handleAuthClick;
    signoutButton.onclick = handleSignoutClick;
  });
}

// update UI sign in state changes
function updateSigninStatus(isSignedIn) {
  if (isSignedIn) {
    authorizeButton.style.display = 'none';
    signoutButton.style.display = 'block';
    content.style.display = 'block';
    videoContainer.style.display = 'block';
    getChannel(defaultChannel);
  } else {
    authorizeButton.style.display = 'block';
    signoutButton.style.display = 'none';
    content.style.display = 'none';
    videoContainer.style.display = 'none';
  }
}

// handle login 
function handleAuthClick() {
  gapi.auth2.getAuthInstance().signIn();
}

// handle logout
function handleSignoutClick() {
  gapi.auth2.getAuthInstance().signOut();
}

// get channel from api
function getChannel(channel) {
  gapi.client.youtube.channels
  .list({
    part: 'snippet,contentDetails,statistics',
    forUsername: channel
  })
   .then(response => {
     console.log(response);
   })
   .catch(err => alert('no channel by that name'));
}