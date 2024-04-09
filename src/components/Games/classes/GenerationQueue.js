import { generate_spritesheets } from "../../../Utility/Api";

export class GenerationQueue {
    constructor(char_id) {
        this.char_id = char_id;
        this.retarget_id = 'fair1_ppf_2';
        this.spritesheet_urls = {

        };
    }
    async generateSprite(animation) {
        const data = {
            char_id: this.char_id,
            animation,
            retarget_id: this.retarget_id,
        };

        try {
            const response = await generate_spritesheets(data);
            const spritesheet_url = response['spritesheet_url'];
            return spritesheet_url;
        } catch (error) {
            console.error(`Error generating spritesheets (${animation}):`, error);
        }
    }
}