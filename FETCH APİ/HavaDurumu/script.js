const url='https://api.openweathermap.org/data/2.5'
const mykey='60ed376f44a1a783068ed23bc8676866'

const setQuery=(e)=>{
    if(e.keyCode=='13')
       getResult(searchBar.value)
}

const getResult=(cityName)=>{
    let query=`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${mykey}&units=metric&lang=tr`

    fetch(query).then(weatherr=>{
        return weatherr.json()

    }).then(displayResult)
}

const displayResult=(result)=>{
    let sehir=document.querySelector('.şehir');
    sehir.innerText=`${result.name} , ${result.sys.country}`;
    let derece=document.querySelector('.derece');
    derece.innerText=`${Math.round(result.main.temp)}°`;
    let durum =document.querySelector('.durum')
    durum.innerText=result.weather[0].description
    let  minmax=document.querySelector('.min-max')
    minmax.innerText=`${Math.round(result.main.temp_min)}° / ${Math.round(result.main.temp_max)}`
    let feel=document.querySelector('.feel')
    feel.innerText=`${result.main.feels_like}° Hissedilen Sıcaklık`

}
const searchBar= document.getElementById('search')
searchBar.addEventListener('keypress',setQuery)



