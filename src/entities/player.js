import kaboom from 'kaboom'
import { InputJump, InputMovement, InputMovementLateral, InputMovementVertical } from '../Components/Components';


const playerBody =[
    rect(32,64),
    area(),
    body(),
    pos(width() / 2,height() / 2),
    color(100,100,100),
    origin('center'),
    InputMovementLateral(500),
    InputJump(800),
    "player",

];

const playerRPG = [
    rect(32,64),
    solid(),
    area({ width: 32, height: 16 }),
    pos(width() / 2,height() / 2),
    color(100,100,100),
    InputMovementVertical(300),
    InputMovementLateral(300),
    origin('bot'),
    "player"
]
module.exports =  playerRPG,playerBody;
