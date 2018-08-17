app.controller("ControllerListarUsuario", function ($scope, $http) {
    $scope.listarUsuarios = function () {
        $http.get("http://localhost:3000/usuarios")
                .then(function (res) {
                    var res = res.data;

                    if (res.success) {
                        $scope.usuarios = res.data; // Disponibiliza os dados na view (ngView)
                    } else {
                        alert(res.message);
                    }

                })
                .catch(function (error) {
                    console.log(error.message);
                });
    }
    $scope.listarUsuarios();

    $scope.removerUsuario = function (usuario) {
        var confirma = confirm("Remover " + usuario.nome + "?");

        if (!confirma) {
            return false;
        } else {
            $http.delete("http://localhost:3000/usuarios/" + usuario._id)
                    .then(function (res) {
                        var res = res.data;

                        if (res.success) {
                            $scope.listarUsuarios();
                        }
                        alert(res.message);
                    })
                    .catch(function (error) {
                        console.log(error.message);
                    });
        }
    }
});

app.controller("ControllerCadastrarUsuario", function ($scope, $http, $location) {
    $scope.cadastrarUsuarios = function () {
        $http.post("http://localhost:3000/usuarios", $scope.usuario)
                .then(function (res) {
                    var res = res.data;

                    if (res.success) {
                        alert(res.message);
                        $location.path("/usuarios/listar");
                    } else {
                        alert(res.message);
                    }

                })
                .catch(function (error) {
                    console.log(error.message);
                });
    }
});

app.controller("ControllerEditarUsuario", function ($scope, $http, $location, $routeParams) {
    $scope.carregarDadosUsuario = function () {
        var _id = $routeParams.id;

        $http.get("http://localhost:3000/usuarios/" + _id)
                .then(function (res) {
                    var res = res.data;
                    var usuario = res.data;
                    $scope.usuario = res.data;
                })
                .catch(function (error) {
                    console.log(error.message);
                });

    }
    $scope.carregarDadosUsuario();

    $scope.editarUsuario = function () {
        var _id = $routeParams.id;

        $http.put("http://localhost:3000/usuarios/" + _id, $scope.usuario)
                .then(function (res) {
                    var res = res.data;

                    if (res.success) {
                        alert(res.message);
                        $location.path("/usuarios/listar");
                    } else {
                        alert(res.message);
                    }
                })
                .catch(function (error) {
                    console.log(error.message);
                });

    }
});