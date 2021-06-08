var resultTextEl = document.querySelector('#result-text');
var resultContentEl = document.querySelector('#result-content');



//resultTextEl.textContent = await  response.text();
async function fetchText() {
    let response = await fetch("https://news67.p.rapidapi.com/feed?limit=1&skip=0&language=en&source=apnews.com", {
		method: "GET",
		headers: {
			"x-rapidapi-key": "47f533e0d5msh186f53b5ecb9125p19c322jsn6064e31069db",
			"x-rapidapi-host": "news67.p.rapidapi.com"
		}
	})
	
    //let data = await response.text();
    resultTextEl.textContent = await response.text();
	
	//console.log(data);
}
fetchText();	

/*.then(response => {
	//console.log(response);
	//resultTextEl.textContent = response.json();
	resultTextEl.textContent =  response.text();
	
    //let text = await response.text(); // read response body as text

//alert(text.slice(0, 80) + '...');
})
.catch(err => {
	console.error(err);
});*/