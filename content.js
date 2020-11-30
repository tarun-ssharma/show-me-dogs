document.addEventListener("DOMContentLoaded", function(event) {
    var userName;
    //Try to look for the name in storage.
	$('#randomize')[0].style.visibility= "hidden";
    chrome.storage.sync.get('userName', function(result) {
        userName = result['userName'];
        if (userName !== undefined) {
            //this means the name was saved before
            //the input box shouldnt be there
            //TBD2:use jquery
            document.getElementById('displayName').innerHTML = "Hello there," + userName + ". Here are some cute doggos just for you :)";
			$('#randomize')[0].style.visibility= "visible";
			$('#randomize')[0].addEventListener("click", fetchImage);
			fetchImage();
        } else {
            //When user inputs name, and clicks on enter, remove the input box, display the name as well as save it in storage.
            document.getElementById('displayNamePlaceHolder').addEventListener('keydown', (event) => {
                var key = event.charCode ? event.charCode : event.keyCode ? event.keyCode : 0;
                if (key == 13) {
                    //Enter key pressed.
                    var val = document.getElementById('displayNamePlaceHolder').value;
                    chrome.storage.sync.set({
                        "userName": val
                    }, function() {});
                    document.getElementById('displayName').innerHTML = "Hello there," + val+ ". Here are some cute doggos just for you :)";
					$('#randomize')[0].style.visibility= "visible";
					$('#randomize')[0].addEventListener("click", fetchImage);
					fetchImage();
                }
            });
        }
    });
})


function fetchImage(){
	//Logic to insert a random dog image in the current tab's DOM.
    //If user is offline/get call fails, use icon.png as default.
    $.ajax({
        type: "GET",
        url: "https://dog.ceo/api/breeds/image/random",
        error: function(xhr, statusText) {
            $('body')[0].attributes[0].value = "icon.png";
        },
        success: function(msg) {
            $('body')[0].attributes[0].value = msg.message;
        }
    });
}