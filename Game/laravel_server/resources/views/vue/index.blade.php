@extends('master')

@section('title', 'Memory Game')

@section('content')
    <div v-if="$route.meta.requireAuth">
        <logout></logout>
        <router-link to="/users">Users</router-link> -
        <router-link to="/singlememory">SinglePlayer Memory Game</router-link> -
        <router-link to="/multimemory">Multiplayer Memory Game</router-link> -
        <router-link to="/game">Memory Game</router-link> <!-- TESTS -->
    </div>
    <router-view></router-view>
    <!--
    <fb:login-button scope="public_profile,email" onlogin="checkLoginState();"></fb:login-button>
    <script>
        window.fbAsyncInit = function() {
            FB.init({
                appId      : '1550868334967839',
                cookie     : true,
                xfbml      : true,
                version    : 'v2.11'
            });
            FB.AppEvents.logPageView();  

        };
        function checkLoginState() {
          FB.getLoginStatus(function(response) {
            statusChangeCallback(response);
          });
        } 
        function statusChangeCallback(response) {
            if(response.status === 'connected'){
                console.log('You are logged in!')
            }else if(response.status === 'not_authorized'){
                console.log('Couldn\'t log in with fb');
            }else{
                console.log('You have no FB account');
            }
        }
        (function(d, s, id){
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) {return;}
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
        //button div
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = 'https://connect.facebook.net/pt_PT/sdk.js#xfbml=1&version=v2.11&appId=1550868334967839';
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    </script>
    -->
    
@endsection

@section('pagescript')
<script src="js/vueapp.js"></script>
 @stop  
