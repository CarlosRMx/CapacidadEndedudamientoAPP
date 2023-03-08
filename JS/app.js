//containers
const mainContainer=document.querySelector('#mainContainer');
const inputs=document.querySelector('.data');
const reportContainer = document.querySelector('.outcome');

// var

const btnAddMoney=document.querySelector('#ingresar');
const btnGenerate=document.querySelector('#generar');

const listIncomes=[];
const listLosses=[];

btnAddMoney.addEventListener('click',addData);

function addData(){
    const inputMoney=Number(document.querySelector('#amount').value);
    const inputSelect=document.querySelector('#tipoValue').value;
    console.log({inputMoney,inputSelect});

    if(inputMoney === 0 || inputSelect === ''){
        // console.warn('Los campos estan vacios');
        mostarError('Los campos estan vacios');

        const errores=document.querySelector('p.error');
        if(errores){
            setTimeout(() => {
                errores.remove();
            }, 3000);
        }
    }else{
        const newInput=document.querySelector('#amount');
        newInput.value='';
        if(inputSelect === 'ADD'){
            listIncomes.push(inputMoney);
        }else{
            listLosses.push(inputMoney);
        }
    }
    limpiarHtml();
    capacidadEndeudamiento(listIncomes,listLosses)
}


function capacidadEndeudamiento(incomes,loses){
    if(incomes.length > 0 && loses.length > 0){
        const totalIncomes=sumaList(incomes);
        const totalLoses=sumaList(loses);

        const result = Math.round( (totalIncomes-totalLoses)*0.35);
        
        const divOne=document.createElement('div');
        divOne.classList.add('outcome__abstract');
        const divSecondaryOne=document.createElement('div');
        divSecondaryOne.classList.add('outcome__header');

        const titleOne=document.createElement('h3');
        titleOne.classList.add('outcome__title');
        titleOne.textContent='Total de ingresos'
        const income=document.createElement('span');
        income.classList.add('outcome__content');
        income.textContent=`$ ${totalIncomes}.00`;

        divSecondaryOne.appendChild(titleOne);
        divSecondaryOne.appendChild(income);

        divOne.appendChild(divSecondaryOne);

        const divTwo=document.createElement('div');
        divOne.classList.add('outcome__abstract');
        const divSecondaryTwo=document.createElement('div');
        divSecondaryTwo.classList.add('outcome__header');

        const titleTwo=document.createElement('h3');
        titleTwo.classList.add('outcome__title');
        titleTwo.textContent='Total de egresos'
        const lost=document.createElement('span');
        lost.classList.add('outcome__content', 'outcome__content--red');
        lost.textContent=`$ ${totalLoses}.00`;

        divSecondaryTwo.appendChild(titleTwo);
        divSecondaryTwo.appendChild(lost);

        divTwo.appendChild(divSecondaryTwo);


        const abstract=document.createElement('section');
        abstract.classList.add('detail');
        const abstractTittle=document.createElement('h2');
        abstractTittle.classList.add('detail__header');
        abstractTittle.textContent='Tu porcentaje de endeudamiento es el siguiente';
        const total=document.createElement('p');
        total.classList.add('detail__result','outcome__content','outcome__content--percent');
        total.textContent=`$ ${result}.00`;
        const detail=document.createElement('p');
        detail.classList.add('detail__analyst');
        if(result <= 0){
            detail.textContent=`No puedes acceder a ningun prestamo`;
        }else{
            detail.textContent=`Tu capaccidad de ededudamiento no debe exceder los $ ${result}.00 dolares`;
        }

        abstract.appendChild(abstractTittle);
        abstract.appendChild(total);
        abstract.appendChild(detail);

        //all report 
        reportContainer.appendChild(divOne);
        reportContainer.appendChild(divTwo);
        reportContainer.appendChild(abstract);
        //show HTML
        mainContainer.appendChild(reportContainer);

    }else{
        console.warn('No hay datos sufucientes');
    }

}

function sumaList(list){
    const sumarElementos=(acumulado,nuevo)=>{
        return acumulado + nuevo;
    }

    const total=list.reduce(sumarElementos);
    return total;
} 
function limpiarHtml(){
    //forma lenta 
    //reportContainer.innerHTML='';

    while(reportContainer.firstChild){
        reportContainer.removeChild(reportContainer.firstChild);
    }

}

function mostarError(mensaje){
    const mensajeError=document.createElement('p');
    mensajeError.textContent=mensaje;
    mensajeError.classList.add('alert','alert--red','error');

    //verificando si hay mas de un elemento con la clase error

    const errores = document.querySelectorAll('.error');
    if(errores.length === 0){
        //insertar el mensaje en el html
        inputs.appendChild(mensajeError);
    }
}

