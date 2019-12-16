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

And now we move over to the fun part! We can start the actual development of the app!

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
that our needed in our app. For now we specify the [rect](https://webplatformforembedded.github.io/Lightning/docs/textures/rectangle) property which will use `Lightning.texture.RectangleTexture` 
to draw a black rectangle of 1920px by 1080px

> colors are [ARGB](https://ifpb.github.io/javascript-guide/ecma/expression-and-operator/argb.html) values

```
static _template(){ 
    return {
        rect: true, color: 0xff000000, w: 1920, h: 1080
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

Lets step back for a brief moment and think about the different Views / Components we want to create for a game like `Tic Tac Toe`
We probably need a: 

1. A `Splash` screen to display a logo, or when you're creating a different type of app acts as a placeholder up untill the moment
that all external request are fullfilled and assets are preloaded (if that is a requirement)
2. A `Main` screen on which the user of the app lands after the `splash` screen hides. In the `main` screen we also render a menu
which has some interaction with the `remote control`
3. A `Game` screen. This screen will hold all the components which are needed to display our Tic Tac Toe game.
4. A `Menu` Component with `Item` Components.

Also we need something like a `Utils` library which holds the Ai related logic because we're creating a Game which
can be played against a computer controlled player.

---

#### Splash.js

Inside the `src` folder we create a new file `Splash.js`. After the file is created we open the file
and import the `Lightning framework` from the `SDK`

```
import { Lightning } from "wpe-lightning-sdk";
```

Next, export your Component class so the `App` can import it (we also)

```
export default class Splash extends Lightning.Component {

}
```

Inside the class definition we create the `template` (For now we stick to a simple text label and an animation
which fades in and out for a couple of seconds)

```
static _template(){
    return {
        Logo:{
            x: 960, y: 540, mount:0.5,
            text:{text:'LOADING..', fontFace:'pixel'}
        }
    }
}
```

Lets briefly walk over every line inside the template definition to get a bit of understanding what is going on.

```
return {
    Logo:{}
}
```

We add a new empty `Component` to our render-tree with the reference (name) `Logo`. A component's reference name
must always start with a uppercase character. We use the name to get a reference to the component so we can
manipulate it's properties in the future: 

```
// set x position
this.tag("Logo").x = 200;

// change alpha
this.tag("Logo").alpha = 0.5;

// store a reference 
const logo = this.tag("Logo");
``` 

Next we see the components properties, we position the component 960px on the x-axis and 540 on the y-axis.
By settings the [mount](http://@todo-link) we the component to exactly align in the center, no matter the future
dimensions of the property.


```
x: 960, y: 540, mount:0.5,
``` 

By setting the `text` property we force the Component to be of type `Lightning.texture.TextTexture`, this
means we can start adding [text properties](htttp://todo-link) (see our documentation for all the possible text properties)

```
text:{text:'LOADING..', fontFace:'pixel'}
```

Now that we've successfully set up our `Splash template` we start by adding our first [lifecycle event] (https://webplatformforembedded.github.io/Lightning/docs/components/overview#component-events)

```
_init() {

}
```

The `init` hook will be called when a component is attached for the first time. Inside the _init hook
we will start defining our [animation](http://@todo-link) (Go to the animation part of our documentation)

```
_init(){
    // create animation and store a reference, so we can start / stop / pause 
    // in the fututre
    this._pulse = this.tag("Logo").animation({
        duration: 4, repeat: 0, actions:[
            {p:'alpha', v:{0:0, 1:0.5, 1:0}}
        ]
    });
    
    // add a finish eventlistener, so we can send a signal
    // to the parent when the animation is completed
    this._pulse.on("finish", ()=>{
        this.signal("loaded");
    })
}
```

Next we add a `active` hook to our Component, this will be called when a component is activated, visible
and on screen. Inside the `active` hook we start our animation.

```
_active(){
    this._pulse.start();
}

```

Now that our `Splash` Component is ready we open the `App.js` file and start adding our component to the root template.
We import our new component: 

``` 
import Splash from "./Splash.js";
```

And a the component to the template. To add an instance of defined `Component` we use the `type` attribute in
our template definition.
 
``` 
static _template() {
    return {
        rect: true, color: 0xff000000, w: 1920, h: 1080,
        Splash: {
            type: Splash, signals: {loaded: true}, alpha: 0
        }
    };
}
```

One new thing we see in our splash implementation is the use of the `signals` property.

> A [Signal](https://webplatformforembedded.github.io/Lightning/docs/components/communication/signal#__docusaurus) tells the parent component that some event happened on this component.

---

#### Main.js

Next stop, is creating the `Main` component which will be shown at the moment the `Splash` component 
sends the `loaded` `signal`

We create a new file called `Main.js` inside our `src` and add the following code: 

``` 
import { Lightning } from "wpe-lightning-sdk";

export default class Main extends Lightning.Component {
    static _template(){
        return {
        
        }
    }
}
```

The Main's responsibility will be showing a `Menu` Component in his template and accepting remote control presses
so a user can navigate through the menu items.

##### Menu.js

We add a new folder inside our `src` folder called `menu`. In a real world app you may want to structure your re-useable components
a bit different. 

Inside the `menu` folder we create a new file called `Menu.js`

And populate it wit the following content:
``` 
export default class Menu extends Lightning.Component{
    static _template(){
        return {
            // we define a empty holder for our items of 
            // position it 40px relative to the component position 
            // so we have some space for our focus indicator
            Items:{
                x:40
            },
            // Create a text component that indicates 
            which item has focus
            FocusIndicator:{y:5,
                text:{text:'>', fontFace:'pixel'}
            }
        }
    }
}
```

We add an `init`, `active` and `inactive` hook in which we create and start our animation and create `index` property that 
holds the number of the focused menu item.

```
_init(){
    // create a blinking animation 
    this._blink = this.tag("FocusIndicator").animation({
        duration:0.5, repeat:-1, actions:[
            {p:'x', v:{0:0, 0.5:-40,1:0}}
        ]
    });

    // current focused menu index
    this._index = 0;
}

_active(){
    this._blink.start();
}

_inactive(){
    this._blink.stop();
}
```

We make a small sidestep by going back to `Main.js`, and define the Items we want to show in our `Menu`.
We alter the template to the following, we import our menu component and add an `items` property to the 
implementation.

> There is a little trick you can use inside the instance of a Component when you add it to template, if you add non-lightning 
properties to your (just like items in this example) the item will be directly availble in Component definition (this.items) 
and by adding a setter (set item(v){} ) the setter will be automatically called upon initialization

We provide an array of objects.

``` 
import { Lightning } from "wpe-lightning-sdk";
import Menu from "./menu/Menu.js";

export default class Main extends Lightning.Component {
    static _template(){
        return {
            Menu:{
                x: 600, y:400,
                type: Menu, items:[
                    {label:'START NEW GAME',action:'start'},
                    {label:'CONTINUE',action:'continue'},
                    {label:'ABOUT',action:'about'},
                    {label:'EXIT', action:'exit'}
                ]
            }
        }
    }
}
```

Now we go back to `Menu.js` and implement the items creation. `Lightning` support multiple ways of creating and adding
components to the template. In this example we the `children` accessor and feed it with an array of objects which will
be automatically created by `Lightning`.

As noted before the `items` setter will be automatically called, so we can use the map function to return a new 
array of objects. We also specifiy the type (which at this moment is not existing)

``` 
set items(v){
    this.tag("Items").children = v.map((el, idx)=>{
        return {type: Item, action: el.action, label: el.label, y: idx*90}
    })
}
```






















 

