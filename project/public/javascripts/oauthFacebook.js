/**
 * Created by dav on 2015-01-05.
 */
var OauthFacebook = function (){
    window.fbAsyncInit = function() {
        FB.init({
            appId      : '1529045937346117',
            xfbml      : true,
            version    : 'v2.2'
        });
    };

    (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js";
        fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
};
function like () {

/*<div
class="fb-like"
    data-share="true"
    data-width="450"
    data-show-faces="true">
    </div>*/
}