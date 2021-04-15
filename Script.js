let personGender = {
    _name: "",
    _gender: "",
    get name() {
        return this._name;
    },
    get gender() {
        return this.gender;
    },
    set name(inputName) {
        this._name = inputName;
    },
    set gender(inputGender) {
        this._gender = inputGender;
    },
};

function setPrediction(result) {
    document.getElementsByClassName("right")[0].style.display = 'block';
    document.getElementById("prediction-gender").innerHTML = result['gender'];

    document.getElementById("prediction-prob").innerHTML = result['probability'];

    document.getElementsByClassName("left")[0].style.borderRight = '1px dashed #636e72';
    // document.getElementsByClassName("left")[0].style.marginRight = '1vw';
    document.getElementsByClassName("left")[0].style.paddingRight = '1.25vw';
    document.getElementById("prediction").style.display = 'block';
}

function setSavedAnswer(inputGender) {
    document.getElementById("saved-answer-gender").innerHTML = inputGender;
    document.getElementById("saved-answer").style.display = 'block';
}

async function handleSubmitClick(name) {
    if (name === "") {
        window.alert("Please write your name.");
    } else {
        const result = await fetch(
            `https://api.genderize.io/?name=${name}`,
        ).then((reponse) => reponse.json());

        console.log(result);

        if (result['gender'] === null) {
            // if input name isn't in database we should alert!
            window.alert("Your name isn't in our DataBase.!");
        } else {
            setPrediction(result);

            const inputGender = document.getElementsByName("gender");

            if (inputGender[0].checked || inputGender[1].checked) {
                console.log("radio ddddddddddddddddddddddddd");
                if (getItem(name) !== null) {
                    removeItem(name);
                }
                if (inputGender[0].checked) {
                    setSavedAnswer('male');

                    personGender._name = name;
                    personGender._gender = "male";

                    setItem(name, "male");

                    console.log("first if");
                    document.getElementById("male").checked = false;
                } else if (inputGender[1].checked) {
                    setSavedAnswer('female');

                    personGender._name = name;
                    personGender._gender = "female";

                    setItem(name, "female");

                    console.log("second if");
                    document.getElementById("female").checked = false;
                }
            } else {
                const savedGender = getItem(name);
                if (savedGender !== null) {
                    setSavedAnswer(savedGender);
                    personGender._name = name;
                    personGender._gender = '';

                    console.log("third if");
                } else {
                    document.getElementById("saved-answer").style.display = 'none';

                }
            }
        }
    }
}

function handleRemoveClick() {
    // if (getItem(personGender._name) !== null) {
    removeItem(personGender._name);
    personGender._name = '';
    personGender._gender = '';
    document.getElementById("saved-answer-gender").innerHTML = getItem(personGender._name);
    document.getElementById("saved-answer").style.display = 'none';
    // }
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