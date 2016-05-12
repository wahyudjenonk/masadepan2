var DimHeight = getClientHeight()
var DimWidth = getClientWidth()

function getClientHeight(){
	var theHeight;
	if (window.innerHeight)
		theHeight=window.innerHeight;
	else if (document.documentElement && document.documentElement.clientHeight) 
		theHeight=document.documentElement.clientHeight;
	else if (document.body) 
		theHeight=document.body.clientHeight;
	
	return theHeight;
}

function loadUrl(urls){	
    $("#mainContainer").html("").addClass("loading");
	$.get(urls,function (html){
	    $("#mainContainer").html(html).removeClass("loading");
    });
}

function getClientWidth(){
	var theWidth;
	if (window.innerWidth) 
		theWidth=window.innerWidth;
	else if (document.documentElement && document.documentElement.clientWidth) 
		theWidth=document.documentElement.clientWidth;
	else if (document.body) 
		theWidth=document.body.clientWidth;

	return theWidth;
}

function fillCombo(url, SelID, value, value2, value3, value4){
	//if(Ext.get(SelID).innerHTML == "") return false;
	if (value == undefined) value = "";
	if (value2 == undefined) value2 = "";
	if (value3 == undefined) value3 = "";
	if (value4 == undefined) value4 = "";
	
	$('#'+SelID).empty();
	$.post(url, {"v": value, "v2": value2, "v3": value3, "v4": value4},function(data){
		$('#'+SelID).append(data);
	});

}

function formatDate(date) {
	var y = date.getFullYear();
	var m = date.getMonth()+1;
	var d = date.getDate();
	
	
	if(m < 10){
		m='0'+m;
	}
	
	if(d < 10){
		d='0'+d;
	}
	
	return d+'-'+m+'-'+y;
}		

var container;
function windowForm2(html,judul,width,height){
    container = "win"+Math.floor(Math.random()*9999);
    $("<div id="+container+"></div>").appendTo("body");
    container = "#"+container;
    $(container).html(html);
    $(container).css('padding','5px');
    $(container).window({
       title:judul,
       width:width,
       height:height,
       autoOpen:false,
       maximizable:false,
       minimizable: false,
	   collapsible: false,
       resizable: false,
       closable:true,
       modal:true,
	   onBeforeClose:function(){	   
			$(container).window("close",true);
		//	$(container).window("destroy",true);
	   }
    });
    $(container).window('open');     
}
function closeWindow2(){
     $(container).window('close');
    //removeElement(container);
    $(container).html("");
}


function submit_form(frm,func){
    var url = $('#'+frm).attr("url");
    $('#'+frm).form('submit',{
            url:url,
            onSubmit: function(){
                    return $(this).form('validate');
            },
            success:function(data){
				if (func == undefined ){
					if (data == "1"){
						$.messager.alert('Info','Data Tersimpan','info');						
					}else{
						var pesan = data.replace('1','');
						$.messager.alert('Error','Error Saving Data '+pesan,'error');
					}
                }else{
                    func(data);
                }
            },
            error:function(data){
                $('#'+frm).removeClass('loading');
                 if (func == undefined ){
                    $('#'+frm).removeClass('loading');
                     alert(data,'Error');
                }else{
                    $('#'+frm).removeClass('loading');
                    func(data);
                }
            }
    });
}


function genTab(div, mod, sub_mod, tab_array, div_panel, judul_panel, mod_num, height_panel, height_tab, width_panel, width_tab){
	var id_sub_mod=sub_mod.split("_");
	if(typeof(div_panel)!= "undefined" || div_panel!=""){
		$(div_panel).panel({
			width:(typeof(width_panel) == "undefined" ? getClientWidth()-268 : width_panel),
			height:(typeof(height_panel) == "undefined" ? getClientHeight()-100 : height_panel),
			title:judul_panel,
			//fit:true,
			tools:[{
					iconCls:'icon-cancel',
					handler:function(){
						$('#grid_nya_'+id_sub_mod[1]).show();
						$('#detil_nya_'+id_sub_mod[1]).hide();
						$('#grid_'+id_sub_mod[1]).datagrid('reload');
					}
			}]
		}); 
	}
	
	$(div).tabs({
		title:'AA',
		height: (typeof(height_tab) == "undefined" ? getClientHeight()-190 : height_tab),
		width: (typeof(width_tab) == "undefined" ? getClientWidth()-280 : width_tab),
		plain: false,
		fit:true,
		onSelect: function(title){
				var isi_tab=title.replace(/ /g,"_");
				var par={};
				console.log(isi_tab);
				$('#'+isi_tab.toLowerCase()).html('').addClass('loading');
				urlnya = host+'index.php/content-tab/'+mod+'/'+isi_tab.toLowerCase();
				$(div_panel).panel({title:title});
				
				switch(mod){
					case "kasir":
						var lantainya = title.split(" ");
						var lantainya = lantainya.length-1;
						
						par['posisi_lantai'] = lantainya;
						urlnya = host+'index.php/kasir-lantai/';
					break;
					case "pengaturan":
						
					break;
				}
				$.post(urlnya,par,function(r){
					$('#'+isi_tab.toLowerCase()).removeClass('loading').html(r);
				});
		},
		selected:0
	});
	
	if(tab_array.length > 0){
		for(var x in tab_array){
			var isi_tab=tab_array[x].replace(/ /g,"_");
			$(div).tabs('add',{
				title:tab_array[x],
				content:'<div style="padding: 5px;"><div id="'+isi_tab.toLowerCase()+'" style="height: 200px;">'+isi_tab.toLowerCase()+'zzzz</div></div>'
			});
		}
		
		var tab = $(div).tabs('select',0);
		
	}
	
}

