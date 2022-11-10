# Software Requirements

## Vision

1. What is the vision of this product?

    To create an intersection of visual arts and music. 

2. What pain point does this project solve?

    Creates a new avenue for targeted song recommendation.

3. Why should we care about your product?

    You should care because new methods of content curation will lead to fresher recommendations and thus increased engagement.

## Scope (In/Out)

**IN** (What will it do?)

- The web app will provide images for the user to choose from.
- Based on image selection, the web app will render a track that will have the image's descriptive properties match some part of the track title.
- Possibly allow users to discover new music based on simple images.

**OUT** (What will it not do?) –

- Become a mobile app.
- Create new music.
- Save previously seen images to local storage or cache.

## Minimum Viable Product vs Stretch Goals

1. What will your MVP functionality be?

    The MVP functionality of this application is to take a description of an image from the Unsplash API and using any/all of the words in the description to get a random song on Spotify.

2. What are your stretch goals?

    - Integrate a Computer Vision API such as Google Cloud Vision API to take in any random image provided, generate labels and/or description to open up the possible images a user could use.

    - Instead of generating a single song, generate a whole playlist.

3. What stretch goals are you going to aim for?

    - Integrate the Computer Vision API to expand possible images used.

## Functional Requirements

- A user can select an image from Unsplash and get a song
- A user can login and save the song they got
- A user can access all of the songs that they had generated

## Data Flow

1. Web app displays random images from Unsplash API.
2. Front-end(user) makes an image selection, that selection is sent to our local server.
3. Local server processes the GET request and communicates with Spotify API using schema defined.
4. Spotify API will respond with data matching request.
5. Local server will send the requested data to the front end to store in state.  
6. Front end will use a function to randomly choose a song to display.
7. Front end will display the received data to the user.

## Non-Functional Requirements

- Protects user’s Spotify account data. Implements Auth0 in such a way so that relevant data is displayed to the user and other user data is not.

- Interface is clear and the user is able to interact with it intuitively and effectively.

## Database Schema

DataModel:

- **imageURL**: String -- used to retrieve the image again
- **selectedSong**: String -- used to save what song was chosen for the image
- **emailAddress**: String -- used to associate data point with user
- **playlist** (optional): Array (of String) -- used to save playlist of associated songs
