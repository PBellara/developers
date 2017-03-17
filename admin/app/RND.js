
<?php
require "init.php";
$json = file_get_contents('php://input'); 
//$data = json_decode($json,true);
// remove the ,true so the data is not all converted to arrays
$data = json_decode($json);
// Now process the array of objects
foreach ( $data as $inv ) {
    $custInfo = $inv->custInfo;
    $rate =     $inv->rate;
    $weight=    $inv->weight;
    $desc=      $inv->desc;
    $makingAmt= $inv->makingAmt;
    $vat=       $inv->vat;
    $itemTotal= $inv->itemTotal;
    $sum_total= $inv->sum_total;
    $barcode=   $inv->barcode;
    $net_rate=  $inv->net_rate;
    $date=      $inv->date;
    $invoiceNo= $inv->invoiceNo;
    $bill_type= $inv->bill_type;
    $sql = "INSERT INTO selected_items 
             (custInfo, invoiceNo, barcode, desc, 
              weight, rate, makingAmt,net_rate,
              itemTotal,vat,sum_total,bill_type,date) 
            VALUES
             ('$custInfo','$invoiceNo','$barcode','$desc',
              '$weight','$rate','$makingAmt','$net_rate',
              '$itemTotal','$vat','$sum_total','$bill_type','$date')";
    $res = mysqli_query($sql,$con);
echo $res;
    if(!$res){
        $result = new stdClass();
        $result->status = false;
        $result->msg = mysql_error();
        echo json_encode($result);
        exit;
    }
}
?>


