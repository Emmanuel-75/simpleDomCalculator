const view = document.getElementById('display');
const theme_button = document.getElementById('light-mode');

function appendToDisplay(ops){
    let operators = ['+','-','/','*'];
    if (operators.includes(ops)){
        nonDuplicate(ops)
    }
    view.value += ops
}

function clearDisplay(){
    view.value = ''
}

function deleteLast(){
    let separator = view.value.split('');
    separator.pop();
    clearDisplay();
    appendToDisplay(separator.join(''));
}

function calculateResult(){
    try {
        view.value = eval(view.value);
    } catch (e) {
        view.value = "Error";
    }
}

function nonDuplicate(operand){
    let separator = view.value.split('');
    if (operand == separator[separator.length - 1]){
        deleteLast();
        appendToDisplay(operand)
    }
}

let night_mode = false
function dark_mode(button){
    button.style.borderRadius = "0 15px 15px 0";
    button.style.left = '50%';
    night_mode = true;
    const link = document.getElementById('themeStyleSheet');
    link.setAttribute('href','DomCalculator-darkMode.css')
}

function light_mode(button){
    button.style.borderRadius = "15px 0 0 15px";
    button.style.left = '0';
    night_mode = false;
    const link = document.getElementById('themeStyleSheet');
    link.setAttribute('href','DomCalculator-lightMode.css')
}

theme_button.addEventListener('click',()=>{
    if (night_mode === false){
        dark_mode(theme_button);
    }else if(night_mode === true){
        light_mode(theme_button)
    }
})

//Make sure sw are supported
if ('serviceWorker' in navigator){
    window.addEventListener('load', ()=>{
        navigator.serviceWorker
        .register('/sw_cached_pages.js')
        .then(reg => console.log('Service Worker: Registered'))
        .catch(err => console.log(`Service Worker: Error: ${err}`))
    })
}