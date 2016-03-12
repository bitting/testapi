// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngResource'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider){

  $httpProvider.defaults.userXDomain = true;
  delete $httpProvider.defaults.headers.common["X-Request-Width"];
  $httpProvider.defaults.headers.post["Content-type"] = "application/x-www-form-urlencoded; charset-UTF-8";

  $httpProvider.defaults.headers.common = {};
  $httpProvider.defaults.headers.post = {};
  $httpProvider.defaults.headers.put = {};
  $httpProvider.defaults.headers.patch = {};

  $stateProvider
    .state("users",{
      url:"/users",
      templateUrl: "templates/users/index.html",
      controller: "userCtrl",
      cache: false
    })

    $urlRouterProvider.otherwise("/users");

})

.controller("userCtrl", function($scope, Users){
    $scope.initUsers = function(){

      //Users.get Cuando devuelve un objeto
      //Users.query Cuando devuelve un array

      Users.get({type:"presentation"}).$promise.then(
        function(res){
          $scope.contenido = res.data.content;
        },
        function(error){
          console.log(error);
        }
      )
    }
})


.factory("Users", function($resource){

  return $resource("http://api.cardiovascularcelltherapy.com/contenido/:id", {id:"@id"},{
    update: {
      method: "PUT",
      params: {id:"@id"}
    }
  })
})
