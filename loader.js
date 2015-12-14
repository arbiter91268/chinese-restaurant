// constants 
var ORDER_CHEAP_ITEMS_FIRST = true;
var IGNORE_ITEM_GROUPS = false;
var SEASONAL_PRICE_STRING = "Seasonal Price";

$(document).ready(function() {
    var test = [54, 34, 75, 23, 1, 86, 34, 24];
    console.log(test.sort(function(a, b) {return a - b;}));
    console.log(orderPrices([54, 34, 75, 23, 1, 86, 34, 24])); // a simple test
    $.getJSON("data/lunch_menu.json", function(data) {
        var dishes = [];
        $.each(data, function(i, field) {
            $.each(field, function(i, field) {
                dishes.push(field);
                if ($.get(data, "price") == -1) {
                    data = SEASONAL_PRICE_STRING;
                }
                if (ORDER_CHEAP_ITEMS_FIRST) {
                    orderPrices(data);
                }
            });
        }); 
        console.log(dishes);
    });
});

function orderPrices(data) {
    var ordered = [];
    var count = 0;
    var indicesToIgnore = [];
    while (count < data.length) {
        var smallest = 10000;
        var index = 0;
        checker: for (var i = 0; i < data.length; i++) {
            for (var j in indicesToIgnore) {
                if (i == j) {
                    continue checker;
                }
            }
            if (data[i] <= smallest) {
                smallest = data[i];
                index = i;
            }
        }
        ordered.push(smallest);
        indicesToIgnore.push(index);
        count++;
    }
    return ordered;
}