const didiIndexController = function($rootScope, $scope, $state, $stateParams, validate, URL, serverConnect){
    $rootScope.appLog('didiIndexController init');
    $rootScope.bodyclass = 'didiIndex';
    $rootScope.htmlclass = 'didiIndex-html';

    layer.load(1, {
        shade: [0.5, '#000']
    });

    $scope.$on('$viewContentLoaded', () => {
        const baseUrl = URL.apiUrl().online;
        const token   = URL.getUrlParams('token');
        const pid     = URL.getUrlParams('pid');

        // 预设参数
        $scope.defPoster = 'https://img.ithome.com/newsuploadfiles/2016/11/20161115_144159_384.jpg';

        $scope.Avatar = 'https://rexhang.com/img/rexhang.png';

        $scope.linking = 'https://baidu.com';

        let pn = 1;
        let cn = 10;
        class Get_Class {
            constructor(){
            }
            IndexData(is_pid, is_token, is_pn, is_cn, is_concat){
                // get请求
                serverConnect.__get(baseUrl + '/v1/didi/get-detail', {pid: is_pid, token: is_token, pn: is_pn, cn: is_cn}).success(function(data){
                    if(data.status == 200){
                        layer.closeAll();
                        $scope.is_data = data.data;
                        if(is_concat){
                            $scope.comments = is_concat.concat(data.data.comment.comment_list.result);
                            console.log('is_concat')
                        } else{
                            $scope.comments = data.data.comment.comment_list.result;
                            console.log('no_concat')
                        }
                        if(!data.data.comment.comment_list.result.length){
                            $scope.hidemorebtn = true;
                            layer.msg('没有更多评论啦~', {
                              shade: [0.5,'#000']
                              ,time: 600
                            });
                        }
                    } else{
                        layer.closeAll();
                        layer.msg(data.msg, {
                          shade: [0.5,'#000']
                          ,time: 600
                        });
                    }
                }).error(function(data,status,headers,config){
                    layer.closeAll();
                    console.log(data);
                });
            }
        }
        class Post_Class {
            constructor(){
            }
            sendMsg(is_playing_id, is_token, is_content){
                serverConnect.__post(baseUrl + '/illCloud/prize/add-comment', {playing_id: is_playing_id, token: is_token, content: is_content}).success(function(data){
                    if(data.status == 0){
                        layer.closeAll();
                        layer.msg('评论成功！', {
                          shade: [0.5,'#000']
                          ,time: 600
                        });
                        setTimeout(function(){$state.reload();}, 600)
                    } else{
                        layer.closeAll();
                        layer.msg(data.msg, {
                          shade: [0.5,'#000']
                          ,time: 600
                        });
                    }
                }).error(function(data,status,headers,config){
                    layer.closeAll();
                    console.log(data);
                });
            }
        }
        let GetGroup = new Get_Class();
        GetGroup.IndexData(pid, token, pn, cn);
        let PostGroup = new Post_Class();


        // 隐藏&显示
        $scope.showInfoTitles = ($event) => {
            angular.element($event.target).toggleClass('typeUp');
            jQuery('#moreInfo').toggleClass('show');
        }

        // 加载更多评论
        $scope.loadMore = () => {
            layer.load(1, {
                shade: [0.5, '#000']
            });
            pn++;
            GetGroup.IndexData(pid, token, pn, cn, $scope.comments);
        }

        // 发送评论
        $scope.sendMsg = () => {
            if($scope.sendContent){
                layer.load(1, {
                    shade: [0.5, '#000']
                });
                PostGroup.sendMsg(pid, token, $scope.sendContent);
            } else{
                layer.msg('请输入评论内容！', {
                  shade: [0.5,'#000']
                  ,time: 1000
                });
            }
        }

        // 扫描
        $scope.scan = () => {
            if(sys.isAndroid){
                window.android.beginAr(2)
            } else if(sys.isIos){
                window.location.href = 'arseek://arseeds.com/scanning?pid=1111'
            }
        }

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

didiIndexController.$inject = ['$rootScope', '$scope', '$state', '$stateParams', 'validate', 'URL', 'serverConnect'];
h5Express.controller('didiIndexController', didiIndexController);

