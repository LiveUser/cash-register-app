//Add a thanking txt stack overflow help date/time
//fix the month not updating issue
var total=0;
var tax=0.115;
var taxView=tax*100;
var taxed=0;
var totalTax=0;
var last=0;
var profit=0;
//fix month update
var month=new Date().getMonth()+1;
var day= function(){let now=new Date();return now.getDate();};
var year=function(){let now=new Date();return now.getFullYear();};
var hour=function(){let now=new Date();return now.getHours();};
var minute=function(){let now=new Date();return now.getMinutes();};
var seconds=function(){let now=new Date();return now.getSeconds();};
var voidOnce=true;
var doc = new jsPDF();

// solution decimals alert(Number(parseFloat("0.4").toFixed(2))+Number(parseFloat("0.4").toFixed(2)));
var plus= function(){
    document.getElementById('input').focus();
    if(isNaN(Number(document.getElementById('input').value))===false&&Number(document.getElementById('input').value)>0){
    last=Number(Number(document.getElementById("input").value).toFixed(2));
    total+=Number(Number(document.getElementById("input").value).toFixed(2));
    document.getElementById('total').innerHTML=Number(Number(total).toFixed(2));
    document.getElementById('input').value="";
    document.getElementById("log").innerHTML+="<tr>"+"<td>"+month+"/"+day()+"/"+year()+"</td>"+"<td>"+
    hour()+":"+minute()+":"+seconds()+"</td>"+"<td>"+"$"+last+"</td>"+"</tr>";
    document.getElementById("display").innerHTML="";
    voidOnce=true;
    }else{document.getElementById('input').value="";}
    };


var final=function(){
    if(total>0){
    profit+=total;
    taxed=Number(Number(tax*total).toFixed(2));
    totalTax+=taxed;
    total=Number(Number(total+taxed).toFixed(2));
    document.getElementById('total').innerHTML="";
    document.getElementById("log").innerHTML+="<tr>"+'<td class="tax">'+"Taxed"+"</td>"+
    '<td class="tax">'+"$"+taxed+"</td>"+'<td class="tax">'+taxView+"%"+"</td>"+"</tr>";
    document.getElementById("log").innerHTML+="<tr>"+'<td class="end">'+"Total:"+"$"+total+"</td>"+"<td>"+month+"/"+day()+
    "/"+year()+"</td>"+"<td>"+
    hour()+":"+minute()+":"+seconds()+"</td>"+"</tr>";
    document.getElementById("display").innerHTML="Total: $"+total;
    reset();
    }else{}
    };

var reset=function(){
    total=0;
    taxed=0;
    last=0;
    document.getElementById('total').innerHTML="";
    document.getElementById('input').value="";

    };
var handBrake=function(){
    if(total>0){
    document.getElementById("log").innerHTML+='<tr>'+'<td class="voided">'+'Transaction Canceled'+'</td>'+'<td class="voided">Ammount'+
    '</td>'+'<td class="voided"> $'+Number(Number(total).toFixed(2))+'</td>'+'</tr>';
    }else{}
    };

var voidLast=function(){
    if(last>0&&voidOnce===true){
    total-=last;
    document.getElementById('total').innerHTML=Number(Number(total.toFixed(2)));
    document.getElementById('input').value="";
    document.getElementById("log").innerHTML+='<tr>'+'<td class="voided">'+'Last input voided'+'</td>'+
    '<td class="voided">'+'Ammount'+'</td>'+'<td class="voided">'+"-$"+last+'</td>'+"</tr>";
    voidOnce=false;
    }else{}
    };

var print1=function(){
    doc.text(document.getElementById("reciept").innerHTML.toString(), 10, 10);
    doc.save('a4.pdf');
    };
//print table 
var specialElementHandlers = {
                '#editor': function (element,renderer) {
                    return true;
                }};
var print2=function(){
    document.getElementById("log").innerHTML+='<tr>'+'<td class="end">'+'Collected'+'</td>'+
    '<td class="end"> Profit: $'+Number(Number(profit).toFixed(2))+'</td>'+'<td class="end">Taxed: $'+Number(Number(totalTax).toFixed(2))+'</td>'+'</tr>';
    doc.text("FakeCorp "+month+"-"+day()+"-"+year()+" Sales",10,10);
    doc.fromHTML(document.getElementById("reciept").innerHTML, 15, 15, {'width': 170,'elementHandlers': specialElementHandlers});
                doc.save( month+"-"+day()+"-"+year()+"Hour"+hour()+"Minute"+minute()+"Second"+seconds()+".pdf");
    };
    

function key(event){
    var y = event.which || event.keyCode;
    //.=46
    switch(y) {
    case 13:
        plus();
        break;
    case 8:
        voidLast();
        break;
    case 92:
        handBrake();
        reset();
        break;
    case 61:
        final();
        break;
    default:
        
        if(document.getElementById('input').value=="="){
        document.getElementById('input').value="";
        }else if(document.getElementById('input').value=="\\"){
        document.getElementById('input').value="";
        }else{}
} 
    }
//cool js feature String.fromCharCode(65);

