<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

$route['default_controller'] = "home";
$route['404_override'] = '';

$route['kasir'] = "home/getdisplay/kasir/";
$route['pembelian'] = "home/getdisplay/pembelian/";
$route['kasir-lantai'] = "home/getdisplay/lantai_kasir";
$route['detail-meja'] = "home/getdisplay/meja_detail";
$route['set-meja-aktif'] = "home/simpansavedata/tbl_meja";

$route['pengaturan'] = "home/getdisplay/pengaturan";

//General Function
$route['content-tab/(:any)/(:any)'] = "home/getdisplay/contenttab/$1/$2/";
$route['datagrid/(:any)'] = "home/datagrid";

/* End of file routes.php */
/* Location: ./application/config/routes.php */