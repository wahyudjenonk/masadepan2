/*
Navicat MySQL Data Transfer

Source Server         : MysqlLocal
Source Server Version : 50528
Source Host           : localhost:3306
Source Database       : jkasir

Target Server Type    : MYSQL
Target Server Version : 50528
File Encoding         : 65001

Date: 2016-05-09 11:49:17
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `cl_user_group`
-- ----------------------------
DROP TABLE IF EXISTS `cl_user_group`;
CREATE TABLE `cl_user_group` (
  `id` smallint(6) NOT NULL AUTO_INCREMENT,
  `group_user` varchar(200) DEFAULT NULL,
  `status` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of cl_user_group
-- ----------------------------
INSERT INTO `cl_user_group` VALUES ('1', 'Administrator', '1');
INSERT INTO `cl_user_group` VALUES ('2', 'Kasir', '1');

-- ----------------------------
-- Table structure for `tbl_bahan`
-- ----------------------------
DROP TABLE IF EXISTS `tbl_bahan`;
CREATE TABLE `tbl_bahan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nama_bahan` varchar(200) DEFAULT NULL,
  `deskripsi` varchar(300) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `create_by` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of tbl_bahan
-- ----------------------------

-- ----------------------------
-- Table structure for `tbl_d_penjualan_outlet`
-- ----------------------------
DROP TABLE IF EXISTS `tbl_d_penjualan_outlet`;
CREATE TABLE `tbl_d_penjualan_outlet` (
  `no_faktur_penjualan` varchar(50) NOT NULL,
  `tbl_produk_kode` varchar(10) DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `diskon` float DEFAULT NULL,
  `total` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of tbl_d_penjualan_outlet
-- ----------------------------
INSERT INTO `tbl_d_penjualan_outlet` VALUES ('TJT-20120920-0001', 'PRD-001', '10', null, '1000');
INSERT INTO `tbl_d_penjualan_outlet` VALUES ('TJK-20120920-0001', 'PRD-002', '10', null, '8999');
INSERT INTO `tbl_d_penjualan_outlet` VALUES ('TJT-20120920-0002', 'PRD-001', '10', null, '67888');
INSERT INTO `tbl_d_penjualan_outlet` VALUES ('TJT-20120920-0002', 'PRD-001', '5', null, '67878');
INSERT INTO `tbl_d_penjualan_outlet` VALUES ('TJT-20130217-0001', 'PRD-002', '2', null, '5555');
INSERT INTO `tbl_d_penjualan_outlet` VALUES ('-1', 'PRD-002', '10', null, '656');

-- ----------------------------
-- Table structure for `tbl_d_trans_supplier`
-- ----------------------------
DROP TABLE IF EXISTS `tbl_d_trans_supplier`;
CREATE TABLE `tbl_d_trans_supplier` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `no_po` varchar(50) DEFAULT NULL,
  `id_tbl_bahan` int(11) DEFAULT NULL,
  `id_tbl_satuan` int(11) DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `harga_satuan` float DEFAULT NULL,
  `total_harga` float DEFAULT NULL,
  `flag_trans` char(1) DEFAULT NULL,
  `flag_stock` char(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=38 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of tbl_d_trans_supplier
-- ----------------------------
INSERT INTO `tbl_d_trans_supplier` VALUES ('36', 'TBT-20120920-0001', '21002', null, '100', null, null, 'Y', 'Y');
INSERT INTO `tbl_d_trans_supplier` VALUES ('37', 'TBK-20120920-0001', '11003', null, '500', null, null, 'Y', 'Y');

-- ----------------------------
-- Table structure for `tbl_meja`
-- ----------------------------
DROP TABLE IF EXISTS `tbl_meja`;
CREATE TABLE `tbl_meja` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `lantai_id` int(11) DEFAULT NULL,
  `nomor_meja` varchar(200) DEFAULT NULL,
  `status_meja` varchar(5) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of tbl_meja
-- ----------------------------
INSERT INTO `tbl_meja` VALUES ('1', '1', '1', 'N');
INSERT INTO `tbl_meja` VALUES ('2', '1', '2', 'R');
INSERT INTO `tbl_meja` VALUES ('3', '1', '3', 'N');
INSERT INTO `tbl_meja` VALUES ('4', '1', '4', 'N');
INSERT INTO `tbl_meja` VALUES ('5', '1', '5', 'Y');

-- ----------------------------
-- Table structure for `tbl_m_trans_supplier`
-- ----------------------------
DROP TABLE IF EXISTS `tbl_m_trans_supplier`;
CREATE TABLE `tbl_m_trans_supplier` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `no_po` varchar(20) DEFAULT '',
  `tgl_po` datetime DEFAULT NULL,
  `id_supplier` int(11) DEFAULT NULL,
  `pembayaran` varchar(1) DEFAULT NULL,
  `stat` varchar(2) DEFAULT NULL,
  `sub_total` float DEFAULT NULL,
  `diskon` float DEFAULT NULL,
  `ppn` float DEFAULT NULL,
  `total_ppn` float DEFAULT NULL,
  `ongkos_angkut` float DEFAULT NULL,
  `total` float DEFAULT NULL,
  `keterangan` text,
  `tgl_terima` datetime DEFAULT NULL,
  `terima_oleh` varchar(100) DEFAULT NULL,
  `create_by` varchar(100) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of tbl_m_trans_supplier
-- ----------------------------
INSERT INTO `tbl_m_trans_supplier` VALUES ('1', 'TBK-20120920-0001', '2012-09-20 00:00:00', '1', 'K', 'BL', null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `tbl_m_trans_supplier` VALUES ('2', 'TBT-20120920-0001', '2012-09-20 00:00:00', '1', 'T', 'L', null, null, null, null, null, null, null, null, null, null, null);

-- ----------------------------
-- Table structure for `tbl_penjualan_outlet`
-- ----------------------------
DROP TABLE IF EXISTS `tbl_penjualan_outlet`;
CREATE TABLE `tbl_penjualan_outlet` (
  `no_faktur_penjualan` varchar(20) NOT NULL DEFAULT '',
  `tbl_gerai_outlet_id` int(11) DEFAULT NULL,
  `cl_meja_id` int(11) DEFAULT NULL,
  `tgl_faktur` datetime DEFAULT NULL,
  `tbl_member_id` int(100) DEFAULT NULL,
  `pembayaran` varchar(50) DEFAULT NULL,
  `diskon` int(11) DEFAULT NULL,
  `stat` char(2) DEFAULT NULL,
  PRIMARY KEY (`no_faktur_penjualan`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of tbl_penjualan_outlet
-- ----------------------------
INSERT INTO `tbl_penjualan_outlet` VALUES ('TJK-20120920-0001', '1', '1', '2012-09-20 00:00:00', '0', 'Kredit', '0', 'BL');
INSERT INTO `tbl_penjualan_outlet` VALUES ('TJT-20120920-0001', '1', '1', '2012-09-20 00:00:00', '0', 'Tunai', '5', '');
INSERT INTO `tbl_penjualan_outlet` VALUES ('TJT-20120920-0002', '1', '1', '2012-09-20 00:00:00', '0', 'Tunai', '0', '');
INSERT INTO `tbl_penjualan_outlet` VALUES ('TJT-20130217-0001', '1', '1', '2013-02-17 00:00:00', '0', 'Tunai', '0', '');

-- ----------------------------
-- Table structure for `tbl_prev_group`
-- ----------------------------
DROP TABLE IF EXISTS `tbl_prev_group`;
CREATE TABLE `tbl_prev_group` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cl_user_group_id` smallint(6) DEFAULT NULL,
  `tbl_menu_id` int(11) DEFAULT NULL,
  `buat` smallint(6) DEFAULT NULL,
  `baca` smallint(6) DEFAULT NULL,
  `ubah` smallint(6) DEFAULT NULL,
  `hapus` smallint(6) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of tbl_prev_group
-- ----------------------------

-- ----------------------------
-- Table structure for `tbl_produk`
-- ----------------------------
DROP TABLE IF EXISTS `tbl_produk`;
CREATE TABLE `tbl_produk` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `kode_produk` varchar(10) NOT NULL DEFAULT '',
  `cl_kategori_id` int(11) DEFAULT NULL,
  `cl_supplier_id` int(11) DEFAULT NULL,
  `nama_produk` varchar(200) DEFAULT NULL,
  `deskripsi` text,
  `hpp` float DEFAULT NULL,
  `margin` float DEFAULT NULL,
  `harga_jual` float DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `create_by` varchar(20) DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `update_by` varchar(100) DEFAULT NULL,
  `gambar` varchar(100) DEFAULT NULL,
  `status` varchar(1) DEFAULT NULL,
  `status_log` varchar(1) DEFAULT NULL,
  `id_cloud` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of tbl_produk
-- ----------------------------
INSERT INTO `tbl_produk` VALUES ('4', 'PRD-001', null, null, 'Pizza Delicious', null, '40000', '50', '60000', null, null, null, null, '20160402094336_PizzaDelicious.jpg', '1', 'E', '1');
INSERT INTO `tbl_produk` VALUES ('5', 'PRD-002', null, null, 'Donat', null, '50000', '10', '55000', null, null, null, null, null, '1', 'A', '2');
INSERT INTO `tbl_produk` VALUES ('6', 'XXXX', null, null, 'TESS', null, '10000', '20', '12000', null, null, null, null, null, '1', 'A', '3');
INSERT INTO `tbl_produk` VALUES ('7', 'RRRE', null, null, 'Tosss', null, '100000', '10', '110000', null, null, null, null, null, '1', 'A', '4');

-- ----------------------------
-- Table structure for `tbl_satuan`
-- ----------------------------
DROP TABLE IF EXISTS `tbl_satuan`;
CREATE TABLE `tbl_satuan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `satuan` varchar(10) DEFAULT NULL,
  `deskripsi` varchar(200) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `create_by` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of tbl_satuan
-- ----------------------------

-- ----------------------------
-- Table structure for `tbl_setting`
-- ----------------------------
DROP TABLE IF EXISTS `tbl_setting`;
CREATE TABLE `tbl_setting` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `param` varchar(255) DEFAULT NULL,
  `value` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of tbl_setting
-- ----------------------------
INSERT INTO `tbl_setting` VALUES ('1', 'ss', 'xx');
INSERT INTO `tbl_setting` VALUES ('2', 'lccRIY9K3RymZyNMDoTxzZAGzlT9KFKHRWHw+SgCs+6Ei9EUSzBOtjt6QmdUCAqnwBJDbnwtodW56X5xej5uLA==', 'vLaEQrvMs7GWPR0Vgm/PikjFUMS5fDhsxQj6Eiy9oftk0rWXMwMUMXqo/UL6uhFAft+3PfzROyDxfEiHfhN0kA==');
INSERT INTO `tbl_setting` VALUES ('3', 'xAXVwsevaaZldfc+1rmNp9/jsZVULv6wJQ/kixDXb2hI61a9NyIcd8kWQIFdUXpj0kq05pVO/5XrVExGkNsdoQ==', 'rLQHo7Lx/vsVC7HHCWQqI1di88bRQaRUZXauZNRTHDUHpve0azEJi8mBaxzFBuFKjfFYYDOX4vI7oL3y0xi+fA==');
INSERT INTO `tbl_setting` VALUES ('4', 'dMIY5H6UdbClAUqwHW+oAK9BFVcstClZhTxYnXgtqmGzcH6MMzww7dJgyssJDTgaTX4Y+S9Up4shBdrsjNnPwQ==', 'GzEKhSmXysQUWMT5EdkFPuaAFkhph5C+hWPhNvtoF+4uXeY+4PnAl68VBP4gMTJz0DqdvXJ1s9N9AKLMFRnxVg==');
INSERT INTO `tbl_setting` VALUES ('5', 'owDchrb5ADpkDx6i5aRE2v4e+JiEudWDZepLLV8CZtqnnddfqYqT++Br6M7u7C+jHtkRPV6La9N+redAYH8SsA==', 'Ci6O5iG8FQ6UJleqmc9i1/YdukmATPuoJNGVh6P9kycHfTNuySzEZnM9IRmeXjeCOu8OEoOUeOqLe/OtdGDC5A==');
INSERT INTO `tbl_setting` VALUES ('6', 'U70fp23fC0OknXITLFlfM818XFpbPwAsxBe/QMZYodQ+vUTqq1sMJflnZbXD5D3XCLLCBEaMsIhSAPnVSv+1BQ==', 'eqySyJli4deUdGzcoEQ98IU73soXkuYRQ77IWcoSj+F0J2XCKNGkjgws8aq8PdcPN5zO5uGPYoBD2TKWwoZ/3g==');
INSERT INTO `tbl_setting` VALUES ('7', 'gvvjSaVFl8xjqkUE9I/6DR1aQJuzRaxVo8Wy0a4tXU4ZwzQFMLmzEj3dM8X2u36PJKeGVHSKMC8OTKW1jhE79g==', 'aqoVKZGILCETQP+NJzmYipXYgcwuV1H64yt8qnKoChpP1R6UjP/LqHQWTX5CAkqQIUObJ+MN1kGr2GVLyR21ng==');
INSERT INTO `tbl_setting` VALUES ('8', 'Mbgmal0qotajN5l2PEQWZ+y3o12Lytj/AvIl4hWDmEh3BKjhxnEsNUByM+JSORlhOZDS8qSKL/VRWbprbVI5MQ==', '2ScYCggs+OoSjxK/L690oyT1pU7GnT1kAhmve5m+BdR6Vk4Y3SfllGdxeafxJmv8CdIuqRylqHqy/7C7znxZ4w==');
INSERT INTO `tbl_setting` VALUES ('9', 'YfbqC5SQLWBiRWxoAnqxQDyVh57iz4Mp4qAZdP1ZVMGFOuC+uDdfe1/nDKjqt46ei4epkPOCiqyraRByyYsZcg==', 'ySScbf9TRDOSW6ZxtqXPPTSTSU/eYqlNoodjzUFUgg2MoHQkaM3DaXAOHzyg0qCYJk4zxQvMHAtn9BWXP5qCUA==');
INSERT INTO `tbl_setting` VALUES ('10', 'ELMtLUx1Ommi08DZSy/Nmgvy6mC5Va/SQc2NhmWuj7rNPbI9A/rMRlCA3nOsffuh3fMKoxbh+7N0DyWK2yW2Lw==', 'OaKgTnf4D/2SqrmivhqrV8OxbNB1qJW3wXSWnmhpfceYCfQpTNGZui1aSn+aMnuT0ZWilGqBkEsNpELFrU1dwg==');
INSERT INTO `tbl_setting` VALUES ('11', 'QPHxzoPbxfJh4JPKEWVpc1vPzaERW1r8IXuAF0yESzR0sHM/2/QlB/A4AFXATm2WEDFIJvSsE9iLq1xLhgAB1g==', 'J6Ajr28dW0cRd0xTRhAG8NNPD9KNbQChYOFK7w/++ABKRNRQ6FjRdG+MUnMt3p2RPPkDCjIojrtBDko354nKlg==');
INSERT INTO `tbl_setting` VALUES ('12', '76418DvA0PuhbuY8WhqEzCosMWPo4IamgajzKLPZhi1CzvJV5CYOswXict4TvnyO4R2KHPzSmWHzN7S3c+06xQ==', 'lx0mkebDJhAQxGCFTYbiCWNsM1Qks+sKgc9+wTgT9LolfHDOt9s/1/2IuvG1xlBbl/gU4hhpK5UVXbq4lyzLJg==');
INSERT INTO `tbl_setting` VALUES ('13', 'H+z4knIlXIVfe7otIFAfpnoKFKQ/5THPYFXnupuvQqdns0x1xMl1wDwrd81KT+BG8MzdiL2WwLjboABDPFQYYg==', 'hxqq8t3oclqQkvQ21Hs+o3IJ1lU7eFb0IDwwEt6pcPNttx2xdLsaSVWoDhLZVQRR5YBhGWm42JelNDE1PnfrcA==');
INSERT INTO `tbl_setting` VALUES ('14', 'zqk8sykLaI+gCA2faQU7/0poeGYXa1x5wIRbywIEfaDeCPS9EmqCuCxJCrOKwpjwmggFC/NP208jJes6bOos1Q==', '9piu1FWOPiOQ3wdo3PAYvAEm+dbTvkJdPypl5Aa/a60smjq04O0fxSEbfjweQ0hmkMt5rgMrHarl+ThIwdPbOQ==');

-- ----------------------------
-- Table structure for `tbl_stock_bahan`
-- ----------------------------
DROP TABLE IF EXISTS `tbl_stock_bahan`;
CREATE TABLE `tbl_stock_bahan` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_tbl_bahan` int(20) DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `create_date` datetime DEFAULT NULL,
  `create_by` varchar(100) DEFAULT NULL,
  `update_date` datetime DEFAULT NULL,
  `update_by` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of tbl_stock_bahan
-- ----------------------------
INSERT INTO `tbl_stock_bahan` VALUES ('6', '21003', '25', '2012-07-15 00:00:00', 'Administrator', null, null);
INSERT INTO `tbl_stock_bahan` VALUES ('7', '21001', '1652', '2012-07-15 00:00:00', 'Administrator', null, null);
INSERT INTO `tbl_stock_bahan` VALUES ('8', '11002', '292', '2012-07-15 00:00:00', 'Administrator', null, null);
INSERT INTO `tbl_stock_bahan` VALUES ('9', '11003', '905', '2012-07-15 00:00:00', 'Administrator', null, null);
INSERT INTO `tbl_stock_bahan` VALUES ('10', '21002', '121', '2012-07-15 00:00:00', 'Administrator', null, null);
INSERT INTO `tbl_stock_bahan` VALUES ('11', '21004', '45', '2012-07-16 00:00:00', 'Administrator', null, null);
INSERT INTO `tbl_stock_bahan` VALUES ('12', '11004', '158', '2012-07-16 00:00:00', 'Administrator', null, null);

-- ----------------------------
-- Table structure for `tbl_supplier`
-- ----------------------------
DROP TABLE IF EXISTS `tbl_supplier`;
CREATE TABLE `tbl_supplier` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nama_supplier` varchar(200) DEFAULT NULL,
  `alamat` text,
  `telp` varchar(15) DEFAULT NULL,
  `fax` varchar(15) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `kontak` varchar(100) DEFAULT NULL,
  `keterangan` text,
  `create_date` datetime DEFAULT NULL,
  `create_by` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of tbl_supplier
-- ----------------------------

-- ----------------------------
-- Table structure for `tbl_trans_retur`
-- ----------------------------
DROP TABLE IF EXISTS `tbl_trans_retur`;
CREATE TABLE `tbl_trans_retur` (
  `id_trans_retur` int(11) NOT NULL AUTO_INCREMENT,
  `tgl_trans` date DEFAULT NULL,
  `id_produk` varchar(10) DEFAULT NULL,
  `qty` int(11) DEFAULT NULL,
  `flag_trans` char(1) DEFAULT NULL,
  `flag_stock` char(1) DEFAULT NULL,
  `flag_retur` char(1) DEFAULT NULL,
  PRIMARY KEY (`id_trans_retur`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of tbl_trans_retur
-- ----------------------------
INSERT INTO `tbl_trans_retur` VALUES ('45', '2012-09-20', '11003', '5', 'Y', 'N', 'J');
INSERT INTO `tbl_trans_retur` VALUES ('46', '2012-09-20', '11003', '100', 'Y', 'N', 'B');

-- ----------------------------
-- Table structure for `tbl_user`
-- ----------------------------
DROP TABLE IF EXISTS `tbl_user`;
CREATE TABLE `tbl_user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nama_user` varchar(100) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  `cl_user_group_id` smallint(6) DEFAULT NULL,
  `nama_lengkap` varchar(200) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `jenis_kelamin` varchar(1) DEFAULT NULL,
  `tlp` varchar(15) DEFAULT NULL,
  `status` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of tbl_user
-- ----------------------------
INSERT INTO `tbl_user` VALUES ('1', 'admin', 'w8nRgzJ8q9W6/04js1nnJwKOHTideqmajzAcg7qmotOyPsh99akca9HqPPuK9U0A8po69U8txljPE/dGpyPTNg==', '1', 'Goyz Crotz', 'goyz87@gmail.com', 'L', '0251-388716', '1');
INSERT INTO `tbl_user` VALUES ('2', 'kasir_1', 'w8nRgzJ8q9W6/04js1nnJwKOHTideqmajzAcg7qmotOyPsh99akca9HqPPuK9U0A8po69U8txljPE/dGpyPTNg==', '2', 'Lukman Santoso', null, 'L', null, '1');
INSERT INTO `tbl_user` VALUES ('4', 'kasir_2', 'R2s+MzlfaarWwB2lVu9qQX5V1jEjKvkfMuZHnmzayO2kB4Engg9px0X3OtpYlhMx1ADCOlkDcC3pvjo5OvIlMg==', '2', 'Heri Marbot', 'guest@gmail.com', 'L', '021-99889898', '1');