INSERT INTO `bargaindb1`.`statemaster_tbl` (`stateid`, `statename`) VALUES (NULL, 'Andhra Pradesh'); 
INSERT INTO `bargaindb1`.`statemaster_tbl` (`stateid`, `statename`) VALUES (NULL, 'Arunachal Pradesh'); 
INSERT INTO `bargaindb1`.`statemaster_tbl` (`stateid`, `statename`) VALUES (NULL, 'Assam'); 
INSERT INTO `bargaindb1`.`statemaster_tbl` (`stateid`, `statename`) VALUES (NULL, 'Bihar'); 
INSERT INTO `bargaindb1`.`statemaster_tbl` (`stateid`, `statename`) VALUES (NULL, 'Chandigarh'); 
INSERT INTO `bargaindb1`.`statemaster_tbl` (`stateid`, `statename`) VALUES (NULL, 'Chhattisgarh'); 
INSERT INTO `bargaindb1`.`statemaster_tbl` (`stateid`, `statename`) VALUES (NULL, 'Dadra and Nagar Haveli'); 
INSERT INTO `bargaindb1`.`statemaster_tbl` (`stateid`, `statename`) VALUES (NULL, 'Daman and Diu'); 
INSERT INTO `bargaindb1`.`statemaster_tbl` (`stateid`, `statename`) VALUES (NULL, 'Delhi'); 
INSERT INTO `bargaindb1`.`statemaster_tbl` (`stateid`, `statename`) VALUES (NULL, 'Goa'); 
INSERT INTO `bargaindb1`.`statemaster_tbl` (`stateid`, `statename`) VALUES (NULL, 'Gujarat'); 
INSERT INTO `bargaindb1`.`statemaster_tbl` (`stateid`, `statename`) VALUES (NULL, 'Haryana'); 
INSERT INTO `bargaindb1`.`statemaster_tbl` (`stateid`, `statename`) VALUES (NULL, 'Himachal Pradesh'); 
INSERT INTO `bargaindb1`.`statemaster_tbl` (`stateid`, `statename`) VALUES (NULL, 'Jammu and Kashmir'); 
INSERT INTO `bargaindb1`.`statemaster_tbl` (`stateid`, `statename`) VALUES (NULL, 'Jharkhand'); 
INSERT INTO `bargaindb1`.`statemaster_tbl` (`stateid`, `statename`) VALUES (NULL, 'Karnataka'); 
INSERT INTO `bargaindb1`.`statemaster_tbl` (`stateid`, `statename`) VALUES (NULL, 'Kerala'); 
INSERT INTO `bargaindb1`.`statemaster_tbl` (`stateid`, `statename`) VALUES (NULL, 'Lakshadweep'); 
INSERT INTO `bargaindb1`.`statemaster_tbl` (`stateid`, `statename`) VALUES (NULL, 'Madhya Pradesh'); 
INSERT INTO `bargaindb1`.`statemaster_tbl` (`stateid`, `statename`) VALUES (NULL, 'Maharashtra'); 
INSERT INTO `bargaindb1`.`statemaster_tbl` (`stateid`, `statename`) VALUES (NULL, 'Manipur'); 
INSERT INTO `bargaindb1`.`statemaster_tbl` (`stateid`, `statename`) VALUES (NULL, 'Meghalaya'); 
INSERT INTO `bargaindb1`.`statemaster_tbl` (`stateid`, `statename`) VALUES (NULL, 'Mizoram'); 
INSERT INTO `bargaindb1`.`statemaster_tbl` (`stateid`, `statename`) VALUES (NULL, 'Nagaland'); 
INSERT INTO `bargaindb1`.`statemaster_tbl` (`stateid`, `statename`) VALUES (NULL, 'Odisha'); 
INSERT INTO `bargaindb1`.`statemaster_tbl` (`stateid`, `statename`) VALUES (NULL, 'Puducherry'); 
INSERT INTO `bargaindb1`.`statemaster_tbl` (`stateid`, `statename`) VALUES (NULL, 'Punjab'); 
INSERT INTO `bargaindb1`.`statemaster_tbl` (`stateid`, `statename`) VALUES (NULL, 'Rajasthan'); 
INSERT INTO `bargaindb1`.`statemaster_tbl` (`stateid`, `statename`) VALUES (NULL, 'Sikkim'); 
INSERT INTO `bargaindb1`.`statemaster_tbl` (`stateid`, `statename`) VALUES (NULL, 'Tamil Nadu'); 
INSERT INTO `bargaindb1`.`statemaster_tbl` (`stateid`, `statename`) VALUES (NULL, 'Telangana'); 
INSERT INTO `bargaindb1`.`statemaster_tbl` (`stateid`, `statename`) VALUES (NULL, 'Tripura'); 
INSERT INTO `bargaindb1`.`statemaster_tbl` (`stateid`, `statename`) VALUES (NULL, 'Uttar Pradesh'); 
INSERT INTO `bargaindb1`.`statemaster_tbl` (`stateid`, `statename`) VALUES (NULL, 'Uttarakhand'); 
INSERT INTO `bargaindb1`.`statemaster_tbl` (`stateid`, `statename`) VALUES (NULL, 'West Bengal'); 

update temptable set stateid=36 where statename='West Bengal';

INSERT INTO `bargaindb1`.`temptable` (`id`, `cityname`, `statename`, `stateid`) VALUES ('1218', 'Sikkim', 'Sikkim', '30');


<script>
    function CreateTableFromJSON() {
        // EXTRACT VALUE FOR HTML HEADER. 
        // ('Book ID', 'Book Name', 'Category' and 'Price')
        var col = [];
        for (var i = 0; i < myBooks.length; i++) {
            for (var key in myBooks[i]) {
                if (col.indexOf(key) === -1) {
                    col.push(key);
                }
            }
        }

        // CREATE DYNAMIC TABLE.
        var table = document.createElement("table");

        // CREATE HTML TABLE HEADER ROW USING THE EXTRACTED HEADERS ABOVE.

        var tr = table.insertRow(-1);                   // TABLE ROW.

        for (var i = 0; i < col.length; i++) {
            var th = document.createElement("th");      // TABLE HEADER.
            th.innerHTML = col[i];
            tr.appendChild(th);
        }

        // ADD JSON DATA TO THE TABLE AS ROWS.
        for (var i = 0; i < myBooks.length; i++) {

            tr = table.insertRow(-1);

            for (var j = 0; j < col.length; j++) {
                var tabCell = tr.insertCell(-1);
                tabCell.innerHTML = myBooks[i][col[j]];
            }
        }

        // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
        var divContainer = document.getElementById("showData");
        divContainer.innerHTML = "";
        divContainer.appendChild(table);
    }
