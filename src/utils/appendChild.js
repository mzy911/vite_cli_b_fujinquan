import styleCss from "@style/common.module.css"
import styleModule from "@style/common.module.less"
import imageModule from "@image/xinlang.webp"

const contain = document.createElement('div')
const flexContain = document.createElement('div')
const imageContain = document.createElement('img')

document.body.appendChild(contain)
document.body.appendChild(flexContain)
document.body.appendChild(imageContain)

contain.className = styleModule.box
flexContain.className = styleCss.flexContain
imageContain.src = imageModule