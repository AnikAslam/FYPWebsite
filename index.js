firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
	$(".login-cover").hide();
	$("#signUpDialog").hide();
	var user = firebase.auth().currentUser;
	var userUID = firebase.auth().currentUser.uid;
	var refup = firebase.database().ref('/business/' + userUID).child('Name');
	var firebaseRef = firebase.database().ref('/business/' + userUID);
	
	refup.on('value', function(datasnapshot) {
		var name = datasnapshot.val();
		if(name == null){
			$("#tableStore").hide();
			$("#mapActivity").hide();
			$("#EditPromoDialog").hide();
			$("#EditStoreDialog").hide();
			$("#addBtn").hide();
			$("#signUpDialog").show();
			$("#signUpProgress").hide();
			
			//user Profile Dialog
			$("#submitClick").click(
					function(){
						var name2 = document.getElementById("username");
						var Area = document.getElementById("userarea");
						var Contact = document.getElementById("usercontact");
						
						var name2 = name2.value;
						var Email = user.email;
						var area = Area.value;
						var contact = Contact.value;
						
						if(name2 != "" && Email != ""  && area != "" && contact != "" && contact.length == 11){
								$("#signUpProgress").show();
								$("#submitClick").hide();
				
								firebaseRef.child("Name").set(name2);
								firebaseRef.child("Email").set(Email);
								firebaseRef.child("Area").set(area);
								firebaseRef.child("Contact").set(contact);
								firebaseRef.child("ProfileImg").set("DefaultImage/UserDefaulImage.png");
								firebaseRef.child("Type").set("Business");
								firebaseRef.child("Store").child("StoreName").set("");
								firebaseRef.child("Store").child("StoreDecription").set("");
								firebaseRef.child("Store").child("Address").set("");
								firebaseRef.child("Store").child("Area").set("");
								firebaseRef.child("Store").child("Contact").set("");
								firebaseRef.child("Store").child("Email").set("");
								firebaseRef.child("Store").child("ID").set("");
								firebaseRef.child("Store").child("Latitude").set("");
								firebaseRef.child("ProfileImg").set("DefaultImage/UserDefaulImage.png");
								firebaseRef.child("Store").child("Longitude").set("");
								firebaseRef.child("Store").child("Type").set("");
								firebaseRef.child("Store").child("Promo").child("Area").set("");
								firebaseRef.child("Store").child("Promo").child("Contact").set("");
								firebaseRef.child("Store").child("Promo").child("Description").set("");
								firebaseRef.child("Store").child("Promo").child("Email").set("");
								firebaseRef.child("Store").child("Promo").child("ID").set("");
								firebaseRef.child("Store").child("Promo").child("PromoName").set("");
								$("#signUpError").show().text("Redirecting you to Login Page");
								setTimeout('Redirect()', 2000);
						}else{
								$("#signUpError").show().text("All Fields are required and contact must be of 11 digit");
						}
		
		});
			
		}else{
	

	
	var ref = firebase.database().ref('/business/' + userUID).child('Store').child('StoreName');
		//I am doing a child based listener, but you can use .once('value')...
	
	ref.on('value', function(datasnapshot) {
		//data.key will be like -KPmraap79lz41FpWqLI
		var data = datasnapshot.val();
		
		//Store Information Display
		if(data != ""){
			$("#tableStore").show();
			$("#mapActivity").show();
			$("#EditPromoDialog").hide();
			$("#EditStoreDialog").hide();
			$("#signUpDialog").hide();
			$("#addBtn").hide();
			
			var firebaseRefData = firebase.database().ref('/business/' + userUID).child('Store');
			firebaseRefData.on("value",function(snap){
				
			var StoreId = snap.child("ID").val();
			var StoreName = snap.child("StoreName").val(); 
			var StoreDescription = snap.child("StoreDecription").val(); 
			var StoreType = snap.child("Type").val(); 
			var StoreEmail = snap.child("Email").val(); 
			var StoreContact = snap.child("Contact").val(); 
			var StoreArea = snap.child("Area").val(); 
			var StoreAddress = snap.child("Address").val(); 
			var StoreLatitude = snap.child("Latitude").val();
			var StoreLongitude = snap.child("Longitude").val();
			var StorePicture = snap.child("ProfileImg").val();
			
			map(StoreLatitude , StoreLongitude, StoreName);
			
			$("#Name").text(StoreName);
			$("#Description").text(StoreDescription);
			$("#Type").text(StoreType);
			$("#Email").text(StoreEmail);
			$("#Contact").text(StoreContact);
			$("#Area").text(StoreArea);
			$("#Address").text(StoreAddress);
			
				var storage = firebase.storage();
				var storageRef = storage.ref();
				var tangRef = storageRef.child(StorePicture);

				tangRef.getDownloadURL().then(function(url) 
				{
					var test = url
					document.querySelector('img').src = test;
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
				
				
			//Edit Store Info	
			$("#editStore").click(
				function(){
					$("#tableStore").hide();
					$("#mapActivity").hide();
					$("#EditPromoDialog").hide();
					$("#EditStoreDialog").show();
					$("#addBtnPromo").hide();
					$("#tablePromo").hide();
					$("#storeEditSaveProgress").hide();
					$("#addBtn").hide();
					$("#signUpDialog").hide();
					$("#signUpProgress").hide();
					
										var ESName = document.getElementById("EditStoreName");
										var ESEmail = document.getElementById("EditStoreEmail");
										var ESDesc = document.getElementById("EditStoreDesc");
										var ESArea = document.getElementById("EditStoreArea");
										var ESContact = document.getElementById("EditStoreContact");
										var ESType = document.getElementById("EditStoreType");
										var ESAdd = document.getElementById("EditStoreAdd");
										var ESLat = document.getElementById("Elat");
										var ESLong = document.getElementById("Elong");
										
										map1(StoreLatitude , StoreLongitude , StoreName);
										
										ESName.value = StoreName;
										ESEmail.value = StoreEmail;
										ESDesc.value = StoreDescription;
										ESArea.value = StoreArea;
										ESContact.value = StoreContact;
										ESType.value = StoreType;
										ESAdd.value = StoreAddress;
										ESLat.value = StoreLatitude;
										ESLong.value = StoreLongitude;
										
					
				});
				
				//Save Edit Store Info
				$("#storeEditSaveBtn").click(
								function(){
									
										var PESName = document.getElementById("EditStoreName");
										var PESEmail = document.getElementById("EditStoreEmail");
										var PESDesc = document.getElementById("EditStoreDesc");
										var PESArea = document.getElementById("EditStoreArea");
										var PESContact = document.getElementById("EditStoreContact");
										var PESType = document.getElementById("EditStoreType");
										var PESAdd = document.getElementById("EditStoreAdd");
										var PESLat = document.getElementById("Elat");
										var PESLong = document.getElementById("Elong");
										
										var pesname = PESName.value;
										var pesemail = PESEmail.value;
										var pesdesc = PESDesc.value;
										var pesarea = PESArea.value;
										var pescontact = PESContact.value;
										var pestype = PESType.value;
										var pesadd = PESAdd.value;
										var peslat = PESLat.value;
										var peslong = PESLong.value;
										
										var refStore = firebase.database().ref('/business/' + userUID).child('Store');
										var refStoreAll = firebase.database().ref('/store/').child('All/' + StoreId);
										var refStoreType = firebase.database().ref('/store/').child(pestype + '/' + StoreId);
										
										
										
										var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
										if(re.test(pesemail.toLowerCase()) && pescontact.length == 11 && pesname != "" && pesemail != "" && pesdesc != "" && pesarea != "" && pescontact != "" && pesadd != "" && pestype != "" && peslat != "" && peslong != ""){	
												$("#storeEditSaveProgress").show();
												$("#storeEditSaveBtn").hide();
												
												refStore.child("StoreName").set(pesname);
												refStore.child("StoreDecription").set(pesdesc);
												refStore.child("Email").set(pesemail);
												refStore.child("Area").set(pesarea);
												refStore.child("Contact").set(pescontact);
												refStore.child("Address").set(pesadd);
												refStore.child("Type").set(pestype);
												refStore.child("Latitude").set(peslat);
												refStore.child("Longitude").set(peslong);
												
												refStoreAll.child("Name").set(pesname);
												refStoreAll.child("Description").set(pesdesc);
												refStoreAll.child("Email").set(pesemail);
												refStoreAll.child("Area").set(pesarea);
												refStoreAll.child("Contact").set(pescontact);
												refStoreAll.child("Address").set(pesadd);
												refStoreAll.child("Latitude").set(peslat);
												refStoreAll.child("Longitude").set(peslong);
												refStoreAll.child("Type").set(pestype);
												refStoreAll.child("Promo").child("ID").set("");
												refStoreAll.child("Promo").child("PromoName").set("");
												refStoreAll.child("Promo").child("Description").set("");
												refStoreAll.child("Promo").child("Email").set("");
												refStoreAll.child("Promo").child("Area").set("");
												refStoreAll.child("Promo").child("Contact").set("");
												
												refStoreType.child("Name").set(pesname);
												refStoreType.child("Description").set(pesdesc);
												refStoreType.child("Email").set(pesemail);
												refStoreType.child("Area").set(pesarea);
												refStoreType.child("Contact").set(pescontact);
												refStoreType.child("Address").set(pesadd);
												refStoreType.child("Latitude").set(peslat);
												refStoreType.child("Longitude").set(peslong);
												refStoreType.child("Type").set(pestype);
												refStoreType.child("Promo").child("ID").set("");
												refStoreType.child("Promo").child("PromoName").set("");
												refStoreType.child("Promo").child("Description").set("");
												refStoreType.child("Promo").child("Email").set("");
												refStoreType.child("Promo").child("Area").set("");
												refStoreType.child("Promo").child("Contact").set("");
												$("#storeEditSaveError").show().text("Redirecting you to Main Page");
												setTimeout('Redirect()', 2000);
										}else{
												$("#storeEditSaveError").show().text("All fields are required , contact must be of 11 digits and email must be xyz@abc.com form");
										}
										
								});
								
								//Edit Store Profile Pic
								$("#editPicture").click(
									function(){
										$("#tableStore").hide();
										$("#mapActivity").hide();
										$("#EditPromoDialog").hide();
										$("#EditStoreDialog").hide();
										$("#addBtnPromo").hide();
										$("#tablePromo").hide();
										$("#storeEditSaveProgress").hide();
										$("#addBtn").hide();
										$("#uploadeditButton").hide();
										$("#signUpDialog").hide();
										$("#signUpProgress").hide();
										$("#editPic").show();
										$("#progressPic").hide();
									});
									
									$("#picEditSaveBtn").click(
										function(){
											$("#uploadeditButton").hide();
											$("#picEditSaveBtn").hide();
											$("#progressPic").show();
											
											var StorePictureUpdate = document.getElementById("urlpicedit");
											var supicture = StorePictureUpdate.value;
											
											var refStore = firebase.database().ref('/business/' + userUID).child('Store');
											var refStoreAll = firebase.database().ref('/store/').child('All/' + StoreId);
											var refStoreType = firebase.database().ref('/store/').child(StoreType + '/' + StoreId);
											
											if(supicture != ""){
												refStore.child("ProfileImg").set(supicture);
												refStoreAll.child("ProfileImg").set(supicture);
												refStoreType.child("ProfileImg").set(supicture);
												
												$("#errorUpdate").show().text("Redirecting you to Main Page");
												setTimeout('Redirect()', 2000);
											}else{
												$("#errorUpdate").show().text("Please Select any picture");
											}
										});
			
			var refStore = firebase.database().ref('/business/' + userUID).child('Store');
			
			refStore.on("value",function(snap){
				
				var Promo = snap.child("Promo").child("PromoName").val();
				
				//Promotion Info
				if( Promo != ""){
					$("#tablePromo").show();
					$("#EditPromoDialog").hide();
					$("#addBtnPromo").hide();
					$("#EditStoreDialog").hide();
					$("#signUpDialog").hide();
					$("#signUpProgress").hide();
					
					var PromoDesc = snap.child("Promo").child("Description").val();
					var PromoEmail = snap.child("Promo").child("Email").val();
					var PromoContact = snap.child("Promo").child("Contact").val();
					var PromoArea = snap.child("Promo").child("Area").val();
					
					$("#PromoName").text(Promo);
					$("#PromoDescription").text(PromoDesc);
					$("#PromoEmail").text(PromoEmail);
					$("#PromoContact").text(PromoContact);
					$("#PromoArea").text(PromoArea);
					$("#signUpDialog").hide();
					$("#signUpProgress").hide();
					
					//Edit Promo
					$("#editPromo").click(
						function(){
							$("#tablePromo").hide();
							$("#tableStore").hide();
							$("#mapActivity").hide();
							$("#saveProgress").hide();
							$("#saveEditProgress").hide();
							$("#EditStoreDialog").hide();
							$("#EditPromoDialog").show();
							$("#signUpDialog").hide();
							$("#signUpProgress").hide();
							
										var EProName = document.getElementById("EProName");
										var EProEmail = document.getElementById("EProEmail");
										var EProDesc = document.getElementById("EProDesc");
										var EProArea = document.getElementById("EProArea");
										var EProContact = document.getElementById("EProContact");

										EProName.value = Promo;
										EProEmail.value = PromoEmail;
										EProDesc.value = PromoDesc;
										EProArea.value = PromoArea;
										EProContact.value = PromoContact;
										
						});
										
							//Save Edit Promo			
							$("#saveEditBtn").click(
								function(){
										
										var PEName = document.getElementById("EProName");
										var PEEmail = document.getElementById("EProEmail");
										var PEDesc = document.getElementById("EProDesc");
										var PEArea = document.getElementById("EProArea");
										var PEContact = document.getElementById("EProContact");
										
										var pename = PEName.value;
										var peemail = PEEmail.value;
										var pedesc = PEDesc.value;
										var pearea = PEArea.value;
										var pecontact = PEContact.value;
										
										var refPromo = firebase.database().ref('/business/' + userUID).child('Store').child('Promo');
										var refStore = firebase.database().ref('/store/').child('All/' + StoreId).child('Promo');
										var refType = firebase.database().ref('/store/').child(StoreType + '/' + StoreId).child('Promo');
										
										var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
										if(re.test(peemail.toLowerCase()) && pecontact.length == 11 && pename != "" && peemail != "" && pedesc != "" && pearea != "" && pecontact != "" ){	
												$("#saveEditProgress").show();
												$("#saveEditBtn").hide();
												
												refPromo.child("PromoName").set(pename);
												refPromo.child("Description").set(pedesc);
												refPromo.child("Email").set(peemail);
												refPromo.child("Area").set(pearea);
												refPromo.child("Contact").set(pecontact);
												
												refStore.child("PromoName").set(pename);
												refStore.child("Description").set(pedesc);
												refStore.child("Email").set(peemail);
												refStore.child("Area").set(pearea);
												refStore.child("Contact").set(pecontact);
												
												refType.child("PromoName").set(pename);
												refType.child("Description").set(pedesc);
												refType.child("Email").set(peemail);
												refType.child("Area").set(pearea);
												refType.child("Contact").set(pecontact);
												
												$("#saveError").show().text("Redirecting you to Main Page");
												setTimeout('Redirect()', 2000);
										}else{
												$("#saveEditProgress").show().text("All fields are required , contact must be of 11 digits and email must be xyz@abc.com form");
										}
										
								});

					//Delete Promo				
					$("#deletePromo").click(
						function(){
							var refPromo = firebase.database().ref('/business/' + userUID).child('Store').child('Promo');
							var refStore = firebase.database().ref('/store/').child('All/' + StoreId).child('Promo');
							var refType = firebase.database().ref('/store/').child(StoreType + '/' + StoreId).child('Promo');
							
							var answer = confirm("Delete Promo?")
							if (answer) {
								//some code
												refPromo.child("ID").set("");
												refPromo.child("PromoName").set("");
												refPromo.child("Description").set("");
												refPromo.child("Email").set("");
												refPromo.child("Area").set("");
												refPromo.child("Contact").set("");
												
												refStore.child("ID").set("");
												refStore.child("PromoName").set("");
												refStore.child("Description").set("");
												refStore.child("Email").set("");
												refStore.child("Area").set("");
												refStore.child("Contact").set("");
												
												refType.child("ID").set("");
												refType.child("PromoName").set("");
												refType.child("Description").set("");
												refType.child("Email").set("");
												refType.child("Area").set("");
												refType.child("Contact").set("");
							}else {
								alert("You selected Cancel");
							}
						});
					
				}else{
					$("#tablePromo").hide();
					$("#addBtnPromo").show();
					$("#EditStoreDialog").hide();
					$("#signUpDialog").hide();
					$("#signUpProgress").hide();
					
					//Add Promotion if not exist
					$("#addBtnPromo").click(
						function(){
							$("#tableStore").hide();
							$("#addBtnPromo").hide();
							$("#mapActivity").hide();
							$("#EditPromoDialog").hide();
							$("#EditStoreDialog").hide();
							$("#saveProgress").hide();
							$("#signUpDialog").hide();
							$("#signUpProgress").hide();
							
							$("#PromoDialog").show();
							
							$("#saveBtn").click(
								function(){
										var ProName = document.getElementById("ProName");
										var ProEmail = document.getElementById("ProEmail");
										var ProDesc = document.getElementById("ProDesc");
										var ProArea = document.getElementById("ProArea");
										var ProContact = document.getElementById("ProContact");
										
										var pname = ProName.value;
										var pemail = ProEmail.value;
										var pdesc = ProDesc.value;
										var parea = ProArea.value;
										var pcontact = ProContact.value;
										var refPromo = firebase.database().ref('/business/' + userUID).child('Store').child('Promo');
										var refStore = firebase.database().ref('/store/').child('All/' + StoreId).child('Promo');
										var refType = firebase.database().ref('/store/').child(StoreType + '/' + StoreId).child('Promo');
										
										var promoId = Math.floor(Math.random() * (1000 - 0 + 1)) + 1;
										
										
										var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
										if(re.test(pemail.toLowerCase()) && pcontact.length == 11 && pname != "" && pemail != "" && pdesc != "" && parea != "" && pcontact != "" ){	
												$("#saveProgress").show();
												$("#saveBtn").hide();
												
												refPromo.child("ID").set(userUID);
												refPromo.child("PromoName").set(pname);
												refPromo.child("Description").set(pdesc);
												refPromo.child("Email").set(pemail);
												refPromo.child("Area").set(parea);
												refPromo.child("Contact").set(pcontact);
												
												refStore.child("ID").set(userUID);
												refStore.child("PromoName").set(pname);
												refStore.child("Description").set(pdesc);
												refStore.child("Email").set(pemail);
												refStore.child("Area").set(parea);
												refStore.child("Contact").set(pcontact);
												
												refType.child("ID").set(userUID);
												refType.child("PromoName").set(pname);
												refType.child("Description").set(pdesc);
												refType.child("Email").set(pemail);
												refType.child("Area").set(parea);
												refType.child("Contact").set(pcontact);
												
												$("#saveError").show().text("Redirecting you to Main Page");
												setTimeout('Redirect()', 2000);
										}else{
												$("#saveError").show().text("All fields are required , contact must be of 11 digits and email must be xyz@abc.com form");
										}
									
								});
							
						});
				}
				
			});
				
	});
			
		}else{
			$("#addBtn").show();
			$("#addBtnPromo").hide();
			$("#EditPromoDialog").hide();
			$("#StoreDialog").hide();
			$("#tablePromo").hide();
			$("#tableStore").hide();
			$("#mapActivity").hide();
			$("#EditStoreDialog").hide();
			$("#signUpDialog").hide();
			$("#signUpProgress").hide();
			
			//Add Store if Note Exist
			$("#addBtn").click(
				function(){
					
					$("#addBtn").hide();
					$("#EditStoreDialog").hide();
					$("#StoreDialog").show();
					
					$("#storeSaveBtn").click(
								function(){
										$("#uploadButton").hide();
										var StoreName = document.getElementById("StoreName");
										var StoreEmail = document.getElementById("StoreEmail");
										var StoreDesc = document.getElementById("StoreDesc");
										var StoreArea = document.getElementById("StoreArea");
										var StoreContact = document.getElementById("StoreContact");
										var StoreAddress = document.getElementById("StoreAdd");
										var StoreType = document.getElementById("StoreType");
										var StoreLatitude = document.getElementById("lat");
										var StoreLongitude = document.getElementById("long");
										var StorePicture = document.getElementById("url");
										
										var sname = StoreName.value;
										var semail = StoreEmail.value;
										var sdesc = StoreDesc.value;
										var sarea = StoreArea.value;
										var scontact = StoreContact.value;
										var saddress = StoreAddress.value;
										var stype = StoreType.value;
										var slatitude = StoreLatitude.value;
										var slongitude = StoreLongitude.value;
										var spicture = StorePicture.value;
										
										var storeId = Math.floor(Math.random() * (1000 - 0 + 1)) + 1;
										var refStore = firebase.database().ref('/business/' + userUID).child('Store');
										var refStoreAll = firebase.database().ref('/store/').child('All/' + userUID);
										var refStoreType = firebase.database().ref('/store/').child(stype + '/' + userUID);
										
										
										
										var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
										if(re.test(semail.toLowerCase()) && scontact.length == 11 && sname != "" && semail != "" && sdesc != "" && sarea != "" && scontact != "" && saddress != "" && stype != "" && slatitude != "" && slongitude != "" && spicture != ""){	
												$("#storeSaveProgress").show();
												$("#EditStoreDialog").hide();
												$("#storeSaveBtn").hide();
												
												refStore.child("ID").set(userUID);
												refStore.child("StoreName").set(sname);
												refStore.child("StoreDecription").set(sdesc);
												refStore.child("Email").set(semail);
												refStore.child("Area").set(sarea);
												refStore.child("Contact").set(scontact);
												refStore.child("Address").set(saddress);
												refStore.child("Type").set(stype);
												refStore.child("Latitude").set(slatitude);
												refStore.child("Longitude").set(slongitude);
												refStore.child("ProfileImg").set(spicture);
												
												refStoreAll.child("StoreID").set(userUID);
												refStoreAll.child("Name").set(sname);
												refStoreAll.child("Description").set(sdesc);
												refStoreAll.child("Email").set(semail);
												refStoreAll.child("Area").set(sarea);
												refStoreAll.child("Contact").set(scontact);
												refStoreAll.child("Address").set(saddress);
												refStoreAll.child("Latitude").set(slatitude);
												refStoreAll.child("Longitude").set(slongitude);
												refStoreAll.child("ProfileImg").set(spicture);
												refStoreAll.child("Type").set(stype);
												refStoreAll.child("Promo").child("ID").set("");
												refStoreAll.child("Promo").child("PromoName").set("");
												refStoreAll.child("Promo").child("Description").set("");
												refStoreAll.child("Promo").child("Email").set("");
												refStoreAll.child("Promo").child("Area").set("");
												refStoreAll.child("Promo").child("Contact").set("");
												
												refStoreType.child("storeID").set(userUID);
												refStoreType.child("Name").set(sname);
												refStoreType.child("Description").set(sdesc);
												refStoreType.child("Email").set(semail);
												refStoreType.child("Area").set(sarea);
												refStoreType.child("Contact").set(scontact);
												refStoreType.child("Address").set(saddress);
												refStoreType.child("Latitude").set(slatitude);
												refStoreType.child("Longitude").set(slongitude);
												refStoreType.child("ProfileImg").set(spicture);
												refStoreType.child("Type").set(stype);
												refStoreType.child("Promo").child("ID").set("");
												refStoreType.child("Promo").child("PromoName").set("");
												refStoreType.child("Promo").child("Description").set("");
												refStoreType.child("Promo").child("Email").set("");
												refStoreType.child("Promo").child("Area").set("");
												refStoreType.child("Promo").child("Contact").set("");
												$("#storeSaveError").show().text("Redirecting you to Main Page");
												setTimeout('Redirect()', 2000);
										}else{
												$("#storeSaveError").show().text("All fields are required , contact must be of 11 digits and email must be xyz@abc.com form");
										}
									
								});
					
				});
		}
	});
		}
		});
	
	var dialog = document.querySelector('#loginDialog');
	if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }
	dialog.close();
	
  } else {
    // No user is signed in.
	$(".login-cover").show();
	var dialog = document.querySelector('#loginDialog');
	if (! dialog.showModal) {
      dialogPolyfill.registerDialog(dialog);
    }
	dialog.showModal();
  }
});

		/* UPLOAD IMAGE */

		var selectedfile;
	
	
	$("#file").on("change", function(event){
		selectedfile = event.target.files[0];
		$("#uploadButton").show();
		});
		
	function uploadfile(userId){
	// Create a root reference
	var filename = selectedfile.name;
	var name = String(filename);
	var url = document.getElementById("url");
	url.value = "/images/" + name;
	//document.getElementById("name").set(filename);
	var storageRef = firebase.storage().ref('/images/' + filename);
	var uploadTask = storageRef.put(selectedfile);
	
											
	// Register three observers:
	// 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
	// 3. Completion observer, called on successful completion
	uploadTask.on('state_changed',function(snapshot){
	// Observe state change events such as progress, pause, and resume
	// See below for some detail
	},function(error){
	//Handle unsuccessful uploads
	},function() {
	//Handle successful uploads on complete
	// For instance. get the download URL: https://firebasestorage.googleapis.com/...
	var downloadURL = uploadTask.snapshot.downloadURL;
	$("#uploadButton").hide();
	
			}); 
								
											
	}	
	
	/* UPDATE Picture*/
	var selectedfile1;
	
	
	$("#fileedit").on("change", function(event){
		selectedfile1 = event.target.files[0];
		$("#uploadeditButton").show();
		});
		
	function uploadeditfile(userId){
	// Create a root reference
	var filename1 = selectedfile1.name;
	var name1 = String(filename1);
	var url1 = document.getElementById("urlpicedit");
	url1.value = "/images/" + name1;
	//document.getElementById("name").set(filename);
	var storageRef = firebase.storage().ref('/images/' + filename1);
	var uploadTask = storageRef.put(selectedfile1);
	
											
	// Register three observers:
	// 1. 'state_changed' observer, called any time the state changes
    // 2. Error observer, called on failure
	// 3. Completion observer, called on successful completion
	uploadTask.on('state_changed',function(snapshot){
	// Observe state change events such as progress, pause, and resume
	// See below for some detail
	},function(error){
	//Handle unsuccessful uploads
	},function() {
	//Handle successful uploads on complete
	// For instance. get the download URL: https://firebasestorage.googleapis.com/...
	var downloadURL = uploadTask.snapshot.downloadURL;
	$("#uploadeditButton").hide();
	
			}); 
								
											
	}
	
	/*GET LATITUDE & Longitude*/
	function geoFindMe() {
			  var output = document.getElementById("out");
			  
			  if (!navigator.geolocation){
				output.innerHTML = "<p>Geolocation is not supported by your browser</p>";
				return;
			  }

			  function success(position) {
				var latitude  = position.coords.latitude;
				var longitude = position.coords.longitude;

				document.getElementById("lat").value = latitude;
				document.getElementById("long").value = longitude;

				var img = new Image();
				img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";

				output.appendChild(img);
			  }

			  function error() {
				output.innerHTML = "Unable to retrieve your location";
			  }

			  navigator.geolocation.getCurrentPosition(success, error);
			}
			
			/* EDIT MAP GET*/
			function geoFindMe1() {
				$("#Eout").hide();
			  var Eoutput = document.getElementById("map1");
			  
			  if (!navigator.geolocation){
				Eoutput.innerHTML = "<p>Geolocation is not supported by your browser</p>";
				return;
			  }

			  function success(position) {
				var latitude  = position.coords.latitude;
				var longitude = position.coords.longitude;

				document.getElementById("Elat").value = latitude;
				document.getElementById("Elong").value = longitude;
				
				var myLatLng = {lat: latitude, lng: longitude};

				var img = new Image();
				img.src = "https://maps.googleapis.com/maps/api/staticmap?center=" + latitude + "," + longitude + "&zoom=13&size=300x300&sensor=false";

				Eoutput.appendChild(img);
			  }

			  function error() {
				Eoutput.innerHTML = "Unable to retrieve your location";
			  }

			  navigator.geolocation.getCurrentPosition(success, error);
			}
	
	/*Map Activity*/
	function map(lat1 , long , name){
			var map;
			
            var latitude = Number(lat1);			// YOUR LATITUDE VALUE
            var longitude = Number(long); // YOUR LONGITUDE VALUE
            
            var myLatLng = {lat: latitude, lng: longitude};

            
            map = new google.maps.Map(document.getElementById('map'), {
              center: myLatLng,
              zoom: 14                    
            });
                    
            var marker = new google.maps.Marker({
              position: myLatLng,
              map: map,
              //title: 'Hello World'
              
              // setting latitude & longitude as title of the marker
              // title is shown when you hover over the marker
              title: name 
            });  	
	}
	
	/*Map Activity Edit*/
	function map1(lat1 , long , name){
			var map;
			
            var latitude = Number(lat1);			// YOUR LATITUDE VALUE
            var longitude = Number(long); // YOUR LONGITUDE VALUE
            
            var myLatLng = {lat: latitude, lng: longitude};

            
            map = new google.maps.Map(document.getElementById('Eout'), {
              center: myLatLng,
              zoom: 14                    
            });
                    
            var marker = new google.maps.Marker({
              position: myLatLng,
              map: map,
              //title: 'Hello World'
              
              // setting latitude & longitude as title of the marker
              // title is shown when you hover over the marker
              title: name 
            });  	
	}
					
	
	/* LOGIN PROCESS */
	$("#loginBtn").click(
		function(){
			
			var email = $("#loginEmail").val();
			var password = $("#loginPassword").val();
			
			if( email != "" && password != "" ){
				$("#loginProgress").show();
				$("#loginBtn").hide();
				$("#signUpBtn").hide();
				
				firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error){
					
						$("#loginError").show().text(error.message);
						$("#loginProgress").hide();
						$("#loginBtn").show();
					
				});
			}else{
				$("#loginError").show().text("Please enter Email and Password");
			}
			
		}
	);
	
	//Signup Process
	$("#signUpBtn").click(
		function(){
			var email = $("#loginEmail").val();
			var password = $("#loginPassword").val();
			
			if( email != "" && password != "" ){
					$("#loginProgress").show();
					$("#loginBtn").hide();
					$("#signUpBtn").hide();
					
					firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
						// Handle Errors here.
						$("#loginError").show().text(error.message);
						$("#loginProgress").hide();
						$("#signUpBtn").show();	
					});
			}else{
				$("#loginError").show().text("Please enter Email and Password");
			}
						
			});
	
	//Reset Password
	$("#resetPass").click(
		function(){
					var emailid = $("#loginEmail").val();
					
					if(emailid != ""){
						firebase.auth().sendPasswordResetEmail(emailid).then(function() {
							// Email sent.
							$("#loginError").show().text("Email Sent");
						}).catch(function(error) {
							// An error happened.
						});
					}else{
						$("#loginError").show().text("Please enter Email");
					}
			}
		);
			
			
	function Redirect() {
               window.location="index1.html";
            }
	
	
	/* LOGOUT PROCESS */
	$("#signOutBtn").click(
		function(){
			firebase.auth().signOut().then(function() {
			// Sign-out successful.
						$("#loginProgress").hide();
						$("#loginBtn").show();
						$("#signUpBtn").show();
			}).catch(function(error) {
			// An error happened.
			
			alert(error.message);
			});
		}
	);
	
	
	
	
	
/* COMMENT END */