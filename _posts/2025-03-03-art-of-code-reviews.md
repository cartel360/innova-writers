---
layout: post
author: Norman Fwamba
title: The Art of Code Reviews - Improving Quality and Collaboration
image: assets/images/code-reviews.jpg
tags: [ Code Review, Software Development, Best Practices, Collaboration ]
categories: [ Software Engineering, Development ]
description: If you’re reading this, chances are you’re either new to code reviews or looking to improve your skills. Either way, you’re in the right place. As a senior developer, I’ve spent countless hours reviewing code—both good and bad. Over time, I’ve learned what to look for and how to provide feedback that’s helpful, not harsh. In this blog, I’ll walk you through some examples and share tips to make your code reviews more effective. Let’s dive in.
---

## Tips to Do Better Code Reviews  

If you’re reading this, chances are you’re either new to code reviews or looking to improve your skills. Either way, you’re in the right place.

As a senior developer, I’ve spent countless hours reviewing code—both good and bad. Over time, I’ve learned what to look for and how to provide feedback that’s helpful, not harsh.

In this blog, I’ll walk you through some examples and share tips to make your code reviews more effective. Let’s dive in.

---

## Why Code Reviews Matter  
Before getting into the details, it's important to understand why code reviews are so valuable.

- **They catch bugs early**: A fresh pair of eyes can spot issues that might have been overlooked.
- **They improve code quality**: Reviews encourage clean, maintainable, and efficient code.
- **They share knowledge**: Team members learn from each other through the review process.
- **They build trust**: A good review process fosters collaboration and respect.

Now, let’s look at some common issues and how to address them.

---

## Review 1: Spotting Common Mistakes  
Everyone makes mistakes—it’s part of being human. But some mistakes are more common than others. Let’s consider a simple example:

```csharp
public class Calculator
{
    public int Add(int a, int b)
    {
        return a + b;
    }
}
```

### What’s Wrong Here?  
At first glance, this code looks fine. But what if someone passes a negative number? Or a very large number that causes an overflow? The code doesn’t handle these cases.

### How to Fix It  
Adding basic validation and error handling makes it more robust:

```csharp
public class Calculator
{
    public int Add(int a, int b)
    {
        if (a < 0 || b < 0)
        {
            throw new ArgumentException("Inputs cannot be negative.");
        }
        return a + b;
    }
}
```

Now, the code is more resilient and less likely to cause unexpected issues.

---

## Review 2: Handling Null Values  
One of the most common mistakes is forgetting to check for null values.

```csharp
public class Greeter
{
    public void Greet(string name)
    {
        Console.WriteLine($"Hello, {name}!");
    }
}
```

### What’s Wrong Here?  
If `name` is null, the program will crash with a `NullReferenceException`.

### How to Fix It  
Always check for null or empty values:

```csharp
public class Greeter
{
    public void Greet(string name)
    {
        if (string.IsNullOrEmpty(name))
        {
            Console.WriteLine("Hello, Guest!");
        }
        else
        {
            Console.WriteLine($"Hello, {name}!");
        }
    }
}
```

This makes the code more user-friendly and robust.

---

## Review 3: Avoiding Tight Coupling  
Tightly coupled code can be difficult to test and maintain.

```csharp
public class ReportGenerator
{
    private readonly Printer _printer;

    public ReportGenerator()
    {
        _printer = new Printer();
    }

    public void GenerateReport(string data)
    {
        _printer.Print(data);
    }
}
```

### What’s Wrong Here?  
The `ReportGenerator` class is tightly coupled to the `Printer` class, making it hard to test or replace with a different implementation.

### How to Fix It  
Use dependency injection to decouple the classes:

```csharp
public class ReportGenerator
{
    private readonly IPrinter _printer;

    public ReportGenerator(IPrinter printer)
    {
        _printer = printer;
    }

    public void GenerateReport(string data)
    {
        _printer.Print(data);
    }
}
```

Now, the code is more flexible and easier to test.

---

## Review 4: Replacing Magic Numbers  
Hardcoded values can make code harder to understand and maintain.

```csharp
public class Circle
{
    public double CalculateArea(double radius)
    {
        return 3.14 * radius * radius;
    }
}
```

### What’s Wrong Here?  
The value `3.14` is a magic number. If it needs to be updated (e.g., to use a more precise value of Pi), it would have to be changed in multiple places.

### How to Fix It  
Replace it with a constant:

```csharp
public class Circle
{
    private const double Pi = 3.14159;

    public double CalculateArea(double radius)
    {
        return Pi * radius * radius;
    }
}
```

This makes the code cleaner and easier to maintain.

---

## Review 5: Following the DRY Principle  
Repeating the same logic in multiple places leads to maintenance issues.

```csharp
public class MathOperations
{
    public int Square(int number)
    {
        return number * number;
    }

    public int Cube(int number)
    {
        return number * number * number;
    }
}
```

### What’s Wrong Here?  
The multiplication logic is repeated. If changes are needed, multiple places must be updated.

### How to Fix It  
Extract the repeated logic into a separate method:

```csharp
public class MathOperations
{
    public int Square(int number)
    {
        return Multiply(number, number);
    }

    public int Cube(int number)
    {
        return Multiply(number, Multiply(number, number));
    }

    private int Multiply(int a, int b)
    {
        return a * b;
    }
}
```

This improves maintainability and follows the DRY principle.

---

## Review 6: Avoiding Unnecessary Features (YAGNI)  
Adding features that aren't needed yet adds unnecessary complexity.

```csharp
public class ShoppingCart
{
    public void AddItem(string item)
    {
        // Add item to cart
    }

    public void ApplyDiscount(double discount)
    {
        // Apply discount logic
    }

    public void ApplyCoupon(string couponCode)
    {
        // Apply coupon logic (not needed yet)
    }
}
```

### What’s Wrong Here?  
The `ApplyCoupon` method isn’t needed at this stage, adding unnecessary complexity.

### How to Fix It  
Remove the unnecessary code:

```csharp
public class ShoppingCart
{
    public void AddItem(string item)
    {
        // Add item to cart
    }

    public void ApplyDiscount(double discount)
    {
        // Apply discount logic
    }
}
```

Now, the code is simpler and easier to understand.

---

### Key Takeaways:

✔ Always check for null handling and edge cases.

✔ Avoid tight coupling by using dependency injection.

✔ Simplify complex logic for better maintainability.

✔ Provide constructive, actionable feedback.

## Final Thoughts  
Code reviews are a powerful tool for improving code quality and fostering collaboration. By following these tips and keeping an eye out for common issues, you’ll become a more effective reviewer and a better developer.

Happy coding.

