var getMonth;
var getYear;

window.onload = function(){
	var Udate = new Date();
	getMonth = Udate.getMonth() + 1;
	getYear = Udate.getFullYear();

	showCalendar();
}

function showCalendar(){
var div = document.getElementById("time_table");
    while(div.hasChildNodes()) //当div下还存在子节点时 循环继续
    {
        div.removeChild(div.firstChild);
    }
	//head
	var month = document.getElementById("month");
	var year = document.getElementById("year");

	if(getMonth > 9){
		month.innerHTML = getMonth + ".";
	}else{
		month.innerHTML = "0" + getMonth + ".";
	}

	year.innerHTML = getYear;

	//body
	switch(getMonth){
		case 1:
		case 3:
		case 5:
		case 7:
		case 8:
		case 10:
		case 12:
		{
			for(var i =1;i<=31;i++){
				var oDiv = document.createElement('div');
				oDiv.className = "date";
				oDiv.innerHTML = "<span>"+ i +"</span>";
				document.getElementById("time_table").appendChild(oDiv);
			}
			break;
		}
		case 4:
		case 6:
		case 9:
		case 11:
		{
			for(var i =1;i<=30;i++){
				var oDiv = document.createElement('div');
				oDiv.className = "date";
				oDiv.innerHTML = "<span>"+ i +"</span>";
				document.getElementById("time_table").appendChild(oDiv);
			}
			break;
		}
		case 2:
		{
			if(getYear % 4 == 0){
				for(var i =1;i<=29;i++){
				var oDiv = document.createElement('div');
				oDiv.className = "date";
				oDiv.innerHTML = "<span>"+ i +"</span>";
				document.getElementById("time_table").appendChild(oDiv);
				}
			}else{
				for(var i =1;i<=28;i++){
				var oDiv = document.createElement('div');
				oDiv.className = "date";
				oDiv.innerHTML = "<span>"+ i +"</span>";
				document.getElementById("time_table").appendChild(oDiv);
				}
			}
			break;
		}
	}

//	var Calendar_d = {{ date|safe }};
    var json = {};
    json.Calendar_d = Calendar_d;
    for(var i =0;i<Calendar_d.length;i++){
        if((Calendar_d[i].year == getYear) && (Calendar_d[i].month == getMonth)){
            if(Calendar_d[i].issubmit){
                showSuccess(Calendar_d[i].day);
            }else{
                if(Calendar_d[i].type == 'PL'){
                    showPlan(Calendar_d[i].day);
                }else if(Calendar_d[i].type == 'AT'){
                    showSelf(Calendar_d[i].day);
                 }
            }
        }
	}


//	//第几个元素
//	//var p = 24;  //可接收被标注为"计划"的值
//	//p = p+2;
//	showPlan(26);
//
//	//var s = 5;  //可接收被标注为"自主"的值
//	//s=s+2;
//	showSelf(7);
//
//	showSuccess(13);

	// window.onclick = function(){
	// 	alert(this.tagName);
	// }
}

function leftCalendar(){


	var thisMonth = getMonth - 1 ;
	var thisYear = getYear;

	//Clear Nodes
	clearNode();
    //END Clear

	if(thisMonth <= 0){
		getYear = thisYear - 1;
		getMonth = 12;
	}else{
		getMonth = thisMonth;
	}
	showCalendar();

}

function clearNode(){
	//Clear Nodes
	var div = document.getElementById("time_table");
    while(div.hasChildNodes()) //当div下还存在子节点时 循环继续
    {
        div.removeChild(div.firstChild);
    }
    //END Clear
}

function rightCalendar(){
	var thisMonth = getMonth + 1 ;
	var thisYear = getYear;

	//Clear Nodes
	clearNode();
    //END Clear

	if(thisMonth > 12){
		getYear = thisYear + 1;
		getMonth = 1;
	}else{
		getMonth = thisMonth;
	}
	showCalendar();

}

//跳转到作文历史
function showHis(){
	window.location.href = "./myhistory.html";
}

//有监督模块
function showPlan(i){
    i=i-1;
	var plan_table = document.getElementById("time_table").childNodes[i];
	plan_table.className = "plan";
	plan_table.onclick = function(){
		// 在下面填写地址就行了
		myajax(getYear,getMonth,i);
 	}

}

//无监督模块
function showSelf(i){
    i=i-1;

	var plan_table = document.getElementById("time_table").childNodes[i];
	plan_table.className = "self";

	plan_table.onclick = function(){
		 myajax(getYear,getMonth,i);
	}

}

