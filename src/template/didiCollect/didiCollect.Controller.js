const didiCollectController = function($rootScope, $scope, $stateParams, validate, URL, serverConnect){
    $rootScope.appLog('didiCollectController init');
    $rootScope.bodyclass = 'didiCollect';
    $rootScope.htmlclass = 'didiCollect-html';

    // layer.load(1, {
    //     shade: [0.5, '#000']
    // });

    $scope.$on('$viewContentLoaded', () => {
        const baseUrl = URL.apiUrl().online;
        const token   = URL.getUrlParams('token');
        const pid     = URL.getUrlParams('pid');

    	$scope.Avatar = 'https://rexhang.com/img/rexhang.png';

        class Get_Class {
            constructor(){
            }
            IndexData(is_pid, is_token){
                serverConnect.__get(baseUrl + '/v1/didi/my-stickers', {pid: is_pid, token: is_token}).success(function(data){
                    if(data.status == 200){
                        if(data.data.length > 0){
                            $scope.dataList = data.data;
                        } else{
                            $scope.defTips = true; // 无数据、显示打卡去样式
                            $scope.defList = true; // 隐藏列表区域
                        }
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

        let GetGroup = new Get_Class();
        GetGroup.IndexData(pid, token);

        // 打卡
        $scope.punchCard = () => {
            if(sys.isAndroid){
                window.android.beginAr(1)
            } else if(sys.isIos){
                window.location.href = 'arseek://arseeds.com/clock?pid=1111'
            }
        }
    });

}

didiCollectController.$inject = ['$rootScope', '$scope', '$stateParams', 'validate', 'URL', 'serverConnect'];
h5Express.controller('didiCollectController', didiCollectController);

