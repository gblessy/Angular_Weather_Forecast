//CONTROLLERS
weatherApp.controller('homeController', ['$scope', 'cityService', function($scope, cityService){
    
    $scope.city = cityService.city;
    
    $scope.$watch('city', function(){
       cityService.city = $scope.city; 
    });
    
}]);

weatherApp.controller('forecastController', ['$scope', '$resource', '$routeParams', 'cityService', function($scope, $resource, $routeParams, cityService){
    
    $scope.city = cityService.city;
    
    $scope.days = $routeParams.days || '16';
    
    $scope.weatherAPI = $resource("http://api.openweathermap.org/data/2.5/forecast/daily", 
                                  {callback: "JSON_CALLBACK"}, { get: {method: "JSONP"}});
    
    $scope.weatherResult = $scope.weatherAPI.get({q: $scope.city, cnt: $scope.days,
                                                  appid: "f56673a238b1b2eccfaca718220f7d8b"});
    
    $scope.convertToCelcius = function(degK){
        return Math.round(degK - 273);
    }
    
    $scope.convertToDate = function(dt){
       
        return new Date(dt * 1000);
        
    };
    
}]);
