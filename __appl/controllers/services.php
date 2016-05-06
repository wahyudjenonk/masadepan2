<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class services extends CI_Controller {

    function __construct(){
        parent::__construct();
		header('Access-Control-Allow-Origin: *'); 
		$this->load->model('mservices');		
		$this->load->library(array('encrypt','lib'));
	}

	public function index(){
		$this->load->view('welcome_message');
	}
	
	function servicenya($p1=""){
		$method="get";
		$balikan="array";
		switch($p1){
			case "get_kode":
				$kode=$this->input->post('kode_perangkat');
				//echo $kode;
				$data=array('kode'=>$kode);
				$url_fungsi="get_service/get_kode";
			break;
			case "get_produk":
				$data=$this->mservices->getdata('outlet');
				$url_fungsi="get_service/get_produk";
			break;
			case "upload_penjualan":
				$data=$this->mservices->getdata('penjualan');
				$method="post";
				$url_fungsi="get_service/upload_penjualan";
				//print_r($data);exit;
			break;
		}
		$hasil=$this->curl_jresto($url_fungsi,$data,$balikan,$method);
		//echo "<pre>";print_r($hasil);echo "</pre>";
		echo $this->aksi_hasil($p1,$hasil);
	}
	
	function aksi_hasil($p1,$hasil){
		switch($p1){
			case "get_kode":
				$this->smarty->assign("host",base_url());
				if(isset($hasil['status'])){
					$this->smarty->assign('salah', 'Kode Perangkat Yang Anda Masukan Salah..');
					return $this->smarty->display('reg.html');
				}
				else{
					$ins_data=$this->mservices->simpan_data('tbl_setting',$hasil);
					if($ins_data==1){
						$data=$this->mservices->getdata('outlet');
						$this->smarty->assign('data',$data);
						$this->smarty->display('pesan.html');
					}else{echo "Gagal Ambil Data GErai";exit;}
				}
			break;
		}
	}
	
	function curl_jresto($url,$data,$balikan="array",$method="get"){
		$base_url_resto = 'http://localhost/jresto/services/'.$url;
		//print_r($data);
		if($method=="get"){
			$fields_string="";
			foreach($data as $key=>$value) { $fields_string .= $key.'='.$value.'&'; }
			rtrim($fields_string, '&');
		}else{$fields_string=$data;}
		
		$ch = curl_init();
		curl_setopt($ch,CURLOPT_URL, $base_url_resto);
		//curl_setopt($ch,CURLOPT_POST, count($data));
		curl_setopt($ch,CURLOPT_POSTFIELDS, $fields_string);
		if($method=="post"){
			curl_setopt( $ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
		}
		curl_setopt ($ch, CURLOPT_RETURNTRANSFER, true);
		//print_r($fields_string);
		$result = curl_exec($ch);
		if ($result === false) {
			echo "<pre>";print_r(curl_getinfo($ch),true);"</pre>";
			trigger_error(curl_error($ch));
		}
		curl_close($ch);
		if($balikan=="array"){
			$result=json_decode($result, true);
		}
		return $result;
		//print_r($arr);
	}
}