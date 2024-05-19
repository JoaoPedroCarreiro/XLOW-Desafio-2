import "./Slider.css"

export default function Slider({ imgs }) {
    const sliderLoadingAnimationTimeInSeconds = 6
    const sliderLoadingAnimation = `slider-loading-animation ${sliderLoadingAnimationTimeInSeconds}s linear infinite`

    let timeout = null

    let interval = setInterval(() => {
        const sliderImgs = document.getElementById("slider-imgs")
        const sliderLoading = document.getElementById("slider-loading")

        if(sliderImgs && sliderLoading) {
            clearInterval(interval)
            timeout = setTimeout(sliderToRight, sliderLoadingAnimationTimeInSeconds * 1000)

            sliderLoading.style.animation = sliderLoadingAnimation
        }
    }, 500)

    const sliderTo = (index) => {
        if(!timeout) return

        clearTimeout(timeout)

        const sliderImgs = document.getElementById("slider-imgs")
        const curImgIndex = Number(sliderImgs.getAttribute("data-cur-img-index"))

        sliderImgs.style.transform = `translateX(${-100 * index}vw)`

        const btnImgCur = document.getElementById(`slider-btn-img-${curImgIndex}`)
        btnImgCur.style.backgroundColor = ""
        btnImgCur.style.width = ""
        btnImgCur.style.height = ""

        const btnImgNext = document.getElementById(`slider-btn-img-${index}`)
        btnImgNext.style.backgroundColor = "rgb(22, 22, 24)"
        btnImgNext.style.width = "10px"
        btnImgNext.style.height = "10px"

        sliderImgs.setAttribute("data-cur-img-index", index)

        const sliderLoading = document.getElementById("slider-loading")
        sliderLoading.style.animation = "none"
        sliderLoading.getClientRects()
        sliderLoading.style.animation = sliderLoadingAnimation

        timeout = setTimeout(sliderToRight, sliderLoadingAnimationTimeInSeconds * 1000)
    }

    const sliderToLeft = () => {
        const sliderImgs = document.getElementById("slider-imgs")
        const curImgIndex = Number(sliderImgs.getAttribute("data-cur-img-index"))
        const nextImgIndex = curImgIndex - 1 < 0 ? imgs.length - 1 : curImgIndex - 1
        
        sliderTo(nextImgIndex)
    }

    const sliderToRight = () => {
        const sliderImgs = document.getElementById("slider-imgs")
        const curImgIndex = Number(sliderImgs.getAttribute("data-cur-img-index"))
        const nextImgIndex = curImgIndex + 1 > imgs.length - 1 ? 0 : curImgIndex + 1

        sliderTo(nextImgIndex)
    }

    const imgSrc = (src) => {
        let absSrc = null
        try { absSrc = require(`../assets/${src}`) } catch { absSrc = src }

        return absSrc
    }

    return (
        <div id="slider">
            <div id="slider-arrows">
                <button id="slider-left" onClick={sliderToLeft}><i className="bx bx-chevron-left"></i></button>
                <button id="slider-right" onClick={sliderToRight}><i className="bx bx-chevron-right"></i></button>
            </div>
            <div id="slider-imgs" data-cur-img-index={0}>
                { imgs.map((img, index) => <a key={`slider-img-${index}`} href={img.href}><img src={imgSrc(img.src)} alt={img.alt} /></a>) }
            </div>
            <div id="slider-btns">
                { imgs.map((_, index) => <button id={`slider-btn-img-${index}`} key={`slider-btn-img-${index}`} onClick={() => sliderTo(index)}></button>)  }
            </div>
            <div id="slider-loading"></div>
        </div>
    )
}