//已完成模块
function showSuccess(i){
    i=i-1;

	var plan_table = document.getElementById("time_table").childNodes[i];
	plan_table.className = "success";
	plan_table.onclick = function(){
           mysecondajax(getYear,getMonth,i);
	}
}



//显示修改页面
function showPhotoTips(){
	document.getElementById('photoTips').style.display = "block";
}

function hidePhotoTips(){
	document.getElementById('photoTips').style.display = "none";
}

//修改个人信息弹窗
function showPhoto(){
	document.getElementById('hidebg').style.display = 'block';
	var myObject = document.getElementById('modify');
	myObject.style.display = "block";
}
//隐藏个人信息弹窗
function hidePhoto(){
	document.getElementById('hidebg').style.display = 'none';
	var myObject = document.getElementById('modify');
	myObject.style.display = "none";
}

function showModifyPsw(){
	var modifyTable = document.getElementById('modifyTable');
	var tr = modifyTable.getElementsByTagName("tr");
	for(var i = 3;i<6;i++){
		tr[i].style.display = "block";
		tr[i].style.width = "420px";
		tr[i].style.marginBottom = "10px";
	}
}

var length = 0;
var perPage =2;
var pageNum = 1;
var count = 0;

        function show_title(){
		    document.getElementById('hidebg').style.display = "block";
		    document.getElementById("title_window").style.display = "block";
		    json1 = {};
		    json1.list = list;
		    console.log(list);
		    length = list.length;//数组长度
		    //pageNum = Math.ceil(length/perPage);//页数，取大整
		    count = pageNum-1;//当前记录条数
		    if(length >=2){
		    	var tdiv = document.getElementById("title_1");
				tdiv.innerHTML = "<span>"+ list[count].title +"</span>";
				tdiv.onclick = function(){
					window.location.href="../write?id="+list[count].id;
				}
				var ttdiv = document.getElementById("title_2");
				ttdiv.innerHTML = "<span>"+ list[count+1].title +"</span>";
				ttdiv.onclick = function(){
					window.location.href="../write?id="+list[count+1].id;
				}
		    }else{
		    	var tdiv = document.getElementById("title_1");
				tdiv.innerHTML = "<span>"+ list[count].title +"</span>";
				tdiv.onclick = function(){
					window.location.href="../write?id="+list[count].id;
				}
		    }
			
		}


        function title_close(){
            document.getElementById('hidebg').style.display = "none";
			document.getElementById("title_window").style.display = "none";
			length = 0;
			pageNum = 1;
			count = 0;
		}



		function title_left(){
			//方法在这里写
            json1 = {};
		    json1.list = list;

		    if(pageNum == 1){
		    	alert("已经是第一页");
		    }else{
		    	pageNum = pageNum - 1;
		    	count = (pageNum - 1)*perPage;
		    	var tdiv = document.getElementById("title_1");
            	while(tdiv.hasChildNodes()) //当div下还存在子节点时 循环继续
            	{
                	tdiv.removeChild(tdiv.firstChild);
            	}
				tdiv.innerHTML = "<span>"+ list[count].title +"</span>";
				tdiv.onclick = function(){
						window.location.href="../write?id="+list[count].id;
				}
					var ttdiv = document.getElementById("title_2");
					while(ttdiv.hasChildNodes()) //当div下还存在子节点时 循环继续
            	{
                	ttdiv.removeChild(ttdiv.firstChild);
            	}
					ttdiv.innerHTML = "<span>"+ list[count+1].title +"</span>";
					ttdiv.onclick = function(){
						window.location.href="../write?id="+list[count+1].id;
				}

		    }
			
		}

		function title_right(){
			//方法在这里写
			if(pageNum == Math.ceil(length*1.0/perPage)){
		    	alert("已经是最后一页");
		    }else{
		    	pageNum = pageNum + 1;
		    	count = (pageNum-1) * perPage;
		    	var tdiv = document.getElementById("title_1");
            	while(tdiv.hasChildNodes()) //当div下还存在子节点时 循环继续
            	{
                	tdiv.removeChild(tdiv.firstChild);
            	}
				tdiv.innerHTML = "<span>"+ list[count].title +"</span>";
				tdiv.onclick = function(){
						window.location.href="../write?id="+list[count].id;
				}
					var ttdiv = document.getElementById("title_2");
					while(ttdiv.hasChildNodes()) //当div下还存在子节点时 循环继续
            	{
                	ttdiv.removeChild(ttdiv.firstChild);
            	}
					ttdiv.innerHTML = "<span>"+ list[count+1].title +"</span>";
					ttdiv.onclick = function(){
						window.location.href="../write?id="+list[count+1].id;
				}

		    }
			
		}

