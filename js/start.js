$(function() {
        //获取奖品
        function get_jxt(){
                $.ajax({
                    url: './php/get_set.php',
                    type: 'POST',
                    dataType: 'json',
                    data: {'action' : 'jxt'},
                    success: function(data){
                                $(data).each(function(num,value){
                                    var jxt = $("<dd>"+value.jx+":"+value.jxl+"</dd>");
                                    $("#jxt").append(jxt);            
                                });//ecah结束
                            }//success结束
                });//ajax结束
        }
        //获取奖项
        function get_jx(){
                    $.ajax({
                        url: './php/get_set.php',
                        type: 'POST',dataType: 'json',
                        data: {'action' : 'jx'},
                        success: function(data){
                                $(data).each(function(num,value){
                                    var a = $("<input type='radio'name='jx' value='"+value.jx+"'>"+value.jx+"</input>");
                                    $("#sel").append(a);
                                });
                        }
                    });
        }
        get_jxt();
        get_jx();


        var phones;
        var list_phones = '';
        var num = 0;                             
        var start;//中奖名单
        var $s = '';//奖项
        var jx;
        var flag = false;//是否开始
        $.ajax({url: './php/get_set.php',type: 'POST',dataType: 'text',data: {'action' : 'get'},
            success: function(data){
                if(data){
                    phones = data;
                    phones = phones.split(',');//用,分割对象                                                         
                    for(var j=0; j<phones.length; j++){
                        list_phones += phones[j] + '<br />';
                    }
                    $('#rrss').hide();
                }
            }
        });
        function AutoScroll(obj) {
            $(obj).find("ul:first").animate({marginTop:"-3vh"},500,function(){
                $(this).css({marginTop:"0px"}).find("li:first").appendTo(this);
            });
        }

                //将中奖信息写入
        function set(rs,ns){
                    $.ajax({
                        url : './php/ep.php',
                        type: 'POST',
                        dataType: 'text',
                        data: {'action' : 'rs', 'rs' : rs,'ns' :ns },
                        success: function(data){return true;}
                    });
        }
                //删除中奖名单
        function getIndex(arr, val){
                    var index = -1;
                    for(var i=0; i<arr.length; i++){
                        if(arr[i] == val)
                            index = i;
                    }
                    arr.splice(index, 1);
        }
        function start_chou(){
                    if(phones.length === 1){
                        $('#texes').html('抽奖结束');
                        $('#current').html('');
                        return;
                    }
                    jx = $("input[name='jx']:checked").val();
                    if(!jx || jx === ''){
                        $('#texes').html('选择抽奖奖项！');
                        return;
                    }
                    if(flag === false){
                        $('#current').html('');
                        $('#texes').html('抽奖中，请耐心等待......');
                        flag = true;            
                        setTimeout(function(){
                        start = setInterval(function(){
                            $('#rrss').val(function(){
                                var len = phones.length;
                                var rand = Math.floor(Math.random() * len);//随机函数
                                return phones[rand];
                            });
                            $('#current').html(Math.floor(Math.random() * 100000000000000000));
                        },1);
                        }, 500);
                    }
                }
                                             
                //停止抽奖
                
        function stop_chou(){
                    if(flag === true){
                        flag = false;
                        clearInterval(start);
                        $('#current').html($('#rrss').val());
                        $s = jx+$('#current').html();
                        $('#texes').html(jx);
                        getIndex(phones, $('#current').html());
                        var hzj = $("<li style='height: 3vh;'>"+jx+"|"+$('#current').html()+"</li>");
                        $("#zjmd").after(hzj);
                        set(jx,$('#current').html());
                        num++;
                        if(num==6){
                        setInterval(AutoScroll("#rol"),1000);
                        }
                    }else{
                        alert("请先开始抽奖");
                    }
                }
        
        $('#start').click(function(){
            start_chou();
        });
                                     
        $('#stop').click(function(){
            stop_chou();
        });
        
});
