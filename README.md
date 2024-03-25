![image](https://github.com/as31212/Cash-Register/assets/89617993/6d6563c1-f886-4a7b-a078-f695a67b48dd)


Build a Cash Register
Here you'll build a cash register app that will return change to the customer based on the price of the item, the amount of cash provided by the customer, and the amount of cash in the cash drawer. You'll also need to show different messages to the user in different scenarios, such as when the customer provides too little cash or when the cash drawer doesn't have enough to issue the correct change.

In the script.js file, you have been provided with the price and cid variables. The price variable is the price of the item, and the cid variable is the cash-in-drawer, which is a 2D array listing the available currency in the cash drawer.

The other variable you will need add is the cash variable, which is the amount of cash provided by the customer for the item, which is provided via an input element on the page.

If you'd like to test your application with different values for price and cid, make sure to declare them with the let keyword so they can be reassigned by our tests.

Your application should show different messages depending on the price of the item, the amount of cash provided by the customer, and the amount of cash in the drawer:

"Status: INSUFFICIENT_FUNDS": if cash-in-drawer is less than the change due, or if you cannot return the exact change.
"Status: CLOSED": if cash-in-drawer is equal to the change due.
"Status: OPEN": if cash-in-drawer is greater than the change due and you can return change, with the change due in coins and bills sorted in highest to lowest order.

![image](https://github.com/as31212/Cash-Register/assets/89617993/711a54d5-674d-4fbf-9e6b-c342c1f9395f)
Objective: Build an app that is functionally similar to https://cash-register.freecodecamp.rocks

![image](https://github.com/as31212/Cash-Register/assets/89617993/68cacf13-a94a-4044-a972-69751393767d)
