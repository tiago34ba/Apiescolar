app.controller("Administracao", function ($scope, $http, $location) {
    $scope.cadastrarUsuarios = function () {
        $http.post("http://localhost:3000/cadastrar-se", $scope.usuario)
                .then(function (res) {
                    var res = res.data;

                    if (res.success) {
                        alert(res.message);
                        $location.path("/autenticar");
                    } else {
                        alert(res.message);
                    }

                })
                .catch(function (error) {
                    console.log(error.message);
                });
    }
});

