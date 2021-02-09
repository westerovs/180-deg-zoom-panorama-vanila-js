class Panorama {
    constructor() {
        this.page = document.querySelector('.page');
        this.bg = document.querySelector('.panorama')

        this.bgStartPosX = 50
        this.bgStartPosY = 50
        this.bgCurrentBgPosX = 0

        this.startTouches = null
        this.speed = 20
    }

    init() {
        console.log('INIT');
        this.bg.style.backgroundPosition = `${this.bgStartPosX}% ${this.bgStartPosY}%`
        this.touchStart()
        this.touchMove()
    }

    touchStart() {
        this.bg.addEventListener('touchstart', event => {
            event.preventDefault();

            this.startTouches = event.changedTouches[0]
            this.bgCurrentBgPosX = this.bgStartPosX
        })
    }
    touchMove() {
        this.bg.addEventListener('touchmove', event => {
            event.preventDefault();

            const moveTouches = event.changedTouches[0];
            const differenceStartMove = this.startTouches.pageX - moveTouches.pageX;

            this.bgStartPosX = this.bgCurrentBgPosX + (differenceStartMove / this.speed)

            if (this.bgStartPosX <= 0) this.bgStartPosX = 0
            else if (this.bgStartPosX >= 100) this.bgStartPosX = 100

            this.bg.style.backgroundPosition = `${this.bgStartPosX}% 50%`
        })
    }
}

const panorama = new Panorama()
panorama.init()
