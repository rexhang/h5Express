const didiGiftListController = function($rootScope, $scope, $stateParams, validate, URL, serverConnect){
    $rootScope.appLog('didiGiftListController init');
    $rootScope.bodyclass = 'didiGiftList';

    layer.load(1, {
        shade: [0.5, '#000']
    });
    $scope.$on('$viewContentLoaded', () => {
        $scope.listImgSrc = './img/didiIndex/didiGiftListBg.png';
        $scope.completeLoadBgImg = () => {
            layer.closeAll();
        }
    })

}

didiGiftListController.$inject = ['$rootScope', '$scope', '$stateParams', 'validate', 'URL', 'serverConnect'];
h5Express.controller('didiGiftListController', didiGiftListController);

