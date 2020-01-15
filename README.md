# Inventory-Order Manager
A service that allows customers to place orders via a REST API.

# Installation
To test the functionality, first clone the repository using Git Bash.
```
git clone https://github.com/huynhcam1/Inventory-Order-Manager.git
```
Head over to the server folder and download all the appropriate packages.
```
cd Inventory-Order-Manager/server/
npm install
```

# Testing
Run the following unit tests to ensure there are no errors. IMPORTANT: the database must be empty first for all the tests to pass,
so I highly suggest running this first.
```
npm test
```
To make your own requests, please run the server locally.
```
npm start
```
Once the server runs successfully, you can begin sending requests to either the inventories or orders:
- http://localhost:3000/inventories/
- http://localhost:3000/orders/

Feel free to make your own requests, but here are some example JSON templates you can use:
```
// for adding/updating new inventory

{
    "name": "Sample name",
    "description": "Sample description.",
    "price": 6.99,
    "quantity": 10
}
```
```
// for adding new orders

{
    "inventories": [
        {
            "inventory": "<insert valid inventory id here>",
            "quantity": 0
        },
        {
            "inventory": "<insert valid inventory id here>",
            "quantity": 0
        }
    ],
    "email": "test@email.com",
    "date": "2020-01-15",
    "status": "PREPARED"
}
```
Make sure to replace **\<insert valid inventory id here\>** with a valid inventory id which can be obtained by getting all inventories.

```
// for updating order status (PREPARED, SHIPPED, RECEIVED)

{
    "status": "SHIPPED"
}
```
