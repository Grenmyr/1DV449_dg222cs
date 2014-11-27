
var MessageBoard = {

    messages: [],
    textField: null,
    messageArea: null,
    init:function(e)
    {
//            document.appendChild(document.createElement('img').setAttribute('src', 'pic/logo.png'));

            MessageBoard.startChat();
		    MessageBoard.textField = document.getElementById("inputText");
		    MessageBoard.nameField = document.getElementById("inputName");
            MessageBoard.messageArea = document.getElementById("messagearea");
            MessageBoard.tokenField = document.getElementById("tokenfield");


        //console.log(MessageBoard.tokenField );
            // Add eventhandlers    
            document.getElementById("inputText").onfocus = function(e){ this.className = "focus"; }
            document.getElementById("inputText").onblur = function(e){ this.className = "blur" }
            document.getElementById("buttonSend").onclick = function(e) {MessageBoard.sendMessage(); return false;}
            //document.getElementById("buttonDelete").onclick = function(e) {MessageBoard.removeMessage(); return false;}
            //document.getElementById("buttonSend").onclick = function(e) {MessageBoard.startChat(); return false;}
            // FARLIG gör nasty redirect så session unset inte funkar.
            //document.getElementById("buttonLogout").onclick = function(e) {MessageBoard.logout(); return false;}
    
            MessageBoard.textField.onkeypress = function(e){ 
                                                    if(!e) var e = window.event;
                                                    
                                                    if(e.keyCode == 13 && !e.shiftKey){
                                                        MessageBoard.sendMessage(); 
                                                       
                                                        return false;
                                                    }
                                                }
    
    },
    startChat:function(){

      chat.getMessage(function(messages){

          var newMessages = messages.slice(MessageBoard.messages.length, messages.length);
          //console.log(newMessages);

          if(MessageBoard.messages.length < messages.length){
                //MessageBoard.messages = [];
              newMessages.forEach(function(message){
                    var newMessage =new Message();
                    newMessage.setDate(message['date']);
                    newMessage.setText(message['message']);
                    newMessage.setUser(message['username']);
                    newMessage.setId(message['idmessage']);
                    MessageBoard.messages.push(newMessage)

            });
              //console.log(MessageBoard.messages.length);

              MessageBoard.renderMessages();
              //document.getElementById("nrOfMessages").innerHTML = MessageBoard.messages.length;
          }
        });

    },
    sendMessage:function(){
        if(MessageBoard.textField.value == "" || MessageBoard.nameField.value == "" ) return;
        console.log(MessageBoard.nameField.value);
        var user = MessageBoard.nameField.value;
        var message = MessageBoard.textField.value;
        var token = MessageBoard.tokenField.value;

        var newMessage = new Message();
        newMessage.setUser(user);
        newMessage.setText(message);
        var sanitezedText = newMessage.getText();
        var sanitezedUser = newMessage.getUser();
        chat.postMessage(sanitezedUser,sanitezedText,token,function(){
            //ALL MESSAGES HERE
        });


     /*   // Make call to ajax
        $.ajax({
			type: "GET",
		  	url: "functions.php",
		  	data: {function: "add", name: MessageBoard.nameField.value, message:MessageBoard.textField.value}
		}).done(function(data) {

		  //alert("Your message is saved! Reload the page for watching it");
		});*/
    
    },
    renderMessages: function(){
        // Remove all messages
        MessageBoard.messageArea.innerHTML = "";
     
        // Renders all messages.
        for(var i=0; i < MessageBoard.messages.length; ++i){
            MessageBoard.renderMessage(MessageBoard.messages[i]);
        }        
        
        document.getElementById("nrOfMessages").textContent = MessageBoard.messages.length;
    },
    renderMessage: function(message){
        // Message div
        var div = document.createElement("div");
        div.className = "message";
       
        // Clock button
        var clockAtag = document.createElement("a");
        clockAtag.href="#";
        clockAtag.onclick = function(){
			MessageBoard.showTime(message);
			return false;			
		};
        
        var imgClock = document.createElement("img");
        imgClock.src="pic/clock.png";
        imgClock.alt="Show creation time";

        clockAtag.appendChild(imgClock);
        div.appendChild(clockAtag);

        // new

       /* var deleteAtag = document.createElement("a");
        deleteAtag.href="#";
        deleteAtag.onclick = function(){
            MessageBoard.removeMessage(message);
            return false;
        };

        var deleteImage = document.createElement("img");
        deleteImage.src="pic/delete.png";
        deleteImage.alt="delete message";

        deleteAtag.appendChild(deleteImage);
        div.appendChild(deleteAtag);*/

        // end new
       
        // Message text
        var text = document.createElement("p");
        var name = text.cloneNode(true);
        text.textContent = message.getText();
        name.textContent = message.getUserHtml();
        div.appendChild(name);
        div.appendChild(text);

            
        // Time - Should fix on server!
        var spanDate = document.createElement("span");
        spanDate.appendChild(document.createTextNode(message.getDate()));

        div.appendChild(spanDate);        
        
        var spanClear = document.createElement("span");
        spanClear.className = "clear";

        div.appendChild(spanClear);        

        $(MessageBoard.messageArea).prepend(div);
        //MessageBoard.messageArea.appendChild(div);
    },
    removeMessage: function(message){
		if(window.confirm("Vill du verkligen radera meddelandet?")){
            var messageId = message.getMessageId();

            MessageBoard.messages.forEach(function(message){
                      if(message.getMessageId() == messageId){
                          console.log("gick in");
                          MessageBoard.messages.splice(message, 1); // Removes the message from the array.
                          //Todo implement removemessage?
                          MessageBoard.renderMessages();
                      }
            });


            //console.log(message);
            var token = MessageBoard.tokenField.value;
            chat.deleteMessage(messageId,token);




			//MessageBoard.renderMessages();

        }
    },
    showTime: function(message){

         var time = message.getDate();

         //var showTime = "Created "+time.toLocaleDateString()+" at "+time.toLocaleTimeString();

         alert(time);
    }
    /*logout: function() {
        window.location = "src/view/indexold.php";
    }*/
};

window.onload = MessageBoard.init;
