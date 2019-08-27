data = '[{"name" : "Charles Vogt", "account_id" : "101", "current_balance": 0},{"name" : "Mariam Martinet", "account_id" : "102", "current_balance": 0}]'
var currentSelectedAccount = null;
var mydata = JSON.parse(data);
var readline = require('readline');


var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


console.log("LIST OF ACCOUNTS:\n")
mydata.forEach(element => {
    console.log(element)
});


rl.question("Enter an Account_ID: ", function(answer) {
    // TODO: Log the answer in a database
    currentSelectedAccount = mydata.find(account => account.account_id === answer)
    console.log("Current selected account %s belonging to %s:", currentSelectedAccount.account_id, currentSelectedAccount.name);
    console.log("Current account balance %s\n", currentSelectedAccount.current_balance)
    rl.close();
  });

