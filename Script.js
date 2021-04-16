//Mohammad Amin Shafiei - 97243041
//for save the input name and use it for clear data.
let person = {
    _name: "",
    get name() {
        return this._name;
    },
    set name(inputName) {
        this._name = inputName;
    }
};

function setPrediction(result) {
    //set prediction part's values and set display of it as block because we want to display it now.
    document.getElementsByClassName("right")[0].style.display = 'block';
    document.getElementById("prediction-gender").innerHTML = result['gender'];
    document.getElementById("prediction-prob").innerHTML = result['probability'];
    document.getElementsByClassName("left")[0].style.borderRight = '1px dashed #636e72';
    document.getElementsByClassName("left")[0].style.paddingRight = '1.25vw';
    document.getElementById("prediction").style.display = 'block';
}

function setSavedAnswer(inputGender) {
    //set gender's value and set display of it as block because we want to display it now.
    document.getElementById("saved-answer-gender").innerHTML = inputGender;
    document.getElementById("saved-answer").style.display = 'block';
}

function showError() {
    document.getElementById("error-msg").style.display = 'block';
}

function hideError() {
    document.getElementById("error-msg").style.display = 'none';
}

function hidePrediction() {
    document.getElementById("prediction").style.display = 'none';
}

function hideSavedAnswer() {
    document.getElementById("saved-answer").style.display = 'none';
}

function hideRightBorder() {
    document.getElementsByClassName("left")[0].style.borderRight = '0 dashed #636e72';
    document.getElementsByClassName("left")[0].style.paddingRight = '0';
}

function savedAnswerConditions(result, name) {
    //get radio input's values.
    const inputGender = document.getElementsByName("gender");

    if (inputGender[0].checked || inputGender[1].checked) {
        //if one radio box is checked.
        if (getItem(name) !== null) {
            removeItem(name);
        }
        if (inputGender[0].checked) {
            setSavedAnswer('male');

            person._name = name;

            setItem(name, "male");

            makeUncheckedRadio("male");
            console.log("first if");
            document.getElementById("saved-answer").style.display = 'block';

        } else if (inputGender[1].checked) {
            setSavedAnswer('female');

            person._name = name;

            setItem(name, "female");

            makeUncheckedRadio("female");
            document.getElementById("saved-answer").style.display = 'block';

        }
    } else {
        const savedGender = getItem(name);
        if (savedGender !== null) {
            //if gender of this name has been saved.
            setSavedAnswer(savedGender);
            person._name = name;
        } else {
            document.getElementById("saved-answer").style.display = 'none';
            // hideSavedAnswer();
            hideRightBorder();
        }
    }
}

function makeUncheckedRadio(id) {
    document.getElementById(id).checked = false;
}

async function handleSubmitClick(name) {
    name = name.trim();
    //event handler for submit bottom.
    if (name === "") {
        //name box is empty.
        window.alert("Please write your name.");
    } else {
        let result = null;
        try {
            result = await fetch(
                `https://api.genderize.io/?name=${name}`,
            ).then((reponse) => reponse.json());
        } catch (error) {
            // window.alert("Your name isn't in our DataBase.!");
            // showError();
            // hidePrediction();
            // savedAnswerConditions(result, name);
            // hideSavedAnswer();
            // hideRightBorder();
        }
        console.log(result);

        if (result['gender'] === null) {
            // if input name isn't in database we should alert!
            // window.alert("Your name isn't in our DataBase.!");
            showError();
            hidePrediction();
            savedAnswerConditions(result, name);
            // hideSavedAnswer();
            // hideRightBorder();
            console.log("is nuuuuullll");
        } else {
            //set and display right part of page.
            console.log("is not nulll");
            hideError();
            setPrediction(result);
            savedAnswerConditions(result, name);
        }
    }
}

function handleRemoveClick() {
    //event handler for clear bottom.
    if (getItem(person._name) !== null) {
        removeItem(person._name);
        person._name = '';
        document.getElementById("saved-answer-gender").innerHTML = getItem(person._name);
        document.getElementById("saved-answer").style.display = 'none';
    }
}

//functions for local storage.
function getItem(key) {
    return JSON.parse(localStorage.getItem(key));
}

function setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function removeItem(key) {
    localStorage.removeItem(key);
}

//set onclick event handler of submit bottom.
const input = document.querySelector('#name');
const submitBtn = document.querySelector('#submit_btn');
submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    handleSubmitClick(input.value);
})

//set onclick event handler of clear bottom.
const removeBtn = document.querySelector('#remove-btn');
removeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    handleRemoveClick();
})