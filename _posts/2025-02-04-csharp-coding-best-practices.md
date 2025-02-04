---
layout: post
title: C# Coding Best Practices - Coding conventions with examples.
author: Fredrick Kamau
categories: [Software Development]
image: assets/images/Coding-conventions.png
tags: [asset allocation]  
description: Coding conventions are a set of guidelines and standards that every developer should follow when writing code. Code written following the industry best practices is easier to read, understand, maintain and extend. It also improves the clarity of your code, minimizes bugs, and makes collaboration across teams easier
---

### Write code that is readable, maintainable and easy to extend.


Coding conventions are a set of guidelines and standards that every developer should follow when writing code. Code written following the industry best practices is easier to read, understand, maintain and extend. It also improves the clarity of your code, minimizes bugs, and makes collaboration across teams easier.
In this article we will go through the best code conventions that you should follow as a C# developer.

### 1. Naming Conventions

**i) PascalCase(UpperCamelCase)**

PascalCase is used in naming C# types(Classes, Structures, Interfaces etc), Namespaces, Properties, Enums, Constants and read only fields. For example:

```csharp
✅ namespace Myapp{ }
✅ public class Bank { }
✅ public void GetCustomerById(Guid Id) { }
✅ public int BankBalance { get; set; }  
✅ public const int MaxRetryCount = 3;
✅ private readonly string DefaultPath = "/files";
```

**ii) camelCase(lowerCamelCase)**

CamelCase is used to name local variables, method parameters and private fields. You can prefix private fields with an underscore. For example:

```csharp
✅ int itemCount = 10;
✅ void AddCustomer(string customerName) { }
✅ private int _maxLimit;
```

**iii) Use meaningful names.**
All the names should be descriptive and meaningful. The following example is a car class and has a few properties and methods.

        ```csharp
        class Car 
        {
          string color;
          int maxSpeed;
        
          static void Main(string[] args)
          {
            Car myObj = new Car();
            myObj.color = "red";
            myObj.maxSpeed = 200;
            Console.WriteLine(myObj.color);
            Console.WriteLine(myObj.maxSpeed);
          }
        }
        ```

**iv)  Do prefix interfaces with the letter I.**

Interface names should be noun (phrases) or adjectives.
        
```csharp
//Correct
public interface IShape
{
}
public interface ICar
{
}

public interface Car
{
}

//Avoid
public interface Shape
{
}
public interface Car
{
}

public interface ICar
{
}
```

        
    



### 2. Code Formatting and Indentation

**i) Use Braces on a new line(the Allman style)**
   ```csharp
   //Follow this
   if (condition)
   {
      DoSomething();
   }
   // Avoid this
   if (condition) {
   DoSomething();
   }
```

**ii) Avoid Unnecessary blank lines**

  
   ```csharp
   //Follow this
   public void ProcessOrder()
   {
        ValidateOrder();
        SaveOrder();
        SendConfirmation();
   }
   // Avoid this
  public void ProcessOrder()
   {
        ValidateOrder();
        
        SaveOrder();
        
        SendConfirmation();
   }
```

**iii) Indentation**

Indentation refers to the spaces at the beginning of a code line. To enhance code readability use consistent indentation, use four spaces and avoid using tabs to maintain consistency across environments. Remember to keep method statements short by breaking long statements into multiple lines. The preferred length should be less than 15 lines. 


3. Comments 

Comments are excellent tools for explaining the purpose of your code, providing context, and clarifying complex parts of your program. They enable you to document code and clarify complex parts of your program.The following rules should be followed when writing comments:
* Use single-line comments (//) for brief explanations and multi-line comments for longer ones  (/* */) 
* use XML comments For describing methods, classes, fields, and all public members.
* Place comments on a separate line and not at the end of a line of code. 
* Comments should start with a uppercase letter and the text should end with a period.
* Avoid redundant comments as shown in the following example.

```csharp
// Assigns 10 to maxItems
int maxItems = 10;
```

4. General C# coding best practice

a)  Use Named Arguments in method calls

When calling a method, arguments are passed with the parameter name followed by a colon and a value. Named arguments improve code readability especially with methods with multiple parameters.

```csharp
    // Method
    public void DoSomething(string foo, int bar) 
    {
    ...
    }
    // Avoid
    DoSomething("someString", 1);
    // Correct
    DoSomething(foo: "someString", bar: 1);
```


b) Declare all member variables at the top of a class, with static variables at the very top, prevents the need to hunt for variable declarations.

```csharp
// Correct
public class Account
{
  public static string BankName;
  public static string BankBranch;      
  public DateTime DateOpened { get; set; }
  public DateTime DateClosed { get; set; }
  public decimal Balance { get; set; }     
  // Constructor
  public Account()
  {
    // ...
  }
}
```


c) Variable Declaration.
use var when the type is obvious and an explicit type when the type is not obvious
```csharp
//Correct - when the type is obvious
var customer = new Customer();
//Avoid
Customer customer = new Customer();
```

```csharp
//Correct - when the type is not obvious
Dictionary<int, string> customers = GetCustomers();
//Avoid
var customers = GetCustomers(); // Not clear
```



### Conclusion
Code isn't just written for machines, it's written for humans too. Following consistent code conventions leads to a readable, maintainable and extendable code that benefits both small teams and large open source projects. You can use tools like EditorConfig and StyleCop that automatically check and enforce code conventions.

