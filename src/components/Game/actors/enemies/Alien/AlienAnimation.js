import * as ex from "excalibur";

const images = {
    idleSheet: new ex.ImageSource("https://s3.amazonaws.com/utoon-animator/Animations/SpriteSheets/gstrMloHND_Idle_sprite_sheet.png"),
    jumpSheet: new ex.ImageSource("https://s3.amazonaws.com/utoon-animator/Animations/SpriteSheets/gstrMloHND_Game_Jump_sprite_sheet.png"),
    runSheet: new ex.ImageSource("https://s3.amazonaws.com/utoon-animator/Animations/SpriteSheets/gstrMloHND_Running_sprite_sheet.png"),
}

// async function loadAlienAnimations () {

    const alienAnimationsMap = {};

    await images.idleSheet.load();
    if(images.idleSheet.isLoaded()) {
        const idleSheet = ex.SpriteSheet.fromImageSource({
            image: images.idleSheet,
            grid: {
                columns: 20,
                rows: 1,
                spriteWidth: 75,
                spriteHeight: 65,
            }
        });
        const idle_right = ex.Animation.fromSpriteSheet(idleSheet, ex.range(0, 20), 25);
        const idle_left = ex.Animation.fromSpriteSheet(idleSheet, ex.range(0, 20), 25);
        idle_left.flipHorizontal = true;
        console.log("Loaded custom animations");
        alienAnimationsMap.IDLE = [idle_left, idle_right]
    }

    await images.runSheet.load();
    if(images.runSheet.isLoaded()) {
        const runSheet = ex.SpriteSheet.fromImageSource({
            image: images.runSheet,
            grid: {
                columns: 20,
                rows: 1,
                spriteWidth: 1500 / 20,
                spriteHeight: 65,
            }
        });
        const run_right = ex.Animation.fromSpriteSheet(runSheet, ex.range(0, 20), 25);
        const run_left = ex.Animation.fromSpriteSheet(runSheet, ex.range(0, 20), 25);
        run_left.flipHorizontal = true;
        alienAnimationsMap.RUN =  [run_left, run_right]
    }

    await images.jumpSheet.load();
    if(images.jumpSheet.isLoaded()) {
        const jumpSheet = ex.SpriteSheet.fromImageSource({
        image: images.jumpSheet,
        grid: {
            columns: 20,
            rows: 1,
            spriteWidth: 1500 / 20,
            spriteHeight: 65,
        }
        });
        const jump_right = ex.Animation.fromSpriteSheet(jumpSheet, ex.range(0, 20), 25);
        const jump_left = ex.Animation.fromSpriteSheet(jumpSheet, ex.range(0, 20), 25);
        jump_left.flipHorizontal = true;
        alienAnimationsMap.JUMP =  [jump_left, jump_right]
    }

    // return alienAnimationsMap;
// }

export default alienAnimationsMap;