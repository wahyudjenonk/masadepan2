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
var divcontainerz;
function windowLoading(html,judul,width,height){
    divcontainerz = "win"+Math.floor(Math.random()*9999);
    $("<div id="+divcontainerz+"></div>").appendTo("body");
    divcontainerz = "#"+divcontainerz;
    $(divcontainerz).html(html);
    $(divcontainerz).css('padding','5px');
    $(divcontainerz).window({
       title:judul,
       width:width,
       height:height,
       autoOpen:false,
       modal:true,
       maximizable:false,
       resizable:false,
       minimizable:false,
       closable:false,
       collapsible:false,  
    });
    $(divcontainerz).window('open');        
}
function winLoadingClose(){
    $(divcontainerz).window('close');
    //$(divcontainer).html('');
}
function loadingna(){
	windowLoading("<img src='"+host+"__assets/images/loading.gif' style='position: fixed;top: 50%;left: 50%;margin-top: -10px;margin-left: -25px;'/>","Please Wait",200,100);
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

function genGrid(modnya, divnya, lebarnya, tingginya, par1){
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
			judulnya = "";
			tingginya = getClientHeight-330;
			urlglobal = host+'datagrid/'+modnya;
			fitnya = true;
			pagesizeboy = 50;
			param['id_meja'] = par1;
			kolom[modnya] = [	
				{field:'nama_produk',title:'Nama Produk',width:200, halign:'center',align:'left'},
				{field:'qty',title:'Qty',width:90, halign:'center',align:'right'},
				{field:'total_harga',title:'Total Harga',width:120, halign:'center',align:'right',
					formatter: function(value,row,index){
						if (row.total_harga){
							return NumberFormat(row.total_harga);
						} else {
							return '-';
						}
					}
				},
			];
		break;
		case "list_produk_kasir":
			judulnya = "";
			tingginya = getClientHeight-330;
			urlglobal = host+'datagrid/'+modnya;
			fitnya = true;
			pagesizeboy = 50;
			paging = true;
			doble_klik = true;
			kolom[modnya] = [	
				{field:'nama_kategori',title:'Kategori',width:130, halign:'center',align:'left'},
				{field:'nama_produk',title:'Nama Produk',width:240, halign:'center',align:'left'},
				{field:'harga_jual',title:'Harga Satuan',width:150, halign:'center',align:'right',
					formatter: function(value,row,index){
						if (row.harga_jual){
							return NumberFormat(row.harga_jual);
						} else {
							return '-';
						}
					}
				},
			];
		break;		
		case "list_pembelian":
			judulnya = "Purchase Order / Pembelian";
			tingginya = getClientHeight-330;
			urlglobal = host+'datagrid/'+modnya;
			fitnya = true;
			pagesizeboy = 50;
			paging = true;
			kolom[modnya] = [	
				{field:'no_po',title:'No PO',width:150, halign:'center',align:'center'},
				{field:'tgl_po',title:'Tgl. PO',width:120, halign:'center',align:'center'},
				{field:'nama_supplier',title:'Supplier',width:250, halign:'center',align:'left'},
				{field:'pembayaran',title:'Jenis Pembayaran',width:120, halign:'center',align:'left',
					formatter: function(value,row,index){
						if (value == 'K'){
							return "Kredit";
						} else {
							return "Tunai";
						}
					}
				},
				{field:'stat',title:'Status Pembayaran',width:120, halign:'center',align:'left',
					formatter: function(value,row,index){
						if (value == 'BL'){
							return "<font color='red'>Belum Lunas</font>";
						} else {
							return "Lunas";
						}
					}
				},
				{field:'total',title:'Total',width:150, halign:'center',align:'right',
					formatter: function(value,row,index){
							return NumberFormat(value);
					}
				},
				{field:'id',title:'Detil Barang',width:100, halign:'center',align:'center',
					formatter: function(value,row,index){
							return "Lihat";
					}
				}
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
					case "list_produk_kasir":
						$.post(host+'trx-penjualan', {'editstatus':'add', 'cl_meja_id':par1, 'tbl_produk_id':rowData.id}, function(resp){
							if(resp == 1){
								$('#pes_kasir').datagrid('reload');
								$.post(host+'total-pesanan', { 'id_meja':par1 }, function(resp){
									var parsing = $.parseJSON(resp);
									$('#total_qty').val(parsing.tot_qty);
									$('#total_hrg').val(NumberFormat(parsing.tot_harga));
								});
							}else{
								$.messager.alert('Error','Error System','error');
							}
						});
					break;
				}
			}
		},
		toolbar: '#toolbar_'+modnya,
	});
}

