$(function(){
            function get_epzj(){
                $.post('../php/ep.php',{'action':'get_winner'},function(data){
                    $(data).each(function(num,value){
                                var a = $("<tr><td style='text-align:center;'>"+value.name+"</td><td style='text-align:center;'>"+value.team+"</td><td style='text-align:center;'>"+value.res+"</td></tr>");
                                $("#winner").append(a);
                        });
                },'json');
            }
                
            get_epzj();
        });