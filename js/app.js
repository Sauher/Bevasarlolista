let nameField= document.getElementById("nameField")
let priceField = document.getElementById("priceField")
let countField = document.getElementById("countField")
let addBtn = document.getElementById("addBtn")
let itemsList = document.getElementById("itemsList")
let sumLbl = document.getElementById("sumLbl")
let optionList = document.getElementById("datalistOptions")

let sum = 0
let currentitem
let items = []
let productsList = []
addBtn.addEventListener("click", ()=>{
    if(nameField.value == '' || priceField.value == 0 || countField.value == 0){
        alert("Nem adtál meg minden adatot!")
        return
    }
    currentitem = {
        name:nameField.value,
        price: Number(priceField.value),
        count: Number(countField.value),
        sum: priceField.value * countField.value
    }
    let idx =
    items.push(currentitem)
    RefreshTable()
    ClearForm()
    save()
    optionGen()
    
});
function ClearForm(){
    nameField.value = ''
    priceField.value = 0
    countField.value = 0
}
function RefreshTable(){
    itemsList.innerHTML= '';
    for (let i = 0; i < items.length; i++) {
        let tr = document.createElement("tr")
        let td1 = document.createElement("td")
        let td2 = document.createElement("td")
        let td3 = document.createElement("td")
        let td4 = document.createElement("td")
        let td5  = document.createElement("td")
        let td6 = document.createElement("td")
        let btn = document.createElement("button")
        btn.onclick = () => {deleteItem(i)}

        btn.classList.add('btn', 'btn-danger', 'btn-sm')
        btn.innerHTML = "X"
        
        td1.innerHTML = i+1 +'.'
        td2.innerHTML = items[i].name
        td3.innerHTML = items[i].price+ 'Ft'
        td4.innerHTML = items[i].count + 'db'
        td5.innerHTML = items[i].sum + 'Ft'

        td3.classList.add('text-end')
        td4.classList.add('text-end')
        td5.classList.add('text-end')

        sum += items[i].sum

        tr.appendChild(td1)
        tr.appendChild(td2)
        tr.appendChild(td3)
        tr.appendChild(td4)
        tr.appendChild(td5)
        tr.appendChild(td6)
        td6.appendChild(btn)
        itemsList.appendChild(tr)
        
    }
sumLbl.innerHTML = sum
}

function optionGen(){
    optionList.innerHTML = ''
    for (let i = 0; i < productsList.length; i++) {
        option = document.createElement("option")
        option.innerHTML = productsList[i].name
        optionList.appendChild(option)
    }
}
function deleteItem(index){
    if(confirm("Biztosan törlöd a tételt?")){
        items.splice(index, 1)
        RefreshTable()
        save()
    }
}
function save(){
    localStorage.setItem('bevLista', JSON.stringify(items))
    localStorage.setItem('prodList', JSON.stringify(productsList))
}
function load(){
    if (localStorage.getItem('bevLista')){
        items = JSON.parse(localStorage.getItem('bevLista'))
    }
    if (localStorage.getItem('prodList')){
        productsList = JSON.parse(localStorage.getItem('prodList'))
    }
}
optionGen()
load()
RefreshTable()
ClearForm()
