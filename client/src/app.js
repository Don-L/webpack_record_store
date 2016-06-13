var RecordStore = require( "./record_store/RecordStore.js" );
var sampleRecords = require("./sample.json");
var Record = require("./record_store/Record.js");
var Collector = require("./record_store/Collector.js");
var RecordStoreView = require("./record_store/RecordStoreView.js")


window.onload = function() {
  console.log("app loaded");

  var recordStore = new RecordStore('Missing Records', 'Glasgow');

  for (var record of sampleRecords) {
    recordStore.addRecord(record);
  };

  var recordStoreView = new RecordStoreView(recordStore);

  recordStoreView.render(recordStore);

};