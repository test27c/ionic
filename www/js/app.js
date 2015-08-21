// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])
.run(function($ionicPlatform, $ionicPopup) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  // Disable BACK button on home
  $ionicPlatform.registerBackButtonAction(function(event) {
    if (true) { // your check here
      $ionicPopup.confirm({
        title: 'System warning',
        template: 'are you sure you want to exit?'
      }).then(function(res) {
        if (res) {
          ionic.Platform.exitApp();
        }
      })
    }
  }, 100);
  });
})

//routing and variabel declaration
.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
  .state('tabs', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  .state('tabs.home', {
    url: '/home',
    views: {
      'home-tab' : {
      templateUrl: 'templates/home.html'
      }
    }
  })

  .state('tabs.list', {
    url: '/list',
    views: {
      'list-tab' : {
      templateUrl: 'templates/list.html',
      controller: 'ListController'
      }
    }
  })


  .state('tabs.detail', {
    url: '/list/:aId',
    views: {
      'list-tab' : {
      templateUrl: 'templates/detail.html',
      controller: 'ListController'
      }
    }
  })

  .state('tabs.calendar', {
    url: '/calendar',
    views: {
      'calendar-tab' : {
      templateUrl: 'templates/calendar.html',
      controller: 'CalendarController'
      }
    }
  })

  $urlRouterProvider.otherwise('/tab/home');
})

// Calendar controller
.controller('CalendarController', ['$scope', '$http','$state', function($scope, $http, $state){
  $http.get('js/data1.json').success(function(data){
    $scope.calendar = data.calendar;

    $scope.onItemDelete = function(dayIndex, item){
      $scope.calendar[dayIndex].schedule.splice($scope.calendar[dayIndex].schedule.indexOf(item), 1);
    }
    $scope.doRefresh = function(){
      $http.get('js/data1.json').success(function(data){
        $scope.calendar = data.calendar;
        $scope.$broadcast('scroll.refreshComplete');
      });
    };
    $scope.toggleStar = function(item){
        item.star = !item.star;
    };
  });
}])

// List controller
.controller('ListController', ['$scope', '$http','$state', function($scope, $http, $state){
  $http.get('js/data1.json').success(function(data){
    $scope.artists = data.artists;
    $scope.whichartists = $state.params.aId;
    $scope.data = { showDelete: false, showReorder: false}

    $scope.onItemDelete = function(item){
      $scope.artists.splice($scope.artists.indexOf(item), 1);
    }
    $scope.doRefresh = function(){
      $http.get('js/data1.json').success(function(data){
        $scope.artists = data;
        $scope.$broadcast('scroll.refreshComplete');
      });
    };
    $scope.moveItem = function(item, fromIndex, toIndex){
        $scope.artists.splice(fromIndex, 1);
        $scope.artists.splice(toIndex, 0, item);
      };
    $scope.toggleStar = function(item){
        item.star = !item.star;
    };
  });
}]);