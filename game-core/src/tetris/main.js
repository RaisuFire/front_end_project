import Game from './game/game'

function __main() {
    let g = Game.instance(function(game) {
        game.run()
    })
}

__main()
