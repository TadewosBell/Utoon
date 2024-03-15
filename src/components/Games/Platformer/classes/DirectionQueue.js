export class DirectionQueue {
    constructor() {
        this.heldDirections = [];
    }

    get direction() {
        return this.heldDirections[0] ?? null;
    }

    add(dir) {{
        const exists = this.heldDirections.includes(dir);

        if(exists) return;

        this.heldDirections.unshift(dir);
    }}

    remove(dir) {   
        this.heldDirections = this.heldDirections.filter(d => d !== dir);
    }
}