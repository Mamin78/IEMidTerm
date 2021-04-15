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
    document.getElementsByClassName("right")[0].style.display = 'block';
    document.getElementById("prediction-gender").innerHTML = result['gender'];
    document.getElementById("prediction-prob").innerHTML = result['probability'];
    document.getElementsByClassName("left")[0].style.borderRight = '1px dashed #636e72';
    document.getElementsByClassName("left")[0].style.paddingRight = '1.25vw';
    document.getElementById("prediction").style.display = 'block';
}

function setSavedAnswer(inputGender) {
    console.log("set s a");
    document.getElementById("saved-answer-gender").innerHTML = inputGender;
    document.getElementById("saved-answer").style.display = 'block';
}

function savedAnswerConditions(result, name) {
    const inputGender = document.getElementsByName("gender");

    if (inputGender[0].checked || inputGender[1].checked) {
        if (getItem(name) !== null) {
            removeItem(name);
        }
        if (inputGender[0].checked) {
            setSavedAnswer('male');

            person._name = name;

            setItem(name, "male");

            makeUncheckedRadio("male");
        } else if (inputGender[1].checked) {
            setSavedAnswer('female');

            person._name = name;

            setItem(name, "female");

            makeUncheckedRadio("female");
        }
    } else {
        const savedGender = getItem(name);
        if (savedGender !== null) {
            setSavedAnswer(savedGender);
            person._name = name;
        } else {
            document.getElementById("saved-answer").style.display = 'none';

        }
    }
}

function makeUncheckedRadio(id) {
    document.getElementById(id).checked = false;
}

async function handleSubmitClick(name) {
    if (name === "") {
        window.alert("Please write your name.");
    } else {
        let result = null;
        try {
            result = await fetch(
                `https://api.genderize.io/?name=${name}`,
            ).then((reponse) => reponse.json());
        } catch (error) {
            window.alert("Your name isn't in our DataBase.!");
        }
        console.log(result);

        if (result['gender'] === null) {
            // if input name isn't in database we should alert!
            window.alert("Your name isn't in our DataBase.!");
        } else {
            setPrediction(result);

            savedAnswerConditions(result, name);
        }
    }
}

function handleRemoveClick() {
    if (getItem(person._name) !== null) {
        removeItem(person._name);
        person._name = '';
        document.getElementById("saved-answer-gender").innerHTML = getItem(person._name);
        document.getElementById("saved-answer").style.display = 'none';
    }
}

function getItem(key) {
    return JSON.parse(localStorage.getItem(key));
}

function setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function removeItem(key) {
    localStorage.removeItem(key);
}

const input = document.querySelector('#name');
const submitBtn = document.querySelector('#submit_btn');
submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    handleSubmitClick(input.value);
})


const removeBtn = document.querySelector('#remove-btn');
removeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    handleRemoveClick();
})