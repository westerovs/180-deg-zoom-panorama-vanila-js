class Panorama {
    constructor() {
        this.page = document.querySelector('.page')
        this.panorama = document.querySelector('.panorama')

        this.initpanoramaPosition = -2125
        this.panorama.style.left = `${this.initpanoramaPosition}px`
        this.panorama.style.transform = `${this.initpanoramaPosition}px`
        this.speed = 2
        
        this.initpanoramaWidth = this.panorama.offsetWidth
        this.initpanoramaHeight = this.panorama.offsetHeight
        
        this.currentpanoramaWidth = null
        this.currentpanoramaHeight = null
        this.differencepanoramaWidth = null
        this.differencepanoramaHeight = null
        
        this.offsetTouchX = null
        this.offsetTouchY = null

        this.scale = 1
        this.maxScale = 2
    }

    // ------------------------ touchStart
    init = () => {
        this.panorama.addEventListener('touchstart', this.touchStart)
        this.panorama.addEventListener('touchmove', this.touchMove)
        this.panorama.addEventListener('wheel', this.zoom)
    }

    touchStart = (event) => {
        const touch = event.targetTouches[0]
        this.offsetTouchX = touch.pageX - this.panorama.getBoundingClientRect().left
        this.offsetTouchY = touch.pageY - this.panorama.getBoundingClientRect().top

        this.currentpanoramaWidth = this.panorama.getBoundingClientRect().right - this.panorama.getBoundingClientRect().left
        this.currentpanoramaHeight = this.panorama.getBoundingClientRect().bottom - this.panorama.getBoundingClientRect().top
        this.differencepanoramaWidth = (this.currentpanoramaWidth - this.initpanoramaWidth) / 2
        this.differencepanoramaHeight = (this.currentpanoramaHeight - this.initpanoramaHeight) / 2
    }

    // ------------------------ touchMove
    touchMove = (event) => {
        const touch = event.targetTouches[0]
        this.panorama.style.top = `${touch.pageY - (this.page.offsetTop) - (this.offsetTouchY) + this.differencepanoramaHeight}px`
        this.panorama.style.left = `${touch.pageX - (this.page.offsetLeft) - (this.offsetTouchX) + this.differencepanoramaWidth}px`

        this.comparisonCoord()
    }

    comparisonCoord() {
        if (this.panorama.getBoundingClientRect().top > this.page.getBoundingClientRect().top) {
            console.log('UP')
            this.panorama.style.top = `${ this.differencepanoramaHeight }px`
            this.panorama.style.bottom = ''
        }
        if (this.panorama.getBoundingClientRect().bottom < this.page.getBoundingClientRect().bottom) {
            console.log('DOWN')
            this.panorama.style.top = ''
            this.panorama.style.bottom = `${ this.differencepanoramaHeight }px`
        }
        if (this.panorama.getBoundingClientRect().left > this.page.getBoundingClientRect().left) {
            console.log('left')
            this.panorama.style.left = `${ this.differencepanoramaWidth }px`
            this.panorama.style.right = ''
        }
        if (this.panorama.getBoundingClientRect().right < this.page.getBoundingClientRect().right) {
            console.log('RIGHT')
            this.panorama.style.right = `${ this.differencepanoramaWidth}px`
            this.panorama.style.left = ''
        }
    }

    zoom = (event) => {
        const stepScale = event.deltaY / 1000

        console.log(stepScale);
        this.scale = this.scale + (0.2 * -stepScale);
        this.panorama.style.transform = `scale(${this.scale})`

        if (this.scale <= 1) {
            this.scale = 1
            this.panorama.style.transform = `scale(${this.scale})`
            this.panorama.style.top = ''
            this.panorama.style.bottom = ''
        }
        else if (this.scale >= this.maxScale) this.scale = this.maxScale
    }
}

const panorama = new Panorama()
panorama.init()