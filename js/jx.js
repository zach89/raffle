$(function(){
            //获取奖项
            function get_jx(){
                    $.ajax({
                        url: '../php/get_set.php',
                        type: 'POST',
                        dataType: 'json',
                        data: {'action' : 'jx'},
                        success: function(data){
                                if(data !== null){
                                    var num = data.length;
                                    $(data).each(function(num,value){
                                        var a = $("<tr><td><div class='form-group has-success has-feedback'><div class='input-group'><span class='input-group-addon'>"+value.number+"</span><input type='text' class='jx form-control' value='"+value.jx+"'></td><td><input class='jxl form-control' value='"+value.jxl+"'></tr>");
                                        var btn = $("<td><button class = 'btn btn-block btn-info'>修改</button></td>");
                                            $(a).append(btn);    
                                            $("#ep").after(a);
                                            
                                    });
                                    $('.btn-warning').click(function(){
                                        $.post('../php/get_set.php',{'action':'del','number':num},function(data){
                                            alert(data);
                                            location.reload();
                                        });
                                    });

                                    $(".btn-info").click(function(){
                                        var zac = $(this).parent().parent();
                                        var jx = $(zac).find('input').eq(0).val();
                                        var jxl = $(zac).find('input').eq(1).val();
                                        var num = parseInt($(zac).find('span').text());
                                        $.post('../php/get_set.php',{'action':'updata','number':num,'jx':jx,'jxl':jxl},function(data){
                                            alert(data);
                                            location.reload();
                                        });
                                    });

                                }
                        }
                    });
            }
            get_jx();
            //添加奖项
            $("#btnt").click(function(){
                if(!($("#jxt").val()) && !($("#jxl").val())){
                    alert("不能为空");
                    return false;
                }
                $.ajax({
                url: '../php/get_set.php',
                type: 'POST',
                dataType: 'text',
                data: {'action' : 'btnt','num':$('table tr').length,'jx' : $("#jxt").val(),'jxl' : $("#jxl").val()},
                success: function(data){
                        alert(data);
                        location.reload();
                    }
                });
                
            });


        });