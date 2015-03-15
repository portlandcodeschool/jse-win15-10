// //Number 1
// console.log('HELLO WORLD');

// //Number 2
// var sum = 0;
// for(i = 2; i < process.argv.length; ++i ){
// 	sum += Number(process.argv[i]);

// };
// console.log(sum);

// //Number 3

// var fs = require('fs');
// var fileName = process.argv[2];

// var buffer = fs.readFileSync(fileName, {encoding: 'utf8'});
// // console.log(buffer);
// var arrBuffer = buffer.split('\n');
// console.log(arrBuffer.length - 1);


// // Number 4
// var fs = require('fs');
// var fileName = process.argv[2];

// fs.readFile(fileName, {encoding: 'utf8'}, function (err, data) {
// 	buffer = data;
// 	var arrBuffer = buffer.split('\n');
// 	console.log(arrBuffer.length - 1);

// 	if(!err){
// 		console.log(files)
// 	} else {
// 		throw err;
// 	}

// });

// // Number 5
var fs = require('fs');
var pathName = process.argv[2];
var extName = process.argv[3];

fs.readDir(pathName, extName,var pathName = process.argv[2]; function (err, data) {
	buffer = data;
	var arrBuffer = buffer.split('\n');
	console.log(arrBuffer.length - 1);

	if(!err){
		console.log(files)
	} else {
		throw err;
	}

});

