var app = angular.module("app", ["ngRoute"]);


app.run(function ($rootScope) {

    $rootScope.user_name = localStorage.getItem("user_name");
    if (localStorage.getItem("perfil") == "adm") {
        $rootScope.user_perfil = "Administrador"
    } else if (localStorage.getItem("perfil") == "user") {
        $rootScope.user_perfil = "Usiario Comum"
    }
    $rootScope.user_name = localStorage.getItem("user_name");
    $rootScope.logado = $rootScope.user_token ? true : false;

    if (localStorage.getItem("perfil") == "adm") {
        $rootScope.user_perfil = "Administrador do Sistema"

    } else if (localStorage.getItem("perfil") == "usu") {
        $rootScope.user_perfil = "Usiario Comum"
    }
    $rootScope.isAdmin = localStorage.getItem("perfil") == "adm" ? true : false;
    $rootScope.$on(function (event, data) {


    });
});

function islogged($rootScope) {
    $rootScope.islogged = $rootScope.token = localStorage.getItem("perfil") == "adm" ? true : false;

}



app.controller('dadosAutetic', function ($scope, $rootScope) {



});

app.factory('AuthInterceptor', function ($location, $q) {
    
    console.log($location);
    return {
        request: function (config) {

            config.headers = config.headers || {};

            var token = localStorage.getItem("user_token");

            if (token) {
                config.headers['Authorization'] = 'Bearer ' + token;
            }

            return config;
        },

        responseError: function (response) {
            if (response.status === 401 || response.status === 403) {
                $location.path('/autenticar');

            }

            return $q.reject(response);
        }
    }

}).config(function ($httpProvider) {

    $httpProvider.interceptors.push('AuthInterceptor');

});
