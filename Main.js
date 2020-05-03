	
	//By Default All Store View
	var head = document.getElementById("head");
	var note = document.getElementById("note");

	
	$("#main").show();
	$("#main2").hide();
	$("#main3").hide();
	$("#main4").hide();
	$("#main8").hide();
	$("#main6").hide();
	$("#main7").hide();
	$("#main5").hide();
	$("#main1").hide();
	$("#taPro").hide();
	$("#getloction").hide();
	$("#showmap").hide();
	$("#pac-card").hide();
	$("#map").hide();
	$("#mainx").hide();
	$("#infowindow-content").hide();
	$("main").empty();
					$("#main8").empty();
				$("#main1").empty();
				$("#main2").empty();
				$("#main3").empty();
				$("#main4").empty();
				$("#main5").empty();
				$("#main6").empty();
				$("#main7").empty();
				$("#mainx").empty();
	
	
	head.innerHTML = "All Stores";
	note.innerHTML = "";
	
	var firebaseRef = firebase.database().ref('store').child('All');
			firebaseRef.on("child_added",snap => {
			var Name = snap.child("Name").val();
			var pic = snap.child("ProfileImg").val();
			var id = snap.child("StoreID").val();
			var held = "#";
			var i = "win(this)";
			var target = "_top";
			var area = snap.child("Area").val();
			
			var storage = firebase.storage();
			var storageRef = storage.ref(pic) ;
			storageRef.getDownloadURL().then(function(url) {
			  
			  //$("#id").append(id);
			  //$("#image").append("<img width="+125+" height="+125+ " src="+url+" />");
			  //$("#click").append(Name);
			  
			  $("#main").append("<div><center><a  target = "+target+" href="+ held +" onclick="+i+" value="+id+"><img width="+125+" height="+125+ " src="+url+" /></a></center><br><center><a  target = "+target+" href="+ held +" onclick="+i+" value="+id+"> "+ Name +" &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "+ area +"</a></center></div>");
			  
			/*$("#id").append("<td><center>"+ id +"</center></td>");
			$("#pic").append("<td><center><img width="+125+" height="+125+" src="+url+" /></center></td>");
			$("#Name").append("<td><center>"+ Name +"</center></td>");*/
});
			
			
	});
	
	//Onclick store or store Image
	function win(anchor) {
		$("#head").hide();
		$("#Areadiv").hide();
		$("#main").hide();
		$("#main2").hide();
		$("#main3").hide();
		$("#main4").hide();
		$("#main8").hide();
		$("#main6").hide();
		$("#main7").hide();
		$("#main5").hide();
		$("#main1").hide();
		$("#note").hide();
		$("#pac-card").show();
		$("#title").show();
		$("#back").show();
		$("#getloction").show();
		$("#map").hide();
		$("#table").show();
		$("#name").show();
		$("#promo").show();
		$("#taPro").hide();
		$("#mainx").hide();
		
			var tid = document.getElementById("id");
			var value = anchor.getAttribute('value');
			tid.value = value;
			var note = document.getElementById("note");
					note.innerHTML = "";
			var olatitude;
			var oLongitude;
			
			var firebaseRef = firebase.database().ref('store').child('All').child(value);
			firebaseRef.on('value', function(snap) {
			var Name = snap.child("Name").val();
			var pic = snap.child("ProfileImg").val();
			var desc = snap.child("Description").val();
			var Email = snap.child("Email").val();
			var Contact = snap.child("Contact").val();
			var area = snap.child("Area").val();
			var address = snap.child("Address").val();
			var type = snap.child("Type").val();
			var latituded = snap.child("Latitude").val();
			var longituded = snap.child("Longitude").val();
			
			$("#name").text(Name);
			$("#desc").text(desc);
			$("#email").text(Email);
			$("#contact").text(Contact);
			$("#area").text(area);
			$("#address").text(address);
			$("#type").text(type);
			var dlat = document.getElementById("dlat");
			var dlong = document.getElementById("dlong");
			dlat.value = latituded;
			dlong.value = longituded;
			
			
			
			var storage = firebase.storage();
				var storageRef = storage.ref();
				var tangRef = storageRef.child(pic);

				tangRef.getDownloadURL().then(function(url) 
				{
					var test = url;
					$("#Image").append("<center><img width="+200+" height="+200+" src="+test+" /></center>");
					}).catch(function(error) 
				{
					switch (error.code) 
					{
						case 'storage/object_not_found':
							break;

						case 'storage/unauthorized':
							break;

						case 'storage/canceled':
							break;

						case 'storage/unknown':
							break;
					}
			});
	});
	
			var firebaseRefPromo = firebase.database().ref('store').child('All').child(value).child('Promo');
			firebaseRefPromo.on('value', function(snap) {
				var ProName = snap.child("PromoName").val();
				if(ProName == ""){
					var note = document.getElementById("note");
					note.innerHTML = "No Promotion available.";
					$("#taPro").hide();
					$("#note").show();
				}else{
					$("#taPro").show();
					var note = document.getElementById("note");
					note.innerHTML = "";
					
					var Prodesc = snap.child("Description").val();
					var Proarea = snap.child("Area").val();
					var Proemail = snap.child("Email").val();
					var Procontact = snap.child("Contact").val();
					
					$("#Proname").text(ProName);
					$("#Proemail").text(Proemail);
					$("#Prodesc").text(Prodesc);
					$("#Procontact").text(Procontact);
					$("#Proarea").text(Proarea);
					
				}
			});
			
			$("#getloction").click(
				function(){
					$("#getloction").hide();
					$("#map").hide();
					$("#showmap").show();
					
					
					if (navigator.geolocation) {
					navigator.geolocation.getCurrentPosition(showPosition);
					} else { 
					//x.innerHTML = "Geolocation is not supported by this browser.";
						}

					function showPosition(position) {
					 var oLatitude = position.coords.latitude ; 
					var oLongitude = position.coords.longitude ;
					
					var olat = document.getElementById("olat");
					var olong = document.getElementById("olong");
					olat.value = oLatitude;
					olong.value = oLongitude;
					
					//origin(oLatitude , oLongitude);
					}
				});
				
				$("#showmap").click(
				function(){
						
						$("#showmap").hide();
						$("#map").show();
						
						var lat1 = document.getElementById("dlat");
						var long1 = document.getElementById("dlong");
						var olat1 = document.getElementById("olat");
						var olong1 = document.getElementById("olong");
						
						var lat = lat1.value;
						var long = long1.value;
						var olat = olat1.value;
						var olong = olong1.value;
						
						var lat1 = Number(lat);
						var long1 = Number(long);
						var olat1 = Number(olat);
						var olong1 = Number(olong);
						
						var directionsService = new google.maps.DirectionsService();
					var directionsDisplay = new google.maps.DirectionsRenderer();

					var map = new google.maps.Map(document.getElementById('map'), {
					zoom:21,
					mapTypeId: google.maps.MapTypeId.ROADMAP
					});
					directionsDisplay.setMap(map);

					var request = {
					origin: {lat: olat1, lng: olong1}, destination: {lat: lat1, lng: long1},
					travelMode: google.maps.DirectionsTravelMode.DRIVING
					};

					directionsService.route(request, function(response, status) {
					if (status == google.maps.DirectionsStatus.OK) {
					directionsDisplay.setDirections(response);
						}
					})
						
				});
					
	}
	
	//Search by location
	$("#searchbtn").click(
				function(){
					$("#main").hide();
					$("#main2").hide();
					$("#main5").hide();
					$("#main7").hide();
					$("#main8").hide();
					$("#main6").hide();
					$("#main4").hide();
					$("#main3").hide();
					$("#main1").hide();
					$("#getloction").hide();
					$("#mainx").show();
					$("#showmap").hide();
					$("main").empty();
					$("#main8").empty();
				$("#main1").empty();
				$("#main2").empty();
				$("#main3").empty();
				$("#main4").empty();
				$("#main5").empty();
				$("#main6").empty();
				$("#main7").empty();
				$("#mainx").empty();
					
					var search = document.getElementById("Search");
					var se = search.value;
					head.innerHTML = se + " Area Stores";
					let usersRef = firebase.database().ref('store');
					usersRef.child('All').orderByChild('Area').equalTo(se).on("value", function(snapshot) {
					snapshot.forEach(function(data) {
						var searchid = data.key;
						var firebaseRef = firebase.database().ref('/store/').child('All/' + searchid);
						firebaseRef.on("value",function(snap){
							var Name = snap.child("Name").val();
							var pic = snap.child("ProfileImg").val();
							var held = "#";
							var i = "win(this)";
							var target = "_top";
							var area = snap.child("Area").val();
			
							var storage = firebase.storage();
							var storageRef = storage.ref(pic) ;
							storageRef.getDownloadURL().then(function(url) {
			  
			  //$("#id").append(id);
			  //$("#image").append("<img width="+125+" height="+125+ " src="+url+" />");
			  //$("#click").append(Name);
			  
							$("#mainx").append("<div><center><a  target = "+target+" href="+ held +" onclick="+i+" value="+searchid+"><img width="+125+" height="+125+ " src="+url+" /></a></center><br><center><a  target = "+target+" href="+ held +" onclick="+i+" value="+searchid+"> "+ Name +" &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "+ area +"</a></center></div>");
							
						});
					});			
				});
			});
		});
	
	//Sorting
	$("#StoreType1").click(
		function(){
			var type = document.getElementById("StoreType");
			var value = type.value;
			
			//All Stores
			if(value == "All"){
					$("#main").show();
					$("#main2").hide();
					$("#main5").hide();
					$("#main7").hide();
					$("#main8").hide();
					$("#main6").hide();
					$("#main4").hide();
					$("#getloction").hide();
					$("#showmap").hide();
					$("#main3").hide();
					$("#main1").hide();
					$("#mainx").hide();
					$("#main8").empty();
				$("#main1").empty();
				$("#main2").empty();
				$("#main3").empty();
				$("#main4").empty();
				$("#main5").empty();
				$("#main6").empty();
				$("#main7").empty();
				$("#mainx").empty();
					head.innerHTML = "All Stores";
					var firebaseRef = firebase.database().ref('store').child('All');
					firebaseRef.on("child_added",snap => {
					var Name = snap.child("Name").val();
					var pic = snap.child("ProfileImg").val();
					var id = snap.child("StoreID").val();
					var held = "#";
					var i = "win(this)";
					var target = "_top";
					var area = snap.child("Area").val();
					
					var storage = firebase.storage();
					var storageRef = storage.ref(pic) ;
					storageRef.getDownloadURL().then(function(url) {
					  
					  
					  $("#main").append("<div><center><a  target = "+target+" href="+ held +" onclick="+i+" value="+id+"><img width="+125+" height="+125+ " src="+url+" /></a></center><br><center><a  target = "+target+" href="+ held +" onclick="+i+" value="+id+"> "+ Name +" &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "+ area +"</a></center></div>");
					  
					/*$("#id").append("<td><center>"+ id +"</center></td>");
					$("#pic").append("<td><center><img width="+125+" height="+125+" src="+url+" /></center></td>");
					$("#Name").append("<td><center>"+ Name +"</center></td>");*/
					});
			});
			
			}
			
			//Food Store
			if(value == "Food"){
				$("#main").hide();
				$("#main2").hide();
				$("#main7").hide();
				$("#main4").hide();
				$("#main5").hide();
				$("#main8").hide();
				$("#main3").hide();
				$("#main6").hide();
				$("#getloction").hide();
				$("#mainx").hide();
				$("#main1").show();
				$("#main").empty();
				$("#main8").empty();
				$("#main2").empty();
				$("#main3").empty();
				$("#main4").empty();
				$("#main5").empty();
				$("#showmap").hide();
				$("#main6").empty();
				$("#main7").empty();
				$("#mainx").empty();
				$("#main1").empty();
				head.innerHTML = "Food Stores";
				var firebaseRef = firebase.database().ref('store').child('Food');
				firebaseRef.on("child_added",snap => {
				var Name = snap.child("Name").val();
				var pic = snap.child("ProfileImg").val();
				var id = snap.child("StoreID").val();
				var held = "#";
				var i = "win(this)";
				var target = "_top";
				var area = snap.child("Area").val();
				
				
				var storage = firebase.storage();
				var storageRef = storage.ref(pic) ;
				storageRef.getDownloadURL().then(function(url) {
				  
				  
				  $("#main1").append("<div><center><a  target = "+target+" href="+ held +" onclick="+i+" value="+id+"><img width="+125+" height="+125+ " src="+url+" /></a></center><br><center><a  target = "+target+" href="+ held +" onclick="+i+" value="+id+"> "+ Name +" &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "+ area +"</a></center></div>");
				  
				/*$("#id").append("<td><center>"+ id +"</center></td>");
				$("#pic").append("<td><center><img width="+125+" height="+125+" src="+url+" /></center></td>");
				$("#Name").append("<td><center>"+ Name +"</center></td>");*/
				});
		});
				
			}
			
			//Hardware Store
			if(value == "Hardware"){
				$("#main").hide();
				$("#main7").hide();
				$("#main1").hide();
				$("#main4").hide();
				$("#main5").hide();
				$("#main6").hide();
				$("#main3").hide();
				$("#main8").hide();
				$("#mainx").hide();
				$("#main2").show();
				$("#main").empty();
				$("#main1").empty();
				$("#main8").empty();
				$("#main3").empty();
				$("#main4").empty();
				$("#main5").empty();
				$("#getloction").hide();
				$("#main6").empty();
				$("#main7").empty();
				$("#mainx").empty();
				$("#showmap").hide();
				$("#main2").empty();
				head.innerHTML = "Hardware Stores";
				var firebaseRef = firebase.database().ref('store').child('Hardware');
				firebaseRef.on("child_added",snap => {
				var Name = snap.child("Name").val();
				var pic = snap.child("ProfileImg").val();
				var id = snap.child("StoreID").val();
				var held = "#";
				var i = "win(this)";
				var target = "_top";
				var area = snap.child("Area").val();
				
				
				var storage = firebase.storage();
				var storageRef = storage.ref(pic) ;
				storageRef.getDownloadURL().then(function(url) {
				  
				  
				  $("#main2").append("<div><center><a  target = "+target+" href="+ held +" onclick="+i+" value="+id+"><img width="+125+" height="+125+ " src="+url+" /></a></center><br><center><a  target = "+target+" href="+ held +" onclick="+i+" value="+id+"> "+ Name +" &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "+ area +"</a></center></div>");
				  
				/*$("#id").append("<td><center>"+ id +"</center></td>");
				$("#pic").append("<td><center><img width="+125+" height="+125+" src="+url+" /></center></td>");
				$("#Name").append("<td><center>"+ Name +"</center></td>");*/
				});
		});
				
			}
			
			//Electronic Store
			if(value == "Electronic"){
				$("#main").hide();
				$("#main1").hide();
				$("#main8").hide();
				$("#main2").hide();
				$("#main4").hide();
				$("#main7").hide();
				$("#main6").hide();
				$("#main5").hide();
				$("#mainx").hide();
				$("#getloction").hide();
				$("#main3").show();
				$("#main").empty();
				$("#main1").empty();
				$("#main2").empty();
				$("#main8").empty();
				$("#main4").empty();
				$("#main5").empty();
				$("#main6").empty();
				$("#main7").empty();
				$("#showmap").hide();
				$("#mainx").empty();
				$("#main3").empty();
				head.innerHTML = "Electronic Stores";
				var firebaseRef = firebase.database().ref('store').child('Electronic');
				firebaseRef.on("child_added",snap => {
				var Name = snap.child("Name").val();
				var pic = snap.child("ProfileImg").val();
				var id = snap.child("StoreID").val();
				var held = "#";
				var i = "win(this)";
				var target = "_top";
				var area = snap.child("Area").val();
				
				
				var storage = firebase.storage();
				var storageRef = storage.ref(pic) ;
				storageRef.getDownloadURL().then(function(url) {
				  
				  
				  $("#main3").append("<div><center><a  target = "+target+" href="+ held +" onclick="+i+" value="+id+"><img width="+125+" height="+125+ " src="+url+" /></a></center><br><center><a  target = "+target+" href="+ held +" onclick="+i+" value="+id+"> "+ Name +" &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "+ area +"</a></center></div>");
				  
				/*$("#id").append("<td><center>"+ id +"</center></td>");
				$("#pic").append("<td><center><img width="+125+" height="+125+" src="+url+" /></center></td>");
				$("#Name").append("<td><center>"+ Name +"</center></td>");*/
				});
		});
				
			}
			
			//Odd Stores
			if(value == "OddStore"){
				$("#main").hide();
				$("#main1").hide();
				$("#main5").hide();
				$("#main4").show();
				$("#main8").hide();
				$("#main2").hide();
				$("#main6").hide();
				$("#main7").hide();
				$("#showmap").hide();
				$("#main3").hide();
				$("#getloction").hide();
				$("#mainx").hide();
				$("#main").empty();
				$("#main1").empty();
				$("#main2").empty();
				$("#main3").empty();
				$("#main8").empty();
				$("#main5").empty();
				$("#main6").empty();
				$("#main7").empty();
				$("#mainx").empty();
				$("#main4").empty();
				head.innerHTML = "Odd Stores";
				var firebaseRef = firebase.database().ref('store').child('OddStore');
				firebaseRef.on("child_added",snap => {
				var Name = snap.child("Name").val();
				var pic = snap.child("ProfileImg").val();
				var id = snap.child("StoreID").val();
				var held = "#";
				var i = "win(this)";
				var target = "_top";
				var area = snap.child("Area").val();
				
				
				var storage = firebase.storage();
				var storageRef = storage.ref(pic) ;
				storageRef.getDownloadURL().then(function(url) {
				  
				  
				  $("#main4").append("<div><center><a  target = "+target+" href="+ held +" onclick="+i+" value="+id+"><img width="+125+" height="+125+ " src="+url+" /></a></center><br><center><a  target = "+target+" href="+ held +" onclick="+i+" value="+id+"> "+ Name +" &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "+ area +"</a></center></div>");
				  
				/*$("#id").append("<td><center>"+ id +"</center></td>");
				$("#pic").append("<td><center><img width="+125+" height="+125+" src="+url+" /></center></td>");
				$("#Name").append("<td><center>"+ Name +"</center></td>");*/
				});
		});
				
			}
			
			//Banks
			if(value == "Bank"){
				$("#main").hide();
				$("#main1").hide();
				$("#main6").hide();
				$("#main8").hide();
				$("#main7").hide();
				$("#main4").hide();
				$("#main2").hide();
				$("#main3").hide();
				$("#mainx").hide();
				$("#getloction").hide();
				$("#showmap").hide();
				$("#main5").show();
				$("#main").empty();
				$("#main1").empty();
				$("#main2").empty();
				$("#main3").empty();
				$("#main4").empty();
				$("#main8").empty();
				$("#main6").empty();
				$("#main7").empty();
				$("#mainx").empty();
				$("#main5").empty();
				head.innerHTML = "Banks";
				var firebaseRef = firebase.database().ref('store').child('Bank');
				firebaseRef.on("child_added",snap => {
				var Name = snap.child("Name").val();
				var pic = snap.child("ProfileImg").val();
				var id = snap.child("StoreID").val();
				var held = "#";
				var i = "win(this)";
				var target = "_top";
				var area = snap.child("Area").val();
				
				
				var storage = firebase.storage();
				var storageRef = storage.ref(pic) ;
				storageRef.getDownloadURL().then(function(url) {
				  
				  
				  $("#main5").append("<div><center><a  target = "+target+" href="+ held +" onclick="+i+" value="+id+"><img width="+125+" height="+125+ " src="+url+" /></a></center><br><center><a  target = "+target+" href="+ held +" onclick="+i+" value="+id+"> "+ Name +" &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "+ area +"</a></center></div>");
				  
				/*$("#id").append("<td><center>"+ id +"</center></td>");
				$("#pic").append("<td><center><img width="+125+" height="+125+" src="+url+" /></center></td>");
				$("#Name").append("<td><center>"+ Name +"</center></td>");*/
				});
		});
				
			}
			
			//PetrolPump
			if(value == "PetrolPump"){
				$("#main").hide();
				$("#main1").hide();
				$("#main4").hide();
				$("#main2").hide();
				$("#main7").hide();
				$("#main3").hide();
				$("#main8").hide();
				$("#main5").hide();
				$("#getloction").hide();
				$("#mainx").hide();
				$("#main6").show();
				$("#showmap").hide();
				$("#main").empty();
				$("#main1").empty();
				$("#main2").empty();
				$("#main3").empty();
				$("#main4").empty();
				$("#main5").empty();
				$("#main8").empty();
				$("#main7").empty();
				$("#mainx").empty();
				$("#main6").empty();
				head.innerHTML = "PetrolPump";
				var firebaseRef = firebase.database().ref('store').child('PetrolPump');
				firebaseRef.on("child_added",snap => {
				var Name = snap.child("Name").val();
				var pic = snap.child("ProfileImg").val();
				var id = snap.child("StoreID").val();
				var held = "#";
				var i = "win(this)";
				var target = "_top";
				var area = snap.child("Area").val();
				
				
				var storage = firebase.storage();
				var storageRef = storage.ref(pic) ;
				storageRef.getDownloadURL().then(function(url) {
				  
				  
				  $("#main6").append("<div><center><a  target = "+target+" href="+ held +" onclick="+i+" value="+id+"><img width="+125+" height="+125+ " src="+url+" /></a></center><br><center><a  target = "+target+" href="+ held +" onclick="+i+" value="+id+"> "+ Name +" &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "+ area +"</a></center></div>");
				  
				/*$("#id").append("<td><center>"+ id +"</center></td>");
				$("#pic").append("<td><center><img width="+125+" height="+125+" src="+url+" /></center></td>");
				$("#Name").append("<td><center>"+ Name +"</center></td>");*/
				});
		});
				
			}
			
			//Cloths
			if(value == "Cloths"){
				$("#main").hide();
				$("#main1").hide();
				$("#main4").hide();
				$("#main2").hide();
				$("#main8").hide();
				$("#main3").hide();
				$("#main5").hide();
				$("#main6").hide();
				$("#mainx").hide();
				$("#getloction").hide();
				$("#main7").show();
				$("#showmap").hide();
				$("#main").empty();
				$("#main1").empty();
				$("#main2").empty();
				$("#main3").empty();
				$("#main4").empty();
				$("#main5").empty();
				$("#main6").empty();
				$("#main8").empty();
				$("#mainx").empty();
				$("#main7").empty();
				head.innerHTML = "Cloths Stores";
				var firebaseRef = firebase.database().ref('store').child('Cloths');
				firebaseRef.on("child_added",snap => {
				var Name = snap.child("Name").val();
				var pic = snap.child("ProfileImg").val();
				var id = snap.child("StoreID").val();
				var held = "#";
				var i = "win(this)";
				var target = "_top";
				var area = snap.child("Area").val();
				
				
				var storage = firebase.storage();
				var storageRef = storage.ref(pic) ;
				storageRef.getDownloadURL().then(function(url) {
				  
				  
				  $("#main7").append("<div><center><a  target = "+target+" href="+ held +" onclick="+i+" value="+id+"><img width="+125+" height="+125+ " src="+url+" /></a></center><br><center><a  target = "+target+" href="+ held +" onclick="+i+" value="+id+"> "+ Name +" &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "+ area +"</a></center></div>");
				  
				/*$("#id").append("<td><center>"+ id +"</center></td>");
				$("#pic").append("<td><center><img width="+125+" height="+125+" src="+url+" /></center></td>");
				$("#Name").append("<td><center>"+ Name +"</center></td>");*/
				});
		});
				
			}
			
			//Other
			if(value == "Other"){
				$("#main").hide();
				$("#main1").hide();
				$("#main4").hide();
				$("#main2").hide();
				$("#main3").hide();
				$("#main5").hide();
				$("#main6").hide();
				$("#main7").hide();
				$("#getloction").hide();
				$("#showmap").hide();
				$("#mainx").hide();
				$("#main8").show();
				$("#main").empty();
				$("#main1").empty();
				$("#main2").empty();
				$("#main3").empty();
				$("#main4").empty();
				$("#main5").empty();
				$("#main6").empty();
				$("#main7").empty();
				$("#mainx").empty();
				$("#main8").empty();
				head.innerHTML = "Other Stores";
				var firebaseRef = firebase.database().ref('store').child('Other');
				firebaseRef.on("child_added",snap => {
				var Name = snap.child("Name").val();
				var pic = snap.child("ProfileImg").val();
				var id = snap.child("StoreID").val();
				var held = "#";
				var i = "win(this)";
				var target = "_top";
				var area = snap.child("Area").val();
				
				
				var storage = firebase.storage();
				var storageRef = storage.ref(pic) ;
				storageRef.getDownloadURL().then(function(url) {
				  
				  
				  $("#main8").append("<div><center><a  target = "+target+" href="+ held +" onclick="+i+" value="+id+"><img width="+125+" height="+125+ " src="+url+" /></a></center><br><center><a  target = "+target+" href="+ held +" onclick="+i+" value="+id+"> "+ Name +" &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "+ area +"</a></center></div>");
				  
				/*$("#id").append("<td><center>"+ id +"</center></td>");
				$("#pic").append("<td><center><img width="+125+" height="+125+" src="+url+" /></center></td>");
				$("#Name").append("<td><center>"+ Name +"</center></td>");*/
				});
		});
				
			}
	
		});
		
				
		
		
		
	/*	function clearBox(elementID)
		{
			document.getElementById(elementID).innerHTML = "";
		}
		
		function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -33.8688, lng: 151.2195},
          zoom: 13
        });
        var card = document.getElementById('pac-card');
        var input = document.getElementById('pac-input');
        var types = document.getElementById('type-selector');
        var strictBounds = document.getElementById('strict-bounds-selector');

        map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);

        var autocomplete = new google.maps.places.Autocomplete(input);

        // Bind the map's bounds (viewport) property to the autocomplete object,
        // so that the autocomplete requests use the current map bounds for the
        // bounds option in the request.
        autocomplete.bindTo('bounds', map);

        var infowindow = new google.maps.InfoWindow();
        var infowindowContent = document.getElementById('infowindow-content');
        infowindow.setContent(infowindowContent);
        var marker = new google.maps.Marker({
          map: map,
          anchorPoint: new google.maps.Point(0, -29)
        });

        autocomplete.addListener('place_changed', function() {
          infowindow.close();
          marker.setVisible(false);
          var place = autocomplete.getPlace();
          if (!place.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
          }

          // If the place has a geometry, then present it on a map.
          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);  // Why 17? Because it looks good.
          }
          marker.setPosition(place.geometry.location);
          marker.setVisible(true);

          var address = '';
          if (place.address_components) {
            address = [
              (place.address_components[0] && place.address_components[0].short_name || ''),
              (place.address_components[1] && place.address_components[1].short_name || ''),
              (place.address_components[2] && place.address_components[2].short_name || '')
            ].join(' ');
          }

          infowindowContent.children['place-icon'].src = place.icon;
          infowindowContent.children['place-name'].textContent = place.name;
          infowindowContent.children['place-address'].textContent = address;
          infowindow.open(map, marker);
        });

        // Sets a listener on a radio button to change the filter type on Places
        // Autocomplete.
        function setupClickListener(id, types) {
          var radioButton = document.getElementById(id);
          radioButton.addEventListener('click', function() {
            autocomplete.setTypes(types);
          });
        }

        setupClickListener('changetype-all', []);
        setupClickListener('changetype-address', ['address']);
        setupClickListener('changetype-establishment', ['establishment']);
        setupClickListener('changetype-geocode', ['geocode']);

        document.getElementById('use-strict-bounds')
            .addEventListener('click', function() {
              console.log('Checkbox clicked! New state=' + this.checked);
              autocomplete.setOptions({strictBounds: this.checked});
            });
      }
	  
	  function showResult(result) {
    document.getElementById('latitude').value = result.geometry.location.lat();
    document.getElementById('longitude').value = result.geometry.location.lng();
}

function getLatitudeLongitude(callback, address) {
    // If adress is not supplied, use default value 'Ferrol, Galicia, Spain'
    address = address || 'Ferrol, Galicia, Spain';
    // Initialize the Geocoder
    geocoder = new google.maps.Geocoder();
    if (geocoder) {
        geocoder.geocode({
            'address': address
        }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                callback(results[0]);
            }
        });
    }
}

var button = document.getElementById('btn');

button.addEventListener("click", function () {
    var address = document.getElementById('address').value;
    getLatitudeLongitude(showResult, address)
});*/