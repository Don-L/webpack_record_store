/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var RecordStore = __webpack_require__( 1 );
	var sampleRecords = __webpack_require__(3);
	var Record = __webpack_require__(4);
	var Collector = __webpack_require__(2);
	var RecordStoreView = __webpack_require__(5)
	
	
	window.onload = function() {
	  console.log("app loaded");
	
	  var recordStore = new RecordStore('Missing Records', 'Glasgow');
	
	  for (var record of sampleRecords) {
	    recordStore.addRecord(record);
	  };
	
	  var recordStoreView = new RecordStoreView(recordStore);
	
	  recordStoreView.render(recordStore);
	
	};

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Collector = __webpack_require__(2);
	
	var RecordStore = function(name, city){
	
	  this.name = name;
	  this.city = city;
	  this.records = [];
	  this.balance = 0;
	  this.stockValue = 0;
	}
	
	
	RecordStore.prototype = {
	
	  addRecord: function(record){
	    this.records.push(record);
	    this.stockValue += record.price;
	  },
	
	  printInventory: function(){
	    console.log(this.name + ', ' + this.city + '; INVENTORY: ');
	    if (this.records.length === 0) {
	      console.log('Inventory is empty');
	    }
	    else {
	      for (var record in this.records) {
	        console.log(parseInt(record) + 1 + ' - ' + this.records[record].artist + ' - ' + this.records[record].title + ' - ' + this.records[record].price);
	      }
	    }
	  },
	
	  sellRecord: function(record) {
	
	    var recordIndex = this.records.lastIndexOf(record);
	    var record = this.records.splice(recordIndex, 1)[0];
	    this.balance += record.price;
	    this.stockValue -= record.price;
	  },
	
	  printFinances: function() {
	
	    console.log(this.name + ', ' + this.city + '; FINANCIAL REPORT: ');
	    console.log('Cash in bank: ' + '£' + this.balance / 100 + '; ' + 'Value of stock: ' + '£' + this.stockValue / 100);
	  },
	
	  buyFromCollector: function(collector, record) {
	
	    collector.sellToStore(record);
	    this.addRecord(record);
	    var purchasePrice = Math.floor(record.price * 0.9);
	    this.balance -= purchasePrice;
	  }
	    
	  
	}
	
	
	
	
	
	
	
	
	
	
	module.exports = RecordStore;

