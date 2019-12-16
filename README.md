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

First we create a new folder on our machine called: `TicTacToe`. Inside the empty folder we create a `package.json` file

> this file holds various metadata relevant to the project. This file is used to give information to npm that allows it to identify the project as well as handle the project's dependencies. It can also contain other metadata such as a project description, the version of the project in a particular distribution, license information, even configuration data - all of which can be vital to both npm and to the end users of the package. The package.json file is normally located at the root directory

Next, we add the following contents to the file:

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
3. Debug, toggles debug mode
4. Inspector, when set to true it will render out a HTML structure inside the DOM so you can inspect why certain elements are maybe rendered off-screen
5. path, the path to the static app assets, Utils.asset() will use this folder to lookup assets
6. log
7. showVersion

 

