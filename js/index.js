/* eslint-disable semi */
/* eslint-disable no-multiple-empty-lines */

class Panorama {
    constructor() {
        this.page = document.querySelector('.page');

        this.bg = null
        this.bgStartPosX = 50
        this.bgStartPosY = 50
        this.bgCurrentBgPosX = 0
        this.bgCurrentBgPosY = 0

        this.startTouches = null
        this.startTouchesX = 0
        this.startTouchesY = 0

    }

    init() {
        this.page.scrollLeft = 2100

        console.log('INIT');
        this.bg = document.querySelector('.panorama')
        this.bg.style.backgroundPosition = `${this.bgStartPosX}% ${this.bgStartPosY}%`
        this.touchStart()
    }

    touchStart() {
        this.bg.addEventListener('touchstart', event => {

            this.startTouches = event.changedTouches[0]
            this.bgCurrentBgPosX = this.bgStartPosX

            console.log(this.startTouchesX, this.startTouchesY);
        })
    }

}

const panorama = new Panorama()
panorama.init()












