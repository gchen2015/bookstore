(function () {
    'use strict';

    angular
        .module('bookstoreApp')
        .controller('PersonHomeController', PersonHomeController);

    PersonHomeController.$inject = ['UserService', '$rootScope','$scope','$cookies','Principal','$state'];
    function PersonHomeController(UserService, $rootScope,$scope,$cookies,Principal,$state) {
        var vm = this;

        vm.user = null;


         //initController();
        console.debug('Principal.isAuthenticate');
         var isAuthenticated =  Principal.isAuthenticate
         console.debug(vm.isAuthenticated);


        $rootScope.globals = $cookies.getObject('globals') || {};
        if ($rootScope.globals.currentUser) {
           var currentUser =  $rootScope.globals.currentUser.username


           console.debug("###############")
           console.debug(currentUser);
           console.debug("###############")
        }else{
            $state.go('book.login');
        }

         //if (Principal.isAuthenticated) {
          //  $state.go('book.login');
         //}

         $scope.$on('authenticationSuccess', function() {
            getAccount();
         });

         getAccount();

          console.debug('vm.user1');
          console.debug(vm.user);

        function getAccount() {
             Principal.identity().then(function(account) {
                vm.account = account;
                vm.user = account
                console.debug('vm.user2');
                console.debug(vm.user);

                vm.isAuthenticated = Principal.isAuthenticated;
             });
        }

        function initController() {
            //loadCurrentUser();
        }

        function loadCurrentUser() {
            UserService.GetByUsername($rootScope.globals.currentUser.username)
                .then(function (user) {
                    vm.user = user;
                });
        }

    }

})();
