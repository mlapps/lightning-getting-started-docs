import { Lightning } from "wpe-lightning-sdk";

export default class Splash extends Lightning.Component {

    static _template(){
        return {
            Logo:{
                x: 960, y: 540, mount:0.5,
                text:{text:'LOADING..', fontFace:'pixel'}
            }
        }
    }

    _init(){
        this._pulse = this.tag("Logo").animation({
            duration: 4, repeat: -1, actions:[
                {p:'alpha', v:{0:0, 1:0.5, 1:0}}
            ]
        });
    }
}