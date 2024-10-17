# App

My Ecommerce Clean Architecture App

## Functional Requirements
- [x] Implement an online sales system that allows placing orders with multiple items, including calculating shipping, taxes, applying discount coupons, and interacting with stock.
- [x] Implement payment and order cancellation flows.
- [x] Generate an order code.
- [x] Retrieve order information, displaying the order code, customer CPF, delivery address, items, prices, quantities, discounts, shipping cost, and total.
- [x] Implement the API and create a simple front-end to consume the API, place an order, and view it.

## Business Rules
- [x] Do not place an order with an invalid CPF.
- [x] Place an order with three items, each with description, price, and quantity.
- [x] Apply a discount coupon to the total order value only if it is not expired.
- [x] Check item stock before confirming an order; reduce stock upon order and increase stock if an order is canceled.
- [x] Calculate shipping cost based on distance, dimensions, and weight of products, returning the minimum rate if lower than calculated.
- [x] Calculate taxes for different product categories (musical instruments, accessories, books) with varying rates and adjust for November rates.

## Non-functional Requirements
- [x] Store the order in memory during testing.
- [x] Implement in-memory API for distance calculation between postal codes, always returning a fixed distance.
- [x] Use a repository pattern for aggregates (Order, Item, Coupon) in memory.
- [x] Implement database repositories for persistent storage and application folder structuring.
- [x] Refactor CPF validation algorithm.
- [x] Create modular test and implementation files adhering to TDD principles.
