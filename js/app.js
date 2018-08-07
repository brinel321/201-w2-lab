'use strict'; //highlights any mistakes made with variables
console.log('js is linked');

//customer details for the 1st and Pine location
var loc1stAndPike = { 
  location: '1st and Pike',
  minCust: 23,
  maxCust: 65,
  avgCook: 6.3,
  randCust: getRandomCustomerCount,
  hourlyCookieSales: getHourlyCookieSales
}

//customer details for the SeaTac Airport location
var locSeaTac = { 
  location: 'SeaTac Airport', 
  minCust: 3,
  maxCust: 24,
  avgCook: 1.2,
  randCust: getRandomCustomerCount,
  hourlyCookieSales: getHourlyCookieSales
}

//customer details for the Seattle Center location
var locSeattleCenter = { 
  location: 'Seattle Center',
  minCust: 11,
  maxCust: 38,
  avgCook: 3.7,
  randCust: getRandomCustomerCount,
  hourlyCookieSales: getHourlyCookieSales
}

//customer details for the Capitol Hill location
var locCapitolHill = { 
  location: 'Capitol Hill',
  minCust: 20,
  maxCust: 38,
  avgCook: 2.3,
  randCust: getRandomCustomerCount,
  hourlyCookieSales: getHourlyCookieSales
}

//customer details for the Alki location
var locAlki = { 
  location: 'Alki',
  minCust: 2,
  maxCust: 16,
  avgCook: 4.6,
  randCust: getRandomCustomerCount,
  hourlyCookieSales: getHourlyCookieSales
}

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
    hourlyCookieSalesArr.push(storeHours[i] + ': ' + tempCount + ' cookies');
    totalCookieCount = tempCount + totalCookieCount;
  }
  
hourlyCookieSalesArr.push('Total: ' + totalCookieCount + ' cookies')
return hourlyCookieSalesArr;
}

//Execuion code
for(var j = 0; j < storeLocations.length; j++){//Loop generates an unordered list for each store location
  var loc = storeLocations[j];
  var heading = document.getElementById('header');
  var ul = document.createElement('ul');
  
  ul.textContent = loc.location;
  heading.appendChild(ul);

  for(var k = 0; k < (loc.hourlyCookieSales().length); k++){//Nested loop fills out the store's unordered list with the # of cookies sold each hour 
  var storeSales = document.createElement('li');
  var hourlySalesDiv = document.createElement('div');
  
  hourlySalesDiv.textContent = loc.hourlyCookieSales()[k];
  storeSales.appendChild(hourlySalesDiv);
  ul.appendChild(storeSales);
  }
}
