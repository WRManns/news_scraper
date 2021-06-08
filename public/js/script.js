var resultTextEl = document.querySelector('#result-text');
var resultContentEl = document.querySelector('#result-content');
var resultSummaryEl = document.querySelector('#result-summary');


var formEl = $('#searchform');
var searchfieldEl = $('input[name="searchfield"]');

var count=0;
var count2=0;
var count3=0;
let response;
let data;
let linkButtonEl;
let saveButtonEl;
let libOrCurrentNews= true;
let commit;
let libraryGetEl;



async function fetchArticles(event) {
	event.preventDefault();
	
	resultTextEl.textContent= searchfieldEl.val();
	console.log('First Name:', searchfieldEl.val());
  
	// Clear input fields
	$('input[type="text"]').val('');
  
	
	
	const response = await fetch('https://bing-news-search1.p.rapidapi.com/news/search?' + 'q=' + searchfieldEl.val() + '&safeSearch=Off&textFormat=Raw&freshness=Day&count=20', {
		method: 'GET',
		headers: {
			'x-bingapis-sdk': "true",
			'x-rapidapi-key': "83880f65f7mshad8dbb70fd491d8p1aad41jsn9100b230787d",
			'x-rapidapi-host': "bing-news-search1.p.rapidapi.com"
		}
	  })
	  
    data= await response.json();
	console.log(data);

htmlOutput(libOrCurrentNews);
	    
}
	
function htmlOutput(libOrCur){
    //alert(libOrCur);
	
	libraryGetEl = document.createElement('a');
	
	if(libOrCur){
	libraryGetEl.setAttribute('id', "libGet");}
	else {libraryGetEl.textContent = 'Show Current Unstored Articles';
	libraryGetEl.setAttribute('id', "currentGet");}
	resultContentEl.append(libraryGetEl); 
    

	for(i=0;i<10;i++){
	
	var resultCard = document.createElement('div');
	resultCard.classList.add('card', 'bg-light', 'text-dark', 'mb-3', 'p-3');
  

	var resultBody = document.createElement('div');
    
    resultCard.append(resultBody);

   //           new api output

	var bodyContentEl = document.createElement('p');

 	bodyContentEl.innerHTML = data.value[i].name + '<br>' + '<br>' + data.value[i].description;
	     
	  resultBody.append( bodyContentEl);
       
	
	  linkButtonEl = document.createElement('a');
	  linkButtonEl.textContent = 'Read More';
	  linkButtonEl.setAttribute('href', data.value[i].url);
	  linkButtonEl.classList.add('btn', 'btn-dark');
	  
	 if(i==0){ 
	  
		var instructionEl = document.createElement('h6');
	

	 }
	  
	 
	  $('button').click(storeArticle)
	  $('#libGet').click(libFetch);
	  $('#currentGet').click(curGet);
	  	

    resultBody.append( bodyContentEl, linkButtonEl);
	
	
	  
	  if(libOrCur){
		saveButtonEl = document.createElement('button');
		saveButtonEl.textContent = 'Save Article to Library';
		saveButtonEl.setAttribute('type', 'button');
		saveButtonEl.setAttribute('id', i.toString());
		saveButtonEl.classList.add('btn', 'btn-dark');
		resultBody.append(saveButtonEl); 
	  }
      if (i==0){
		resultBody.append( instructionEl);
	  
	    } 
		
	resultContentEl.append(resultCard);
		
		
	}
	
	count=0;
	count2=0;
	count3=0;
}

function curGet(){
 while(count3++ < 1){
	document.getElementById("result-content").innerHTML = " ";

	htmlOutput(true);
 }	
}	  

//        Storing and Saving Articles
	

async function libFetch(){
	

	while(count2++ < 1){
		 
	
		 //fetch code for recalling stored articles here
		 
        document.getElementById("result-content").innerHTML = " ";

		 
	const resp = await fetch('/api/users', {
		  method: 'GET',
		  headers: {
			'Content-Type': 'application/json',
		  },
		  
		})
		
	
		data = await resp.json();
		htmlOutput(false);	
		

		}
   return 1;

  }	


async function storeArticle () {
   while(count++ < 1){
   var saveID = $( this ).attr("id");
   var saveIDInt=parseInt(saveID);
   alert(data.value[saveIDInt].name);
   
   
   let newArticle = {
	urlnews: data.value[saveIDInt].url,
	title: data.value[saveIDInt].name,
	description: data.value[saveIDInt].description
   };
   console.log(newArticle);
	
   
  
  
  // POST articles to user's saved article collumn
  if (newArticle) {
   	const response = await fetch('/api/search/', {
		method: 'POST',
		body: JSON.stringify(newArticle),
		headers: {
	  	'Content-Type': 'application/json',
		},
  	});

  	if (response.ok) {
	document.location.replace('/search');
  } else {
	alert('Failed to save article');
  }
  
	}
  }
  return 1;
}; 
 

searchBtn.addEventListener('click', fetchArticles);

// clear search when new search is initiated
// function clearResults() {
// 	var element = document.getElementById("results-content")
// 	removeAllChildNodes(element);
// }

// function removeAllChildNodes(parent) {
//   while (parent.firstChild) {
// 	  parent.removeChild(parent.firstChild);
//   }
// }

 