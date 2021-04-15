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
    // document.getElementsByClassName("left")[0].style.marginRight = '1vw';
    document.getElementsByClassName("left")[0].style.paddingRight = '1.25vw';
    document.getElementById("prediction").style.display = 'block';
}

function setSavedAnswer(inputGender) {
    console.log("set s a");
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
                if (getItem(name) !== null) {
                    removeItem(name);
                }
                if (inputGender[0].checked) {
                    setSavedAnswer('male');

                    person._name = name;

                    setItem(name, "male");

                    document.getElementById("male").checked = false;
                } else if (inputGender[1].checked) {
                    setSavedAnswer('female');

                    person._name = name;

                    setItem(name, "female");

                    document.getElementById("female").checked = false;
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
    }
}

function handleRemoveClick() {
    console.log("remove button clicked");
    console.log(getItem(person._name));
    if (getItem(person._name) !== null) {
        removeItem(person._name);
        person._name = '';
        document.getElementById("saved-answer-gender").innerHTML = getItem(person._name);
        // console.log(getItem(person._name));
        // console.log(person._name);
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