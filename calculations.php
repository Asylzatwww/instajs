<?PHP

if( !defined( 'CMSCORE' ) OR !defined( 'LOGGED_IN' ) ) {
	die( "Hacking attempt!" );
}

if( $action == "remove" ) {
	$id = $db->safesql($_GET['id']);
	if( ! $id ) {
		msg( "error", $lang['cat_error'], $lang['cat_noid'], $_SERVER['PHP_SELF'] . "?mod=calculations" );
	} else {

		$db->query( "DELETE FROM " . PREFIX . "_calculations WHERE product_id='$id'" );
		header( "Location: " . $_SESSION['admin_calculations_referrer'] );
	}
}

function getCalculationTotal($calculation = array()) {
	global $site_options, $references_cloth_info, $references_fittings_info, $references_work_info, $references_other_info;
	
	$calculation_total = array(
		'cloth' => 0,
		'fittings' => 0,
		'work' => 0,
		'other' => 0,
		'total' => 0,
		'total_kgs' => 0,
	);
	
	if(!empty($calculation)) {

		foreach($calculation['cloth'] as $calculation_reference_id => $calculation_value) {
			if(isset($references_cloth_info[$calculation_reference_id])) {
				$calculation_reference_cost = (float)$references_cloth_info[$calculation_reference_id]['price'];
				if($calculation_reference_cost > 0) {
					$calculation_reference_item_cost = $calculation_reference_cost/$references_cloth_info[$calculation_reference_id]['qty'];
					$calculation_reference_total_cost = $calculation_value * $calculation_reference_item_cost;
					$calculation_total['cloth'] += $calculation_reference_total_cost;
				}
			}		
		}

		foreach($calculation['fittings'] as $calculation_reference_id => $calculation_value) {
			if(isset($references_fittings_info[$calculation_reference_id])) {
				$calculation_reference_cost = (float)$references_fittings_info[$calculation_reference_id]['price'];
				if($calculation_reference_cost > 0) {
					$calculation_reference_item_cost = $calculation_reference_cost/$references_fittings_info[$calculation_reference_id]['qty'];
					$calculation_reference_total_cost = $calculation_value * $calculation_reference_item_cost;
					$calculation_total['fittings'] += $calculation_reference_total_cost;
				}
			}		
		}
		foreach($calculation['work'] as $calculation_reference_id => $calculation_value) {
			if(isset($references_work_info[$calculation_reference_id])) {
				$calculation_value = (float)$calculation_value;
				$calculation_total['work'] += $calculation_value;
			}		
		}
		foreach($calculation['other'] as $calculation_reference_id => $calculation_value) {
			if(isset($references_other_info[$calculation_reference_id])) {
				$calculation_value = (float)$calculation_value;
				$calculation_total['other'] += $calculation_value;
			}		
		}
		
	}
	
	$calculation_total['work'] = $calculation_total['work'] / $site_options['expenses_currency_rate'];
	$calculation_total['other'] = $calculation_total['other'] / $site_options['expenses_currency_rate'];
	
	$calculation_total['total'] = $calculation_total['cloth'] + $calculation_total['fittings'] + $calculation_total['work'] + $calculation_total['other'];
	return $calculation_total;
	
}

function getCalculationVars($id) {
	global $db;
	
	
	$productCalculations = array();
	$productCalculations['colors'] = array();
	$productCalculationsSql = $db->query("SELECT c.* FROM ".PREFIX."_calculations c WHERE product_id='{$id}'");
	while ( $row_var = $db->get_row($productCalculationsSql) ) {
		$var_color_id = $row_var['color_id'];
		$var_calculation = unserialize($row_var['calculation']);
		$var_calculation_total = getCalculationTotal($var_calculation);

		if(!isset($productCalculations['colors'][$var_color_id])) $productCalculations['colors'][$var_color_id] = $var_calculation_total;
	
	}
	//$db->free();
	return $productCalculations;
	
}

/****************************          Get calculations data          **********************************/

/*
 *


SELECT

#models.article,
#krista_product.*
model_sizes.id

FROM krista_product

LEFT JOIN models ON models.article = SUBSTRING(krista_product.art, 1, LOCATE( " (", krista_product.art, 3 ) - 1 )

LEFT JOIN krista_stock_products ON krista_stock_products.product_id = krista_product.id

LEFT JOIN krista_size ON krista_size.id = krista_stock_products.size_id

LEFT JOIN krista_colors ON krista_colors.id = krista_stock_products.color_id

LEFT JOIN model_colors ON model_colors.model_id = models.id AND model_colors.color_id = krista_colors.id

LEFT JOIN model_sizes ON model_sizes.color_id = model_colors.id AND model_sizes.size_id = krista_size.id

WHERE krista_product.id = 749


 *
 * */

