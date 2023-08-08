console.log('Client side of js')

const watherForm = document.querySelector('form');
const searchElement = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

watherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    messageOne.textContent = "Loading ..."
    messageTwo.textContent = ""

    const location = searchElement.value

    const url = '/weather?address='
    fetch(url + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = `Error: ${data.error}`
                messageTwo.textContent = ""
                console.log(data.error)
                return
            }
            messageOne.textContent = `Location: ${data.location}`
            console.log(data.location)
            messageTwo.textContent = `Forecast: ${data.forecast}`
            console.log(data.forecast)
        })
    })
})