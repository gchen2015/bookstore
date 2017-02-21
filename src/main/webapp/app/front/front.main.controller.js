

(function() {
    'use strict';

    angular
        .module('bookstoreApp')
        .controller('FrontMainController', FrontMainController);

    FrontMainController.$inject = ['$rootScope','$scope', '$http', 'Principal', 'BookService', 'BookService','$state'];

    function FrontMainController ($rootScope, $scope, $http, Principal, LoginService,BookService, $state) {
        var vm = this;

        console.debug('FrontMainController start');

        vm.login = LoginService.open;
        vm.register = register;
        $scope.$on('authenticationSuccess', function() {
            getAccount();
        });

        getAccount();

        function getAccount() {
            Principal.identity().then(function(account) {
                vm.account = account;
                vm.isAuthenticated = Principal.isAuthenticated;
            });
        }
        function register () {
            $state.go('register');
        }


        BookService.findAllBooks(function(result){
            console.debug("result:")
            console.debug(result)
    		$scope.newBooks = result;
    	});


    	$scope.jump = function(link){
    		window.location.href = link;
    	};


        console.debug('FrontMainController end');
    }

       angular
            .module('bookstoreApp')
            .controller('FrontProductDetailController', FrontProductDetailController);


     FrontProductDetailController.$inject = ['$rootScope','$scope', '$http', 'Principal', 'Book', 'BookService','$state','$stateParams'];

     function FrontProductDetailController ($rootScope, $scope, $http, Principal, Book,BookService, $state, $stateParams) {
             var vm = this;

              console.debug('FrontProductDetailController start');

              Book.get({id: $stateParams.id}, function(result) {
                      $scope.book = result;
                  });

             console.debug('FrontProductDetailController end');

      }

})();


/**
angular.module('bookstoreApp')
    .controler('FrontMainController', ["$rootScope", "$scope", "$cookies", "$http", "bookService", "Book", function ($rootScope, $scope, $cookies, $http, bookService, Book) {

    	console.debug('FrontMainController start');

    	bookService.findAllBooks(function(result){
    		$scope.newBooks = result;
    	});


    	$scope.jump = function(link){
    		window.location.href = link;
    	};
ß
        console.debug('FrontMainController end');
    }]);



angular.module('bookstoreApp')
.controller('FrontProductDetailController', ["$scope", "$rootScope", "$stateParams", "Book", "bookService", function ($scope, $rootScope, $stateParams, Book, bookService) {

	console.debug('FrontProductDetailController start');
    Book.get({id: $stateParams.id}, function(result) {
        $scope.book = result;
    });


    console.debug('FrontProductDetailController end');
}]);
**/
