# SmartBrain - Face Recognition App

The front-end part of smart-brain, a web app that detects human faces in a image provided with the image url.

- Front-end web development using HTML, CSS, JavaSript, React, Tachyons, Particles.js.

<!-- 1. Clone this repo
2. Run `npm install`
3. Run `npm start`
4. You must add your own API key in the `src/App.js` file to connect to Clarifai.

You can grab Clarifai API key [here](https://www.clarifai.com/) -->

- The full version of the app is deployed on Heroku. You can open it [here](https://smart-brain-jasmine.herokuapp.com/).

- You can find the code for backend and server [here](https://github.com/jiaxuanc/smart-brain-api).

- Folder Structure

```
smart-brain
├── README.md
├── package.json
├── package-lock.json
├── public
│   ├── index.html
│   ├── favicon.ico
│   └── manifest.json
└── src
    ├── index.css
    ├── index.js
    ├── registerServiceWorker.js
    ├── containers
    │   ├── App.css
    │   ├── App.js
    │   ├── App.test.js
    │   └── ParticlesOptions.json
    └── components
        ├── Signin
        │   └── Signin.js
        ├── Register
        │   └── Register.js
        ├── Navigation
        │   └── Navigation.js
        ├── Logo
        │   ├── Logo.js
        │   ├── Logo.css
        │   └── idea.png
        ├── Rank
        │   └── Rank.js
        ├── ImageLinkForm
        │   ├── ImageLinkForm.js
        │   └── ImageLinkForm.css
        └── FaceRecognition
            ├── FaceRecognition.js
            └── FaceRecognition.css
```
