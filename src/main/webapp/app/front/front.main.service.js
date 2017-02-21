
/**
angular.module('bookstoreApp')
    .factory('bookService', function ($http) {

    	console.debug('load book service');
        return {
            findAllBooks: function (done) {
            	console.debug('find all books');
                return $http.get('api/books/news').then(function (response) {
                    return done(response.data);
                });
            }


        };
    });


**/

(function() {
    'use strict';

    angular
        .module('bookstoreApp')
        .factory('BookService', BookService);

    BookService.$inject = ['$rootScope', '$http'];

    function BookService ($rootScope, $http) {
        var service = {
            findAllBooks: findAllBooks
        };

        return service;

        function findAllBooks (done) {

            return $http.get('api/books/news').then(function (response) {
                return done(response.data);
            });
        }

    }
})();

