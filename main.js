var myapp = angular.module('myapp', []);



myapp.filter("rmDupMonthYear", function () {
  // we will return a function which will take in a collection
  // and a keyname
  return function (collection, keyname) {
    // we define our output and keys array;
    var output = [],
      keys = [];

    // we utilize angular's foreach function
    // this takes in our original collection and an iterator function
    angular.forEach(collection, function (item) {
      // we check to see whether our object exists
      var key = item[keyname];
      // if it's not already part of our keys array
      if (keys.indexOf(key) === -1) {
        // add it to our keys array
        keys.push(key);
        // push this item to our final output array
        output.push(item);
      }
    });
    // return our array which should be devoid of
    // any duplicates
    return output;
  };
});

//filter per estrarre anni da tasks
myapp.filter('filterForElements', function () {
  return function (tasks, compItems) {
    if (!tasks || tasks.length === 0)
      return tasks;
    let filteredItems = [];
    for (let i = 0; i < tasks.length; i++) {
      let item = tasks[i];
      //SE l'anno dell'elemento i è nell'elenco degli anni, lo aggiungo agli elementi da visualizzare (filteredItems)


      var indexAnno = compItems.indexOf(tasks[i].anno);

      if (indexAnno >= 0) {
        filteredItems.push(tasks[i]);
      };
    };
    return filteredItems;

  }
});

//tentativo filtro per estrarre mesi da anni
myapp.filter('filterForMonths', function () {
  return function (tasks, listaMesiFilter) {
    if (!tasks || tasks.length === 0 || !listaMesiFilter || listaMesiFilter.length === 0)
      return tasks;
    let filteredItems = [];
    for (let i = 0; i < tasks.length; i++) {
      let item = tasks[i];
      //SE l'anno dell'elemento i è nell'elenco degli anni, lo aggiungo agli elementi da visualizzare (filteredItems)

      var indexMese = listaMesiFilter.indexOf(tasks[i].mese);
      if (indexMese >= 0) {
        filteredItems.push(tasks[i]);
      };
    };
    return filteredItems;

  }
});

//filtro status

myapp.filter('filterStatus1', function () {
  return function (tasks, filterStatus) {

    var outList = [];
    for (var i = 0; i < tasks.length; i++) {
      //$scope.loadNews
      var getItem = false;
      if (filterStatus.New) {
        if (tasks[i].tipo == "New")
          getItem = true;
      }
      if (filterStatus.Fixed) {
        if (tasks[i].tipo == "Fixed")
          getItem = true;
      }
      if (filterStatus.Updated) {
        if (tasks[i].tipo == "Updated")
          getItem = true;
      }
      if (getItem) {
        outList.push(tasks[i]);
      }
    }
    return outList;
  }
});



