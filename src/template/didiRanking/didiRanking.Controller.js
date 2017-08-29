const didiRankingController = function($rootScope, $scope, $stateParams, validate, URL, serverConnect){
    $rootScope.appLog('didiRankingController init');
    $rootScope.bodyclass = 'didiRanking';

    layer.load(1, {
        shade: [0.5, '#000']
    });

    $scope.$on('$viewContentLoaded', () => {
        const baseUrl = URL.apiUrl().online;
        const token   = URL.getUrlParams('token');
        const pid     = URL.getUrlParams('pid');

        $scope.Avatar = 'https://rexhang.com/img/rexhang.png';

        let pn = 1;
        let cn = 20;

        class Postt_Class {
            constructor(){
            }
            IndexData(is_pid, is_token, is_pn, is_cn){
                serverConnect.__post(baseUrl + '/illCloud/prize/sign-list', {playing_id: is_pid, token: is_token, pn: is_pn, cn: is_cn, times: 1, award_id: 1}).success(function(data){
                    if(data.status == 0){
                        $scope.my = data.data.myself;
                        $scope.data = data.data.result;
                    } else{
                        layer.msg(data.msg, {
                          shade: [0.5,'#000']
                          ,time: 600
                        });
                    }
                    layer.closeAll();
                }).error(function(data,status,headers,config){
                    layer.closeAll();
                    console.log(data);
                });
            }
        }

        let PostGroup = new Postt_Class();
        PostGroup.IndexData(pid, token, pn, cn);


    })

}

didiRankingController.$inject = ['$rootScope', '$scope', '$stateParams', 'validate', 'URL', 'serverConnect'];
h5Express.controller('didiRankingController', didiRankingController);

