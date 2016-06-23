<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$route['default_controller'] = "home";
$route['404_override'] = '';

$route['logout'] = 'login/logout';

$route['kasir'] = "home/getdisplay/kasir/";
$route['kasir-lantai'] = "home/getdisplay/lantai_kasir";
$route['trx-penjualan'] = "home/simpansavedata/transaksi_penjualan";
$route['hapus-item'] = "home/simpansavedata/hapus_item_kasir";
$route['tutup-transaksi'] = "home/simpansavedata/tutup_transaksi";
$route['total-pesanan'] = "home/getdisplay/total_per_meja";
$route['selesai-transaksi'] = "home/getdisplay/selesai_transaksi_kasir";
$route['detail-meja'] = "home/getdisplay/meja_detail";

$route['cari-produk-autocomplete'] = "home/getdisplay/autocomplete/cari_produk";


$route['pembelian'] = "home/getdisplay/pembelian/";
$route['set-meja-aktif'] = "home/simpansavedata/tbl_meja";

$route['pengaturan'] = "home/getdisplay/pengaturan";

//General Function
$route['content-tab/(:any)/(:any)'] = "home/getdisplay/contenttab/$1/$2/";
$route['datagrid/(:any)'] = "home/getdatagrid/$1";

/* End of file routes.php */
/* Location: ./application/config/routes.php */