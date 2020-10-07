/* eslint-disable semi */
/* eslint-disable no-multiple-empty-lines */
class Panorama {
    constructor() {
        this.page = document.querySelector('.page');
        this.bg = document.querySelector('.panorama')

        this.bgStartPosX = 50
        this.bgCurrentBgPosX = 0

        this.bgStartPosY = 50
        this.bgCurrentBgPosY = 0

        this.startTouches = null
        this.speed = 20
        this.scale = 1
    }

    init() {
        this.bg.style.backgroundPosition = `${this.bgStartPosX}% ${this.bgStartPosY}%`
        // this.touchStart()
        // this.touchMove()
        this.zoom()
    }

    touchStart() {
        this.bg.addEventListener('touchstart', event => {
            event.preventDefault();

            this.startTouches = event.changedTouches[0]
            this.bgCurrentBgPosX = this.bgStartPosX
            this.bgCurrentBgPosY = this.bgStartPosY
        })
    }
    touchMove() {
        this.bg.addEventListener('touchmove', event => {
            event.preventDefault();

            const moveTouches = event.changedTouches[0];
            const differenceStartMoveX = this.startTouches.pageX - moveTouches.pageX;
            const differenceStartMoveY = this.startTouches.pageY - moveTouches.pageY;

            this.bgStartPosX = this.bgCurrentBgPosX + (differenceStartMoveX / this.speed)
            this.bgStartPosY = this.bgCurrentBgPosY + (differenceStartMoveY / this.speed)

            if (this.bgStartPosX <= 0) this.bgStartPosX = 0
            if (this.bgStartPosY <= 0) this.bgStartPosY = 0
            if (this.bgStartPosX >= 100) this.bgStartPosX = 100
            if (this.bgStartPosY >= 100) this.bgStartPosY = 100

            this.bg.style.backgroundPosition = `${this.bgStartPosX}% ${this.bgStartPosY}%`
        })
    }

    zoom() {
        this.page.addEventListener('wheel', event => {
            const stepScale = event.deltaY / 1000

            this.scale = this.scale + 0.2 * -stepScale;
            this.page.style.transform = `scale(${this.scale})`

            if (this.scale <= 1) {
                this.scale = 1
                this.page.style.transform = `scale(${this.scale})`
            }
        })
    }
}

const panorama = new Panorama()
panorama.init()








