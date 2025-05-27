---
layout: post
title: System Design chapter 13 - Idempotency 
author: Fredrick Kamau
categories: [Software Development]
image: assets/images/Idempotency.png
tags: [Idempotency, Distributed Systems, Fault Tolerance, API Design]  
description: Imagine you are in making a purchase from an online market place like Amazon. When you click on the 'pay' button, the browser freezes or you experience a timeout error and you are not sure if the payment went through. So a quick solution is to refresh the browser and try again. What if the first purchase actually went through and was successful?
---


Imagine you are in making a purchase from an online market place like Amazon. When you click on the 'pay' button, the browser freezes or you experience a timeout error and you are not sure if the payment went through. So a quick solution is to refresh the browser and try again. What if the first purchase actually went through and was successful? How does the payment service ensure that you are not charged twice?
This scenario is a common problem in distributed systems: how to handle duplicate operations gracefully. The elegant solution to this problem lies in the concept of Idempotency. In this article we are going to define Idempotency, it's importance, implementation, challenges and the best practices to follow.


### What is Idempotency?

Idempotency is a property that ensures the result of an operation remains the same even if an operation is repeated more than once.

An operation is idempotent if perfoming it once or more than once produces the same result. 

For example:
1. GET /products/123 → SQL SELECT
```sql
SELECT * FROM products WHERE id = 123;
```
Fetching a product with an id will always return the same product no matter how many times you run the operation.

2. DELETE /product/123 → SQL DELETE

```sql
DELETE FROM products WHERE id = 123;
```
The operation is idempontent since deleting the same product does the same thing. The first operation deletes and subsequent operations does nothing.

3. POST /charge → SQL INSERT

```sql
INSERT INTO transactions (user_id, amount, status)
VALUES (123, 100.00, 'completed');
```
The operation is **not** Idempotent as it creates multiple charges. Without applying necessary safeguards, a user will be charged multiple times.

### Why Idempotency Matters
Distributed systems require fault tolerance to ensure high reliability. Fault tolerance is the ability of a system to recover from failures and continue operating smoothly without significant downtimes. One of the methods of implementing fault tolerant systems is by retrying an operation multiple times if it fails. The retries might take longer as expected and the client might assume the operation was not successful thereby refreshing the browser and making a duplicate request. If the system handles retries without idempotency, every retry could change the system’s state unpredictably.

### How to implement idempotency
**1. Use an Idempotency Key**

Attach a unique key identifier also known as idempotency key to each request. This can be attached on the request header, query string or inside the request body. Every new request will generate a new key on the client-side which will persisted somewhere on the server-side once it has been processed. If the server receives a request with the same ID, it will be skipped preventing a duplicate transaction.

**2. Database Constraints**

Checking for idempotency key before persisting data can still fail due to concurrent retries and race conditions. This happens when two identical requests hit the server simultaneously therefore being treated as "first-time" requests. To prevent this you can go a step further at the database level by adding constraints. Add a unique constraint on idempotency_key field.

```sql
CREATE TABLE Payments (
    Id INT PRIMARY KEY IDENTITY,
    UserId INT,
    Amount DECIMAL(10, 2),
    IdempotencyKey VARCHAR(100) UNIQUE NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE()
);
```
 Now, if a duplicate request comes with the same key, the DB will reject.
 
 ```sql
-- First insert - OK
INSERT INTO Payments (UserId, Amount, IdempotencyKey) 
VALUES (1, 100.00, 'pay-abc-123');

-- Retry with same key - Fails
INSERT INTO Payments (UserId, Amount, IdempotencyKey) 
VALUES (1, 100.00, 'pay-abc-123')
```
You can catch this in your app to return a 409 Conflict or 200 OK with cached response.


**3. Idempotency in Messaging Queues**

In a [message queue](https://fredkamau.com/posts/Message-Queues/) such as RabbitMQ and Kafka, we can enforce Idempotency by storing a log of processed message IDs and checking against for every incoming message. The producer should attach a unique messageId to every published message. The consumer should check if the message has been processed, before processing to avoid duplicates.  
Example in C#:
```csharp
public class ProcessedMessage
{
    public Guid Id { get; set; }
    public string MessageId { get; set; } = null!;
    public DateTime ProcessedAt { get; set; } = DateTime.UtcNow;
}
```

```csharp
public async Task HandleMessageAsync(MyEvent message)
{
    var exists = await _dbContext.ProcessedMessages
        .AnyAsync(x => x.MessageId == message.MessageId);

    if (exists)
    {
        _logger.LogInformation("Duplicate message ignored: {MessageId}", message.MessageId);
        return;
    }

    // 1. Process the message (e.g., charge payment)
    await _paymentService.ChargeAsync(message.OrderId, message.Amount);

    // 2. Save message as processed
    _dbContext.ProcessedMessages.Add(new ProcessedMessage
    {
        MessageId = message.MessageId
    });

    await _dbContext.SaveChangesAsync();
}
```

### Challenges and Considerations

**1. Performance Overhead -** Storing idempotency keys or checking for duplicate operations can add overhead and increase the overall latency.

**2. Distributed Systems -** Implementing idempotency across distributed systems can be challenging and may require distributed locking or consensus algorithms.

**3. Storage and Management of Idempotency Keys** - You must persistently store idempotency keys to detect and prevent duplicate processing. This requires additional storage and read/write operations.

**4. Handling Race Conditions** - When the same idempotency key is used in rapid succession e.g. double-click or retry, concurrent requests may race. You need to implement complex locking or queue logic to serialize the requests.


### Best Practices for Idepontency
**1. Design for Idempotency before writing code** - It's far much easier to design for indepotency before implementation. Measure twice, cut once.

**2. Employ Idempotent HTTP Methods** -  Prefer idempotent methods (GET, PUT, DELETE) for operations that may be retried; design POST with unique identifiers if idempotency is required.

**3. Set a TTL for Stored Keys** - You should store idempotency keys only for a limited time e.g 24 hours to avoid bloating the database.

**4. Idempotency Data Storage** - Use a persistent datastore to ensure data durability.

**5. Document Idempotent Operations in your API specifications** - Clearly document which operations are idempotent in your API specifications,.

**6.Use Locks and concurrency control** - Use locks and optimistic concurrency control to manage simultaneous requests safely.

**7. Test Thoroughly:** : Implement tests that verify the idempotency of your operations, including edge cases and failure scenarios.









