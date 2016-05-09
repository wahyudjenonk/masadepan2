<?php if (!defined('BASEPATH')) {exit('No direct script access allowed');}

class mservices extends CI_Model {

	function __construct() {
		parent::__construct();
		
        $ci = & get_instance();
	}
	
	
	function getdata($type, $p1=""){
		$where = "";
		switch($type){
			case "outlet":
			case "act":
				$data=$this->db->get('tbl_setting')->result_array();
				$arr=array();
				if(count($data)>0){
					foreach($data as $v){
						$arr[$this->encrypt->decode($v['param'])]=$this->encrypt->decode($v['value']);
					}
				}
				if($type=="act"){
					//echo count($arr);exit;
					if(count($arr)>0){
						if(isset($arr['stat']))return 1;else return 0;
					}else{return 0;}
				}
				return $arr;
			break;
			case "penjualan":
				$sql="SELECT A.*,B.cl_meja_id,B.pembayaran,B.tbl_gerai_outlet_id,B.tgl_faktur,B.tbl_member_id 
					FROM tbl_d_penjualan_outlet A 
					LEFT JOIN tbl_penjualan_outlet B ON A.no_faktur_penjualan=B.no_faktur_penjualan
					WHERE B.tgl_faktur='2012-09-20'";
				$data=$this->db->query($sql)->result_array();
				//return json_encode(array("customer"=>$data));
			break;
			
		}
		
		return json_encode($data);
	}
	
	function upload($type,$p1=""){
		//echo $_POST['judul'];exit;
		print_r($_POST);exit;
		$date=date('YmdHis');
		$fileElementName='file_ebook';
		$k_name = $this->db->query("
					SELECT sub_kategori
					FROM cl_sub_kategori
					WHERE id = '".$post['cl_sub_kategori_id']."'
				")->row_array();
		$k_nama = str_replace(" ", "_", $k_name['sub_kategori']);
		$upload_dir = "repository/file/".strtolower($k_nama)."/";
		
		
		//$upload_dir="repo/ebook/";
		$newFilename = $date;
		
		//print_r($this->sesina);exit;
		$fName = $_FILES[$fileElementName]['tmp_name'];
		$fSize = @filesize($_FILES[$fileElementName]['tmp_name']);
		@unlink($_FILES[$fileElementName]);		
		$filename = basename($_FILES[$fileElementName]['name']);
		//$tmp = explode(".", $filename);
		$tmp = pathinfo($filename, PATHINFO_EXTENSION);
		$newFilename .= '.'.$tmp;
		$uploadfile = $upload_dir . $newFilename;
		if(!file_exists($upload_dir))mkdir($upload_dir, 0777, true);
		if(file_exists($uploadfile)){chmod($uploadfile,0777);unlink($uploadfile);}
		
		move_uploaded_file($_FILES[$fileElementName]['tmp_name'], $uploadfile);
		
		if(!chmod($uploadfile, 0775)){
			
			$data["msg"]=2;
			$data["error"]="xx";
			$data["id"]="";
			//echo json_encode($data);exit;
		}
		else{
			$data["msg"]="OK";
			$data["error"]="";
			$data["id"]="";
			
		}
		echo json_encode($data);exit;
		
	}
	function simpan_data($p1,$post){
		$this->db->trans_begin();
		switch($p1){
			case "tbl_setting":
				//print_r($data);exit;
				foreach($post as $v=>$x){
					$data=array('param'=>$this->encrypt->encode($v),'value'=>$this->encrypt->encode($x));
					$this->db->insert($p1, $data);
				}
				
			break;
			case "tbl_produk":
				$sql="SELECT * FROM tbl_produk";
				$res=$this->db->query($sql)->result_array();
				if(count($res)>0){
					foreach($post as $v){
						if($v['status_log']=='E'){
							$id_cloud=$v['id_cloud'];
							unset($v['id_cloud']);
							$this->db->where('id_cloud',$id_cloud);
							$this->db->update($p1, $v); 
						}else if($v['status_log']=='A'){
							$this->db->insert($p1, $v); 
						}
					}
				}else{
					$this->db->insert_batch($p1, $post); 
				}
			break;
		}
		if($this->db->trans_status() == false){
			$this->db->trans_rollback();
			return 0;
		}else{
			return $this->db->trans_commit();
		}
	}

	
}