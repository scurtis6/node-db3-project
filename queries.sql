-- Multi-Table Query Practice

-- Display the ProductName and CategoryName for all products in the database. Shows 77 records.
SELECT p.ProductName
	, c.CategoryName
FROM Product as p
INNER JOIN Category as c ON p.CategoryId = c.Id;

-- Display the order Id and shipper CompanyName for all orders placed before August 9 2012. Shows 429 records.
SELECT o.Id
	, s.CompanyName
FROM [Order] as o
INNER JOIN Shipper as s ON s.Id = o.ShipVia
WHERE o.OrderDate < '2012-08-09';

-- Display the name and quantity of the products ordered in order with Id 10251. Sort by ProductName. Shows 3 records.
SELECT p.ProductName
	, od.Quantity
    , od.orderId
FROM Product as p 
INNER JOIN Orderdetail as od ON p.Id = od.productId
WHERE od.orderId = 10251
ORDER BY p.ProductName

-- Display the OrderID, Customer's Company Name and the employee's LastName for every order. All columns should be labeled clearly. Displays 16,789 records.
SELECT o.Id
	, c.CompanyName
    , e.lastName as EmployeeLastName
FROM [Order] as o
INNER JOIN Customer as c ON o.customerId = c.Id
INNER JOIN Employee as e ON o.employeeId = e.Id

-- STRETCH PROBLEMS
-- In SQL Try Editor at W3Schools.com:
-- Displays CategoryName and a new column called Count that shows how many products are in each category. Shows 8 records.
SELECT c.CategoryName,
COUNT(c.CategoryName) as Count
FROM Categories AS c
JOIN Products AS p ON c.CategoryId = p.CategoryId
GROUP BY p.CategoryID

-- Display OrderID and a column called ItemCount that shows the total number of products placed on the order. Shows 196 records.
SELECT od.orderId,
COUNT(od.productId) as ItemCount
FROM Orderdetails AS od

-- The solution below works as well
-- GROUP BY od.orderId
-- SELECT od.orderId,
-- COUNT(*) as ItemCount
-- FROM Orderdetails AS od
-- GROUP BY od.orderId