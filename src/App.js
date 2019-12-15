import { Lightning, Utils } from "wpe-lightning-sdk";
import Splash from "./Splash.js";
import Main from "./Main.js";
import Game from "./Game.js";

export default class App extends Lightning.Component {

    static getFonts() {
        return [
            {family: 'pixel', url: Utils.asset('fonts/pixel.ttf'), descriptor: {}}
        ];
    }

    static _template() {
        return {
            Logo:{
                x: 100, y:100, text:{text:'TicTacToe', fontFace:'pixel'}
            },
            rect: true, color: 0xff000000,
            Splash: {
                type: Splash, signals: {loaded: true}, alpha: 0
            },
            Main: {
                type: Main, alpha: 0, signals: {select: "menuSelect"}
            },
            Game:{
                type: Game, alpha: 0
            }
        };
    }

    _setup() {
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

                loaded() {
                    this._setState("Main");
                }
            },
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

                menuSelect({item}) {
                    if (this._hasMethod(item.action)) {
                        return this[item.action]();
                    }
                }

                start() {
                    this._setState("Game")
                }

                // change focus path to main
                // component which handles the remotecontrol
                _getFocused() {
                    return this.tag("Main");
                }
            },
            class Game extends this {
                $enter() {
                    this.tag("Game").setSmooth("alpha", 1);
                }

                $exit() {
                    this.tag("Game").setSmooth("alpha", 0);
                }

                _getFocused(){
                    return this.tag("Game");
                }
            }
        ];
    }


}