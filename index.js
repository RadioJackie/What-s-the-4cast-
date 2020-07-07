var button = document.querySelector('.button')
var inputValue = document.querySelector('.inputValue')
var name = document.querySelector('.name')
var description = document.querySelector('.description')
var temp = document.querySelector('.temp')

button.addEventListener("click", function () {
    $.ajax({
        url: 'https://api.openweathermap.org/data/2.5/forecast?q={Phoenix}&appid={8f9da299e9eabd5bd1bb18caeac625e8'

        ,method: "GET"
        
        .then(response => response.json())
            .then(data => {
                var nameValue = data['name']
                var temp = data['main']['temp']
                var descriptionValue = data['weather'][0]['description'];

                name.innnerHTML = nameValue;
                temp.innnerHTML = tempValue;
                description.innerHTML = descriptionValue;
            })
    })




        .catch(err => alert("Wrong name"))

})

