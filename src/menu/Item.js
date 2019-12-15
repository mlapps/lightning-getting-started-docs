import { Lightning } from "wpe-lightning-sdk";

export default class Item extends Lightning.Component{

    static _template(){
        return {
            text:{text:'', fontFace:'pixel', fontSize:50}
        }
    }

    set label(v){
        this.text.text = v;
    }

    set action(v){
        this._action = v;
    }

    get action(){
        return this._action;
    }
}