function genGrid(modnya, divnya, lebarnya, tingginya){
	if(lebarnya == undefined){
		lebarnya = getClientWidth-250;
	}
	if(tingginya == undefined){
		tingginya = getClientHeight-300;
	}

	var kolom ={};
	var frozen ={};
	var judulnya;
	var param={};
	var urlnya;
	var urlglobal="";
	var url_detil="";
	var post_detil={};
	var fitnya;
	var klik=false;
	var doble_klik=false;
	var pagesizeboy = 10;
	var singleSelek = true;
	var footer=false;
	var paging=false;
	
	switch(modnya){
		case "list_pesanan_kasir":
			judulnya = "Pesanan";
			tingginya = getClientHeight-330;
			urlglobal = host+'datagrid/'+modnya;
			fitnya = true;
			pagesizeboy = 50;
			kolom[modnya] = [	
				{field:'nama_produk',title:'Nama Produk',width:200, halign:'center',align:'center'},
				{field:'qty',title:'Qty',width:100, halign:'center',align:'left'},
				{field:'total_harga',title:'Total Harga',width:120, halign:'center',align:'center'},
			];
		break;
		case "list_produk_kasir":
			judulnya = "Produk/Barang";
			tingginya = getClientHeight-330;
			urlglobal = host+'datagrid/'+modnya;
			fitnya = true;
			pagesizeboy = 50;
			paging = true;
			kolom[modnya] = [	
				{field:'kategori',title:'Kategori',width:200, halign:'center',align:'center'},
				{field:'nama_produk',title:'Nama Produk',width:300, halign:'center',align:'center'},
				{field:'total_harga',title:'Harga Satuan',width:150, halign:'center',align:'center'},
			];
		break;
		case "master_produk":
			judulnya = "Master Produk/Barang";
			tingginya = getClientHeight-300;
			urlglobal = host+'datagrid/'+modnya;
			fitnya = true;
			pagesizeboy = 50;
			paging = true;
			kolom[modnya] = [	
				{field:'kategori',title:'Kategori',width:200, halign:'center',align:'center'},
				{field:'nama_produk',title:'Nama Produk',width:300, halign:'center',align:'center'},
				{field:'total_harga',title:'Harga Satuan',width:150, halign:'center',align:'center'},
			];
		break;
		case "kategori_produk":
			judulnya = "Kategori Produk/Barang";
			tingginya = getClientHeight-300;
			urlglobal = host+'datagrid/'+modnya;
			fitnya = true;
			pagesizeboy = 50;
			paging = true;
			kolom[modnya] = [	
				{field:'nama_produk',title:'Nama kategori',width:300, halign:'center',align:'center'},
			];
		break;
		case "manajemen_meja":
			judulnya = "Manajemen Meja";
			tingginya = getClientHeight-300;
			urlglobal = host+'datagrid/'+modnya;
			fitnya = true;
			pagesizeboy = 50;
			paging = true;
			kolom[modnya] = [	
				{field:'lantai',title:'Lantai',width:200, halign:'center',align:'center'},
				{field:'nama_produk',title:'Nomor Meja',width:300, halign:'center',align:'center'},
			];
		break;
		
	}
	
	grid_nya=$("#"+divnya).datagrid({
		title:judulnya,
        height:tingginya,
        width:lebarnya,
		rownumbers:true,
		iconCls:'',
        fit:fitnya,
        striped:true,
        pagination:paging,
        remoteSort: false,
		showFooter:footer,
		singleSelect:singleSelek,
        url: urlglobal,
		nowrap: true,
		pageSize:pagesizeboy,
		pageList:[10,20,30,40,50,75,100,200],
		queryParams:param,
		columns:[
            kolom[modnya]
        ],
		onLoadSuccess:function(d){
			$('.yes').linkbutton({  
					iconCls: 'icon-cancel'  
			});
			$('.no').linkbutton({  
					iconCls: 'icon-ok'  
			});
			
		},
		onClickRow:function(rowIndex,rowData){
		  if(klik==true){
			  
		  }
        },
		onDblClickRow:function(rowIndex,rowData){
			if(doble_klik==true){
				switch(modnya){
				}
			}
		},
		toolbar: '#toolbar_'+modnya,
	});
	
}

function postAll(type, dom, p1, p2, p3){
	var urlnya;
	var param = {};
	switch(type){
		case "detail-meja":
			param['id_meja'] = p1;
			param['status_meja'] = p2;
			param['nomor_meja'] = p3;
			urlnya = host+'index.php/detail-meja';
		break;
		case "set_aktif_meja":
			param['id'] = p1;
			param['editstatus'] = 'edit';
			param['status_meja'] = 'N';
			$.post(host+'index.php/set-meja-aktif', param, function(r){
				if(r == 1){
					$.messager.alert('Info','Meja Aktif','info');
					postAll('detail-meja', 'mainContainer', p1, 'N');
				}else{
					$.messager.alert('Error','Error','error');
				}
			});
			
			return false;
		break;
	}
	
	$('#'+dom).html('').addClass('loading');
	$.post(urlnya, param, function(r){
		$('#'+dom).removeClass('loading').html(r);
	});
	
}

