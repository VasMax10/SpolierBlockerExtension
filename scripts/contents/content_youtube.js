//var dictionary = ["tony stark", "Ahsoka", "ron man"];
// var dictionary = 	['hulk', 'thor', 'iron man', 'captain america', 
// 					'avenger', 'avengers', 'batman', 'superman', 'flash',
					// 'wonder woman', 'justice league'];
// var tmp = document;

const imgReplUrl = "https://blogofoa.com/wp-content/uploads/2017/11/Spoiler-Alert.jpg";

function backup(element, backupInnerHTML){
	
    element.innerHTML = backupInnerHTML;
}

function replace() {
	chrome.storage.sync.get("token",function(res){
        var token = res.token;
    
	fetch('https://localhost:44367/api/CategoriesAPI?accessToken='+token)
        .then(response => response.json())
        .then(data => {
			dictionary = data;
	
    //var counter = 0;
	tags = document.querySelectorAll('[id=dismissible]');//document.getElementsById('video-title');
	for ( var i = 0; i < tags.length; i++) {
		var element = tags[i];
		var text = element.innerText;
		text = text.toString().toLowerCase();
		dictionary.forEach(function( dictionaryItem ) {
			(dictionaryItem.keywords).forEach(function(dI)
			{
			var newText = text.toString().toLowerCase().includes( dI.toLowerCase() );
			if ( newText ) {
				
				try{
					console.log(dI, text.toString());
					var tmp = element.querySelector('#img');
					tmp.setAttribute('src', imgReplUrl);
					tmp.parentElement.setAttribute('class', 'style-scope ytd-thumbnail no-transition');
				
					tmp = element.querySelector('#video-title');
					tmp.style.background = "black";
					element.style.background = "#606060";
					element.onmouseover = null;
				}
				catch(e)
				{
					console.log(e);
				}    
			}
		});
	});
        //counter = counter + 1;
	}
	});
	});
}

//replace();
let observer = new MutationObserver(mutationRecords => {
	if (mutationRecords[0].type == 'childList')
		replace();
  });
  
  // наблюдать за всем, кроме атрибутов
  observer.observe(document.getElementsByTagName("body")[0], {
	childList: true, // наблюдать за непосредственными детьми
	subtree: true, // и более глубокими потомками
	characterDataOldValue: true // передавать старое значение в колбэк
  });