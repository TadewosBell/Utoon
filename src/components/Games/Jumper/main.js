import * as ex from "excalibur";
import Scene from './scenes'

//delclare async function intialize_game (running_spritesheet_url, idle_spritesheet_url)
export const initialize_game = async (urls) =>
{
    const customResources = {}
    const customAnimationsMap = {}
    const game = new ex.Engine({
        backgroundColor: ex.Color.fromHex("#273d58"),
        antialiasing: false,
        resolution: {
            height: 480,
            width: 480,
        },
        displayMode: ex.DisplayMode.FitScreenAndFill,
    })
    
    game.showDebug(true)
    const scene = Scene();
    game.add(scene)
    
    ex.Physics.gravity = new ex.Vector(0, 1 * 60 * 60)

    customResources.astroRunningSheet = new ex.ImageSource(urls.running_spritesheet_url);

    await customResources.astroRunningSheet.load();
    if (customResources.astroRunningSheet.isLoaded()) {
        const run_sheet = ex.SpriteSheet.fromImageSource({
            image: customResources.astroRunningSheet,
            grid: {
                columns: 20,
                rows: 1,
                spriteWidth: 1500 / 20,
                spriteHeight: 65,
            }
        });
        const run_right = ex.Animation.fromSpriteSheet(run_sheet, ex.range(0, 20), 25);
        const run_left = ex.Animation.fromSpriteSheet(run_sheet, ex.range(0, 20), 25);
        run_left.flipHorizontal = true;
        customAnimationsMap.RUN =  [run_left, run_right]
    };



    

    return game;
}