function kumpulAction(type, p1, p2, p3){
	switch(type){
		case "hapus-item":
			var row = $('#pes_kasir').datagrid('getSelected');
			if(row){
				$.post(host+'hapus-item', { 'id':row.id, 'editstatus':'edit', 'id_meja':p1, 'tbl_produk_id':row.tbl_produk_id }, function(resp){
					if(resp == 1){
						$('#pes_kasir').datagrid('reload');
						$.post(host+'total-pesanan', { 'id_meja':p1 }, function(resp){
							var parsing = $.parseJSON(resp);
							$('#total_qty').val(parsing.tot_qty);
							$('#total_hrg').val(NumberFormat(parsing.tot_harga));
						});
					}else{
						$.messager.alert('Error','Error System','error');
					}
				});
			}else{
				$.messager.alert('Error','Pilih Data List Pesanan!','error');
			}
		break;
		case "selesai-transaksi":
			loadingna();
			$.post(host+'selesai-transaksi', { 'id_meja':p1, 'nomor_meja':p2 }, function(resp){
				winLoadingClose();
				windowForm2(resp, 'Pembayaran Transaksi', 500, 600);
			});
		break;
		case "kalkulasi":
			console.log(parseInt(jml_uang));
			
			var tot_byr = $('#tot_byr_bnr').val();
			
			if($('#jumlah_uang_'+p2).val()){
				var jml_uang = $('#jumlah_uang_'+p2).val();
			}else{
				var jml_uang = 0;
			}
			
			var uang_trm = (parseInt(p1) + parseInt(jml_uang));
			var uang_kmb = (parseInt(uang_trm) - parseInt(tot_byr));
			
			$('#jumlah_uang_'+p2).val(uang_trm);
			$('#jml_uang_'+p2).val(NumberFormat(uang_trm));
			$('#jumlah_kembalian_'+p2).val(uang_kmb);
			$('#uang_kembalian_'+p2).val(NumberFormat(uang_kmb));
			
			return false;
		break;
		case "reset_jmluang_kembalian":
			$('#jumlah_uang_'+p1).val('');
			$('#jml_uang_'+p1).val('');
			$('#jumlah_kembalian_'+p1).val('');
			$('#uang_kembalian_'+p1).val('');
		break;
		case "tutup-transaksi":
			submit_form('form_pembayaran_transaksi',function(r){
				loadingna();
				if(r==1){
					$.messager.alert('JResto Soft',"Data Tersimpan",'info');
					loadUrl(host+'kasir');
					winLoadingClose();
				}else{
					$.messager.alert('JResto Soft', "Gagal", 'error');
					console.log(r);
					winLoadingClose();
				}
				closeWindow2();
			});
		break;
	}
}

