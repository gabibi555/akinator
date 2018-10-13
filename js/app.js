'use strict';

var gQuestsTree;
var gCurrQuest;
var gPrevQuest = null;
var gLastRes = null;

$(document).ready(init);

function init() {
    var treeFromMemory = JSON.parse(localStorage.getItem('gQuestsTree'));
    console.log(treeFromMemory);
    if (treeFromMemory) {
        gQuestsTree = treeFromMemory
    } else {
        gQuestsTree = createQuest('Male');
        gQuestsTree.yes = createQuest('Gandhi');
        gQuestsTree.no = createQuest('Rita');

    }
    $('.vital-btns').show('fade')
    
    gCurrQuest = gQuestsTree;
}

function startGuessing() {
    $('.gameStart').hide('fade')

    renderQuest();
    $('.gameQuest').show('fade')
    
    
    
}

function renderQuest() {
    console.log(gCurrQuest.txt)
    $('.curr-quest').text(gCurrQuest.txt + '?');

    // TODO: select the <h2> inside gameQuest and update its text by the currQuest text
}

function userResponse(res) {

    // If this node has no children
    if (isChildless(gCurrQuest)) {
        if (res === 'yes') {
            alert('Yes, I knew it!');
            // TODO: improve UX
        } else {
            alert('I dont know...teach me!')
            $('.gameNewQuest').show('fade')
            $('.vital-btns').hide('fade')

          
    
            // TODO: hide and show gameNewQuest section
        }
    } else {
        gPrevQuest = gCurrQuest;
        gCurrQuest = gCurrQuest[res]
        gLastRes = res
        renderQuest()
    }
}


function addGuess(ev) {

    ev.preventDefault()
    // TODO: create 2 new Quests based on the inputs' values
    // TODO: connect the 2 Quests to the quetsions tree
    var newNo = gCurrQuest.txt
    gCurrQuest.no = createQuest(newNo)
    gCurrQuest.yes= createQuest($('#newGuess').val())
    gCurrQuest.txt = $('#newQuest').val()
    // console.log($('#newQuest').val())
    localStorage.setItem('gQuestsTree', JSON.stringify(gQuestsTree))
    $('.curr-quest').text('')
    console.log(gQuestsTree)

    restartGame();
}

function createQuest(txt) {
    return {
        txt: txt,
        yes: null,
        no: null
    }
}

function restartGame() { 
    $('.gameNewQuest').hide();
    $('.gameStart').show();
    console.log();
    $('.gameQuest').hide();
    gQuestsTree = JSON.parse(localStorage.getItem('gQuestsTree'));
    console.log(gQuestsTree)
    gCurrQuest = gQuestsTree;
    gPrevQuest = null;
    gLastRes = null;
}

function isChildless(node) {
    return (node.yes === null && node.no === null)
}