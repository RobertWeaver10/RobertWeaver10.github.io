//grab the forms for constraints and objective equation
let constraintForm = document.querySelector("#simplex-algorithm-constraint-input-form")
let objectiveForm = document.querySelector("#simplex-algorithm-objective-eq-form")
//grab the buttons to add variables to constraints and objective eq
let constraintAddVarBut = document.querySelector("#add-simplex-var")
let constraintAddSlkVarBut = document.querySelector("#add-another-slack-var")
let objAddVarBut = document.querySelector("#add-var-button")
//grab the submit buttons to get the equations from the forms
let constraintSubmitBut = document.querySelector("#submit-simplex-constraint")
let objSubmitBut = document.querySelector("#submit-simplex-obj")

let constraintCount = 1;
let allVars = ['x','y'];
let availVars = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','z'];
let slackVars = ['s1'];

//event listener to add a variable to the constraint form
constraintAddVarBut.addEventListener("click", () => {
    constraintForm.innerHTML = "";
    for (var i = 0; i < allVars.length; i++){
        //create label for variable
        let variableLabel = document.createElement('label');
        variableLabel.for = allVars[i] + "-coeff";
        variableLabel.innerHTML = allVars[i] + " coefficient";
        constraintForm.appendChild(variableLabel);
        //create input for form for variable
        let variableInput = document.createElement('input');
        variableInput.type = 'text';
        variableInput.class = 'simplex-inputs';
        variableInput.id = allVars[i]+"-coeff";
        variableInput.name = allVars[i]+"-coeff";
        constraintForm.appendChild(variableInput);
    }
    //create label for newly added variable
    let newVariable = availVars.pop();
    let newVarLabel = document.createElement('label');
    newVarLabel.for = newVariable + "-coeff";
    newVarLabel.innerHTML = newVariable + " coefficient";
    constraintForm.appendChild(newVarLabel);
    //create input for newly added variable
    let newVarInput = document.createElement('label');
    newVarInput.type = "text";
    newVarInput.class = 'simplex-inputs';
    newVar
    //enter loop to add slack variables back into form
    //enter constant back onto form
})

//event listener to grab the constraint and store the equation
//display the constraint on the html page so user can keep track of constraints