/***/ },
/* 2 */
/***/ function(module, exports) {

	var Collector = function(name){
	
	  this.name = name;
	  this.records = [];
	  this.balance = 0;
	  
	}
	
	Collector.prototype = {
	
	  addRecord: function(record){
	    this.records.push(record);
	  },
	
	  removeRecord: function(record) {
	
	    var recordIndex = this.records.lastIndexOf(record);
	    var record = this.records.splice(recordIndex, 1)[0];
	  },
	
	  sellToStore: function(record) {
	
	    this.removeRecord(record);
	    var sellingPrice = Math.floor(record.price * 0.9)
	    this.balance += sellingPrice;
	  },
	
	  buyRecord: function(recordStore, record) {
	
	    recordStore.sellRecord(record);
	    this.addRecord(record);
	    this.balance -= record.price;
	  }
	
	}
	
	
	
	  
	
	
	
	
	
	
	
	
	
	
	
	module.exports = Collector;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = [
	  { "artist": "Squarepusher",
	    "title": "Ultravisitor",
	    "price": 1499
	  },
	  { "artist": "Nirvana",
	    "title": "In Utero",
	    "price": 999
	  },
	  { "artist": "Sonic Youth",
	    "title": "Bad Moon Rising",
	    "price": 699
	  }
	]

/***/ },
/* 4 */
/***/ function(module, exports) {

	
	
	var Record = function(artist, title, price){
	
	  this.artist = artist;
	  this.title = title;
	  this.price = price;
	}
	
	
	
	
	
	
	
	
	
	
	module.exports = Record;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var Record = __webpack_require__(4);
	
	var RecordStoreView = function( recordStore ) {
	  this.recordStore = recordStore;
	};
	
	
	RecordStoreView.prototype = {
	
	  render: function( recordStore ) {
	    var body = document.getElementsByTagName('body')[0];
	    this.nameAndCity(recordStore, body);
	    this.inventory(recordStore, body);
	    this.addForm(recordStore, body);
	    this.saleForm(recordStore, body);
	
	    var button = document.getElementById('button');
	
	    button.onclick = function(event) {
	    event.preventDefault();
	
	    var recordStore = this.recordStore;
	    var body = document.getElementsByTagName('body')[0];
	    var artistInput = document.getElementById('new-artist');
	    var titleInput = document.getElementById('new-title');
	    var priceInput = document.getElementById('new-price');
	
	    var newArtist = artistInput.value;
	    var newTitle = titleInput.value;
	    var newPrice = priceInput.value;
	
	    newRecord = new Record(newArtist, newTitle, newPrice);
	    recordStore.addRecord(newRecord);
	    body.innerHTML = '';
	    this.render(recordStore);
	    }.bind(this);
	
	  },
	
	  nameAndCity: function(recordStore, body) {
	    var heading = document.createElement('h1');
	    heading.id = 'heading';
	    body.appendChild(heading);
	    heading.innerText = recordStore.name + ", " + recordStore.city;
	  },
	
	  inventory: function(recordStore, body) {
	    var invTable = document.createElement('table');
	    var topRow = document.createElement('tr');
	    var artistHeader = document.createElement('th');
	    var titleHeader = document.createElement('th');
	    var priceHeader = document.createElement('th');
	
	    invTable.id = 'table';
	
	    artistHeader.innerText = "Artist";
	    titleHeader.innerText = "Title";
	    priceHeader.innerText = "Price";
	
	    body.appendChild(invTable);
	    invTable.appendChild(topRow);
	    topRow.appendChild(artistHeader);
	    topRow.appendChild(titleHeader);
	    topRow.appendChild(priceHeader);
	
	    for (var record of recordStore.records) {
	      var itemRow = document.createElement('tr');
	      var artist = document.createElement('td');
	      var title = document.createElement('td');
	      var price = document.createElement('td');
	
	      invTable.appendChild(itemRow);
	      itemRow.appendChild(artist);
	      itemRow.appendChild(title);
	      itemRow.appendChild(price);
	
	      artist.innerText = record.artist;
	      title.innerText = record.title;
	      price.innerText = record.price/100;
	    }
	  },
	
	  addForm: function(recordStore, body) {
	    var form = document.createElement('form');
	    var artistLabel = document.createElement('label');
	    var artistInput = document.createElement('input');
	    var titleLabel = document.createElement('label');
	    var titleInput = document.createElement('input');
	    var priceLabel = document.createElement('label');
	    var priceInput = document.createElement('input');
	    var button = document.createElement('button');
	
	    body.appendChild(form);
	    form.appendChild(artistLabel);
	    form.appendChild(artistInput);
	    form.appendChild(titleLabel);
	    form.appendChild(titleInput);
	    form.appendChild(priceLabel);
	    form.appendChild(priceInput);
	    form.appendChild(button);
	
	    artistLabel.innerText = 'Artist name: ';
	    titleLabel.innerText = 'Album title: ';
	    priceLabel.innerText = 'Price(p): ';
	    button.innerText = 'Add to inventory';
	
	    artistInput.type = 'text';
	    titleInput.type = 'text';
	    priceInput.type = 'number';
	
	    artistInput.id = 'new-artist';
	    titleInput.id = 'new-title';
	    priceInput.id = 'new-price';
	
	    button.id = 'button';
	  },
	
	  // addAlbum: function(event) {
	  //   event.preventDefault();
	
	  //   var recordStore = this.recordStore;
	  //   var body = document.getElementsByTagName('body')[0];
	  //   var artistInput = document.getElementById('new-artist');
	  //   var titleInput = document.getElementById('new-title');
	  //   var priceInput = document.getElementById('new-price');
	
	  //   var newArtist = artistInput.value;
	  //   var newTitle = titleInput.value;
	  //   var newPrice = priceInput.value;
	
	  //   newRecord = new Record(newArtist, newTitle, newPrice);
	  //   recordStore.addRecord(newRecord);
	  //   body.innerHTML = '';
	  //   this.render(recordStore);
	  // }
	
	  saleForm: function(recordStore, body) {
	    var form = document.createElement('form');
	    var select = document.createElement('select');
	    var button = document.createElement('button');
	
	    select.id = 'select';
	    button.id = 'sellButton';
	    button.innerText = 'Sell Record'
	
	    body.appendChild(form);
	    form.appendChild(select);
	    form.appendChild(button);
	
	    for (record of recordStore.records) {
	      var option = document.createElement('option');
	      option.value = record.title;
	      option.innerText = record.artist + ', ' + record.title;
	      select.appendChild(option); 
	    }
	
	    button.onclick = function(event) {
	    event.preventDefault();
	    var select = document.getElementById('select');
	
	    for (record of recordStore.records) {
	      if (record.title === select.value) {
	        recordStore.sellRecord(record);
	        body.innerHTML = '';
	        this.render(recordStore);
	      }
	    }
	  }.bind(this)
	
	  }
	
	
	
	
	
	
	 
	
	};
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	module.exports = RecordStoreView;

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map