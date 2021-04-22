const List=document.getElementById("highscores");
const myform=document.getElementById("myform");
const Errors=document.getElementById("error");

function resetForm (){	 
	 while (List.hasChildNodes()){
		 List.removeChild(List.firstChild);
	}	 
	 get_scores(list_scores);	 
	 document.getElementById("score").value=0;
	 score=0;
}

myform.addEventListener("submit", function (event){
	 event.preventDefault(); 	 
	 
	 var formData=new FormData(this);
	 formData.append("score", score);
	 
	 fetch ("scores.php",{
		 method: "post", 
		 body: formData 
	})
		 .then (function (response){
			 return response.text(); 
		})
		 .then(function(text){
			 resetForm(); 
			 console.log(text); 
		})
		 .catch(function (err){
			 Errors.innerHTML=err; 
		})
});

function get_scores (callback){
	 let file="scores.json";
	 fetch(file,{cache: "no-cache"}) 		 
 		 .then(function(response){
 			 if (response.status !==200){
 				 Errors.innerHTML=response.status;
 			} 		 
 		 response.json().then(function(data){
 			 let scores=JSON.stringify(data);
 			 console.log(data);
 			 callback (scores);
 		})
 	}) 	
 	.catch(function(err){
 		 Errors.innerHTML=err;
 	});
}

 var list_scores=function (scores){
 	 let object=JSON.parse(scores);
 	 let lowest_score=object[4].score;
 	 document.getElementById("lowscore").value=lowest_score;
 	 for (let i=0; i<object.length; i++){
			
				let li=document.createElement("LI");
				let text=document.createTextNode("Nome: "+object[i].name + " | Score: " + object[i].score);
				li.appendChild(text);
				List.appendChild(li);
			 if (i===0){
				 li.setAttribute("class","top1");
				}
			 if (i===1){
				 li.setAttribute("class","top2");
				}
			 if (i===2){
						 li.setAttribute("class","top3");
				}
					 
 	}
}