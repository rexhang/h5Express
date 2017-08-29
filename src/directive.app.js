var directives = angular.module('app.directives', []);

/*上传按钮*/
directives.directive('ngUpload', [function () {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function(scope, element, attrs) {
            element.on('change', fileUpload);
            scope.$on('$destroy',function(){
                /*销毁的时候取消事件监听*/
                element.off('change', fileUpload);
            });
            /*在Controller中监听$destory事件，这个事件会在页面发生跳转的时候触发*/
            /*比如window.scroll事件在下一页scroll的时候还会继续被触发
            在这个事件的回调中，清除当前页面的监听或者一些参数保证下面的页面不会再触发当前页面的事件回调*/
            function fileUpload(event){
                scope.$evalAsync(attrs['ngUpload'], {$event: event, $value: this.files[0]});
            }
        }
    }
}]);

/*监测输出*/
directives.directive('ngInput', [function () {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function(scope, element, attrs) {
            element.on('input',oninput);
            scope.$on('$destroy',function(){//销毁的时候取消事件监听
                element.off('input',oninput);
            });
            function oninput(event){
                scope.$evalAsync(attrs['ngInput'],{$event:event,$value:this.value});
            }
        }
    }
}]);

/*触摸添加样式*/
directives.directive('ngActiveClass', [function () {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function(scope, element, attrs) {
            var addClassName = attrs.ngActiveClass;
            element.bind('touchstart', start);
            element.bind('touchend', end);
            function start(e){
                e.stopPropagation();
                element.addClass(addClassName)
            }
            function end(e){
                e.stopPropagation();
                element.removeClass(addClassName)
            }
            scope.$on('$destroy',function(){//销毁的时候取消事件监听
                element.unbind('touchstart', start);
                element.unbind('touchend', end);
            });
        }
    }
}]);

/*图片加载完成事件*/
directives.directive('ngLoad', [function () {
    return {
        restrict: 'A',
        require: '?ngModel',
        link: function(scope, element, attrs) {
            element.bind('load', doSomethings);
            scope.$on('$destroy',function(){//销毁的时候取消事件监听
                element.unbind('load', doSomethings);
            });
            function doSomethings(){
                //call the function that was passed
                scope.$apply(attrs.ngLoad);
            }
        }
    }
}]);