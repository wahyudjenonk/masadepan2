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
		$this->smarty->assign("acak", md5(date('YmdHis').'jresto') );	
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
				$data_total = $this->mhome->getdata('total_pesanan', 'row_array');		
				$this->smarty->assign('id_meja', $id_meja);
				$this->smarty->assign('status_meja', $status_meja);
				$this->smarty->assign('nomor_meja', $nomor_meja);
				$this->smarty->assign('tot_qty', $data_total['tot_qty']);
				$this->smarty->assign('option_kategori_produk', $this->lib->fillcombo('cl_kategori', 'return') );
				$this->smarty->assign('tot_harga', number_format($data_total['tot_harga'],0,",",".") );
				$this->smarty->display('mod/kasir/meja_detail.html');				
			break;
			case "total_per_meja":
				$data_total = $this->mhome->getdata('total_pesanan', 'row_array');
				$balikan = array(
					'tot_qty' => $data_total['tot_qty'],
					'tot_harga' => $data_total['tot_harga'],
				);
				echo json_encode($balikan);
			break;
			case "selesai_transaksi_kasir":
				$id_meja = $this->input->post('id_meja');
				$nomor_meja = $this->input->post('nomor_meja');
				$data_pesanan = $this->mhome->getdata('list_pesanan_kasir', 'result_array');
				$kode_trx = $this->lib->randomString(8, 'hurufangka');
				$tot_qty = 0;
				$tot_hrg = 0;
				foreach($data_pesanan as $k => $v){
					$tot_qty += $v['qty'];
					$tot_hrg += $v['total_harga'];
					$data_pesanan[$k]['total_harga'] = number_format($v['total_harga'],0,",",".");
					$data_pesanan[$k]['harga_satuan'] = number_format($v['harga_satuan'],0,",",".");
				}
				$pajak = (0.10 * $tot_hrg);
				$tot_byr = ($tot_hrg + $pajak);
				
				$this->smarty->assign('kode_trx', strtoupper("TRX-".$kode_trx) );
				$this->smarty->assign('id_meja', $id_meja);
				$this->smarty->assign('nomor_meja', $nomor_meja);
				$this->smarty->assign('tot_qty', $tot_qty);
				$this->smarty->assign('tot_hrg', number_format($tot_hrg,0,",","."));
				$this->smarty->assign('pajak', number_format($pajak,0,",","."));
				$this->smarty->assign('pajak_bnr', $pajak);
				$this->smarty->assign('tot_byr', number_format($tot_byr,0,",","."));
				$this->smarty->assign('tot_byr_bnr', $tot_byr);
				$this->smarty->assign('data_pesanan', $data_pesanan);
				$this->smarty->assign('combo_jenis_pembayaran', $this->lib->fillcombo('jenis_pembayaran', 'return') );
				$this->smarty->display('mod/kasir/selesai_transaksi.html');
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
			
			case "autocomplete":
				$keyword = trim(strip_tags($_GET['term']));
				$data = $this->mhome->getdata($p1, 'result_array', $keyword);
				echo json_encode($data);
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