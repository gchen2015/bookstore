(function() {
    //ß'use strict';

    angular
        .module('bookstoreApp')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('home', {

            url: '/',
            data: {
                authorities: []
            },
            views: {
                'content@': {
                    templateUrl: 'app/front/main.html',
                    controller: 'FrontMainController',
                    controllerAs: 'vm'
                }
            }
        })
        .state('book.details', {

                        url: 'front/book/{id}',
                        data: {

                            pageTitle: '活动详情'
                        },
                        views: {
                            'content@': {
                                templateUrl: 'app/front/product-detail.html',
                                controller: 'FrontProductDetailController',
                                controllerAs: 'vm'
                            }
                        },
                        resolve: {
                        }
           })

           .state('book.login', {

                                   url: 'front/login',
                                   data: {

                                       pageTitle: '登陆'
                                   },
                                   views: {
                                       'content@': {
                                           templateUrl: 'app/front/login.html',
                                           controller: 'FrontLoginController',
                                           controllerAs: 'vm'
                                       }
                                   },
                                   resolve: {
                                   }
                      })
           .state('book.person', {

                                   url: 'front/person',
                                   data: {

                                       pageTitle: '个人信息'
                                   },
                                   views: {
                                       'content@': {
                                           templateUrl: 'app/front/person.html',
                                           controller: 'PersonHomeController',
                                           controllerAs: 'vm'
                                       }
                                   },
                                   resolve: {
                                   }
                      })
                      /**
                      .state('book.register', {

                                              url: 'front/register',
                                              data: {

                                                  pageTitle: '注册'
                                              },
                                              views: {
                                                  'content@': {
                                                      templateUrl: 'app/front/register.view.html',
                                                      controller: 'FrontRegisterController',
                                                      controllerAs: 'vm'
                                                  }
                                              },
                                              resolve: {
                                              }
                                 })
                           **/
                     .state('book.register', {

                                 url: 'front/register',
                                 data: {
                                     authorities: [],
                                     pageTitle: 'Registration'
                                 },
                                 views: {
                                     'content@': {
                                         templateUrl: 'app/account/register/register.html',
                                         controller: 'RegisterController',
                                         controllerAs: 'vm'
                                     }
                                 }
                             })

           .state('manage', {
                       parent: 'app',
                       url: '/admin',
                       data: {
                           authorities: []
                       },
                       views: {
                           'content@': {
                               templateUrl: 'app/home/home.html',
                               controller: 'HomeController',
                               controllerAs: 'vm'
                           }
                       }
                   })

        ;
    }
})();


/*

angular.module('bookstoreApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('front-home', {
                parent: 'site',
                url: '/',
                data: {
            		pageTitle: '考观评分'
                },
                views: {
                    'front-content@': {
                        templateUrl: 'app/front/main.html',
                        controller: 'FrontMainController'
                    }
                },
                resolve: {

                }
            })
            .state('product.fdetail', {
                parent: 'front-home',
                url: 'front/product/{id}',
                data: {

                    pageTitle: '活动详情'
                },
                views: {
                    'front-content@': {
                        templateUrl: 'app/front/product-detail.html',
                        controller: 'FrontProductDetailController'
                    }
                },
                resolve: {
                }
            })

            ;
    });
angular.module('bookstoreApp')
.filter('trustHtml', function ($sce) {
    return function (input) {
        return $sce.trustAsHtml(input);
    }
});
**/
