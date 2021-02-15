var client = null;

function setHomeServer(form){
	if(form.hssel.value != ""){
		if(form.hssel.value == "other"){
			if(form.homeserverURL.value != ""){
				URL = from.homeserverURL.value;
			}else {
				document.getElementById("p-msg").innerHTML = '<div class="alert alert-warning" role="alert">Please enter your homeserver URL!</div>';
			}
		}else{
			URL = form.hssel.value;
		}
		client = matrixcs.createClient(URL);
		document.getElementById("hs-msg").innerHTML = '<div class="alert alert-success" role="alert">Homeserver set!</div>';
	}
}

function loginForm(form){
	if(client != null) {
		if(form.username.value != "" && form.password.value != ""){
			client.loginWithPassword(form.username.value,form.password.value,function (err, data)
									 {
										 if (data)
										 {
											 document.getElementById("lg-msg").innerHTML = '<div class="alert alert-success" role="alert">Logged in as '+data.user_id+'</div>';
											 
										 }

										 if (err)
										 {
											 document.getElementById("lg-msg").innerHTML = '<div class="alert alert-danger" role="alert">Error logging in: '+JSON.stringify(err)+'</div>';
											 console.log('error: %s', JSON.stringify(err));
										 }
									 });
		}
	}else {
		document.getElementById("lg-msg").innerHTML = '<div class="alert alert-warning" role="alert">Please set the homeserver URL first!</div>';
	}
}

var response = null;

function addPack(form) {
	if(client.getUserId() != null){
		var URL = "";
		if(form.packsel.value != ""){
			if(form.packsel.value == "other"){
				if(form.packURL.value != ""){
					URL = from.packURL.value;
				}else {
					document.getElementById("p-msg").innerHTML = '<div class="alert alert-warning" role="alert">Please enter a stickerpack URL!</div>';
				}
			}else{
				URL = form.packsel.value;
			}
			var content = {
				stickerpicker: {
					content: {
						type: "m.stickerpicker",
						url: URL+"/?theme=$theme",
						name: "Stickerpicker",
						data: {}
					},
					sender: client.getUserId(),
					state_key: "stickerpicker",
					type: "m.widget",
					id: "stickerpicker"
				}
			};
			response = client.setAccountData("m.widgets",content);
			document.getElementById("p-msg").innerHTML = '<div class="alert alert-success" role="alert">Sticker pack added!</div>';
			client.logout();
			
		}else{
			document.getElementById("p-msg").innerHTML = '<div class="alert alert-warning" role="alert">Please select a pack first!</div>';
		}
	}
}

function showDiv(divId, element)
{
    document.getElementById(divId).style.display = element.value == "other" ? 'block' : 'none';
}

