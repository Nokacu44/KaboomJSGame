import kaboom from 'kaboom'
import playerRPG from '../entities/player';
import banditRPG from '../entities/bandit';
import { Interaction } from '../entities/Misc'
export default function rpg(){

  const player = add(playerRPG)
  add(banditRPG)
  add(Interaction(rect(32,32),function (){
    console.log("acces to inventory")
  }))



}