const bill = document.querySelector("#inputBill");
const numberOfPeople = document.querySelector("#inputNoP");
const botones = document.querySelector("#container-buttons");
const custom_input = document.querySelector("#inputCustom");
const reset_btn = document.querySelector("#reset");
const error3 = document.querySelector(".error-3");
const error2 = document.querySelector(".error-2");
const error1 = document.querySelector(".error-1");
const tipAmount = document.querySelector(".tipAmount_cost");
const total_cost = document.querySelector(".total_cost");
const language = document.querySelector("select");
const bill_label = document.querySelector(".bill-label");
const tip_porcentage = document.querySelector(".tip-porcentage-h6");
const nop_label = document.querySelector(".nop-label");
const descripcion = document.querySelector("#descripcion-tipAmount");
const subdescripcion = document.querySelectorAll(".subdescripcion");
const other_project = document.querySelector(".bi-arrow-bar-left");

let valor;
let people;
let custom;

reset_btn.disabled = true;
bill.focus();

bill.addEventListener("keydown",(e)=>{
    if(e.keyCode === 13){
        e.preventDefault();
        valor = Number(bill.value);
        switch(true){
            case valor <= 0:{
                error1.style.display = "block";
                bill.style.border = "1px solid red";
            }
            break
            case valor > 0:{
                error1.style.display = "none";
                bill.style.border = "1px solid black";
                calcular();
            } 
        }
    }
})

botones.addEventListener("click",(e)=>{
    switch(e.target.innerText){
        case "5%": custom = 5/100;
        break;
        case "10%": custom = 10/100;
        break;
        case "15%": custom = 15/100;
        break;
        case "25%": custom = 25/100;
        break;
        case "50%": custom = 50/100;
    }
    calcular();
})

custom_input.addEventListener("keydown",(e)=>{
    if(e.keyCode === 13){
        e.preventDefault();
        custom = Number(custom_input.value)/100;
        switch(true){
            case custom <= 0:{
                custom_input.placeholder = "Invalid";
                custom_input.style.border = "1px solid red";
            }
            break
            case custom > 0:{
                custom_input.placeholder = "Custom";
                custom_input.style.border = "1px solid black";
                calcular();
            } 
        }
    }
})

numberOfPeople.addEventListener("keydown", (e)=>{
    if(e.keyCode === 13){
        e.preventDefault();
        people = Number(numberOfPeople.value);
        switch(true){
            case people === 0:{
                error2.style.display = "none";
                error3.style.display = "block";
                numberOfPeople.style.border = "1px solid red";
            }
            break
            case people < 0:{
                error2.style.display = "block";
                error3.style.display = "none";
                numberOfPeople.style.border = "1px solid red";
            }
            break
            case people > 0:{
                error2.style.display = "none";
                error3.style.display = "none";
                numberOfPeople.style.border = "1px solid black";
                calcular();
            } 
        }
    }
})

language.addEventListener("change",cambiarIdioma);

function calcular(){
    switch(true){
        case (valor === undefined):{
            bill.focus();
        }
        break;
        case (people === undefined):{
            numberOfPeople.focus();
        }
        break;
        case (custom === undefined):{
            custom_input.focus();
        }
        break;
        default:{
            let total = Number(((valor + (valor*custom))/people).toFixed(3));
            let amount = Number(((valor*custom)/people).toFixed(3));
            tipAmount.textContent = amount;
            total_cost.textContent = total;
            reset_btn.disabled = false;
            reset_btn.addEventListener("click",reset);
        };
    }
};

function reset(){
    reset_btn.disabled = true;
    bill.value = "";
    numberOfPeople.value = "";
    custom_input.value = "";
    if(language === "English"){
        custom_input.placeholder = "Custom";
    }else if(language === "Español"){
        custom_input = "Costumbre";
    };
    tipAmount.textContent = "0.00";
    total_cost.textContent = "0.00";
    valor = undefined;
    custom = undefined;
    people = undefined;
    amount = undefined;
    total = undefined;
    bill.focus();   
}

function cambiarIdioma(){
    if(language.value === "English"){
        error1.textContent = "Invalid Entry";
        bill_label.textContent = "Bill";
        tip_porcentage.textContent = "Select Tip %";
        if(custom_input.placeholder === "Costumbre"){
            custom_input.placeholder = "Custom";
        }else if(custom_input.placeholder === "Inválido"){
            custom_input.placeholder === "Invalid";
        }
        error2.textContent = "Invalid Entry";
        error3.textContent = "Can't be zero";
        nop_label.textContent = "Number of People";
        descripcion.textContent = "Tip Amount";
        subdescripcion[0].textContent = "/ person";
        subdescripcion[1].textContent = "/ person";
        other_project.textContent = "Other Projects";
        bill.title = "Press enter to send the data";
        numberOfPeople.title = "Press enter to send the data";
        custom_input.title = "Press enter to send the data";        
    }else if(language.value === "Español"){
        error1.textContent = "Entrada inválida";
        bill_label.textContent = "Factura";
        tip_porcentage.textContent = "Seleccione el % de propina";
        if(custom_input.placeholder === "Custom"){
            custom_input.placeholder = "Costumbre";
        }else if(custom_input.placeholder === "Invalid"){
            custom_input.placeholder === "Inválido";
        }
        error2.textContent = "Entrada Inválida";
        error3.textContent = "No puede ser cero";
        nop_label.textContent = "Número de personas";
        descripcion.textContent = "Monto de propina";
        subdescripcion[0].textContent = "/ persona";
        subdescripcion[1].textContent = "/ persona";
        other_project.textContent = "Otros Proyectos";
        bill.title = "Presione enter para enviar el dato";
        numberOfPeople.title = "Presione enter para enviar el dato";
        custom_input.title = "Presione enter para enviar el dato";
    }
}