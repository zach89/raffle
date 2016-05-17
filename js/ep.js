$(function(){
                function get_name(){
                        $.ajax({url: '../php/ep.php',type: 'POST',dataType: 'json',data: {'action' : 'epg'},success: function(data){
                            if(data!==null){
                                //var l= data.length-1;
                                $(data).each(function(num,value){
                                var a = $("<tr><td style='text-align:center;'>"+value.name+"</td><td><input class='form-control name'value='"+value.team+"'></tr>");
                                var btn = $("<td><button class='btn btn-block btn-info'>修改部门</button></td><td><button class='btn btn-block btn-danger'>删除</button></td>");    
                                $("#ep").after(a);
                                $(a).append(btn);
                                });

                                $('.btn-info').click(function(){
                                    var btne = $(this).parent().parent();
                                    var name = $(btne).find('td').eq(0).text();
                                    var team = $(btne).find('input').eq(0).val();
                                    $.post('../php/ep.php',{'action' :'updata', 'name':name,'team':team},function(data){
                                        alert(data);
                                    });
                                    location.reload();
                                });
                                $('.btn-danger').click(function(){
                                    var btne = $(this).parent().parent();
                                    var name = $(btne).find('td').eq(0).text();
                                    $.post('../php/ep.php',{'action' :'del', 'name':name},function(data){
                                        alert(data);
                                    });
                                    location.reload();
                                });
                            }
                        }});
                }
                get_name();
                //添加员工
                $("#btnt").click(function(){
                    $.ajax({
                        url: '../php/ep.php',
                        type: 'POST',
                        dataType: 'text',
                        data: {'action' : 'btnt','epn' : $("#epn").val(),'epg' : $("#epg").val()},
                        success: function(data){
                            alert(data);
                        	location.reload();
                        }
                    });
                    
                });
                //重置中奖名单
                $("#btnr").click(function(){
                    $.ajax({
                    url: '../php/ep.php',
                    type: 'POST',
                    dataType: 'text',
                    data: {'action' : 'res'},
                    success: function(data){
                            alert(data);
                        	location.reload();
                        }
                    });
                });
            });