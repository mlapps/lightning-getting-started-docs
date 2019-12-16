# Getting started

This `getting started with Lightning` will guide you through the first steps of building an app with Lightning.

This guide consist of 3 main topics: 
1. Setting up your environment
2. Develop your app
3. Run, test and deploy

We have chosen to guide you in creating a fully functioning game called `Tic Tac Toe`, for those unfamiliar with the
game i suggest checking out: https://en.wikipedia.org/wiki/Tic-tac-toe

---

### Setting up your environment

We will use the Lightning SDK to power the app, at the time of writing we're still working on the next version of our SDK
which can be found here: https://github.com/WebPlatformForEmbedded/Lightning-SDK/tree/next

First we create a new folder on our machine called: `TicTacToe`. First thing we start with is creating a `metadata.json` in the
root of our directory and fill it with the following contents:

```
{
  "name": "TicTacToe",
  "identifier": "com.company.app.TicTacToe",
  "version": "1.0.0"
}

```


Next we create is a `package.json` file

> this file holds various metadata relevant to the project. This file is used to give information to npm that allows it to identify the project as well as handle the project's dependencies. It can also contain other metadata such as a project description, the version of the project in a particular distribution, license information, even configuration data - all of which can be vital to both npm and to the end users of the package. The package.json file is normally located at the root directory

We add the following contents to the file:

```
{
  "name": "TicTacToe",
  "scripts": {
    "build": "npm explore wpe-lightning-sdk -- npm --baseDir=$(pwd) run build",
    "start": "npm explore wpe-lightning-sdk -- npm --baseDir=$(pwd) run start",
    "release": "npm explore wpe-lightning-sdk -- npm --baseDir=$(pwd) run release",
    "dev": "npm explore wpe-lightning-sdk -- npm --baseDir=$(pwd) run dev",
    "upload": "npm explore wpe-lightning-sdk -- npm --baseDir=$(pwd) run upload"
  },
  "dependencies": {
    "wpe-lightning-sdk": "git+https://github.com/WebPlatformForEmbedded/Lightning-SDK.git#next"
  }
}

``` 

Now we run the following command in the terminal `npm install` in the root directory of our project
and this will install all the dependencies to the folder: `./node_modules`

If you inspect the `./node_modules` you will see the folders `wpe-lightning` which holds the source of Lightning
and `wpe-lightning-sdk` which is our SDK.

Afters installing our dependecies we can create a new file in the root of our folder called: `settings.json`
which hold app and platform specifc settings.


```
{
  "appSettings": {
    "stage": {
      "clearColor": "0x00000000",
      "useImageWorker": true
    },
    "debug": false
  },
  "platformSettings": {
    "inspector": false,
    "path": "./static",
    "log": false,
    "showVersion": true,
    "imageServerUrl": "//cdn.metrological.com/image",
    "proxyUrl": "//cdn.metrological.com/proxy",
    "textureMode": true
  }
}
```

1. [clearColor](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/clearColor), specifies the color we use when we call the clear() method
2. ImageWorker, if a the platform you run the code on support [Web workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)
3. Debug, toggles debug mode on / off
4. Inspector, when set to true it will render out a HTML structure inside the DOM so you can inspect why certain elements are maybe rendered off-screen
5. path, the path to the static app assets, Utils.asset() will use this folder to lookup assets
6. log, toggles app logging on / off
7. showVersion, if set to true, will overlay the app's version in the corner (version specified in `metadata.json`)
8. imageServerUrl, if you have a image resizing server set the value to the endpoint
9. proxyUrl, if you have access to a proxy server (i.e to cache data to speed up network request) you set the value to the endpoint
10. textureMode, specifiy if you want to render video as a texture on the active drawing canvas


When we have tweaked our app and platform specific settings we add a new `src` folder to our project, this will hold
all the source files necessary to run our app.

Inside the `src` folder we create the first file called `index.js` and add the contents: 

```
import { Launch } from 'wpe-lightning-sdk'
import App from './App.js'

export default function () {
    return Launch(App, ...arguments)
}
```

This is our first time we really touch the SDK. Since we developed our SDK with a modular approach you can control which 
modules of the SDK you want to use.

> Eventually when we bundle and run the game, our bundler (rollup) will add the imported modules to the bundle so we keep an optimized codebase (no un-used code). This method often refered to as treeshaking.

1. We import Launch method from the SDK (will act as a bootstrapper) 
2. Next we import our app from the (current not existing) App.js
3. Export a function which upon invokation will Launch the app

Now we a basic setup and we can move over to the next phase, the actual development of the App.

### Developing your app

And now it's time for fun! We can start the actual development of the app!

First we start by creating a new file `App.js` (the one we've referenced in our `index.js` file but at this moment is 
missing in our project folder)

First we do is importing the Lightning App framework via our SDK and Utils (which will be needing in a couple of seconds)

```
import { Lightning, Utils } from "wpe-lightning-sdk";
```

After the import we create a new default [export](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export) for our App Component

```
export default class App extends Lightning.Component { 

}
```

Inside our class declaration we define a new member `getFonts` that we're going to use. Get fonts
returns an array of object with properties for all the different fonts our app uses (in this getting started we're only 
using one font but it's possible for you to add multiple fonts to your project ) for this app i've downloaded a [pixel](https://dl.dafont.com/dl/?f=vcr_osd_mono)
but feel free to use any font you like.

```
static getFonts() {
    return [
        {family: 'pixel', url: Utils.asset('fonts/pixel.ttf'), descriptor: {}}
    ];
}

```

After including the fonts we start by defining the root template of our app on which we will be attaching the components
that our needed in our app. 

```
static _template(){ 
    return {
    
    }
}

```

For now we initialize an empty template but will start filling it real soon. Now we add a empty implementation
of the [statemachine](https://webplatformforembedded.github.io/Lightning/docs/components/statemachine/statemachine#setting-up-the-state-machine)
which we also be starting to fill really soon.

```
static _states(){
    return [
    
    ]
}
```











 

