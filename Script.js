async function handleSubmitClick(name) {
    const result = await fetch(
        `https://api.genderize.io/?name=${name}`,
    ).then((reponse) => reponse.json());
    console.log(result);
}

const input = document.querySelector('#name');
const submitBtn = document.querySelector('#submit_btn');
submitBtn.addEventListener('click', (e) => {
    e.preventDefault()
    handleSubmitClick(input.value)
})