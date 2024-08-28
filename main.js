"use strict";

// APLICAR EVENTLISTENERS AOS CARTÕES

const cards = document.querySelectorAll(".card");
cards.forEach(c => {
    c.addEventListener("mouseenter", hoverEffects);
    c.addEventListener("mouseleave", leaveEffects);
    c.addEventListener("click", turnEffects);
});

/** APLICAR EFEITO NO CARTÃO SOB HOVER E INVOCAR EFEITOS PARA OS CARTÕES LATERAIS
 * @param {HTMLDivElement} card  */
function hoverEffects({currentTarget: card}) {
    const wrapper = card.parentElement;
    wrapper.style.zIndex = "2";
    card.style.transform = "translateZ(50px)";
    card.querySelector(".front .pic-holder").style.transform = "translateZ(60px)";
    const siblingsRight = getSiblingCards(wrapper, "next");
    const siblingsLeft = getSiblingCards(wrapper, "prev");
    adjustSiblings(siblingsRight, "next");
    adjustSiblings(siblingsLeft, "prev");
}
/** EFEITO DE REINICIAR NO CARTÃO PASSADO E INVOCAR A REINICIALIZAÇÃO DE IRMÃOS
 * @param {HTMLDivElement} card */
function leaveEffects({currentTarget: card}) {
    card.style.transform = "";
    card.classList.remove("is-turned");
    const wrapper = card.parentElement;
    wrapper.style.zIndex = "0";
    const siblingsRight = getSiblingCards(wrapper, "next");
    const siblingsLeft = getSiblingCards(wrapper, "prev");
    resetSiblings(siblingsRight);
    resetSiblings(siblingsLeft);
}
/** CHAMADA PARA CARTÕES DE TUNRING QUANDO CLICADO
 * @param {HTMLDivElement} card */
function turnEffects({currentTarget: card}) {
    if(card.classList.contains("is-turned"))
        {
            card.style.transform = "translateZ(50px) rotateY(0)";
            card.classList.remove("is-turned");
        }
        else
        {
            card.style.transform = "translateZ(50px) rotateY(180deg)";
            card.classList.add("is-turned");
        }
}
/** BUSCAR IRMÃOS À DIREITA OU À ESQUERDA DO CARTÃO PASSADO
 * @param {HTMLDivElement} wrapper 
 * @param {string} type 
 * @returns {HTMLDivElement[]} */
function getSiblingCards(wrapper, type) {
    let currentWrapper =
    type === "next" ?
    wrapper.nextElementSibling : wrapper.previousElementSibling;
    const array = [];
    if(currentWrapper) {
        do {
            array.push(currentWrapper.querySelector(".card"));
            currentWrapper =
            type === "next" ?
            currentWrapper.nextElementSibling : currentWrapper.previousElementSibling;
        }
        while(currentWrapper);
    }
    return array;
}
/** COMPUTAR VALORES DE TRANSFORMAÇÃO DIFERENTES COM BASE NOS IRMÃOS´
 *  INDEX
 * @param {HTMLDivElement[]} array 
 * @param {string} type */
function adjustSiblings(array, type) {
    let offsetImmediate =
    type === "next" ?
    -20 : 20;
    let offset =
    type === "next" ?
    -20 : 20;
    let angleFirst =
    type === "next" ?
    "35deg" : "-35deg";
    let angleSecond =
    type === "next" ?
    "25deg" : "-25deg";
    array.forEach((card, index) => {
        let wrapper = card.parentElement;
        switch(index) {
            case 0:
                wrapper.style.zIndex = "1";
                wrapper.style.transform = `translateX(${offsetImmediate}px)`;
                card.style.transform = `rotateY(${angleFirst})`;
                card.querySelector(".front .pic-holder").style.transform = "translateZ(60px)";
                break;
            case 1:
                wrapper.style.zIndex = "0";
                wrapper.style.transform = `translateX(${offsetImmediate * 2}px)`;
                card.style.transform = `rotateY(${angleSecond}) translateZ(-50px)`;
                card.querySelector(".front .pic-holder").style.transform = "translateZ(60px)";
                break;
            default:
                wrapper.style.transform = `translateX(${offset * (index * 2)}px)`;
                card.style.transform = "translateZ(-70px)";
                break;
        }
    });
}
/** REINICIA TODAS AS TRANSFORMAÇÕES DOS IRMÃOS
 * @param {HTMLDivElement[]} array  */
function resetSiblings(array) {
    array.forEach(card => {
        card.style.transform = "";
        card.parentElement.style.transform = "";
        card.querySelector(".front .pic-holder").style.transform = "translateZ(0)";
    });
}