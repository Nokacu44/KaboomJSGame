import kaboom from 'kaboom'
import playerBody from '../entities/player';
import banditBody from '../entities/bandit';


export default function main(){
    add(banditBody)
    add(playerBody)
    const hellotext = add([
        text('Hello K boom NPM',32),
        pos(width() * 0.5,height() * 0.5),
        color(100,100,100,1),
        origin('center'),
        z(1)
    ])

    const ground = add([
        rect(width(),10),
        pos(0,height() - 10),
        area(),
        solid()
    ])

    const level = addLevel(
        [
            '########          ',
            '#       ',
            '#       ',
            '#                     #',
            '#     #                  ',
            '#     #                ',
            '#     #                ',
            '#######           #',
            '#     ',
            '#      ',
            '#      ',
            '#      ',
            '######'
        ],
        {
            width: 32,
            height: 32,
            pos: vec2(0, 300),

            "#": () => [
                rect(32,32),
                area(),
                solid(),
                origin("bot"),
            ],
        }
    )
}
