async function handleSubmitClick(name) {
    const result = await fetch(
        `https://api.genderize.io/?name=${name}`,
    ).then((reponse) => reponse.json());
    console.log(result);

    document.getElementsByClassName("right")[0].style.display = 'block';
    document.getElementById("prediction-gender").innerHTML = result['gender'];

    document.getElementById("prediction-prob").innerHTML = result['probability'];

    document.getElementsByClassName("left")[0].style.borderRight = '1px dashed #636e72';
    // document.getElementsByClassName("left")[0].style.marginRight = '1vw';
    document.getElementsByClassName("left")[0].style.paddingRight = '1.25vw';
    document.getElementById("prediction").style.display = 'block';


    var inputGender = document.getElementsByName("gender");

    if (inputGender[0].checked || inputGender[1].checked) {
        if (inputGender[0].checked) {
            document.getElementById("saved-answer-gender").innerHTML = 'male';
            document.getElementById("saved-answer").style.display = 'block';

            setItem(name, "male");
        } else if(inputGender[1].checked){
            document.getElementById("saved-answer-gender").innerHTML = 'female';
            document.getElementById("saved-answer").style.display = 'block';

            setItem(name, "female");
        }
    } else {
        var savedGender = getItem(name);
        if (savedGender) {
            document.getElementById("saved-answer-gender").innerHTML = savedGender;
            document.getElementById("saved-answer").style.display = 'block';
        }
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
    e.preventDefault()
    handleSubmitClick(input.value)
})