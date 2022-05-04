import kaboom from "kaboom";
import { dialog, dialogInteraction, InputMovement, InteractArea } from "../Components/Components";

const banditBody = [
  rect(32,64),
  area(),
  body(),
  pos(width() - 100,height() / 2),
  color(255,0,255),
  dialog(['a','b','c']),
  InteractArea({width:128,height:64},'center', "player",(player) => {
  }),
  dialogInteraction({width:128,height:64},'center',"player"),
  origin('center'),
  
]

const banditRPG = [
  rect(32,64),
  area({ width: 32, height: 16 }),
  solid(),
  pos(width() - 100,height() / 2),
  color(255,0,255),
  dialog(['a','b','c']),
  //InteractArea({width:128,height:128},'bot', "player",(player) => {
  //}),
  dialogInteraction({width:128,height:64},'bot',"player"),
  origin('bot'), 
]

module.exports = banditRPG, banditBody;