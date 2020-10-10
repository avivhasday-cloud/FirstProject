function radioClicked(){
    let girl = document.getElementById("girl");
    let boy = document.getElementById("boy");
    if (girl.checked){
        boy.checked = false;
    }
    else if (boy.checked){
        girl.checked = false;
    }
}

function Game(){
    window.location.href ="avivhasday-cloud.github.io/FirstProject/"
}