document.addEventListener("DOMContentLoaded", function(){ start(); }, false);
const input = document.getElementById("search");
const btn = document.getElementById("search_icon");
const temp_details = document.querySelector(".temp_details");
const others = document.querySelector(".others");
const not_found = document.querySelector(".not_found");
let p;
[humidity,wind] = others.children;
[loc, tem, desc] = temp_details.children;
const populate = (data) => {
    loc.innerText = data['name'];
    tem.innerText = data.main['temp'].toFixed(2) + '°C';
    desc.children[1].innerText = data.weather[0].description;
    let image_url = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    desc.children[0].src = image_url;
    humidity.innerText = 'Humidity : ' + data.main["humidity"] + '%';
    const speed_value = data.wind["speed"]*3.6
    wind.innerText = "Wind : " + speed_value.toFixed(2) + "km/h";
}

const API_KEY = '6d5257afa28b7d5a44a1c739c89ffcdf';
let result;
btn.addEventListener("click",(e)=>{
    e.preventDefault();
    result = input.value;
    url = `https://api.openweathermap.org/data/2.5/weather?q=${result}&appid=${API_KEY}&units=metric`;
    fetch(url)
    .then(res =>{
        if(!res.ok){
            temp_details.style.display = "none";
            others.style.display = "none";
            not_found.style.display = "block";
        }
        else{
            temp_details.style.display = "flex";
            others.style.display = "block";
            not_found.style.display = "none";
            return res.json();
        }
    })
    .then(populate);

})

start = function(){
    const successCallback = (position)=>{
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=6d5257afa28b7d5a44a1c739c89ffcdf&units=metric`)
        .then(res => res.json())
        .then(populate)
    }
    navigator.geolocation.getCurrentPosition(successCallback,console.log);
}