/**
 * Created by dav on 2014-11-20.
 */
function longPoll(){

    this.getMessage = function(callback, lastTime){

        var that = this;
        var latest = null;
        $.ajax({
            'url': 'src/model/LongPoll.php',
            'type': 'post',
            'dataType': 'json',
            'data': {
                'mode': 'get',
                'lastTime': lastTime
            },
            'timeout': 30000,
            'cache': false,
            'success': function(result){
                if(result.result){
                    callback(result.message);
                    latest = result['latest'];
                }
            },
            'error': function(e){
                console.log(e);
            },
            'complete': function(){

                that.getMessage(callback, latest);
            }
        });
    };
    this.postMessage = function(user, text,token, callback){
        $.ajax({
            'url': 'src/model/LongPoll.php',
            'type': 'post',
            'dataType': 'json',
            'data': {
                'mode': 'post',
                'user': user,
                'text': text,
                'token': token
            },
            'success': function(result){
                callback(result);
            },
            'error': function(e){
                console.log(e);
            }
        });
    };
    this.deleteMessage = function(messageID,token){
        $.ajax({
            'url': 'src/model/LongPoll.php',
            'type': 'post',
            'dataType': 'json',
            'data': {
                'mode': 'remove',
                'idmessage': messageID,
                'token': token
            },
            'success': function(result){
                console.log(result);
            },
            'error': function(e){
                console.log(e);
            }
        });

    }
}

var chat = new longPoll();