// Create a Controller
myapp.controller('myctrl', ['$scope', '$http', '$filter', '$timeout', '$window', function ($scope, $http, $filter, $timeout, $window) {
  //per estrarre i dati dal Json
  $scope.tasks = [];
  var finalResult = [];
  var ids = {};

  $scope.filterStatus = { New: true, Fixed: true, Updated: true };


  $scope.sortYearMonth = function (t) {
    console.log(t);
    $scope.taskSort = t;
  }

  $scope.types = { New: false, Updated: false, Fixed: false };

  //Change button colors if clicked (Anno)
  $scope.changeCol = function (anno) {
    var index = $scope.listaAnni.indexOf(anno);
    if (index >= 0) {
      return 'btn-outline-info';
    };
    return 'btn-light';
  };


  //Change button colors if clicked (Mese)
  $scope.changeColMese = function (mese) {
    var index = $scope.listaMesiFilter.indexOf(mese);
    if (index >= 0) {
      return 'btn-outline-info';
    };
    return 'btn-light';
  };




  //Lista anni da Json
  $scope.formData = function () {
    $scope.listaAnni = [];
    var listaAnni = $scope.tasks.length;
    angular.forEach($scope.tasks, function (value, key) {
      $scope.tasks.push(tasks.anno);
    });
    alert($scope.tasks);
  };


  $scope.tasks = [];              //Tutti gli elementi (es: anni, mesi)
  $scope.listaAnni = $scope.tasks.anni;   //Elementi attualmente selezionati
  $scope.inizializzazione = function () {
    //...
    var listadati = "";  //Estraggo i dati (ES. tutti gli anni/mesi senza duplicati)
    $scope.listaInScope = listadati;    //metto tutti i dati in una lista
    $scope.listaAnni = listadati; //li imposto tutti come selezionati
  };
  $scope.listaAnni = [];
  $scope.ToogleAnni = function (value) {
    if (!value)
      return;
    //SE l'elemento NON è in lista, lo aggiungo:
    if ($scope.listaAnni.indexOf(value) < 0) {
      $scope.listaAnni.push(value);
    } else {
      //altrimenti lo tolgo dalla lista di selezionati
      $scope.listaAnni =
        $scope.listaAnni.filter(function (tag) { return tag + '' !== value + ''; });
    }
    $scope.aggiornaMesi();
  };


  //filtro ALL anni
  $scope.ClearYearFilter = function () {

    var listaAnni = [];
    angular.forEach($scope.tasks, function (task, key) {

      if (listaAnni.indexOf(task.anno) < 0) {
        listaAnni.push(task.anno);
      };
    });
    if (listaAnni.length == $scope.listaAnni.length) {
      $scope.listaAnni = [];
    }
    else {
      $scope.listaAnni = listaAnni[0]; 
    }
    $scope.aggiornaMesi();
  };


  //Lista mesi da Anni

  $scope.aggiornaMesi = function () {

    var listaMesi = [];
    angular.forEach($scope.tasks, function (task, key) {

      if ($scope.listaAnni.indexOf(task.anno) >= 0) {
        if (listaMesi.indexOf(task.mese) == -1) {
          listaMesi.push(task.mese);
        };
      }

    });
    $scope.listaMesi = listaMesi;

  };
  //test sorting
  $scope.sort = {
    column: '',
    descending: false
  };

  $scope.changeSorting = function (column) {

    var sort = $scope.sort;

    if (sort.column == column) {
      sort.descending = !sort.descending;
    } else {
      sort.column = column;
      sort.descending = false;
    }
  };

  $scope.selectedCls = function (column) {
    return column == scope.sort.column && 'sort-' + scope.sort.descending;
  };






  $scope.tasks = [];              //Tutti gli elementi (es: anni, mesi)
  $scope.listaMesi = $scope.listaAnni.mese;   //Elementi attualmente selezionati
  $scope.inizializzazione = function () {
    //...
    var listadatimesi = "";  //Estraggo i dati (ES. tutti gli anni/mesi senza duplicati)
    $scope.listInScope = listadatimesi;    //metto tutti i dati in una lista
    $scope.listaMesi = listadatimesi; //li imposto tutti come selezionati
  };
  $scope.listaMesi = [];
  $scope.listaMesiFilter = [];
  $scope.ToogleMesi = function (value) {
    if (!value)
      return;
    //SE l'elemento NON è in lista, lo aggiungo:
    if ($scope.listaMesiFilter.indexOf(value) < 0) {
      $scope.listaMesiFilter.push(value);
    } else {
      //altrimenti lo tolgo dalla lista di selezionati
      $scope.listaMesiFilter =
        $scope.listaMesiFilter.filter(function (tag) { return tag + '' !== value + ''; });
    }

  };


  //filtro ALL per mesi
  $scope.ClearMonthFilter = function () {


    var listaMesiFilter = [];

    angular.forEach($scope.tasks, function (task, key) {


      if (listaMesiFilter.indexOf(task.mese) < 0) {
        listaMesiFilter.push(task.mese);
      }
    });
    if (listaMesiFilter.length == $scope.listaMesiFilter.length) {
      $scope.listaMesiFilter = [];
    }
    else {
      $scope.listaMesiFilter = $scope.listaMesi;
    }
  };






  $scope.monthMatch = function (month) {
    return function (t) {
      return item.Mese == month;
    }
  };


  $scope.init = function () {
    $http.get('Instances.json').then(function (response) {
        $scope.Instances = response.data;
        $scope.initlist();
    });
};

$scope.geturl = function () {
    
    var url = "";
    var code = getUrlParamLowerCase('code');		//Step 1
    //lettura .json con code + url
    if(! code || code == ""){
        code = 'Test';
    }
    var localConfig = $scope.Instances;

    for (var i = 0; i < localConfig.length; i++) {
        try {
            if (localConfig[i].code.toLowerCase() == code.toLowerCase()) {
                url = localConfig[i].src;
            }  
        } catch (error) {
            
        }
        
    }

    return url + "Modules/PlatformVersion/tasks.json";
};

  $scope.initlist = function () {
    $scope.listaAnni = [];

    var taskurl = $scope.geturl();

    $http.get(taskurl)
      .then(function (response) {
        $scope.tasks = response.data;
        $scope.ClearYearFilter();
      });



  };

  
  $scope.init();


}]);

function getUrlParamLowerCase(code) {
  if (!code || location.href.indexOf("?") <= 0)
      return "";
  var parmas = location.href.toLocaleLowerCase().split("?")[1].split("&");
  for (var i = 0; i < parmas.length; i++) {
      var paramParts = parmas[i].split("=");
      if (paramParts[0] + "" === code.toLocaleLowerCase()) {
          var checkHash = paramParts[1].split("#");
          return checkHash[0];

      }
  }
  return "";
};
