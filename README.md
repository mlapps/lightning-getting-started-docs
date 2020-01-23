# Getting started

This `getting started with Lightning` document will guide you through the first steps of building an app with Lightning.

This guide consist of 3 main topics: 
1. Setting up your environment
2. Develop your app
3. Run, test and deploy

We have chosen to guide you in creating a fully functioning game called `Tic Tac Toe`, for those unfamiliar with the
game I suggest checking out: https://en.wikipedia.org/wiki/Tic-tac-toe

---

### Setting up your environment

1. Start by installing the Lightning-CLI (Command-line interface) `npm install -g WebPlatformForEmbedded/Lightning-CLI`
2. Navigate to a folder on your machine where you want to place your project
3. On the command-line type: `lng` to see all the available options.
4. type `lng create` to create a new Lightning app
5. Type the name `TicTacToe`
6. Next fill in the identifier `com.company.app.TicTacToe` (or something that is more suitable to your situation)
7. Choose if you want to enable ESlint or not.
8. Next select `yes` for installing the NPM dependencies
9. Choose `no` for initializing an empty GIT repository

After the dependencies are succesfully installed you can navigate to the created app folder (in our example `cd com.metrological.app.TicTacToe`)

We now have a couple of options: 

1. `lng build` will create a standalone bundle that you can run in the browser
2. `lng serve` will start a local webserver and run the app
3. `lng dev` will build the app, start a webserver and watch for changes.

You can use these whenever you want throughout this `getting started` 


### App contents

When you inspect the contents in your app folder you will find the following files: 

* `README.md` a markdown readme file that can hold instructions for configuration, installation, changelogs etc.
* `metadata.json` this hold the following app related metadata:

```
{
  "name": "TicTacToe",
  "identifier": "com.metrological.app.TicTacToe",
  "version": "1.0.0",
  "icon": "./static/icon.png"
}
```
* `package.json` this file holds various [metadata](https://nodejs.org/en/knowledge/getting-started/npm/what-is-the-file-package-json/) relevant to the project

```
{
  "name": "com.metrological.app.TicTacToe",
  "description": "TicTacToe",
  "dependencies": {
    "wpe-lightning-sdk": "WebPlatformForEmbedded/Lightning-SDK"
  }
}
```
* `package-lock.json` is automatically generated for any operations where npm modifies either the node_modules tree, or package.json. [Read more...](https://docs.npmjs.com/files/package-lock.json)
* `settings.json` which holds app and platform specific settings.

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
    "imageServerUrl": "",
    "proxyUrl": "",
    "textureMode": true
  }
}
```

1. [clearColor](https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/clearColor), specifies the color we use when we call the clear() method
2. ImageWorker, if the platform you run the code on support [Web workers](https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API)
3. Debug, toggles debug mode on / off
4. Inspector, when set to true it will render out a HTML structure inside the DOM so you can inspect why certain elements are maybe rendered off-screen
5. path, the path to the static app assets, Utils.asset() will use this folder to lookup assets
6. log, toggles app logging on / off
7. showVersion, if set to true, will overlay the app's version in the corner (version specified in `metadata.json`)
8. imageServerUrl, if you have an image resizing server set the value to the endpoint
9. proxyUrl, if you have access to a proxy server (i.e to cache data to speed up network request) you set the value to the endpoint
10. textureMode, specify if you want to render video as a texture on the active drawing canvas


Inside the `src` folder we find an `index.js` and with the following contents that are needed to launch our app.

```
import { Launch } from 'wpe-lightning-sdk'
import App from './App.js'

