import { generate_spritesheets } from "../../../Utility/Api";

export class GenerationQueue {
    constructor(char_id) {
        this.char_id = char_id;
        this.retarget_id = 'fair1_ppf_2';
        this.spritesheet_urls = {

        };
    }

    get spritesheet_urls() {
        return this.spritesheet_urls ?? null;
    }

    async generateSprite(animation) {
        const data = {
            char_id: this.char_id,
            animation,
            retarget_id: this.retarget_id,
        };

        try {
            const response = await generateSpritesheets(data);
            console.log(`generate_spritesheets (${animation}):`, response);
        } catch (error) {
            console.error(`Error generating spritesheets (${animation}):`, error);
        }
    }
}