</script>
</html>

/*------------------------------/
var fessmodule = angular.module('myModule', []);

fessmodule.controller('ctrlRead', function ($scope, $filter) {

    // init
    $scope.sort = {       
                sortingOrder : 'id',
                reverse : false
            };
    
    $scope.gap = 5;
    
    $scope.filteredItems = [];
    $scope.groupedItems = [];
    $scope.itemsPerPage = 5;
    $scope.pagedItems = [];
    $scope.currentPage = 0;

    var searchMatch = function (haystack, needle) {
        if (!needle) {
            return true;
        }
        return haystack.toLowerCase().indexOf(needle.toLowerCase()) !== -1;
    };

    // init the filtered items
    $scope.search = function () {
        $scope.filteredItems = $filter('filter')($scope.items, function (item) {
            for(var attr in item) {
                if (searchMatch(item[attr], $scope.query))
                    return true;
            }
            return false;
        });
        // take care of the sorting order
        if ($scope.sort.sortingOrder !== '') {
            $scope.filteredItems = $filter('orderBy')($scope.filteredItems, $scope.sort.sortingOrder, $scope.sort.reverse);
        }
        $scope.currentPage = 0;
        // now group by pages
        $scope.groupToPages();
    };
    
  
    // calculate page in place
    $scope.groupToPages = function () {
        $scope.pagedItems = [];
        
        for (var i = 0; i < $scope.filteredItems.length; i++) {
            if (i % $scope.itemsPerPage === 0) {
                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [ $scope.filteredItems[i] ];
            } else {
                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
            }
        }
    };
    
    $scope.range = function (size,start, end) {
        var ret = [];        
        console.log(size,start, end);
                      
        if (size < end) {
            end = size;
            start = size-$scope.gap;
        }
        for (var i = start; i < end; i++) {
            ret.push(i);
        }        
         console.log(ret);        
        return ret;
    };
    
    $scope.prevPage = function () {
        if ($scope.currentPage > 0) {
            $scope.currentPage--;
        }
    };
    
    $scope.nextPage = function () {
        if ($scope.currentPage < $scope.pagedItems.length - 1) {
            $scope.currentPage++;
        }
    };
    
    $scope.setPage = function () {
        $scope.currentPage = this.n;
    };

    // functions have been describe process the data for display
    $scope.search();

   

});


fessmodule.$inject = ['$scope', '$filter'];

fessmodule.directive("customSort", function() {
return {
    restrict: 'A',
    transclude: true,    
    scope: {
      order: '=',
      sort: '='
    },
    template : 
      ' <a ng-click="sort_by(order)" style="color: #555555;">'+
      '    <span ng-transclude></span>'+
      '    <i ng-class="selectedCls(order)"></i>'+
      '</a>',
    link: function(scope) {
                
    // change sorting order
    scope.sort_by = function(newSortingOrder) {       
        var sort = scope.sort;
        
        if (sort.sortingOrder == newSortingOrder){
            sort.reverse = !sort.reverse;
        }                    

        sort.sortingOrder = newSortingOrder;        
    };
    
   
    scope.selectedCls = function(column) {
        if(column == scope.sort.sortingOrder){
            return ('icon-chevron-' + ((scope.sort.reverse) ? 'down' : 'up'));
        }
        else{            
            return'icon-sort' 
        } 
    };      
  }// end link
}
});
