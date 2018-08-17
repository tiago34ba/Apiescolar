app.controller('myCtrl', function ($scope) {
    $scope.CategoriaOptions = ['Infra', 'Suporte Tecnico', 'Manutenção', 'TI', 'Eletrica', 'Hidráulica'];
});


app.controller("ControllerListdisciplina", function ($scope, $http, $filter) {
    $scope.listarDisciplina = function () {
        $http.get("http://localhost:3000/disciplina")
                .then(function (res) {
                    var res = res.data;
                    if (res.success) {
                        // Disponibiliza os dados na view (ngView)
                        $scope.disciplina = res.data;
                    } else {
                        alert(res.message);
                    }
                })
                .catch(function (error) {
                    console.log(error.message);
                });
    }

    $scope.listardisciplina();
    $scope.removerDisciplina = function (disciplina) {
        var confirma = confirm("Remover " + disciplina.nome + "?");

        if (!confirma) {
            return false;
        } else {
            $http.delete("http://localhost:3000/disciplina/" + avaliacao._id)
                    .then(function (res) {
                        var res = res.data;

                        if (res.success) {
                            $scope.listaraluno();
                        }
                        alert(res.message);
                    })
                    .catch(function (error) {
                        console.log(error.message);
                    });
        }
    }
});


app.controller("ControllerListarDisciplinaPorUsuario", function ($scope, $http, $filter, $routeParams) {
    $scope.listardisciplinaPorUsuario = function () {
        var _id = $routeParams.id;
        $http.get("http://localhost:3000/chamadosUsuario/" + localStorage.getItem('user_name'))
                .then(function (res) {
                    var res = res.data;
                    if (res.success) {
                        // Disponibiliza os dados na view (ngView)
                        $scope.disciplina = res.data;
                    } else {
                        alert(res.message);
                        console.log(res);
                    }
                })
                .catch(function (error) {
                    console.log(error.message);
                });
    }

    $scope.listardisciplinaPorUsuario();
});





app.controller("ControlleravaliacaoChamado", function ($scope, $http, $location) {
    $scope.cadastraravaliacao = function () {
        //console.log($scope.chamado);
        $scope.chamado.status = "Pendente";

        console.log(localStorage.getItem('user_nome'));
        $scope.avaliacao.requerente = localStorage.getItem('user_name');
        $http.post("http://localhost:3000/chamados", $scope.aluno)
                .then(function (res) {
                    var res = res.data;

                    if (res.success) {
                        alert(res.message);
                        $location.path("/avaliacao/listausuario");
                    } else {
                        alert(res.message);
                    }

                })
                .catch(function (error) {
                    console.log(error.message);
                });
    }
});

app.controller("ControllerEditaravaliacao", function ($scope, $http, $location, $routeParams) {
    $scope.carregarDadosavaliacao = function () {



        //$scope.chamado.atendente=localStorage.getItem('user_name');
        var _id = $routeParams.id;
        $http.get("http://localhost:3000/chamados/" + _id)
                .then(function (res) {
                    var res = res.data;
                    var chamado = res.data;
                    $scope.avaliacao = res.data;
                })
                .catch(function (error) {
                    console.log(error.message);
                });

    }
    $scope.carregarDadosaluno();

    $scope.editaravaliacao = function () {
        var _id = $routeParams.id;

        $http.put("http://localhost:3000/chamados/" + _id, $scope.aluno)
                .then(function (res) {
                    var res = res.data;

                    if (res.success) {
                        alert(res.message);
                        $location.path("/avaliacao/listar");
                    } else {
                        alert(res.message);
                    }
                })
                .catch(function (error) {
                    console.log(error.message);
                });

    }





});