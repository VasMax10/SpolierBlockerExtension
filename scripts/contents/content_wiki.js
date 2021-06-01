// var dictionary = 	['hulk', 'thor', 'iron man', 'captain america', 
// 					'avenger', 'avengers', 'batman', 'superman', 'flash',
// 					'wonder woman', 'justice league', 'Steppenwolf'];

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
	
    	var counter = 0;
		tags = document.getElementsByClassName('infobox');
		for ( var i = 0; i < tags.length; i++) {
			var element = tags[i];
			const text = element.innerText.replace(/(?:\r\n|\r|\n)/g, '<br>');
			var text2 = text.toString().toLowerCase();
			dictionary.forEach(function( dictionaryItem ) {
				(dictionaryItem.keywords).forEach(function(dI)
				{
					var newText = text2.includes( dI.toLowerCase() );
					if ( newText ) {
						element.setAttribute('id', 'spoilerBlock_' + counter);
	            		element.innerHTML = "<a>There is can be spoiler. Click to show</a>";
    	    	    	element.onclick = function(){ this.innerHTML = text};					
					}
				});
			});
        	counter = counter + 1;
		}
    
		tags = document.getElementsByTagName('p');
	    for ( var i = 0; i < tags.length; i++) {
			var element = tags[i];
			const text = element.innerText;
			var text2 = text.toString().toLowerCase();
			dictionary.forEach( function( dictionaryItem ) {
				(dictionaryItem.keywords).forEach(function(dI)
					{
					var newText = text2.includes( dI.toLowerCase() );
					if ( newText ) {
	            		element.innerHTML = "<div id='spoilerBlock_" + counter +"'><a>There is can be spoiler. Click to show</a></div>";
        	    		var divEl = element.querySelector('[id=spoilerBlock_' + counter + ']');
						element.onclick = function(){ this.innerHTML = text};
					}
				});
			});
        	counter = counter + 1;
			}	
			tags = document.getElementsByTagName('li');
	    	for ( var i = 0; i < tags.length; i++) {
				var element = tags[i];
				const text = element.innerText;
				var text2 = text.toString().toLowerCase();
				dictionary.forEach( function( dictionaryItem ) {
					(dictionaryItem.keywords).forEach(function(dI)
					{
						var newText = text2.includes( dI.toLowerCase() );
						if ( newText ) {
	            			element.innerHTML = "<div id='spoilerBlock_" + counter +"'><a>There is can be spoiler. Click to show</a></div>";
	        	    		var divEl = element.querySelector('[id=spoilerBlock_' + counter + ']');
							element.onclick = function(){ this.innerHTML = text};
						}
					});
				});
        	counter = counter + 1;
		}		
		}); 	
	});
}

replace();

$(document).ready(function() {
    replace();
});

// let observer = new MutationObserver(mutationRecords => {
// 	if (mutationRecords[0].type == 'childList')
// 		replace();
//   });
  
//   // наблюдать за всем, кроме атрибутов
//   observer.observe(document.getElementsByTagName("body")[0], {
// 	childList: true, // наблюдать за непосредственными детьми
// 	subtree: true, // и более глубокими потомками
// 	characterDataOldValue: true // передавать старое значение в колбэк
//   });