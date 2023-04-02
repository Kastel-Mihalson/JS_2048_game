export class Tile {
    constructor(gridElement) {
        this.tileElement = document.createElement("div");
        this.tileElement.classList.add("tile");
        this.setValue(Math.random() > 0.5 ? 2 : 4);
        gridElement.append(this.tileElement);
    }

    setXY(x, y) {
        this.y = y;
        this.x = x;
        this.tileElement.style.setProperty("--y", this.y);
        this.tileElement.style.setProperty("--x", this.x);
    }

    setValue(value) {
        this.value = value;
        this.tileElement.textContent = value;

        /**
         * Example: if tile value equal 2, then
         * 2 => 100 - 1 * 9 = 91;
         * 2048 => 100 - 11 * 9 = 1;
         */
        const bgLightness = 100 - Math.log2(value) * 9;
        this.tileElement.style.setProperty("--bg-lightness", `${bgLightness}%`);
        this.tileElement.style.setProperty("--text-lightness", `${bgLightness < 50 ? 90 : 10}%`);
    }

    removeFromDOM() {
        this.tileElement.remove();
    }

    waitForTransitionEnd() {
        return new Promise(resolve => {
            this.tileElement.addEventListener("transitionend", resolve, {onse: true});
        })
    }

    waitForAnimationEnd() {
        return new Promise(resolve => {
            this.tileElement.addEventListener("animationend", resolve, {onse: true});
        })
    }
}