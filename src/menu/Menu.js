import { Lightning } from "@lightningjs/sdk";
import Item from "./Item.js";

export default class Menu extends Lightning.Component{

    static _template(){
        return {
            Items:{
                x:40
            },
            FocusIndicator:{y:5,
                text:{text:'>', fontFace:'pixel'}
            }
        }
    }

    _init(){
        // create animation
        this._blink = this.tag("FocusIndicator").animation({
            duration:0.5, repeat:-1, actions:[
                {p:'x', v:{0:0, 0.5:-40,1:0}}
            ]
        });

        // start the animation
        this._blink.start();

        // current focused menu index
        this._index = 0;
    }

    set items(v){
        // create children by handing over an array of
        // object to the objectList
        this.tag("Items").children = v.map((el, idx)=>{
            return {type: Item, action: el.action, label: el.label, y: idx*90}
        })
    }

    get items(){
        return this.tag("Items").children;
    }

    get activeItem(){
        return this.items[this._index];
    }


    _handleUp(){
        this._setIndex(Math.max(0, --this._index));
    }

    _handleDown(){
        this._setIndex(Math.min(++this._index, this.items.length - 1));
    }

    _setIndex(idx){
        // since it's a one time transition we use smooth
        this.tag("FocusIndicator").setSmooth("y", idx*90 + 5)

        // store new index
        this._index = idx;
    }
}