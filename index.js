import { gogginsData } from './data.js'

const moodsContainerEl = document.getElementById('moods-container')
const getImageBtn = document.getElementById('get-image-btn')
const modalCloseBtn = document.getElementById('modal-close-btn')
const modalContainer = document.getElementById('modal-container')
const gifOnlyOption = document.getElementById('gif-only-option')
const modalInner = document.getElementById('modal-inner')

moodsContainerEl.addEventListener("change",highlightCheckedOption)
modalCloseBtn.addEventListener("click", closeModal)
getImageBtn.addEventListener("click",renderGoggins)

function highlightCheckedOption(e){
    const radios = document.getElementsByClassName('radio')
    for (let radio of radios){
        radio.classList.remove('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}

function closeModal(){
    modalContainer.style.display = 'none'
}

function renderGoggins(){
    const singleGogginsObject = getSingleGoggins()
    modalInner.innerHTML = `
            <img 
            class="goggins-img"
            src="images/${singleGogginsObject.image}" 
            alt="${singleGogginsObject.alt}"
            >                  
            `
    modalContainer.style.display = 'flex'
}

function getSingleGoggins(){
    const gogginsArray = getMatchGogginsArray()
    if (gogginsArray.length === 1){
        return gogginsArray[0]
    }else{
        const randomNumber = Math.floor(Math.random()*gogginsArray.length)
        return gogginsArray[randomNumber]
    }
}

function getMatchGogginsArray(){
    if(document.querySelector('input[type="radio"]:checked')){
        const selectedMood = document.querySelector('input[type="radio"]:checked').value
        const isGif = gifOnlyOption.checked
        const matchingGogginsArray = gogginsData.filter(function(gogging){
            if (isGif){
                return gogging.emotionTags.includes(selectedMood) && gogging.isGif 
            }else{
                return gogging.emotionTags.includes(selectedMood)
            } 
        })
        return matchingGogginsArray
    }
} 

function getEmotionsArray(gogginsObjects){
    const emotionsArray = []
    for (let gogginsObject of gogginsObjects){
        for (let emotion of gogginsObject.emotionTags){
            if (!emotionsArray.includes(emotion)){
                emotionsArray.push(emotion)
            }
        }
    }  
    return emotionsArray
}  

function renderEmotionsRadios(gogginsObjects){
    let radioItems = ``
    const emotionsArray = getEmotionsArray(gogginsObjects)
    for (let emotion of emotionsArray){
        radioItems+=`
        <div class="radio">
            <label for="${emotion}">${emotion}</label>
            <input 
            type="radio"
            id="${emotion}"
            value="${emotion}"
            name="emotions"
            >
        </div>`    
    }
    moodsContainerEl.innerHTML = radioItems
}

renderEmotionsRadios(gogginsData)