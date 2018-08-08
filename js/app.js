'use strict'; //highlights any mistakes made with variables
console.log('js is linked');

//Template for all the stores
function StoreConstruct (storeLocationPara, minCustPara, maxCustPara, avgCookPara){
  this.storelocation = storeLocationPara;
  this.minCust = minCustPara;
  this.maxCust = maxCustPara;
  this.avgCook = avgCookPara;
}

//protypes for object methods
StoreConstruct.prototype.randCust = getRandomCustomerCount;
StoreConstruct.prototype.cookieHourlySales = getCookieHourlySales;

//uses the contuctor to build objects for each store location
var loc1stAndPike = new StoreConstruct('1st and Pike', 23, 65, 6.3);
var locSeaTac = new StoreConstruct('SeaTac Airport', 3, 24, 1.2);
var locSeattleCenter = new StoreConstruct('Seattle Center', 11, 38, 3.7);
var locCapitolHill = new StoreConstruct('Capitol Hill', 20, 38, 2.3);
var locAlki = new StoreConstruct('Alki', 2, 16, 4.6);

//global variables
var cookieSoldTotals = Array(17).fill(0);
cookieSoldTotals[0] = 'Total';//first element in the array stores the row's title

var storeLocations = [loc1stAndPike, locSeaTac, locSeattleCenter, locCapitolHill, locAlki];
var storeCount = storeLocations.length;
var tableHead = ['','6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm', 'Total'];

var formElt = document.getElementById('storeForm');

//function generates a random # based on the customer's estimated min and max customers, NOTE: MDN provided the formula outline 
function getRandomCustomerCount() { 
    var min = Math.ceil(this.minCust);
    var max = Math.floor(this.maxCust);
    var randomCustomerCount = Math.round(Math.floor(Math.random() * (max - min)) + min);
    return randomCustomerCount;
}

//function calculates the projected cookie sales by hour for a store, totals the absolute # of cookies sold, and the # of cookies sold by hour for all stores; outputs the stores hourly sales numbers and it's total amount sold in a single array
function getCookieHourlySales() { 
  var hourlyCookieSalesArr = [];
  var totalCookieCount = 0;

for(var i = 1; i < 16; i++){
    var tempCount = Math.round((this.avgCook * this.randCust()));//calculates the projected # of cookies sold that hour 
    hourlyCookieSalesArr.push(tempCount);//adds the number of cookies sold during that hour into the store's hourly sales array
    totalCookieCount += tempCount; //running total for number of cookies sold at the store's location for the day
    cookieSoldTotals[i] += tempCount; //adds the total number of cookies sold during each hour into the array, totals are stored in [1] thru [15]
    cookieSoldTotals[16] += tempCount; //adds the total numeber of cookies sold by each store to the grand total # of cookies sold, the grand total is stored in [16]
  }

hourlyCookieSalesArr.push(totalCookieCount);//adds the total # of cookie sales to the store's hourly sales array, stored as the final element in the array 
return hourlyCookieSalesArr;
}

//functions creates or ammends (if row already exists) row in the table
function printTableRow(elIdPara, elPara, variablePara, iteration){
  var elIds  = document.getElementById(elIdPara + elPara + iteration);
  if(elIds){
    elIds.textContent = variablePara;
  }else{
    var elId = document.getElementById(elIdPara);
    var el = document.createElement(elPara);
    el.textContent = variablePara;
    el.id = elIdPara + elPara + iteration;
    elId.appendChild(el);
  }
}

//Table printing functions
function printHeader(){
  for(var m = 0; m < tableHead.length; m++){//Loop generates table header and fills it in with 1 hour increments
   printTableRow('tableHeader', 'td', tableHead[m], m);
  }
}

function printTable(counterStart, counterEnd){
  for(var j = counterStart; j < counterEnd; j++){//Loop generates table rows for each store
    var loc = storeLocations[j];
    var cookieHourlySales = loc.cookieHourlySales();
    var tbody = document.getElementById('tableBody');
    var storeTr = document.createElement('tr');
    var storeTd = document.createElement('td');
  
    storeTd.textContent = loc.storelocation;
    storeTr.appendChild(storeTd);
    tbody.appendChild(storeTr);

    for(var k = 0; k < (cookieHourlySales.length); k++){//Nested loop fills out the store's table row with # of cookies sold each hour 
      var storeHourlySales = document.createElement('td');

      storeHourlySales.textContent = cookieHourlySales[k];
      storeTr.appendChild(storeHourlySales);
    }
  }
}

function printFooter(){
  for(var n = 0; n < cookieSoldTotals.length; n++){//Loop generates footer row and fills it with the total # of cookies sold each hour
    printTableRow('tableFooter', 'td', cookieSoldTotals[n], n);
  }
}

//execution code
printHeader();
printTable(0, storeCount);
printFooter();

//listening for user input
formElt.addEventListener('submit', function(e){
  e.preventDefault();
  var storeCreatedFromForm = new StoreConstruct(e.target.storeName.value, e.target.minCust.value, e.target.maxCust.value, e.target.avgCust.value);
  storeLocations.push(storeCreatedFromForm);
  storeCount += 1;
  printTable((storeCount-1), storeCount);
  printFooter();
})