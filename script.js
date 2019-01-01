let gridParent = document.querySelector(".gridParent");
let gridArray = [];
const outputField = document.querySelector('#output');
let input = document.querySelector('#nameIn');
let expectingName = false;
let selectStorage = [];

let setupGrid = (width , height) => {
    gridArray = [];
    gridParent.innerHTML = "";
    for (let i = 0; i < height * width; i++) {
        gridArray[i] = createGridItem(i);
        // const arr = [];
        // for (let j = 0; j < width; j++) {
        //     arr[j] = createGridItem(i*width + j); 
        // }
        // gridArray[i] = arr;
    }
    let ds = new DragSelect({
        selectables: document.querySelectorAll('.gridItem'),
        area: document.getElementById('gridParent'),
        callback: e => {storeNames(e); acceptName()}
      });
    
    gridParent.style.gridTemplateColumns = "repeat("+width+",auto)"
}
let createGridItem = (index) => {
        const element = document.createElement("button");
        element.className += " gridItem"
        element.id = "" + index;
        element.innerHTML = "<p></p>";
        
        gridParent.append(element);
}

let storeNames = (Arr) => {
    selectStorage = Arr;
} 

let setNames = (selectedArray = selectStorage) => {
    for (let i = 0; i < selectedArray.length; i++) {
        const element = selectedArray[i];
        element.innerHTML = "<p>"+input.value+"<p>";
        gridArray[element.id] = input.value;
    }
}


let acceptName = (e) => {
    // input visible
    expectingName = true;
    input.style.visibility = "visible";
    input.focus();
}
window.addEventListener('keypress', function (e) {
    if (e.keyCode === 13 && expectingName) {
        setNames();
        input.value = "";
        expectingName = false;
        input.style.visibility = "hidden"
        outputGridArray();
    }
}, false);




let resWidth = document.querySelector('#resW');
let resHeight = document.querySelector('#resH');

resWidth.addEventListener('change', (e) =>{
    setupGrid(resWidth.value, resHeight.value);
});
resHeight.addEventListener('change', (e) =>{
    setupGrid(resWidth.value, resHeight.value);
});

setupGrid(resWidth.value, resHeight.value);
outputField.textContent = "aaa \naaa \n \raaa";
console.log(gridArray);

let outputGridArray = (arr = gridArray) => {
    let out = "";
    out += "grid-template-areas:";
    for (let i = 0; i < resHeight.value; i++) {
        out += "\n\t"
        out += "\""
        for (let j = 0; j < resWidth.value; j++) {
            out += " "
            out += arr[i*resWidth.value  + j];
            
        }
        out += " \""

    }
    out += ";"
    outputField.textContent = out;
}