function insertSpendings($db, $id, $qty, $category_id){

    $spendingsSizeId = $db->query("
INSERT INTO model_spendings (model_size_id, spending_id, quantity, category_id)

    
    SELECT

#models.article,
#krista_product.*
model_sizes.id,

(SELECT id FROM glossary_model_spendings WHERE krista_ref_id = " . $id . ") as spending_id,

" . $qty . " as quantity,

" . $category_id . " as category_id

FROM krista_product

LEFT JOIN models ON models.article = SUBSTRING(krista_product.art, 1, LOCATE( \" (\", krista_product.art, 3 ) - 1 )

LEFT JOIN krista_stock_products ON krista_stock_products.product_id = krista_product.id

LEFT JOIN krista_size ON krista_size.id = krista_stock_products.size_id

LEFT JOIN krista_colors ON krista_colors.id = krista_stock_products.color_id

LEFT JOIN model_colors ON model_colors.model_id = models.id AND model_colors.color_id = krista_colors.id

LEFT JOIN model_sizes ON model_sizes.color_id = model_colors.id AND model_sizes.size_id = krista_size.id

WHERE krista_product.id = 749
    
    ");


    var_dump("
    INSERT INTO model_spendings (model_size_id, spending_id, quantity, category_id)

    
    SELECT

#models.article,
#krista_product.*
model_sizes.id,

(SELECT id FROM glossary_model_spendings WHERE krista_ref_id = " . $id . ") as spending_id,

" . $qty . " as quantity,

" . $category_id . " as category_id

FROM krista_product

LEFT JOIN models ON models.article = SUBSTRING(krista_product.art, 1, LOCATE( \" (\", krista_product.art, 3 ) - 1 )

LEFT JOIN krista_stock_products ON krista_stock_products.product_id = krista_product.id

LEFT JOIN krista_size ON krista_size.id = krista_stock_products.size_id

LEFT JOIN krista_colors ON krista_colors.id = krista_stock_products.color_id

LEFT JOIN model_colors ON model_colors.model_id = models.id AND model_colors.color_id = krista_colors.id

LEFT JOIN model_sizes ON model_sizes.color_id = model_colors.id AND model_sizes.size_id = krista_size.id

WHERE krista_product.id = 749
    ");

    $db->get_row($spendingsSizeId);

}


echo "<pre>";
echo "102-07 (42-48)<br>";
$productCalculationsSql = $db->query("SELECT c.* FROM ".PREFIX."_calculations c WHERE product_id=749");
while ( $row_var = $db->get_row($productCalculationsSql) ) {
    $var_color_id = $row_var['color_id'];

    echo var_dump(  unserialize($row_var['calculation']) );

    foreach (unserialize($row_var['calculation']) as $key => $row){
        echo "<br><br>" . $key . "<br>";
        foreach( $row as $ind => $data){
            //echo $ind;
            //var_dump($data);

            switch ($key){
                case 'cloth' :

                    $spendingSql = $db->query("SELECT * FROM krista_references_cloth WHERE id=" . $ind);

                    while ( $spendingSqlData = $db->get_row($spendingSql) ) {
                        echo $spendingSqlData['name']. " - " . $data . "<br>";

                        insertSpendings($db, $ind, $data, 1);
                    }

                    break;
                case 'fittings' :

                    $spendingSql = $db->query("SELECT * FROM krista_references_fittings WHERE id=" . $ind);

                    while ( $spendingSqlData = $db->get_row($spendingSql) ) {
                        echo $spendingSqlData['name']. " - " . $data . "<br>";

                        insertSpendings($db, $ind, $data, 2);
                    }

                    break;
                case 'work' :

                    $spendingSql = $db->query("SELECT * FROM krista_references_work WHERE id=" . $ind);

                    while ( $spendingSqlData = $db->get_row($spendingSql) ) {
                        echo $spendingSqlData['name']. " - " . $data . "<br>";

                        //insertSpendings($db, $ind, $data);
                    }

                    break;

                case 'other' :

                    $spendingSql = $db->query("SELECT * FROM krista_references_other WHERE id=" . $ind);

                    while ( $spendingSqlData = $db->get_row($spendingSql) ) {
                        echo $spendingSqlData['name']. " - " . $data . "<br>";

                        //insertSpendings($db, $ind, $data);
                    }

                    break;
                //case 'other' : echo 'cloth1';break;
            }


        }
    }

}



echo "</pre>";

return;
/****************************          Get calculations data          **********************************/

	if( isset( $_REQUEST['search_cat'] ) ) $search_cat = intval( $_REQUEST['search_cat'] ); else $search_cat = "";
	if( isset( $_REQUEST['search_collection'] ) ) $search_collection = intval( $_REQUEST['search_collection'] ); else $search_collection = "";
	if( isset( $_REQUEST['search_brand'] ) ) $search_brand = intval( $_REQUEST['search_brand'] ); else $search_brand = "";


	
	$_SESSION['admin_calculations_referrer'] = $_SERVER['REQUEST_URI'];


	echoheader( "editproducts", $lang['edit_head'] );
	
	$search_field = $db->safesql( trim( htmlspecialchars( stripslashes( urldecode( $_REQUEST['search_field'] ) ), ENT_QUOTES, $config['charset'] ) ) );
	$search_art = $db->safesql( trim( $_REQUEST['search_art'] ) );
	
	$start_from = intval( $_REQUEST['start_from'] );
	$products_per_page = intval( $_REQUEST['products_per_page'] );
	$gopage = intval( $_REQUEST['gopage'] );
	
	
	if( ! $products_per_page or $products_per_page < 1 ) {
		$products_per_page = 50;
	}
	if( $gopage ) $start_from = ($gopage - 1) * $products_per_page;
	
	if( $start_from < 0 ) $start_from = 0;
	
	$where = array ();
	
	if( $search_field != "" ) {
		
		$where[] = " pp.title like '%$search_field%' ";
	
	}
	
	if( $search_art != "" ) {
		
		$where[] = "pp.art like '%$search_art%'";
	
	} else {
		$search_art = "";
	}
	
	
	if( $search_cat != "" ) {
	
		if ($search_cat == -1) {
		
			$where[] = "pp.category = '' OR category = '0'";
		
		} else {
		
			if ($config['show_sub_cats']) $get_search_cats = get_sub_cats ( $search_cat );
			else $get_search_cats = $search_cat;

			if ($config['allow_multi_category']) {

				$where[] = "pp.category regexp '[[:<:]](" . $get_search_cats . ")[[:>:]]'";

			} else {

				if ($config['show_sub_cats']) {
					
					$get_search_cats = str_replace ( "|", "','", $get_search_cats );
					$where[] = "pp.category IN ('" . $get_search_cats . "')";

				} else {
					
					$where[] = "pp.category = '{$get_search_cats}'";

				}

			}	
		
		}
	}
	
	if( $search_brand != "" ) {
	
		if ($search_brand == -1) {
		
			$where[] = "brand = '' OR brand = '0'";
		
		} else {
		
			$where[] = "brand = '{$search_brand}'";
		
		}
	}
	
	if( $search_collection != "" ) {
	
		if ($search_collection == -1) {
		
			$where[] = "collection = '' OR collection = '0'";
		
		} else {
		
			$where[] = "collection regexp '[[:<:]](" . $search_collection . ")[[:>:]]'";
		
		}
	}

	if( count( $where ) ) {
		
		$where = implode( " AND ", $where );
		$where = " WHERE " . $where;
	
	} else {
		$where = "";
	}


	$order_by = array ();
	$order_by = "pp.id DESC";	

	$catalog_sql = "SELECT DISTINCT p.*, pp.title, pp.art, pp.category, pp.sizes, (SELECT image
         FROM " . PREFIX . "_product_images 
         WHERE product_id = p.product_id AND image!='' ORDER BY (main=1) DESC, position ASC LIMIT 1
         ) as product_image FROM " . PREFIX . "_calculations p LEFT JOIN " . PREFIX . "_product pp ON p.product_id=pp.id " . $where . " GROUP BY p.product_id ORDER BY 
         ".$order_by." LIMIT $start_from,$products_per_page";
	$catalog_count_sql = "SELECT COUNT(*) as count FROM (SELECT p.* FROM " . PREFIX . "_calculations p LEFT JOIN " . PREFIX . "_product pp ON p.product_id=pp.id " .
        $where . " GROUP BY p.product_id) c ";
		 
	$catalogQuery = $db->query( $catalog_sql );
		 
	// Prelist Entries

	if( $start_from == "0" ) {
		$start_from = "";
	}
	$i = $start_from;
	$entries_showed = 0;
	
	$entries = "";
	

	
	while ( $row = $db->get_row($catalogQuery) ) {
		
		$i ++;
		
		$title = htmlspecialchars( stripslashes( $row['title'] ), ENT_QUOTES, $config['charset'] );
		$title = str_replace("&amp;","&", $title );
		
		$entries .= "<tr id=\"product_".$row['uid']."\">";
		
		if($row['product_image'] != "") {
			$product_image = "<img style=\"width:100%\" src=\"".$config['http_img_alt_url']."uploads/product_images/thumbs/".$row['product_image']."?".time()."\" /><div class=\"zoom-image\"><img style=\"width:100%\" src=\"".$config['http_img_alt_url']."uploads/product_images/thumbs/".$row['product_image']."\" />";
		} else {
			$product_image = "<img style=\"width:100%\" src=\"".$config['http_home_url']."images/no_photo_new.png\" />";
		}

		if( ! $row['category'] ) $my_cat = "---";
		else {
			$my_cat = array ();
			$cat_list = explode( ',', $row['category'] );
			foreach ( $cat_list as $element ) {
				if( $element ) $my_cat[] = $cat[$element];
			}
			$my_cat = implode( ',<br />', $my_cat );
		}
		
		if( ! $row['sizes'] ) $my_sizes = "---";
		else {
			$my_sizes = array ();
			$sizes_list = explode( ',', $row['sizes'] );
			foreach ( $sizes_list as $element ) {
				if( $element ) $my_sizes[] = $size[$element];
			}
			$my_sizes = implode( '-', $my_sizes );
		}
		
		
		$productVars = getCalculationVars($row['product_id']);
		
		//print_r($productVars);
		if(!empty($productVars)) {
				$vars_table = '<table class="table table-mod table-bordered table-striped" style="background:#fff;margin:0;">';
				$vars_table .= '<thead>';
				$vars_table .= '<tr>';
				$vars_table .= '<th style="text-align:center;padding:2px;">Цвет</th>';
				$vars_table .= '<th style="text-align:center;padding:2px;">Ткань</th>';
				$vars_table .= '<th style="text-align:center;padding:2px;">Фурнитура</th>';
				$vars_table .= '<th style="text-align:center;padding:2px;">Работа</th>';
				$vars_table .= '<th style="text-align:center;padding:2px;">Прочее</th>';
				$vars_table .= '<th style="text-align:center;padding:2px;"><strong>ИТОГО</strong></th>';
				$vars_table .= '</tr>';
				$vars_table .= '</thead>';
				$vars_table .= '<tbody>';
				foreach($productVars['colors'] as $productVarColorId => $productVarCalculation) {
					
					$vars_table .= '<tr>';
					$vars_table .= '<td align="center" style="padding:2px;">'.(($productVarColorId>0) ? getColorBox($productVarColorId) : 'БАЗОВЫЙ').'</td>';
					$vars_table .= '<td align="center" style="padding:2px;">'.round($productVarCalculation['cloth'],2).'</td>';
					$vars_table .= '<td align="center" style="padding:2px;">'.round($productVarCalculation['fittings'],2).'</td>';
					$vars_table .= '<td align="center" style="padding:2px;">'.round($productVarCalculation['work'],2).'</td>';
					$vars_table .= '<td align="center" style="padding:2px;">'.round($productVarCalculation['other'],2).'</td>';
					$vars_table .= '<td align="center" style="padding:2px;"><strong>'.round($productVarCalculation['total'],2).' '.$config['currency'].'</strong></td>';
					$vars_table .= '</tr>';

                    //echo "UPDATE krista_ordered_products SET calculation_prize = ".str_replace(',', '.', round($productVarCalculation['total'],2) )."
                    //WHERE product_id = ".$row['product_id']." AND color_id = " . $productVarColorId . ";";

				}
				$vars_table .= '</tbody>';
				$vars_table .= '</table>';
		} else {
			$vars_table .= '---';
		}
		
		
		$entries .= "<td width=\"60\" style=\"padding:0;vertical-align:middle;\" class=\"product-image-zoom\" align=\"center\">{$product_image}</td>";
		$entries .= "<td width=\"50\" style=\"text-align: center;vertical-align:middle;\">{$row['art']}</td>";
		$entries .= "<td class=\"list\" style=\"text-align: left;vertical-align:middle;position:relative;\">{$title}</td>";
		$entries .= "<td style=\"text-align: center;vertical-align:middle;\" align=\"center\">{$my_sizes}</td>";
		$entries .= "<td align=\"center\" style=\"text-align: left;vertical-align:middle;\">{$vars_table}</td>";
		$entries .= "<td nowrap align=\"center\" style=\"text-align: left;vertical-align:middle;\"><a class=\"btn btn-sm btn-info\" title=\"Редактировать\" href=\"#\" data-action=\"edit-calculation\" data-productid=\"{$row['product_id']}\"><i class=\"fa fa-pencil\" ></i></a> <a class=\"btn btn-sm btn-danger\" title=\"Удалить\" onclick=\"javascript:cdelete('{$row['product_id']}'); return(false);\" href=\"?mod=calculations&action=remove&id={$row['product_id']}\"><i class=\"fa fa-remove\" ></i></a></td>";
		$entries .= "</tr>";
			 
		$entries_showed ++;
		
		if( $i >= $products_per_page + $start_from ) {
			break;
		}
	}

	// End prelisting
	$result_count = $db->super_query( $catalog_count_sql );
	$all_count_products = intval($result_count['count']);
	
	///////////////////////////////////////////
	// Options Bar
	$category_list = CategoryProductsSelection( $search_cat, 0, false );
	$collection_list = ColorProductsSelection( $search_collection, 0, false );
	$brand_list = BrandProductsSelection( $search_brand, 0, false );
	
	
	echo <<<HTML
<!-- calendar stylesheet -->
<link rel="stylesheet" type="text/css" media="all" href="core/skins/calendar-blue.css" title="win2k-cold-1" />
<script language="javascript">
    function catalog_submit(prm){
      document.optionsbar.catalog.value=prm;
      document.optionsbar.submit();
      return false;
    }
    function search_submit(prm){
      document.optionsbar.start_from.value=prm;
      document.optionsbar.submit();
      return false;
    }
    function gopage_submit(prm){
      document.optionsbar.start_from.value= (prm - 1) * {$products_per_page};
      document.optionsbar.submit();
      return false;
    }
    </script>
	
	
<script>

$(function(){

	$('#optionsbar select').change(function(){
		var selected_val = $(this).val();
			selected_val = parseInt(selected_val);
			console.log(selected_val);
			
			if((selected_val=='-1') || (selected_val>0)) {
				highlightSelect($(this));
			} else {
				noHighlightSelect($(this));
			}
	});
	
	$('#optionsbar select').each(function(){
		var selected_val = $(this).val();
			selected_val = parseInt(selected_val);
			console.log(selected_val);
			
			if((selected_val=='-1') || (selected_val>0)) {
				highlightSelect($(this));
			} else {
				noHighlightSelect($(this));
			}		
	
	});

});

function highlightSelect(select) {
	select.attr('style', 'background:#fff498;');
}
function noHighlightSelect(select) {
	select.attr('style', '');
}

</script>


<form action="" method="GET" name="optionsbar" id="optionsbar">
<input type="hidden" name="mod" value="calculations">

        <div class="hpanel" id="advancedsearch">
          <div class="panel-heading">
           <div class="pull-left">Показано моделей: <b>{$entries_showed}</b> Всего отфильтровано в каталоге: <b>{$all_count_products}</b></div>
           <div class="pull-right"><!--<a href="javascript:ShowOrHide('advancedsearch');" class="btn btn-primary"><i class="fa fa-chevron-down"></i> Скрыть</a>--></div>
           <div class="clearfix"></div>   
          </div>
        

            <div class="clearfix"></div>
            <!-- Information data end -->
            <div class="panel-body">
			
			
			
<div class="row">
	<div class="form-group col-md-3">
		<label>Название позиции:</label>
		<input class="form-control" name="search_field" value="{$search_field}" type="text">
	</div>
	<div class="form-group col-md-3">
		<label>Артикул:</label>
		<input class="form-control" name="search_art" value="{$search_art}" type="text">
	</div>
	<div class="form-group col-md-3">
		<label>Категория:</label>
		<select class="form-control" name="search_cat" ><option selected value="">$lang[edit_all]</option><option value="-1">$lang[cat_in_none]</option>{$category_list}</select>
	</div>
	<div class="form-group col-md-3">
		<label>Моделей на страницу:</label>
		<input class="form-control" style="text-align: center;width:60px;" name="products_per_page" value="{$products_per_page}" type="text">
	</div>
</div>
<div class="row" style="text-align:center;">
	<a href="#" onClick="javascript:search_submit(0);return(false);" class="btn btn-large btn-primary"><i class="fa fa-search"></i> Показать</a>
	<a class="btn btn-default" href="$PHP_SELF?mod=calculations">Сбросить фильтр</a>
</div>

</div>
</div>
<input type="hidden" name="start_from" id="start_from" value="{$start_from}">
</form>
HTML;
	// End Options Bar
	
	if( $entries_showed == 0 ) {
		
		echo <<<HTML
		
        <div class="hpanel">
          <div class="panel-heading">
           <div class="pull-left">
		   </div>
           <div class="pull-right">
HTML;
  

	echo '<a class="btn btn-primary" href="#"  id="addCalculationBtn"><i class="fa fa-calculator"></i> Создать калькуляцию модели</a>';


echo <<<HTML
		   
		   </div>
           <div class="clearfix"></div>   
          </div>
        

            <div class="clearfix"></div>
            <!-- Information data end -->
            <div class="panel-body">

<table width="100%">
    <tr>
        <td align="center" style="height:50px;">Калькуляции моделей не найдены</td>
    </tr>
</table>
</td>
        <td background="core/skins/images/tl_rb.gif"><img src="core/skins/images/tl_rb.gif" width="6" height="1" border="0"></td>
    </tr>
    <tr>
        <td><img src="core/skins/images/tl_lu.gif" width="4" height="6" border="0"></td>
        <td background="core/skins/images/tl_ub.gif"><img src="core/skins/images/tl_ub.gif" width="1" height="6" border="0"></td>
        <td><img src="core/skins/images/tl_ru.gif" width="6" height="6" border="0"></td>
    </tr>
</table>
</div>
HTML;
	
	} else {
		

		$npp_nav = "<div class=\"btn-group\">";
		//$npp_nav = "<div>";
		
		if( $start_from > 0 ) {
			$previous = $start_from - $products_per_page;
			$npp_nav .= "<a class=\"btn btn-default btn-sm\" onClick=\"javascript:search_submit($previous);return(false);\" href=\"#\" title=\"{$lang['edit_prev']}\">назад</a> ";
		}
		
		if( $all_count_products > $products_per_page ) {
			
			$enpages_count = @ceil( $all_count_products / $products_per_page );
			$enpages_start_from = 0;
			$enpages = "";
			
			if( $enpages_count <= 10 ) {
				
				for($j = 1; $j <= $enpages_count; $j ++) {
					
					if( $enpages_start_from != $start_from ) {
						
						$enpages .= "<a class=\"btn btn-default btn-sm\" onClick=\"javascript:search_submit($enpages_start_from);return(false);\" href=\"#\">$j</a> ";
					
					} else {
						
						$enpages .= "<span class=\"btn btn-primary btn-sm btn-active\">$j</span> ";
					}
					
					$enpages_start_from += $products_per_page;
				}
				
				$npp_nav .= $enpages;
			
			} else {
				
				$start = 1;
				$end = 10;
				
				if( $start_from > 0 ) {
					
					if( ($start_from / $products_per_page) > 4 ) {
						
						$start = @ceil( $start_from / $products_per_page ) - 3;
						$end = $start + 9;
						
						if( $end > $enpages_count ) {
							$start = $enpages_count - 10;
							$end = $enpages_count - 1;
						}
						
						$enpages_start_from = ($start - 1) * $products_per_page;
					
					}
				
				}
				
				if( $start > 2 ) {
					
					$enpages .= "<a class=\"btn btn-default btn-sm\" onClick=\"javascript:search_submit(0);return(false);\" href=\"#\">1</a><span class=\"btn btn-sm disabled\">...</span>";
				
				}
				
				for($j = $start; $j <= $end; $j ++) {
					
					if( $enpages_start_from != $start_from ) {
						
						$enpages .= "<a class=\"btn btn-default btn-sm\" onClick=\"javascript:search_submit($enpages_start_from);return(false);\" href=\"#\">$j</a> ";
					
					} else {
						
						$enpages .= "<span class=\"btn btn-primary btn-sm btn-active\" >$j</span> ";
					}
					
					$enpages_start_from += $products_per_page;
				}
				
				$enpages_start_from = ($enpages_count - 1) * $products_per_page;
				$enpages .= "<span class=\"btn btn-sm disabled\">...</span><a class=\"btn btn-default btn-sm\" onClick=\"javascript:search_submit($enpages_start_from);return(false);\" href=\"#\">$enpages_count</a> ";
				
				$npp_nav .= $enpages;
			
			}
		
		}
		
		if( $all_count_products > $i ) {
			$how_next = $all_count_products - $i;
			if( $how_next > $products_per_page ) {
				$how_next = $products_per_page;
			}
			$npp_nav .= "<a class=\"btn btn-default btn-sm\"  onClick=\"javascript:search_submit($i);return(false);\" href=\"#\" title=\"{$lang['edit_next']}\">далее</a>";
		}
		
		$npp_nav .= "</div>";
		

		
		echo <<<HTML
		
		<div style="float:left;margin-top:10px;">
		{$npp_nav}
		</div>
		<div class="clearfix"></div>
        <div class="hpanel" style="margin-top:15px;">

          <div class="panel-heading">
           <div class="pull-left">
		   </div>
           <div class="pull-right">
		   
HTML;
  
	echo '<a class="btn btn-primary" href="#"  id="addCalculationBtn"><i class="fa fa-calculator"></i> Создать калькуляцию модели</a>';


echo <<<HTML

		   </div>
           <div class="clearfix"></div>   
          </div>
        

            <div class="clearfix"></div>
            <!-- Information data end -->

<form action="" method="post" name="calculations">
<div class="panel-body">
<div class="table-responsive">
<table class="table table-striped table-bordered table-mod" id="productslist">
	<thead>
	<tr>
	<th width="50" style="text-align: center;padding-left:2px;padding-right:2px;">Фото</th>
	<th width="80" style="text-align: center;padding-left:2px;padding-right:2px;">Артикул</th>
    <th width="200">Наименование</th>
    <th width="200" style="text-align: center;">Размерный ряд</th>
    <th width="130" style="text-align: center;">Калькуляции по цветам</th>
	<th nowrap width="50"></th>
	</tr>
	</thead>
{$entries}
</table>
</div>
<div class="panel-body">
HTML;

if( $entries_showed != 0 ) {
			echo <<<HTML
<div style="float:left;">

{$npp_nav}

</div>
HTML;
}

echo <<<HTML
<div class="clearfix"></div>
</div>
</div>

</form>
</div>
</div>

HTML;

	
	}
	


$model_select = '<select id="select-product" data-placeholder="Выберите модель" required class="form-control chosen-select" name="product_id" >';
$model_select .= "<option value=''></option>";

$sql_options = $db->query( "SELECT * FROM " . PREFIX . "_product ORDER BY title ASC");

echo "<pre>" . "SELECT * FROM " . PREFIX . "_product ORDER BY title ASC" . "</pre>";

if( $db->num_rows( $sql_options ) > 0 ) {		
	while ( $row = $db->get_row( $sql_options ) ) {			
			$id = $row['id'];

			$model_art = stripslashes($row['art']);
			$model_name = stripslashes($row['title']);
			$model_select .= '<option value="'.$id.'">'.$model_art.'</option>';	
	}
}
$model_select .= '</select>';
	

echo <<<HTML
<style>
	.btn-group .btn.btn-default.active {background:#7c30c0;color:#fff;} 
</style>
<div class="mfp-hide zoom-in-popup white-popup" id="addCalculationPopup" style="max-width:900px;">
	<div class="white-popup-title">
		<i class="fa fa-calculator"></i>&nbsp;&nbsp;Создание калькуляции для модели:
	</div>
	
	<div style="padding:10px">
		<form id="addCalculationForm">
		<table class="table table-mod table-striped table-bordered">
			<tr>
				<th width="150">Выбор модели:</th><td>{$model_select}</td>
			</tr>
			<tr>
				<th width="150" style="vertical-align: middle;">Цвет:</th><td>
				
					<div class="control-group">
						<div class="controls">
							<div class="btn-group" id="addCalculationColors" data-toggle="buttons">			

							</div>
						</div>
					</div>
				</td>
			</tr>
		</table>
		<div id="addCalculationVars">
			<div class="alert alert-warning text-center">ВЫБЕРИТЕ МОДЕЛЬ / ЦВЕТ</div>
		</div>
		</form>
	</div>
	
</div>

<script type="text/javascript">


$(function(){
	
	$('body').on('submit', '#addCalculationForm', function(e){
		e.preventDefault();
		
		var addData = $('#addCalculationForm').serialize();
		console.log(addData);
		
		$('#addCalculationForm button[type=submit]').prop('disabled', true);
		$('#addCalculationForm button[type=submit]').attr('disabled', true);
		$.post('core/ajax/add_calculation.php', addData, function(data){
				console.log(data);
				if(data=='success') {
					$.magnificPopup.close();
					location.reload();
				} else {
					alert(data);
				}
				
				$('#addCalculationForm button[type=submit]').prop('disabled', false);
				$('#addCalculationForm button[type=submit]').attr('disabled', false);
		
		});
		
	});
			
	$("#addCalculationBtn").click(function(){
		var product_select = '';
		$.magnificPopup.open({
			items: {
				src: $('#addCalculationPopup')
			},
			type: 'inline',
			callbacks: {
				open: function() {
					$('#addCalculationColors').html('');
					$('#addCalculationVars').html('<div class="alert alert-warning text-center">ВЫБЕРИТЕ МОДЕЛЬ / ЦВЕТ</div>');
					
					$('#select-product').chosen({"disable_search_threshold":5, search_contains: true, allow_single_deselect:true, no_results_text: 'Не найдено'});
					
					$('#select-product').val( product_select );
					$('#select-product').trigger("chosen:updated");
					
					updateVars(product_select, 0);
					
				},
				close: function() {
				},
			},
		});		
		return false;
	});
	
	$("a[data-action=edit-calculation]").click(function(){
		var product_select = $(this).data('productid');
		
		$.magnificPopup.open({
			items: {
				src: $('#addCalculationPopup')
			},
			type: 'inline',
			callbacks: {
				open: function() {
					$('#addCalculationColors').html('');
					$('#addCalculationVars').html('<div class="alert alert-warning">ВЫБЕРИТЕ МОДЕЛЬ</div>');
					
					$('#select-product').chosen({"disable_search_threshold":5, search_contains: true, allow_single_deselect:true, no_results_text: 'Не найдено'});
					
					$('#select-product').val( product_select );
					$('#select-product').trigger("chosen:updated");
					
					updateColors(product_select);
					updateVars(product_select, 0);

					
				},
				close: function() {
				},
			},
		});		
		return false;
	});
	
	$('#select-product').on('change', function(){
		var selected_product_id = $('#select-product').val();
		
		updateColors(selected_product_id);
		updateVars(selected_product_id, 0);
		
	});	
	
	$('body').on('change', '#addCalculationForm input[name=color_id]', function(){
		var selected_product_id = $('#select-product').val();
		var selected_color_id = $('#addCalculationForm input[name=color_id]:checked').val();
		
		updateVars(selected_product_id, selected_color_id);
		
	});
	
	$('body').on('click', '[data-action=base-calculation]', function(){
		var selected_product_id = $('#select-product').val();
		updateVars(selected_product_id, 0);
		return false;
	});
	
	$('body').on('click', '[data-action=add-calculation-row]', function(){
		var addRowTrigger = $(this);
		var addRowTable = $(this).parents('table');
		var addRowElement = addRowTable.find('tr.calculation-row');
		var addRowElementInner = addRowElement.html();
		
		addRowTable.find('tbody').append('<tr>'+addRowElementInner+'</tr>');
		
		$('#addCalculationVars tr:not(.calculation-row)').find('select').chosen({"disable_search_threshold":5, search_contains: true, allow_single_deselect:true, no_results_text: 'Не найдено'});
		
		return false;
		
	});
	$('body').on('click', '[data-action=remove-calculation-row]', function(){
		var removeRowTrigger = $(this);
		var removeRowElement = $(this).parents('tr');
			removeRowElement.fadeOut("slow", function(){
				$(this).remove();
			});
			
		return false;
		
	});
	
});	
	
function updateColors(product_id) {
		
	if(product_id!='') {
		$.post('core/ajax/calculation_colors.php', {product_id: product_id}, function(data){
			//console.log(data);
			if(data!="") {
				$('#addCalculationColors').html(data);
			} else {
				$('#addCalculationColors').html('');
			}
	
		});	
	} else {
		$('#addCalculationColors').html('');
		$('#addCalculationVars').html('<div class="alert alert-warning text-center">ВЫБЕРИТЕ МОДЕЛЬ / ЦВЕТ</div>');
	}
		
}		
function updateVars(product_id, color_id) {
		
		console.log(product_id +' '+ color_id );
		
		if(product_id!='') {
			$.post('core/ajax/calculation_vars.php', {product_id: product_id, color_id: color_id}, function(data){
				//console.log(data);
				if(data!="") {
					$('#addCalculationVars').html(data);
				}
				var currentColorName = $('#addCalculationForm input[name=color_id]:checked').data('colorname');
					if(!currentColorName) currentColorName = "БАЗОВАЯ";
				$('#addCalculationVars button[type=submit] span').html('{'+currentColorName+'}');
				$('#addCalculationVars tr:not(.calculation-row)').find('select').chosen({"disable_search_threshold":5, search_contains: true, allow_single_deselect:true, no_results_text: 'Не найдено'});
			});			
			
		} else {
			
			$('#addCalculationVars').html('<div class="alert alert-warning text-center">ВЫБЕРИТЕ МОДЕЛЬ / ЦВЕТ</div>');
		}
		
}	

</script>

HTML;
	
	echofooter();

?>




<?php

/**********      Transfer Data   ************/


/*

SELECT
krista_ordered_products.*,
SUM(krista_ordered_products.qty) as totalQty,

(krista_ordered_productsDupl.totalQty * krista_ordered_products.price) as totalPrice,

(krista_ordered_productsDupl.totalQty * ( krista_ordered_products.price - krista_ordered_products.calculation_prize) ) as totalRevenue

FROM `krista_ordered_products`

LEFT JOIN krista_orders ON krista_orders.id= krista_ordered_products.order_id

LEFT JOIN (

    SELECT
    krista_ordered_products.*,
    SUM(krista_ordered_products.qty) as totalQty

    FROM `krista_ordered_products`

    LEFT JOIN krista_orders ON krista_orders.id= krista_ordered_products.order_id

    WHERE

    product_id = 749

    AND krista_ordered_products.status=1

    AND krista_orders.status!=0

) as krista_ordered_productsDupl ON krista_ordered_productsDupl.id = krista_ordered_products.id

WHERE

krista_ordered_products.product_id = 749

AND krista_ordered_products.status=1

AND krista_orders.status!=0

*/


?>
