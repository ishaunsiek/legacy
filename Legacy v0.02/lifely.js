angular.module('lifely', []).controller('LifelyCtrl', function($scope,$http) {
    $scope.createArray = function(length){
        var array = new Array(length);
        for(var i = 0; i < length; i++){
            array[i] = i;
        }
        return array;
    }

     $scope.period = 1;  //0 years, 1 months,...

//     $scope.changePeriod($scope.period);

     $scope.rowArray = $scope.createArray(9);
     $scope.colArray = $scope.createArray(10);

    $scope.date = -1;
        $scope.submitDate = function(){
            if($scope.formDate >= 0){
                $scope.date = $scope.formDate;
            }else{
                $scope.date = -1;
            }
            $scope.recolorGrid();
        }

        $scope.recolorGrid = function(){
            var table = document.getElementById("lifeGrid");
            var rows = table.rows, numRows = rows.length, r;
            var numCols = $scope.colArray.length;
            console.log(numCols);
            for(r = 0; r<numRows; r++){
                for (var i = 0; i<numCols; i++) {
                            console.log(i);
                    var cell = rows[r].cells[i];
                    var node = cell.getElementsByTagName("div")[0];
                    if(i + r*numCols < ($scope.date-1) * $scope.period){
                        node.style.backgroundColor = "#ffffff";
                        node.style.border="1px solid transparent";
                    }else if(i + r*numCols === ($scope.date-1) * $scope.period){
                          node.style.backgroundColor = "white";
                          node.style.border="3px double blue";
                    }else if(i + r*numCols < 18 * $scope.period){
                        node.style.backgroundColor = "green";
                        node.style.border="1px solid transparent";
                    }else if(i + r*numCols < 35 * $scope.period){
                        node.style.backgroundColor = "yellow";
                        node.style.border="1px solid transparent";
                    }else if(i + r*numCols < 60 * $scope.period){
                        node.style.backgroundColor = "orange";
                        node.style.border="1px solid transparent";
                    }else{
                        node.style.backgroundColor = "red";
                        node.style.border="1px solid transparent";
                    }
                    if($scope.period === 1){
                        node.style.width = "25px";
                        node.style.height = "25px";
                    }else if($scope.period === 12){
                        node.style.width = "12px";
                        node.style.height = "12px";
                    }
                }
            }

        }

     $scope.changePeriod = function(nodesPerYear){
        if(nodesPerYear !== $scope.period){
             $scope.period = nodesPerYear;
             if($scope.period === 1){
                  $scope.rowArray = $scope.createArray(9);
                  $scope.colArray = $scope.createArray(10);
             }else if($scope.period === 12){
                  $scope.rowArray = $scope.createArray(30);
                  $scope.colArray = $scope.createArray(36);
             }
         }
     }

})
