const { log } = require("console");
const fs = require("fs");

//FileWriting
//Sync Call
// fs.writeFileSync('newFile.txt' ,'Hello this is and asynchronous file')

//Asynch call
// fs.writeFile("./secondFile.txt" , "Hello this is and asynchronous", (err)=>{console.log(err);})

//FileReading
// const result = fs.readFileSync("./Contact.txt", "utf-8");
// console.log(result);

// fs.readFile("./Contact.txt", "utf-8", (err, result) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(result);
//   }
// });

//FileAppending
// fs.appendFileSync('./Contact.txt' , `Zaid data here: \n` )

//copy file
fs.cpSync('./secondFile.txt', './copyFile.txt')


// Delet file
fs.unlinkSync('./copyFile.txt')