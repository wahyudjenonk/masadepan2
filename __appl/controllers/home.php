<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class home extends MY_Controller {
	
	function __construct(){
		parent::__construct();
		
	}
	
	function index(){
		if($this->auth){
			$this->smarty->assign('mods', 'srk/main');
			$this->smarty->display('main-index.html');
		}else{
			$this->load->library(array('encrypt','lib'));
			$act=$this->lib->cek_aktifasi();
		}
	}
	
	function getdisplay($type="", $p1="", $p2=""){
		switch($type){
			case "kasir":
				$jml_lt = $this->mhome->getdata('get_setting', 'row_array', 'jml_lt');
				$jm = "";
				if(!isset($jml_lt['value']))$jml_lt['value']=1;
				for($i=1; $i <= $jml_lt['value']; $i++){
					$jm .= "'LANTAI ".$i."', ";
				}				
				$this->smarty->assign('jml_lt', $jm);
				$this->smarty->display('mod/kasir/kasir_main.html');
			break;
			case "lantai_kasir":
				$posisi_lantai = $this->input->post('posisi_lantai');
				$get_data_meja = $this->mhome->getdata('get_meja_perlantai', 'result_array', $posisi_lantai);
				
				$this->smarty->assign('meja', $get_data_meja);
				$this->smarty->display('mod/kasir/kasir_lantai.html');
			break;
			case "meja_detail":
				$id_meja = $this->input->post('id_meja');
				$status_meja = $this->input->post('status_meja');
				$nomor_meja = $this->input->post('nomor_meja');
				
				$this->smarty->assign('id_meja', $id_meja);
				$this->smarty->assign('status_meja', $status_meja);
				$this->smarty->assign('nomor_meja', $nomor_meja);
				$this->smarty->display('mod/kasir/meja_detail.html');				
			break;
			case "pengaturan":
				$this->smarty->display('mod/pengaturan/main.html');				
			break;
			case "pembelian":
				$this->smarty->display('mod/pembelian/main.html');				
			break;
			case "contenttab":
				$this->smarty->assign('modul', $p1);
				$this->smarty->assign('submodul', $p2);
				$this->smarty->display('mod/'.$p1.'/'.$p2.'.html');
			break;
		}
	}
	
	function getdatagrid($type){
		//echo $type;exit;
		echo $this->mhome->getdata($type, 'json');
	}
	
	function simpansavedata($type=""){
		$post = array();
        foreach($_POST as $k=>$v) $post[$k] = $this->db->escape_str($this->input->post($k));
		$editstatus = $post['editstatus'];
		unset($post['editstatus']);
		echo $this->mhome->simpansavedata($type, $post, $editstatus);
	}

	
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */