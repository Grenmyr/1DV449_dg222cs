function Message(){
    var _text;
    var _date;
    var _user;
    var _id;


	this.getText = function() {
		return _text;
	};

	this.setText = function(text) {
        if(typeof text !== "string") { throw new TypeError}
        //text = this.replaceTags(text);
		_text = text;
	};

	this.getDate = function() {
		return _date;
	};

	this.setDate = function(date) {
		_date = date;
	};
    this.getUser = function() {
        return _user;
    };

    this.setUser = function(user) {
        //user=  this.replaceTags(user);
        _user = user;
    };

    this.getId = function() {
        return _id;
    };

    this.setId = function(id) {
        //user=  this.replaceTags(user);
        _id = id;
    };
}

Message.prototype.toString = function(){
	return this.getText()+" ("+this.getDate()+")";
};

Message.prototype.getMessageId = function(){
    return this.getId();
};

Message.prototype.getUserHtml = function() {
    return this.getUser()+ ' said:';
};

Message.prototype.replaceTags = function(string){
    return string.replace(/</g,"&lt;").replace(/>/g,"&gt;")
};