export default function () {
    return Launch(App, ...arguments)
}
```

This is the first time we really touch the SDK. Since we developed our SDK with a modular approach you can control which 
modules of the SDK you want to use.

> Eventually when we bundle and run the game, our bundler (rollup) will add the imported modules to the bundle so we keep an optimized codebase (no un-used code). This method is often refered to as treeshaking.

1. We import the Launch method from the SDK (will act as a bootstrapper) 
2. Next we import our App class from App.js
3. Export a function which upon invocation will Launch the app

Now that we have a basic setup we can move over to the next phase, the actual development of the App.

### Developing your app

And now we move over to the fun part! We can start the actual development of the app!

Inside the `src` folder you'll find the file `App.js` with some boilerplate code. You can run `lng dev` and test it out but for now we remove all the contents inside
that file so we can build it from the ground up.

First thing we do is importing the Lightning App framework via our SDK and Utils (which will be needed in a couple of seconds)

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
using one font but it's possible for you to add multiple fonts to your project ) for this app I've downloaded a [pixel](https://dl.dafont.com/dl/?f=vcr_osd_mono)
but feel free to use any font you like.

```
static getFonts() {
    return [
        {family: 'pixel', url: Utils.asset('fonts/pixel.ttf'), descriptor: {}}
    ];
}

```

After including the fonts we start by defining the root template of our app on which we will be attaching the components
that are needed in our app. For now we specify the [rect](https://webplatformforembedded.github.io/Lightning/docs/textures/rectangle) property which will use `Lightning.texture.RectangleTexture` 
to draw a black rectangle of 1920px by 1080px

> colors are [ARGB](https://ifpb.github.io/javascript-guide/ecma/expression-and-operator/argb.html) values

```
static _template(){ 
    return {
        rect: true, color: 0xff000000, w: 1920, h: 1080
    }
}

```

For now we initialize an empty template but we will start filling it real soon. Now we add an empty implementation
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

Lets briefly go over every line inside the template definition to get a bit of understanding what is going on.

```
return {
    Logo:{}
}
```

We add a new empty `Component` to our render-tree with the reference (name) `Logo`. A component's reference name
must always start with an uppercase character. We use the name to get a reference for the component so we can
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
By settings the [mount](https://webplatformforembedded.github.io/Lightning/docs/renderEngine/elements/positioning#mount) property we the component to exactly align in the center, no matter the future
dimensions of the property.


```
x: 960, y: 540, mount:0.5,
``` 

By setting the `text` property we force the Component to be of type `Lightning.texture.TextTexture`, this
means we can start adding [text properties](https://webplatformforembedded.github.io/Lightning/docs/textures/text) (see our documentation for all the possible text properties)

```
text:{text:'LOADING..', fontFace:'pixel'}
```

Now that we've successfully set up our `Splash template` we start by adding our first [lifecycle event](https://webplatformforembedded.github.io/Lightning/docs/components/overview#component-events)

```
_init() {

}
```

The `init` hook will be called when a component is attached for the first time. Inside the _init hook
we will start defining our [animation](https://webplatformforembedded.github.io/Lightning/docs/animations/overview) (Go to the animation part of our documentation)

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
    
    // start the animation
    this._pulse.start();
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

And add the component to the template. To add an instance of defined `Component` we use the `type` attribute in
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

> A [Signal](https://webplatformforembedded.github.io/Lightning/docs/components/communication/signal) tells the parent component that some event happened on this component.

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
a bit differently. 

Inside the `menu` folder we create a new file called `Menu.js`

And populate it with the following content:
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
components to the template. In this example we add the `children` accessor and feed it with an array of objects which will
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

To actually add items we need to create the new Component `Item`. So we start by creating a new file in our 
menu folder called `Item.js` and add the following code: 

``` 
import { Lightning } from "wpe-lightning-sdk";

export default class Item extends Lightning.Component{

    static _template(){
        return {
            text:{text:'', fontFace:'pixel', fontSize:50}
        }
    }
    
    // will be automatically called
    set label(v){
        this.text.text = v;
    }
    
    // will be automatically called
    set action(v){
        this._action = v;
    }
    
    // will be automatically called
    get action(){
        return this._action;
    }
}
```

Now we go back to `Menu.js` and import the `Item` Component

```
import Item from "./Item.js";
```

Now that we have the `Menu` component which can be filled with `Item`'s it's time to start adding logic
to out component; 

we add an accessor to get the children inside the Items wrapper.

```
get items(){
    return this.tag("Items").children;
}
```

next we add an accessor to quickly grab the active (focused) item

``` 
get activeItem(){
    return this.items[this._index];
}
```

Next we declare the `_setIndex` function, this will accept an `index` argument
changes the position of the focus indicator and it stores the new index.

```
_setIndex(idx){
    // since it's a one time transition we use smooth
    this.tag("FocusIndicator").setSmooth("y", idx*90 + 5);
    
    // store new index
    this._index = idx;
}
```

Now that we're done with our `Menu` logic it's time to start showing our `App` component when
the `Splash` has send a `loaded` signal 

---

##### App.js

First we add a new state to our empty state machine called `Splash`. And force our app to go into that
state upon `setup` via `_setState()`

``` 
_setup(){
    this._setState("Splash");
}

