let enterButton = document.querySelector('#input-submit');
let addEqButton = document.querySelector('#add-equation');
let runAlgorithmButton = document.querySelector('#run-gauss-jordan');
let inputForm = document.querySelector('#input-form');
let outputTable = document.querySelector('#output-table');

let totalEqs = 2;
let allVars = ['x','y'];
let availVars = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','z']

enterButton.addEventListener("click", () =>{
    for (let i = 0; i < totalEqs; i++){
        for (let j = 0; j < allVars.length; j++){
            let str = `#` + allVars[j] + `Input` + i;
            let Val = document.querySelector(str).value;
            let TableStr = `#` + allVars[j] + `Coef` + i;
            let TableNode = document.querySelector(TableStr);
            TableNode.innerHTML = Val;
        }

        let EqStr = `#equals` + i;
        let eqVal = document.querySelector(EqStr).value;
        let eqTableStr = `#eqVal` + i;
        let eqTableNode = document.querySelector(eqTableStr);
        eqTableNode.innerHTML = eqVal;
    }
})

addEqButton.addEventListener("click", () =>{
    totalEqs++;
    allVars.push(availVars.pop());
    inputForm.innerHTML = '';
    for (let i = 0; i < totalEqs; i++){
        for (let j = 0; j < allVars.length; j++){
            let input = document.createElement('input');
            input.type = 'text';
            input.style.width = '30px';
            input.id = allVars[j] + 'Input' + i;
            input.name = allVars[j] + 'Input' + i;
            inputForm.appendChild(input);

            let label = document.createElement('label');
            label.for = allVars[j] + 'Input' + i;
            if (j == allVars.length - 1){
                label.innerHTML = allVars[j] + ' = ';
            }
            else{
                label.innerHTML = allVars[j] + ' + ';
            }
            inputForm.appendChild(label);
        }
        let eqLabel = document.createElement('label');
        eqLabel.for = 'equals' + i;
        inputForm.appendChild(eqLabel);

        let eqInput = document.createElement('input');
        eqInput.type = 'text';
        eqInput.style.width = '30px';
        eqInput.id = 'equals' + i;
        eqInput.name = 'equals' + i;
        inputForm.appendChild(eqInput);

        inputForm.appendChild(document.createElement('br'));
    }

    outputTable.innerHTML = '';
    let headerRow = document.createElement('tr');
    headerRow.id = 'output-table-headers';
    for (let i = 0; i < allVars.length; i++){
        let header = document.createElement('th');
        header.innerHTML = allVars[i];
        headerRow.appendChild(header);
    }
    let eqHeader = document.createElement('th');
    eqHeader.innerHTML = '=';
    headerRow.appendChild(eqHeader);
    outputTable.appendChild(headerRow);

    for (let i = 0; i < totalEqs; i++){
        let dataRow = document.createElement('tr');
        dataRow.id = 'equation' + i;
        for (let j = 0; j < allVars.length; j++){
            let dataNode = document.createElement('td');
            dataNode.id = allVars[j] + 'Coef' + i;
            dataNode.innerHTML = 0;
            dataRow.appendChild(dataNode);
        }
        let eqNode = document.createElement('td');
        eqNode.id = 'eqVal' + i;
        eqNode.innerHTML = 0;
        dataRow.appendChild(eqNode);
        outputTable.appendChild(dataRow);
    }
})

/**
 * this function when ran it gets the values added to the table from a specified row and returns an array
 * @param {} row is the row with the data we want to grab (indexed at 0)
 */
function getValues (row) {
    let rowValues = [];
    for (let i = 0; i < allVars.length; i++){
        let str = '#' + allVars[i] + 'Coef' + row;
        let val = document.querySelector(str).innerHTML;
        rowValues.push(val);
    }

    let eqStr = '#eqVal' + row;
    let eqVal = document.querySelector(eqStr).innerHTML;
    rowValues.push(eqVal);

    return rowValues;
}

/**
 * this function sets the base for the specified row. it does this by setting the var corresponding to the
 * row to 1 through math. Then it updates the html table in the browser
 * @param {*} values the array of all values
 * @param {*} row the row we want from the 2d array
 */
function setBaseForRow (values, row) {
    let rowVals = values[row];
    let multiplyer = rowVals[row];
    for (let i = 0; i < rowVals.length; i++){
        rowVals[i] = (1/multiplyer)*rowVals[i];
    }
    
    //updating html table with new vals
    for (let i = 0; i < allVars.length; i++){
        let TableStr = `#` + allVars[i] + `Coef` + row;
        let TableNode = document.querySelector(TableStr);
        TableNode.innerHTML = rowVals[i];
    }
    let eqTableStr = `#eqVal` + row;
    let eqTableNode = document.querySelector(eqTableStr);
    eqTableNode.innerHTML = rowVals[rowVals.length-1];
}

/**
 * This function temporarily modifies the values in the base row and adds them to
 * the row being modified. Then it updates the html table on the browser
 * @param {*} values the 2d array containing all the values in the table
 * @param {*} baseRow the index of the row that is being used as the base row
 * @param {*} modRow the index of the row that is being used as the modified row
 */
function setZeroForRow (values, baseRow, modRow) {
    let baseRowVals = values[baseRow];
    let modRowVals = values[modRow];
    let modifyer = modRowVals[baseRow];

    for (let i = 0; i < baseRowVals.length; i++){
        let newVal = (-1*modifyer)*baseRowVals[i];
        modRowVals[i] = (1*modRowVals[i]) + newVal;
    }

    //updating html table with the new vals
    for (let i = 0; i < allVars.length; i++){
        let TableStr = `#` + allVars[i] + `Coef` + modRow;
        let TableNode = document.querySelector(TableStr);
        TableNode.innerHTML = modRowVals[i];
    }
    let eqTableStr = `#eqVal` + modRow;
    let eqTableNode = document.querySelector(eqTableStr);
    eqTableNode.innerHTML = modRowVals[modRowVals.length-1];
}



runAlgorithmButton.addEventListener('click', () => {
    let allValues = [];
    for (let i = 0; i < totalEqs; i++){
        allValues[i] = getValues(i);
    }
    console.log('testing: running whole alg');
    for (let i = 0; i < totalEqs; i++){//
        setTimeout(()=>{
            setBaseForRow(allValues, i); //set the base row
            for (let j = i+1; j < totalEqs; j++){//handles all the mod rows below (in the html table) the base row
                setTimeout(() => {
                    setZeroForRow(allValues, i, j);
                }, 1000 * i)
            }
            for (let j = i-1; j >= 0; j--){//handles all the mod rows above (in the html table) the base row
                setTimeout(() => {
                    setZeroForRow(allValues, i, j);
                }, 1000 * i)
            }
        }, 3000 * i);
    }
})