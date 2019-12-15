import { Lightning } from "wpe-lightning-sdk";

export default class Splash extends Lightning.Component {

    static _template(){
        return {
            Logo:{x: 960, y: 540, mount:0.5,
                text:{text:'LOADING..', fontFace:'pixel'}
            }
        }
    }

    _init(){
        // do some magic and signal loaded
        this.signal("loaded");
    }

}