static _states() {
    return [
        class Splash extends this {
            $enter() {
                this.tag("Splash").setSmooth("alpha", 1);
            }
            $exit() {
                this.tag("Splash").setSmooth("alpha", 0);
            }
            // because we have defined 'loaded'
            loaded() {
                this._setState("Main");
            }
        }
    ]
```

> The $enter() and $exit() will be automatically called upon when a component goes in that state or exit's that state so you can do some proper clean up if needed. In this specific case we want to make sure that our Splash component shows / hides.

Take notice of the `loaded()` function, this will only be called when `Splash` fires the `loaded` signal while
the app is in the `Splash` state. If it's not in the `Splash` state it will not be called (unless there is a loaded function
in a different state / root state)

Now add a new state to our App's statemachine implementation called `Main` (to safe some space I've hidden the Splash state implementation, but it will still be there)


``` 
_setup(){
    this._setState("Splash");
}

static _states() {
    return [
        class Splash extends this {...},
        class Main extends this {
            $enter() {
                this.tag("Main").patch({
                    smooth:{alpha:1, y:0}
                });
            }    
            $exit() {
                this.tag("Main").patch({
                    smooth:{alpha:0, y:100}
                });
            }    
            // change focus path to main
            // component which handles the remotecontrol
            _getFocused() {
                return this.tag("Main");
            }
        }
    ]
```

As defined before we add the `$enter()` and `$exit()` hooks to hide / show the `Main` component. Also we see the
`_getFocused` popping up for the first time.

> The focus path is determined by calling the _getFocused() method of the app object. By default, or if undefined is returned, the focus path stops here and the app is the active component (and the focus path only contains the app itself). When _getFocused() returns a child component however, that one is also added to the focus path, and its _getFocused() method is also invoked. This process may repeat recursively until the active component is found. To put it another way: the components may delegate focus to descendants.

You can read more in the documentation about [focus](https://webplatformforembedded.github.io/Lightning/docs/focus/focus#__docusaurus) and [remote control](https://webplatformforembedded.github.io/Lightning/docs/focus/keyhandle) key handling

When our app is in the `Main` state we delegate the focus to our `Main` component, which in essence means: 
`Telling Lightning which component is the active component - and should handle key events`

Now that have delegated the focus to the `Main` component we can open `Menu.js` again and start implementing
the remote control handling:

we implement our first remote control handler, so if this component has focus (via _getFocused() which will
be explained later) and the user presses the `up` button, this function will be called. Inside the function
we will call the `_setIndex` which we still need to declare.

``` 
_handleUp(){
    this._setIndex(Math.max(0, --this._index));
}
```

And we implement the logic if a user presses `down` on the remote;

```
_handleDown(){
    this._setIndex(Math.min(++this._index, this.items.length - 1));
}
```

Next stop, building the Actual game!

---

##### Game.js

In our `src` folder we create a new file called `Game.js` and populate it with the following code;
I'm not going to explain every line in detail but will highlight some parts: 

``` 
import { Lightning } from "wpe-lightning-sdk";
export default class Game extends Lightning.Component {
    static _template(){
        return {
            Game:{
                PlayerPosition:{
                    rect: true, w: 250, h: 250, color: 0x40ffffff,
                    x: 425, y: 125
                },
                Field:{
                    x: 400, y: 100,
                    children:[
                        {rect: true, w:1, h:5, y:300},
                        {rect: true, w:1, h:5, y:600},
                        {rect: true, h:1, w:5, x:300, y:0},
                        {rect: true, h:1, w:5, x:600, y:0}
                    ]
                },
                Markers:{
                    x: 400, y: 100
                },
                ScoreBoard:{ x: 100, y: 170,
                    Player:{
                        text:{text:'Player 0', fontSize:29, fontFace:'Pixel'}
                    },
                    Ai:{ y: 40,
                        text:{text:'Computer 0', fontSize:29, fontFace:'Pixel'}
                    }
                }
            },
            Notification:{
                x: 100, y:170, text:{fontSize:70, fontFace:'Pixel'}, alpha: 0
            }
        }
    }
}
```

We've added a `Game` component which acts as a wrapper for the Game board an score board so it will be easy
to hide all the contents at once. 

1. PlayerPosition, this is a focus indicator of which tile the player currently is
2. Field, the outlines of the game field
3. Markers, the placed [ X ] / [ 0 ] 
4. ScoreBoard, the current score for player and computer
5. Notification, the endgame notification (player wins, tie etc), in a real world app we probably would
move the Notification handler to a different (higher) level so we multiple component can make use of it.

It's also possible to (instead instancing a component via type) populate the `children` within the template.
This will populate the `Field` Component with 5 lines (rectangles) we also draw two 1px by 5px component and 2 components
5px by 1px components.

``` 
Field:{
    x: 400, y: 100,
    children:[
        {rect: true, w:1, h:5, y:300},
        {rect: true, w:1, h:5, y:600},
        {rect: true, h:1, w:5, x:300, y:0},
        {rect: true, h:1, w:5, x:600, y:0}
    ]
}
```

Let's start adding some logic, we start by adding a new lifecycle event called `construct`

```
_construct(){
    // current player tile index
    this._index = 0;
    
    // computer score
    this._aiScore = 0;
    
    // player score
    this._playerScore = 0;
} 
```

Next lifecycle event we add is `active` this will be called when a component `visible` property is true,
`alpha` higher then 0 and positioned in the renderable screen.

``` 
_active(){
    this._reset();
    
    // we iterate over the outlines of the field and do a nice
    // transition of the width / height, so it looks like the 
    // lines are being drawn realtime.
    
    this.tag("Field").children.forEach((el, idx)=>{
        el.setSmooth(idx<2?"w":"h", 900, {duration:0.7, delay:idx*0.15})
    })
}
```

The `setSmooth` function creates a transition for a give property with the provided value:
Look in the documentation to read more about [smoothing](https://webplatformforembedded.github.io/Lightning/docs/transitions/overview#starting-a-transition).

We add the `_reset()` method which fills all available tiles with `e` for empty, render the tiles
and change the state back to root state.

For the tile we use an array of 9 elements that we can use to all sorts of logic with (rendering / checking for winner / decide next move for the computer etc..)

```
_reset(){
    // reset tiles
    this._tiles = [
        'e','e','e','e','e','e','e','e','e'
    ];

    // force render
    this.render(this._tiles);

    // change back to rootstate
    this._setState("");
}
```

Now we add our `render` method that accepts a set of tiles and draw some text
based on the tile value 

> e => empty / x => Player / 0 => computer

``` 
render(tiles){
    this.tag("Markers").children = tiles.map((el, idx)=>{
        return {
            x: idx%3*300 + 110,
            y: ~~(idx/3)*300 + 90,
            text:{text:el === "e"?'':`${el}`, fontSize:100},
        }
    });
}
```

Now that we have a good setup for rendering tiles and showing outlines on `active` we can proceed 
to implement remote control handling.

Since we're working with a 3x3 playfield we check (on remotecontrol `up` )if the new index we want to focus on is larger or
equal then zero, if we so we call the (to be implemented) `setIndex()` function. 

``` 
_handleUp(){
    let idx = this._index;
    if(idx-3 >= 0){
        this._setIndex(idx-3);
    }
}
```

The logic for pressing `down` is mostly equal to the `up` but we check if the new index
is not larger then the amount of available tiles.

``` 
_handleDown(){
    let idx = this._index;
    if(idx+3 <= this._tiles.length - 1){
        this._setIndex(idx+3);
    }
}
```

We don't want continues navigation so we check if we're on the most left tile of a column, if so
we block navigation. So lets say we're on the second row, second colums (which is tile index 4)
and we press `left`, we check if the remainder is truthy `4%3 === 1` and call `setIndex` with the new index.
If we're on the second row, first column (which is tile index 3) the remainder of `3%3` is 0 which
so we don't match the condition and will not call `setIndex()`


```
_handleLeft(){
    let idx = this._index;
    if(idx%3){
        this._setIndex(idx - 1);
    }
}
```

The logic for pressing `right` is mostly the same but check if the `index` of the new tile
where we're navigating to has a remainder.

```
_handleRight(){
    const newIndex = this._index + 1;
    if(newIndex%3){
        this._setIndex(newIndex);
    }
}
```
And the `setIndex()` function which does a transition of the `PlayerPosition` component to the new tile
and stores the new index for future use.

```
_setIndex(idx){
    this.tag("PlayerPosition").patch({
        smooth:{
            x: idx%3*300 + 425,
            y: ~~(idx/3)*300 + 125
        }
    });
    this._index = idx;
}
```

If we run our game you can see that the outlines of the `Field` will be drawn and we can navigate over the
game tiles, so the next thing we need to do is the actual capturing of a tile by placing your marker on remote `enter` press

On `enter` we first check if we're on an empty tile, if so we place our `X` marker and if the function's return value
is `true` we set the `Game` component in a `Computer` state (which means it's the computers turn to play)

``` 
_handleEnter(){
    if(this._tiles[this._index] === "e"){
        if(this.place(this._index, "X")){
            this._setState("Computer");
        }
    }
}
```

The `place()` function will be called (as stated above) when a user presses `ok` or `enter` on the remote control:

1. we update the tile value
2. we render the new field
3. We check if we have a winner (We will go over the Utils in a short moment)
4. If we have a Winner we set the app to `End` state and `Winner` sub state
5. and return false, so the _handleEnter logic will not go to `Computer` state
6. If we don't have a winner we return true so the `Game` can go to `Computer` state

``` 
place(index, marker){
    this._tiles[index] = marker;
    this.render(this._tiles);

    const winner = Utils.getWinner(this._tiles);
    if(winner){
        this._setState("End.Winner",[{winner}]);
        return false;
    }

    return true;
}
```

> in a real world game we would implement the logic of checking for a winner a changing to Computer state on a different level to make the app a bit more robust.

Next thing that we're going to do is model the statemachine. The first state that we're going to add is the `Computer`
state which means it's the computers turn to play.

in the `$enter()` hook we 

1. We calculate the new position the computer can move to
2. If the `return` value is `-1` it means there are no possible moves left and we force the `Game` Component in a `Tie` state because we don't have a winner
3. We create a random timeout to give a player a feeling that it's really playing against a human opponent.
4. We hide the `PlayerPosition` indicator
5. When the timeout expires we call `place()` with th `0` marker and go back to the root state `_setState("")

By adding `_captureKey()` we make that every keypress will be captured, but you can still perform some `keyCode` 
specific logic.

When we `$exit()` the `Computer` state we show the `PlayerPosition` indicator again, so the player knows it's
his turn to play.

``` 
static _states(){
    return [
        class Computer extends this {
            $enter(){
                const position = Utils.AI(this._tiles);
                if(position === -1){
                    this._setState("End.Tie");
                    return false;
                }

                setTimeout(()=>{
                    if(this.place(position,"0")){
                        this._setState("");
                    }
                }, ~~(Math.random()*1200)+200);

                this.tag("PlayerPosition").setSmooth("alpha",0);
            }

            // make sure we don't handle
            // any keypresses when the computer is playing
            _captureKey({keyCode){ }

            $exit(){
                this.tag("PlayerPosition").setSmooth("alpha",1);
            }
        }
    ]
}
```

Next state that we're adding is the `End` state with the sub state `Winner` and `Tie`.
First we add some shared logic between the `Winner` and `Tie` state.

we wait for a use to press `enter / ok` in the `End` state and then we reset the `Game` (in reset() we also go back to root state)
so this will make sure the `$exit()` hook will be called and that's where we show the complete `Game` component again
and we hide the notification.

``` 
static _states(){
    return [
        class Computer extends this {
            // we hide the code for now
        },
        class End extends this{
            _handleEnter(){
                this._reset();
            }
            $exit(){
                this.patch({
                    Game:{
                        smooth:{alpha:1}
                    },
                    Notification: {
                        text:{text:''},
                        smooth:{alpha:0}
                    }
                });
            }
            static _states(){
                return [
                
                ]
            }
        }
    ]
}
```

We add a new `_states` object so we can start adding sub states.

When we `$enter()` the `End.Winner` state we 

1. Check if the winner is `X` so we increase to the player score
2. If not, we increase the computer score
3. Next we do a big [patch](https://webplatformforembedded.github.io/Lightning/docs/renderEngine/patching#__docusaurus) of the template in which we
hide the Game field, updated the text of the scoreboard, update the `Notification` text and show the `Notification` Component

When we `$enter()` the `End.Tie` state we

1. Hide the Game field
2. Update the `Notification` text
3. And show the `Notification` Component

``` 
static _states(){
    return [
        class Computer extends this {
            // we hide the code for now
        },
        class End extends this{
            // we hide the code for now
            static _states(){
                return [
                   class Winner extends this {
                       $enter(args, {winner}){
                           if(winner === 'X'){
                               this._playerScore+=1;
                           }else{
                               this._aiScore+=1;
                           }
                           this.patch({
                               Game:{
                                   smooth:{alpha:0},
                                   ScoreBoard:{
                                       Player:{text:{text:`Player ${this._playerScore}`}},
                                       Ai:{text:{text:`Computer ${this._aiScore}`}},
                                   }
                               },
                               Notification: {
                                   text:{text:`${winner==='X'?`Player`:`Computer`} wins (press enter to continue)`},
                                   smooth:{alpha:1}
                               }
                           });
                       }
                   },
                   class Tie extends this {
                       $enter(){
                           this.patch({
                               Game: {
                                   smooth: {alpha: 0}
                               },
                               Notification: {
                                   text:{text:`Tie :( (press enter to try again)`},
                                   smooth:{alpha:1}
                               }
                           });
                       }
                   }
                ]
            }
        }
    ]
}
```

Now that we have modeled most of our game components it's time to start adding the the logic for
the `Computer` controlled player.

##### GameUtils.js

Inside our `src` folder we add a `lib` folder and create a new file `GameUtils.js` and add the following function.

We test the current state of the game against a set of winning patterns by normalizing
the actual pattern values an testing them against a provided regular expression.

``` 
const getMatchingPatterns = (regex, tiles) => {
    const patterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6],
        [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]
    ];
    return patterns.reduce((sets, pattern) => {
        const normalized = pattern.map((tileIndex) => {
            return tiles[tileIndex];
        }).join("");
        if (regex.test(normalized)) {
            sets.push(pattern);
        }
        return sets;
    }, []);
};
```

Next we add `getFuturWinningIndex` which check if there is a potential upcoming winning move
for the itself (computer) or it's opponent (the player). We give prio to returning the index
for the computer's winning move over blocking a potential win for the player.

``` 
const getFutureWinningIndex = (tiles) => {
    let index = -1;
    const player = /(ex{2}|x{2}e|xex)/i;
    const ai = /(e0{2}|0{2}e|0e0)/i;

    // since we're testing for ai we give prio to letting ourself win
    // instead of blocking the potential win for the player
    const set = [
        ...getMatchingPatterns(player, tiles),
        ...getMatchingPatterns(ai, tiles)
    ];

    if (set.length) {
        set.pop().forEach((tileIndex) => {
            if (tiles[tileIndex] === 'e') {
                index = tileIndex;
            }
        });
    }

    return index;
};
```


We finished all the logic for the `Game` and now it's time to test it (a thing we normally do during development ;) )

### Run, test and deploy

We step back to the `package.json` file in the root of our directory and inspect the available scripts.

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

> `npm explore` Will spawn a subshell in the directory of the installed package specified. If a command is specified, then it is run in the subshell, which then immediately terminates.

1. build, this will execute the build script from our SDK
2. start, will start a webserver and automatically open your browser pointing to the correct location
3. release, will create a package 
4. dev, will run a build and start (serve)
5. upload, will upload the app to metrological's dashboard (you will need an api key)












































 

