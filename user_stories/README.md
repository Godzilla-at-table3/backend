# User Stories

In project management board form: https://github.com/orgs/Godzilla-at-table3/projects/1

1. **Music Discovery** – As a user, I want to be able to discover new music inspired by images.

    a. **Feature Tasks**

    - Users will have multiple images to choose from
    - Based on user selection, a track will be rendered
    - Track information will be displayed

    b. **Acceptance Tests**
    - Users will have the ability to choose an image and receive a track corresponding to the image description/qualities
    - Track information will be displayed after clicking

2. **Song info** – As a user, I want to be able to see the title and artist of that song so that I can obtain artist information.

    a. **Feature Tasks**

    - Track will display info: artist, track name, album.

    b. **Acceptance Tests**
    - Successfully retrieve data from Spotify API and display appropriate information in component

3. **Saved Recommendations** – As a user, I want to be able to save my recommendations and return them later.

    a. **Feature Tasks**

    - Users can log in with Auth0
    - Users can opt to choose what they want to save
    - Users can go back and see what tracks they discovered (and possibly the image associated)

    b. **Acceptance Tests**

    - Ensure that users can successfully login/logout
    - Ensure that users can successfully retrieve the tracks they've discovered

4. **User Interface** – As a user, I want to interact with an easy-to-read interface.

    a. **Feature Tasks**

    - Bootstrap components will be implemented
    - Fonts and sizes will be readable
    - Instructions explaining functionality will be displayed somewhere on page

    b. **Acceptance Tasks**

    - Bootstrap components will be displayed using flex
    - Font sizes will be readable and contrast with the background color/image
    - Instructions will be displayed on the main page

5. **Image Choice** – As a user I want to be able to have random multiple image options to choose from.

    a. **Feature Tasks**

    - Random images will be displayed
    - Selection renders track based on image

    b. **Acceptance Tests**

    - Track is relatively related to the image
    - The image does not always give us the same track
