---
layout: post
title: Derivatives - Hedging With Options
author: Joy Omondi
categories: [ Documentation]
image: assets/images/derivatives.png
tags: [capital markets, risk management]  
description: "Financial derivatives just from its name *derivative* is a financial instrument that derives its value from the performance of an underlying asset like stocks and other financial instruments"
---


### Introduction
Financial derivatives just from its name "*derivative*" is a financial instrument that derives its value from the performance of an underlying asset like stocks and other financial instruments

Derivatives aid in hedging and speculation of market movements hence help in reducing risk and preventing losses.

There are different financial derivatives : 
-   Forwards
  - Futures
  - Options 
  - Swaps  



##### *Note* : When you buy a financial instrument, we say you have taken a long position and when you sell an asset you have taken a short position. 

Therefore hedging helps reduce risks by letting you engage in a financial transaction that offsets a long position by taking a short position or vice versa. 

*Our focus throughout this will be on options.*

There are different types of options. *Those that are exercised at maturity date (European options) or those that can be exercised anytime until the time of maturity (American Options).*

There are two commonly known types of options, that is, the put option and call options.
- *Put Options*: are derivatives that give the seller the right but not the obligation to sell an underlying asset at a predetermined price (Strike price) and at a specified date.

*Note*: The value of a put option increases as the price of the underlying asset falls.
For example if your strike price is 80Ksh and the spot rate is 75Ksh. It means you will sell your asset at a premium and therefore make a profit.

- *Call options*: are derivatives that give the buyer the right but not the obligation to buy an underlying security as a given strike price at a given date.

*Note*: A call option is more valuable when the price of the underlying asset is rising. 
For example if the buyers strike price is set at 80ksh but the spot rate is 85ksh, the buyer will benefit because they will buy the underlying asset at a discount and sell it a profit.

So when are options used:
- options can be taken on various financial instruments including : stocks, interest rates, currencies and even commodities. 

There are different terms one needs to acquaint themselves when trading currency options 
- out-of-the-money : This is when the spot rate is below the strike price (exercise price) of a call option
- In-the-money : This is when the spot rate is above the strike price of a call option.

Put options are a vice versa of the above, that is,
- A put option is in-the-money when the spot rate is below the strike price, and it is out-of-the-money when the spot rate is above the strike price.


### Advantages of hedging with options

- Options give you the right but not the obligation to exercise it. Therefore if the market price is more favorable then the buyer can opt not to exercise their option
    - This limits risk for the buyer especially if there is fluctuations of the underlying stock
 
- On the sellers part, the seller receives a premium  which is paid by the buyer. This acts as a profit when the option buyer does not exercise their option especially where the market prices is below or at the strike price on the maturity date.

### Disadvantages of Hedging with Options
- Loss of the buyers side : Buying options requires paying a premium, which can be costly over time if the options expire worthless and the hedge isn’t used.
- Hedging with options require knowledge on volatility, time decay, strike price and spot price which may appear complex to some.
- Options have an expiration date which means an investor has to renew the hedge after the expiration date. 
- Risk of over-hedging: when an investor hedges to much against losses they may forget or limit the possibility gaining.

In pricing options one can use the Black Scholes Options Pricing Model which has the following assumptions:
- The risk-free rate is known and constant over the life of the option.
- The probability distribution of stock prices in log-normal.
- The variability of a stock’s return is constant.
- The option is to be exercised only at maturity, if at all.
- There are no transaction costs involved in trading options.
- Tax rates are similar for all participants who trade options.
- The stock of concern does not pay cash dividends.

Black Scholes Model:

$$  
call = \ (P \times N(d_{1})) - e^{iT} \times K \times N(d_{2})
$$

Where:
  - call = the value of a call option on a share of non-dividend-paying stock.
  - 𝑃 = the current share price
  - 𝐾 = the exercise price of the call option 
  - 𝑖 = a constant riskless rate of interest in continuously compounded returns
  - 𝜎 = the instantaneous standard deviation of return on the stock
  - 𝑇 = the time to expiration of the option expressed as a fraction of one period
  - $$ d_{1}   = \frac{\ln \left( \frac{P}{K} \right) + \left( i + \frac{\sigma^2}{2} \right) T}{\sigma \sqrt{T}}\ ]$$
 
  
 - $$ d_{2} = \ [ d_1 - \sigma \sqrt{T}\ ] $$
 
 -  N(∙)   the standard normal cumulative distribution function

 - N (d1)value is obtained from the standard normal tables

#### Conclusion
Options are financial derivatives used for hedging against risk. You can use currency options for example to hedge against currency volatility that may affect your travel expenditures in the future or your investment. The fact that you have a right but not the obligation to exercise it especially if it doesn't favor you is good for any investor. But remember, when your option is worthless you loose your premium. 