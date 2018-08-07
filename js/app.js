'use strict'; //highlights any mistakes made with variables
console.log('js is linked');

//Template for all the stores
function storeConstruct (storeLocationPara, minCustPara, maxCustPara, avgCookPara){
  this.storelocation = storeLocationPara;
  this.minCust = minCustPara;
  this.maxCust = maxCustPara;
  this.avgCook = avgCookPara;
  this.randCust = getRandomCustomerCount; //BAD: improve this
  this.hourlyCookieSales = getHourlyCookieSales; //BAD: improve this
}

//uses the contuctor to build objects for each store location
var loc1stAndPike = new storeConstruct('1st and Pike', 23, 65, 6.3);
var locSeaTac = new storeConstruct('SeaTac Airport', 3, 24, 1.2);
var locSeattleCenter = new storeConstruct('Seattle Center', 11, 38, 3.7);
var locCapitolHill = new storeConstruct('Capitol Hill', 20, 38, 2.3);
var locAlki = new storeConstruct('Alki', 2, 16, 4.6);

//global variables
var storeLocations = [loc1stAndPike, locSeaTac, locSeattleCenter, locCapitolHill, locAlki];
var storeHours = ['6am', '7am', '8am', '9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'];

//function generates a random # based on the customer's estimated min and max customers, NOTE: MDN provided the formula outline 
function getRandomCustomerCount() { 
    var min = Math.ceil(this.minCust);
    var max = Math.floor(this.maxCust);
    var randomCustomerCount = Math.round(Math.floor(Math.random() * (max - min)) + min);
    return randomCustomerCount;
}

//function calculates the projected cookie sales by hour; outputs hourly sales numbers and total sales numbers in a single array
function getHourlyCookieSales() { 
  var hourlyCookieSalesArr = [];
  var totalCookieCount = 0;

  for(var i = 0; i < storeHours.length; i++){
    var tempCount = Math.round((this.avgCook * this.randCust()));
    hourlyCookieSalesArr.push(tempCount);
    totalCookieCount = tempCount + totalCookieCount;
  }
  
hourlyCookieSalesArr.push(totalCookieCount)
return hourlyCookieSalesArr;
}

//Execuion code
for(var j = 0; j < storeLocations.length; j++){//Loop generates an unordered list for each store location
  var loc = storeLocations[j];
  var heading = document.getElementById('header');
  var ul = document.createElement('ul');
  
  ul.textContent = loc.storelocation;
  heading.appendChild(ul);

  for(var k = 0; k < (loc.hourlyCookieSales().length); k++){//Nested loop fills out the store's unordered list with the # of cookies sold each hour 
  var storeSales = document.createElement('li');
  var hourlySalesDiv = document.createElement('div');
  
  hourlySalesDiv.textContent = loc.hourlyCookieSales()[k];
  storeSales.appendChild(hourlySalesDiv);
  ul.appendChild(storeSales);
  }
}


