angular.module('lifely', ['ngMaterial']).controller('LifelyCtrl', function($scope,$http) {
            console.log("age: " + $scope.formDate);
    $scope.createArray = function(length){
        var array = new Array(length);
        for(var i = 0; i < length; i++){
            array[i] = i;
        }
        return array;
    }
    $scope.slogan = "Reflect often. Live consciously."
    $scope.occurred;
    $scope.fact;
    $scope.compounded;
    $scope.textabovegrid = "Here's 90 years of human life.";
    $scope.ageEntered = 0;
    $scope.yearOfFact = 0;
    $scope.items = [];
    $scope.screens = 0;
    $scope.factCaller = function(){
//            while($scope.ageEntered === 1){
                setTimeout($scope.getLifeFact(2016-$scope.formDate),4000);
//            }
    };

    $scope.compound = function( input, interest, currentyear, addition ) {
           var accumulated = input;
           var length = currentyear - $scope.yearOfFact;
           for ( i=0; i < length; i++ ) {
               accumulated = accumulated * interest;
               if ( addition ){
                   accumulated += input;
               }
           }
           accumulated = accumulated.toFixed(0).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
           input = input.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
           return ( "Also, had you invested $" + input + " in that year, you would have accumulated about $" + accumulated + " by today.");
       }

    $scope.updateFactBox = function(funfact){
        console.log(funfact);
        $scope.occurred = "Remember " + $scope.yearOfFact + "? You were only " + ($scope.formDate-(2016-$scope.yearOfFact)) + " years old!";
        console.log(funfact);
        $scope.fact = "You've lived through " + funfact.substring(0, funfact.indexOf(':')) + ", " + $scope.yearOfFact + funfact.substring(funfact.indexOf(':'), funfact.length);
        $scope.compounded = $scope.compound(10000, 1.10, 2016, 0);
    };

    $scope.getLifeFact = function (birthYear) {
//           while($scope.ageEntered === 1){
               $scope.yearOfFact = Math.floor(Math.random() * (2016-birthYear)) + birthYear;
               console.log("Year Selected: " + $scope.yearOfFact);
               $http({ method: 'GET', url: 'https://crossorigin.me/http://api.wolframalpha.com/v2/query?appid=T594QV-9WW25Q33WU&input=year%20' + $scope.yearOfFact + '&format=plaintext'}).
               then(function successCallback(response) {
                   var xml = $.parseXML(response.data), $xml = $(xml), $test = $xml.find('pod[id="NotableEventForDate"] > subpod > plaintext').each(function(){
                       $scope.items.push($(this).text());
                   });

                   var result = $scope.items[Math.floor(Math.random() * $scope.items.length)];
                   console.log("Result: " + result);
                   $scope.updateFactBox(result);
                   return result;
               }, function errorCallback(response) {
                   alert("An error has occurred ");
               });
//           }
    };

    $scope.period = 1;  //0 years, 1 months,...

//     $scope.changePeriod($scope.period);

     $scope.rowArray = $scope.createArray(9);
     $scope.colArray = $scope.createArray(10);
//     $scope.bodbg = document.getElementById("bod");
    $scope.date = -1;
    $scope.submitDate = function(){
        if($scope.formDate >= 0){
            $scope.date = $scope.formDate;
            $scope.ageEntered = 1;
        }else{
            $scope.date = -1;
            $scope.occurred = "";
            $scope.fact = "";
            $scope.ageEntered = 0;
        }
//            var bod =
////            bodbg ="url('../img/bg-with-legend.png')";
//            console.log(bodbg);
        if($scope.date >= 0){
            $scope.changeScreen(0);
            $scope.factCaller();
        }
    }

    $scope.recolorGrid = function(){
        var table = document.getElementById("lifeGrid");
        var rows = table.rows, numRows = rows.length, r;
        var numCols = $scope.colArray.length;
//            console.log(table);
        if($scope.screens === 0){
            for(r = 0; r<numRows; r++){
                for (var i = 0; i<numCols; i++) {
    //                            console.log(i);
                    var cell = rows[r].cells[i];
                    console.log(numCols);
                    var node = cell.getElementsByTagName("div")[0];
                    if(i + r*numCols < ($scope.date-1) * $scope.period){
                        node.style.backgroundColor = "deepskyblue";
                        node.style.opacity = 0.9;
                        node.style.border="1px solid transparent";
                    }else if(i + r*numCols === ($scope.date-1) * $scope.period){
                          node.style.backgroundColor = "yellow";
                          node.style.opacity = 0.9 ;
                          node.style.border="1px solid white";
                    }else{
                        node.style.backgroundColor = "white";
                        node.style.border="1px solid transparent";
                        node.style.opacity = 0.4;
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
        }else if($scope.screens === 1){
                     for(r = 0; r<numRows; r++){
                         for (var i = 0; i<numCols; i++) {
             //                            console.log(i);
                             var cell = rows[r].cells[i];
                             console.log(numCols);
                             var node = cell.getElementsByTagName("div")[0];
                             if(i + r*numCols < 12 * $scope.period){
                                 node.style.backgroundColor = "rgba(248,231,28,1)";
                                 node.style.opacity = 0.9;
                                 node.style.border="1px solid transparent";
                             }else if(i + r*numCols < 14 * $scope.period){
                                   node.style.backgroundColor = "white";
                                   node.style.opacity = 0.9 ;
//                                   node.style.border="1px solid white";
                             }else if(i + r*numCols < 18 * $scope.period){
                                 node.style.backgroundColor = "rgba(238,72,74,1)";
                                   node.style.opacity = 0.9 ;
//                                   node.style.border="1px solid white";
                           }else if(i + r*numCols < 22 * $scope.period){
                               node.style.backgroundColor = "rgba(253,186,55,1)";
                                   node.style.opacity = 0.9 ;
//                                   node.style.border="1px solid white";
                         }else if(i + r*numCols < 65 * $scope.period){
                             node.style.backgroundColor = "rgba(0,255,63,1)";
                                   node.style.opacity = 0.9 ;
//                                   node.style.border="1px solid white";
                           }else{
                                     node.style.backgroundColor = "rgba(210,0,255,1)";
//                                     node.style.border="1px solid transparent";
                                     node.style.opacity = 0.9;
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
                 }else if($scope.screens === 2){
                       for(r = 0; r<numRows; r++){
                           for (var i = 0; i<numCols; i++) {
               //                            console.log(i);
                               var cell = rows[r].cells[i];
                               console.log(numCols);
                               var node = cell.getElementsByTagName("div")[0];
                               if(i + r*numCols === (25-1) * $scope.period){
                                   node.style.backgroundColor = "rgba(238,72,74,1)";
                                   node.style.opacity = 0.9;
                                   node.style.border="1px solid transparent";
                               }else if(i + r*numCols === (27-1) * $scope.period){
                                     node.style.backgroundColor = "rgba(248,231,28,1)";
                                     node.style.opacity = 0.9 ;
    //                                   node.style.border="1px solid white";
                               }else if(i + r*numCols === (29-1) * $scope.period){
                                   node.style.backgroundColor = "rgba(253,186,55,1)";
                                     node.style.opacity = 0.9 ;
    //                                   node.style.border="1px solid white";
                             }else if(i + r*numCols === (41-1) * $scope.period){
                                 node.style.backgroundColor = "rgba(255,255,255,1)";
                                     node.style.opacity = 0.9 ;
    //                                   node.style.border="1px solid white";
                           }else if(i + r*numCols === (45-1) * $scope.period){
                               node.style.backgroundColor = "rgba(210,0,255,1)";
                                     node.style.opacity = 0.9 ;
    //                                   node.style.border="1px solid white";
                         }else if(i + r*numCols === (78-1) * $scope.period){
                                 node.style.backgroundColor = "rgba(0,255,63    ,1)";
                               node.style.opacity = 0.9 ;
//                                   node.style.border="1px solid white";
                          }else{
                                node.style.backgroundColor = "white";
                                node.style.border="1px solid transparent";
                                node.style.opacity = 0.4;
                       }
                   }
                }
             }
        };
    $scope.changeScreen = function(x){
        $scope.screens = x;
        $scope.recolorGrid();
        document.getElementById("legendpic").src = "img/Legend-" + x + ".png";
        if(x === 0){
            $scope.textabovegrid = "Your life in years:";
        }else if(x === 1){
            $scope.textabovegrid = "Life of a typical American";
        }else if(x === 2){
            $scope.textabovegrid = "Some interesting averages...";
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
         $scope.recolorGrid();
     };

})  ;

