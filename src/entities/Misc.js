import kaboom from "kaboom";
import { InteractArea } from "../Components/Components";


export function Interaction(grphics,interAction,areaSize = {width:32,height:32},destroyOnInteraction = true){
    return  [
        grphics,
        pos(100,100),
        area(areaSize),
    
        {
            add()
            {
                this.onCollide("player",() => {
                    const binded = interAction.bind(this)
                    binded.call(this)
                    if (destroyOnInteraction) destroy(this)
                })
            }
        },
    
        origin('center')
    ]
}


