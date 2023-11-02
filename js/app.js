const DESCUENTOS_MOCK = [
    { tipo: "Estudiante", valor: 0.8, color: "blue" },
    { tipo: "Trainee", valor: 0.5, color: "green" },
    { tipo: "Junior", valor: 0.15, color: "yellow" }
]
const VALORTICKET_MOCK = 200;

const DESCUENTOS_API = DESCUENTOS_MOCK;
const VALORTICKET_API = VALORTICKET_MOCK;

let descuentoString = "";
let descuentoValor = 1;

function submit(){
    let cantidad = document.getElementById("cantidad").value
    alert(
        `Compraste: ${cantidad} ticket\n`+
        `Descuento: ${descuentoString}\n`+
        `Pagas el ${Math.floor(descuentoValor*100)}% del total\n`+
        `A pagar: $${Math.floor(total())}\n`
    )
}

function borrar(){
    limpiar();
    resultado("");
    document.getElementById("cantidad").value = null;
}
function calcular(){
    resultado(Math.floor(total()));
}

function total(){
    let cantidad = document.getElementById("cantidad").value
    return VALORTICKET_API * descuentoValor * cantidad;
}

function resultado(total){
    document.getElementById("total").innerHTML = total;
}

function cargarDescuentos() {
    const listaDescuentos = document.getElementById("listaDescuentos");
    const listaCategoria = document.getElementById("categoria");
    const valorTicket = document.getElementById("valorTicket");
    for (let i = 0; i < DESCUENTOS_API.length; i++) {
        listaDescuentos.insertAdjacentHTML("beforeend",
            elementoDescuento(
                DESCUENTOS_API[i].tipo,
                DESCUENTOS_API[i].valor,
                DESCUENTOS_API[i].color
            ));
        listaCategoria.insertAdjacentHTML("beforeend",
            elementoOption(DESCUENTOS_API[i].tipo)
        );
    }
    valorTicket.innerHTML = VALORTICKET_API;
}

function seleccionar(tipo) {
    if (tipo != "") {
        for (let i = 0; i < DESCUENTOS_API.length; i++) {
            if (tipo == DESCUENTOS_API[i].tipo) {
                fondo(DESCUENTOS_API[i])
            }
        }
    } else {
        limpiar();
    }
}

function fondo(descuento) {
    limpiar();
    document.getElementById(`descuento${descuento.tipo}`).style.background = '#C0C0C0';
    document.getElementById(`descuento${descuento.tipo}`).style.outline = `2px solid ${descuento.color}`;
    document.getElementById(`descuento${descuento.tipo}`).style.textShadow = `1px 1px 3px ${descuento.color}`;
    document.getElementById(`descuento${descuento.tipo}`).style.filter = `drop-shadow(2px 2px 4px ${descuento.color})`;
    document.getElementById(`option${descuento.tipo}`).toggleAttribute('selected');
    descuentoString = descuento.tipo;
    descuentoValor = descuentoValor - descuento.valor;
    calcular();
}

function limpiar() {
    let descuentos = document.getElementsByClassName("descuento");
    for (let i = 0; i < descuentos.length; i++) {
        descuentos.item(i).style.background = '#FFFFFF';
        descuentos.item(i).style.outline = 'none';
        descuentos.item(i).style.textShadow = 'none';
        descuentos.item(i).style.filter = 'none';
    }
    let opciones = document.getElementsByTagName("option");
    for (let i = 0; i < opciones.length; i++) {
        opciones.item(i).removeAttribute('selected');
    }
    descuentoString = "";
    descuentoValor = 1; 
}

function elementoDescuento(tipo, valor, color) {
    return `<div class="col card descuento text-center" id="descuento${tipo}" onclick="seleccionar('${tipo}')" style="border: 1px solid ${color}">` +
        '<div class="card-body">' +
        `<h3 class="card-title" >${tipo}</h3>` +
        '<p class="card-text">Tienes un descuento</p>' +
        `<h4>${Math.floor(valor * 100)}%</h4>` +
        `<p class="card-text tags"><small>* presentar documentación</small></p>` +
        '</div></div>';
}
function elementoOption(tipo) {
    return `<option value="${tipo}" id="option${tipo}">${tipo}</option>`;
}