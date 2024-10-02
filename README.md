---
Part 1
---

Scenario

We will implement an online sales system with the ability to place orders with multiple items, each with a variable quantity. The system will calculate shipping costs, taxes, apply discount coupons, and interact with inventory. Additionally, we will have payment and order cancellation processes.

Tests
1 - Should not place an order with an invalid CPF (Brazilian individual taxpayer registry identification)
2 - Should place an order with 3 items (including description, price, and quantity)
3 - Should place an order with a discount coupon (percentage off the total order)

Consider

Refactor the CPF validation algorithm we saw in class
Store the order in memory
Suggestions

Use your preferred programming language and testing library
Design the model as you wish and don't worry for now, we will implement it together in the next class with influences from DDD and Clean Architecture
Tips

There should be at least 2 files, one for testing and another that implements the proposed scenarios
Try to follow discipline, first creating a failing test, then making the test pass, and refactoring

---
Part 2
---
Tests

1 - Should not apply an expired discount coupon
2 - Should calculate the shipping cost based on distance (analyzing origin and destination ZIP codes), dimensions (height, width, and depth in cm), and product weight (in kg)
3 - Should return the minimum shipping price if it's higher than the calculated value

Consider

The distance between two ZIP codes should be resolved by an external API
The shipping cost will be calculated according to the formula
The minimum value is R$10.00
There are no different shipping modes (standard, express, ...) and the origin of products is always the same. Also, there's no difference in destination, whether it's a capital city or countryside, the calculation is basically done considering the distance, volume, and density transported
Suggestions

Create an in-memory implementation for the API that always returns a fixed value as the distance between ZIP codes
Shipping Cost Calculation Formula

Shipping Price = distance (km) * volume (m3) * (density/100)

Examples of occupied volume (cubic measurement)

Camera: 20cm x 15cm x 10cm = 0.003 m3
Guitar: 100cm x 30cm x 10cm = 0.03 m3
Refrigerator: 200cm x 100cm x 50cm = 1 m3

Examples of density

Camera: 1kg / 0.003 m3 = 333kg/m3
Guitar: 3kg / 0.03 m3 = 100kg/m3
Refrigerator: 40kg / 1 m3 = 40kg/m3

Examples

distance: 1000
volume: 0.003
density: 333
price: R$9.90 (1000 * 0.003 * (333/100))

distance: 1000
volume: 0.03
density: 100
price: R$30.00 (1000 * 0.03 * (100/100))

distance: 1000
volume: 1
density: 40
price: R$400.00 (1000 * 1 * (40/100))