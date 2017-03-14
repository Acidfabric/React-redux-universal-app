fs = require('fs');
var parser = require('xml2json');
var parseString = require('xml2js').parseString;

fs.readFile( './books.xml', function(err, data) {
    var titles = []
    var js = parseString(data, function(err,result){
        for (var i = 0; i < result.catalog.book.length; i++){
            var title = result.catalog.book[i].title

            titles.push(title)
             
        }
        console.log(titles)
    }
    )

});