function postAll(type, dom, p1, p2, p3){
	var urlnya;
	var param = {};
	switch(type){
		case "detail-meja":
			param['id_meja'] = p1;
			param['status_meja'] = p2;
			param['nomor_meja'] = p3;
			urlnya = host+'detail-meja';
		break;
		case "set_aktif_meja":
			param['id'] = p1;
			param['editstatus'] = 'edit';
			param['status_meja'] = 'N';
			$.post(host+'set-meja-aktif', param, function(r){
				if(r == 1){
					$.messager.alert('Info','Meja Aktif','info');
					postAll('detail-meja', 'mainContainer', p1, 'N', p2);
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

function NumberFormat(value) {
	
    var jml= new String(value);
    if(jml=="null" || jml=="NaN") jml ="0";
    jml1 = jml.split("."); 
    jml2 = jml1[0];
    amount = jml2.split("").reverse();

    var output = "";
    for ( var i = 0; i <= amount.length-1; i++ ){
        output = amount[i] + output;
        if ((i+1) % 3 == 0 && (amount.length-1) !== i)output = '.' + output;
    }
    //if(jml1[1]===undefined) jml1[1] ="00";
   // if(isNaN(output))  output = "0";
    return output; // + "." + jml1[1];
}
function genform(type, modulnya, stswindow, tabel){
	var urlpost = host+'backend/get_form/'+modulnya+'/form';
	var urldelete = host+'backend/cruddata/'+modulnya;
	var id_tambahan = "";
	
	switch(modulnya){
		case "produk":
			table="tbl_produk";
			urlpost = host+'backend/getdisplay/get-form/'+modulnya;
		break;
		case "supplier":
			table="tbl_supplier";
			urlpost = host+'backend/getdisplay/get-form/'+modulnya;
		break;
		case "outlet":
			table = "tbl_gerai_outlet";
			urlpost = host+'backend/getdisplay/get-form/'+modulnya;
		break;
		case "perangkat_kasir":
			table="tbl_perangkat_kasir";
			urlpost = host+'backend/getdisplay/get-form/'+modulnya;
		break;
		case "kategori_produk":
			table="cl_kategori_produk";
			urlpost = host+'backend/getdisplay/get-form/'+modulnya;
		break;
		
		case "promo":
			table="tbl_promo";
			urlpost = host+'backend/getdisplay/get-form/'+modulnya;
		break;
	}
	
	switch(type){
		case "add":
			if(stswindow == undefined){
				$('#grid_nya_'+modulnya).hide();
				$('#detil_nya_'+modulnya).empty().show().addClass("loading");
			}
			$.post(urlpost, {'editstatus':'add', 'id_tambahan':id_tambahan }, function(resp){
				if(stswindow == 'windowform'){
					windowForm(resp, judulwindow, lebar, tinggi);
				}else if(stswindow == 'windowpanel'){
					windowFormPanel(resp, judulwindow, lebar, tinggi);
				}else{
					$('#detil_nya_'+modulnya).show();
					$('#detil_nya_'+modulnya).html(resp).removeClass("loading");
				}
			});
		break;
		case "edit":
		case "delete":
		
			var row = $("#grid_"+modulnya).datagrid('getSelected');
			if(row){
				if(type=='edit'){
					if(stswindow == undefined){
						$('#grid_nya_'+modulnya).hide();
						$('#detil_nya_'+modulnya).show().addClass("loading");	
					}
					$.post(urlpost, { 'editstatus':'edit', id:row.id, 'ts':table, 'submodul':modulnya, 'bulan':row.bulan, 'tahun':row.tahun, 'id_tambahan':id_tambahan }, function(resp){
						if(stswindow == 'windowform'){
							windowForm(resp, judulwindow, lebar, tinggi);
						}else if(stswindow == 'windowpanel'){
							windowFormPanel(resp, judulwindow, lebar, tinggi);
						}else{
							$('#detil_nya_'+modulnya).show();
							$('#detil_nya_'+modulnya).html(resp).removeClass("loading");
						}
					});
				}else if(type=='delete'){
					//if(confirm("Anda Yakin Menghapus Data Ini ?")){
					$.messager.confirm('JResto Soft','Anda Yakin Menghapus Data Ini ?',function(re){
						if(re){
							loadingna();
							$.post(urldelete, {id:row.id, 'sts_crud':'delete'}, function(r){
								if(r==1){
									winLoadingClose();
									$.messager.alert('JResto Soft',"Data Terhapus",'info');
									$('#grid_'+modulnya).datagrid('reload');								
								}else{
									winLoadingClose();
									console.log(r)
									$.messager.alert('JResto Soft',"Gagal Menghapus Data",'error');
								}
							});	
						}
					});	
					//}
				}
				
			}
			else{
				$.messager.alert('Roger Salon',"Select Row In Grid",'error');
			}
		break;
		
	}
}

