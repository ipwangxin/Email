/*富文本框实例化函数*/
function rich(){
    layui.use(['form', 'layedit', 'laydate'], function(){
        var form = layui.form()
            ,layer = layui.layer
            ,layedit = layui.layedit
            ,laydate = layui.laydate;

        //创建一个编辑器
        var editIndex = layedit.build('LAY_demo_editor');

        //自定义验证规则
        form.verify({
            title: function(value){
                if(value.length < 5){
                    return '标题至少得5个字符啊';
                }
            }
            ,pass: [/(.+){6,12}$/, '密码必须6到12位']
            ,content: function(value){
                layedit.sync(editIndex);
            }
        });



        //监听提交
        form.on('submit(demo1)', function(data){
            layer.alert(JSON.stringify(data.field), {
                title: '最终的提交信息'
            })
            return false;
        });


    });
};

var app = angular.module("myApp",['ngRoute']);
app.controller("myCtrl",function($scope){
    $scope.onblo = false;
    $scope.itext = function(e){
        $scope.onblo = !$scope.onblo;
        e.stopPropagation();
        /*console.log(parseInt($(".left").css("left")));
        if(parseInt($(".left").css("left")) < -50){
            $(".left").animate({"left":"0px"},500);
        }else{
            $(".left").animate({"left":"-217px"},500);
        }*/

    }
});
/*路由设置*/
app.config(['$routeProvider',function($routeProvider){
    $routeProvider
        /*收件箱，默认页面*/
        .when('/',{
            controller:"inboxCtrl",
            templateUrl:"ajax/InBox.html"
        })
        /*联系人页面*/
        .when('/links/',{
            controller:"linksCtrl",
            templateUrl:"ajax/links.html"
        })
        /*联系人详情页面*/
        .when('/link/:id',{
            controller:"linkCtrl",
            templateUrl:"ajax/detaillink"
        })
        /*发件箱页面*/
        .when('/sendbox/',{
            controller:"sendBoxCtrl",
            templateUrl:"ajax/sendBox.html"
        })
        /*邮件详情页面*/
        .when('/emialdetails/:id',{
            controller:"emialdetailsCtrl",
            templateUrl:"ajax/emailDetails.html"
        })
        /*写信页面*/
        .when('/new/:id',{
            controller:"newCtrl",
            transclude:true,
            templateUrl:"ajax/new.html"
        })
        /*其他页面*/
        .when('/other',{
         template:"<div class='centerbox'>页面开发中。。。</div>"
         })
        .otherwise({redirectTo:'/other'})
}]);
app.controller('inboxCtrl',function($scope,$location){
    /*定义收件箱数据*/
    $scope.infos = recivedmessage;
    /*每页显示最大数量*/
    $scope.maxnum = 7;
    /*计算显示页数*/
    $scope.pages =$scope.infos.length%$scope.maxnum? (Math.floor($scope.infos.length/$scope.maxnum) + 1): $scope.infos.length/$scope.maxnum;
   /* 定义页数数组*/
    $scope.arr = [];
    /*定义当前显示页面*/
    $scope.active = 1;
    /*定义全选按钮值*/
    $scope.all = false;
    /*循环创建页数数组*/
    for(var i=0;i<=$scope.pages;i++){
        $scope.arr.push(i);
    }
    /*定义下一页按钮函数*/
    $scope.next=function(){
        if($scope.active <$scope.pages) {
            $scope.active++;
        }
    };
    /*定义上一页按钮函数*/
    $scope.last = function(){
        if($scope.active > 1) {
            $scope.active--;
            console.log($scope.active);
        }
    }
    /*定义页面按钮函数*/
    $scope.act = function(tar){
        $scope.active=tar;
    }
    /*定义全选按钮函数*/
    $scope.checkall = function(){
        if($scope.all){
            angular.forEach($scope.infos,function(ele){
                ele.check=true;
            })
        }else{
            angular.forEach($scope.infos,function(ele){
                ele.check=false;
            })
        }
    };
    /*定义单个复选按钮点击函数*/
    $scope.checkone = function(e){
        e.stopPropagation();
        for(var i=($scope.active-1)*$scope.maxnum;
            i<$scope.active*$scope.maxnum - 1;i++){
            console.log(i);
            if($scope.infos[i].check !== $scope.infos[i+1].check){
                $scope.all = false;
                return;
            }
        }
        $scope.all = $scope.infos[($scope.active-1)*$scope.maxnum].check;
    }
    $scope.href = function(tar){
        $location.path("/emialdetails/" + tar)
    }

})
    .controller('linksCtrl',function($scope,$location){
        /*定义联系人数据*/
        $scope.infos = datalink;
        $scope.maxnum = 7;
        /*计算显示页数*/
        $scope.pages =$scope.infos.length%$scope.maxnum? (Math.floor($scope.infos.length/$scope.maxnum) + 1): $scope.infos.length/$scope.maxnum;
        /* 定义页数数组*/
        $scope.arr = [];
        /*定义当前显示页面*/
        $scope.active = 1;
        /*定义全选按钮值*/
        $scope.all = false;
        /*循环创建页数数组*/
        for(var i=0;i<=$scope.pages;i++){
            $scope.arr.push(i);
        }
        /*定义下一页按钮函数*/
        $scope.next=function(){
            if($scope.active < $scope.pages){
                $scope.active ++;
            }

        };
        /*定义上一页按钮函数*/
        $scope.last = function(){
            if($scope.active > 1){
                $scope.active --;
            }
        }
        /*定义页面按钮函数*/
        $scope.act = function(tar){
            $scope.active=tar;
        }
      $scope.linkdetails = function(id){
            $location.path("/link/" + id);
      }
    })
    .controller('sendBoxCtrl',function($scope,$location){
        /*定义发件箱数据*/
        $scope.infos = sendmessage;
        /*每页显示最大数量*/
        $scope.maxnum = 7;
        /*计算显示页数*/
        $scope.pages =$scope.infos.length%$scope.maxnum? (Math.floor($scope.infos.length/$scope.maxnum) + 1): $scope.infos.length/$scope.maxnum;
        /* 定义页数数组*/
        $scope.arr = [];
        /*定义当前显示页面*/
        $scope.active = 1;
        /*定义全选按钮值*/
        $scope.all = false;
        /*循环创建页数数组*/
        for(var i=0;i<=$scope.pages;i++){
            $scope.arr.push(i);
        }
        /*定义下一页按钮函数*/
        $scope.next=function(){
            if($scope.active <$scope.pages) {
                $scope.active++;
            }
        };
        /*定义上一页按钮函数*/
        $scope.last = function(){
            if($scope.active > 1) {
                $scope.active--;
            }
        }
        /*定义页面按钮函数*/
        $scope.act = function(tar){
            $scope.active=tar;
        }
        /*定义全选按钮函数*/
        $scope.checkall = function(){
            if($scope.all){
                angular.forEach($scope.infos,function(ele){
                    ele.check=true;
                })
            }else{
                angular.forEach($scope.infos,function(ele){
                    ele.check=false;
                })
            }
        };
        /*定义单个复选按钮点击函数*/
        $scope.checkone = function(e){
            e.stopPropagation();
            for(var i=($scope.active-1)*$scope.maxnum;
                i<$scope.active*$scope.maxnum - 1;i++){
                console.log(i);
                if($scope.infos[i].check !== $scope.infos[i+1].check){
                    $scope.all = false;
                    return;
                }
            }
            $scope.all = $scope.infos[($scope.active-1)*$scope.maxnum].check;
        }
        $scope.href = function(tar){
            $location.path("/emialdetails/0" + tar);
        }

    })
    .controller('newCtrl',function($scope,$routeParams){
        setTimeout(rich,100);
        if($routeParams.id){
            $scope.recive = datalink[$routeParams.id - 1];
        }
        $scope.secret = {blo:true,str:"删除密送"};
        $scope.copy = {blo:true,str:"删除抄送"};
        /*定义密送点击函数*/
        $scope.secretclick = function(){
            $scope.secret.blo = !$scope.secret.blo;
            if($scope.secret.blo){
                $scope.secret.str = "密送";
            }
            else{
                $scope.secret.str = "删除密送";
            }
        }
        /*定义抄送点击函数*/
        $scope.copyclick = function(){
            $scope.copy.blo = !$scope.copy.blo;
            if($scope.copy.blo){
                $scope.copy.str = "抄送";
            }
            else{
                $scope.copy.str = "删除抄送";
            }
        }
    })
    .controller('linkCtrl',function($scope,$routeParams){
        $scope.data = datalink[$routeParams.id];
        $scope.close = function(){
            window.history.go(-1);
        }
    })
    .controller('emialdetailsCtrl',function($scope,$routeParams,$timeout){
        /*判断入口是收件箱还是发件箱，初始化对应数据*/
        if($routeParams.id.charAt(0) === "0" && $routeParams.id.length > 1){
            $scope.data = sendmessage[Number($routeParams.id)];
            $scope.replay = "再发一封";
            $scope.replayquickblo = true;
        }else{
            $scope.replay = "回复";
            $scope.replayquickblo = false;
            $scope.data = recivedmessage[Number($routeParams.id)];
        };
        /*定义关闭函数*/
        $scope.close = function(){
            window.history.go(-1);
        };
        /*定义提示框内容*/
        $scope.tip = "";
        /*定义提示框显示与否控制变量*/
        $scope.tipnghide = true;
        /*点击下一封邮件函数*/
        $scope.lastemail = function(){
            if($scope.data.id === 1){
                $scope.tip = "已是第一封邮件";
                $scope.tipnghide = false;
                $timeout(function(){$scope.tipnghide = true;},2000);
            }else{
                if($routeParams.id.charAt(0) === "0" && $routeParams.id.length > 1){
                    $scope.data = sendmessage[$scope.data.id - 2];
                    console.log(1);
                }else{
                    $scope.data = recivedmessage[$scope.data.id - 2];
                    console.log($scope.data.id);
                };
            }
        };
        /*点击上一封邮件函数*/
        $scope.nextemail = function(){
            var length;
            if($routeParams.id.charAt(0) === "0" && $routeParams.id.length > 1){
                length = sendmessage.length;
            }else{
                length = recivedmessage.length;
            };
            if($scope.data.id === length){
                $scope.tip = "已是最后一封邮件";
                $scope.tipnghide = false;
                $timeout(function(){$scope.tipnghide = true;},2000);
            }else{
                if($routeParams.id.charAt(0) === "0" && $routeParams.id.length > 1){
                    $scope.data = sendmessage[$scope.data.id ];
                }else{
                    $scope.data = recivedmessage[$scope.data.id];
                }
            }
        };
        /*定义angular事件方法，实例化富文本框*/
        $scope.rich = rich;
    });