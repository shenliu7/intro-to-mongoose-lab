const prompt = require('prompt-sync')();

const username = prompt('What is your name? ');

console.log(`Welcome, ${username}!`);


/*-------------------------------- Starter Code --------------------------------*/

const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');
const Customer = require('./models/customer')

const connect = async () => {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    await runQueries()
    console.log('Disconnected from MongoDB');
    process.exit();

};

const runQueries = async () => {
  console.log('Queries running.')
  let exit = false;
  while (!exit) {
    mainMenu();
    const choice = prompt('Number of action to run: ');

    if (choice === '1') {
        await createCustomer();
    } else if (choice === '2') {
        await viewCustomers();
    } else if (choice === '3') {
        await updateCustomer();
    } else if (choice === '4') {
        await deleteCustomer();
    } else if (choice === '5') {
        await mongoose.disconnect();
        exit = true
    } else {
        console.log('Invalid choice. Please try again.')
    }
  }
};

const mainMenu = () => {
    console.log('\nWelcome to the CRM');
    console.log('What would you like to do?\n');
    console.log('  1. Create a customer');
    console.log('  2. View all customers');
    console.log('  3. Update a customer');
    console.log('  4. Delete a customer');
    console.log('  5. Quit');
};

const createCustomer = async () => {
    const name = prompt("What is the customer's name? ");
    const age = prompt("What is the customer's age? ");

    const customer = await Customer.create({name, age: parseInt(age, 10)});
    console.log("New Customer: ", customer)

}

const viewCustomers = async () => {
    const customers = await Customer.find({});
    console.log('===================================')
    console.log(customers)
    console.log('===================================')
}

const updateCustomer = async () => {
    await viewCustomers();
    const id = prompt('Enter the id of the customer to update: ');
    const name = prompt('What is the customers new name? ');
    const age = prompt('What is the customers new age? ');

    await Customer.findByIdAndUpdate(id, { name, age: parseInt(age, 10) });
    console.log('Customer updated!');

}

const deleteCustomer = async () => {
    await viewCustomers();
    const id = prompt('Enter the id of the customer to delete: ');
  
    await Customer.findByIdAndDelete(id);
    console.log('Customer deleted!');
  };


/*-------------------------------- Query Functions --------------------------------*/


connect()
