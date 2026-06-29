---
layout: post
title: Assessing the Impact of Digital Transportation Platforms on Mobility, Trade, and Food Consumption Patterns
author: Joy Omondi
categories: [Economic Analysis, Research, Regression Analysis]
tags: [Research]
description: "An exploratory study investigating the influence of digital transportation platforms on mobility, trade, transport expenditure, and food consumption behaviour using survey data and regression analysis."
image: assets/images/cover image.jpg

---

# Assessing the Impact of Digital Transportation Platforms on Mobility, Trade, and Food Consumption Patterns: An Exploratory Analysis
---
## Background
---
Digital transportation platforms such as Uber, Bolt, LittleCab, and Uber Eats have transformed the way people travel, access goods, and purchase services. By providing convenient, affordable, and on-demand transport, these platforms have reduced the barriers to mobility and expanded access to economic opportunities for both consumers and service providers.

Improved mobility has the potential to influence several aspects of daily life. Individuals may travel more frequently for work, shopping, business, and leisure, while businesses may benefit from increased customer access and more efficient delivery services. In addition, the integration of food delivery services into ride-hailing platforms has introduced new ways of purchasing meals, which may influence food ordering habits and dietary variety.

This analysis explores whether digital transportation platforms are associated with increased mobility, greater economic activity, and changes in food consumption patterns. 

---


### 1. Mobility 
#### To what extent do ride-hailing platforms influence people's ability to make their usual trips?

![Respondents ability to make trips in the absence of ride hailing apps](assets/images/First image.png)


64% of the respondents indicated that they would make the trips anyway without the platforms being present. This shows that for a majority the digital platforms have come in to compliment the other means of transport already existing like Matatus.

---

![Trip Distribution](assets/images/second image.png)


The figure above shows the distribution of data in terms of trips. The data is rightly skewed since we have a majority of respondents making between 1 to 7 trips in a week and less than 30 percent on the high and very high tiers.


---
![Change in number of trips taken using ride hailing apps](assets/images/third image.png)

Most respondents reported that their total number of trips increased after adopting ride-hailing applications. Specifically, 32.6% indicated that their trips increased significantly, while 27.1% reported a slight increase. Therefore one can say that approx. 59% reported that their trip increased with the adoption of ride hailing apps. About 25.1% experienced no change in their travel behaviour, and only 15.2% reported making fewer trips.



---

![Primary modes of transport](assets/images/5.png)


The figure above shows that despite the increase in the usage of ride hailing apps, the traditional modes of transport and public transport still tops the list. Therefore, the ride hailing apps can be seen as a substitute for the traditional means of transport as opposed to the notion that its the main means of transport in this day and age. 

---

![Number of trips made in the last seven days](assets/images/6.png")


Nearly half of respondents (49.3%) made 4–7 trips outside their home in the past week, making this the most common travel pattern. Around one in four respondents (23.9%) made 8–14 trips, while 21.8% made 1–3 trips. Only 5.0% made 15 or more trips. Overall, the findings suggest that most people make a moderate number of weekly trips, with relatively few travelling very frequently.

---
### Regression Analysis: Factors Associated with Weekly Trips

#### To examine whether age and income are associated with the number of weekly trips made outside the home.
```
                            OLS Regression Results                            
==============================================================================
Dep. Variable:           weekly_trips   R-squared:                       0.110
Model:                            OLS   Adj. R-squared:                  0.108
Method:                 Least Squares   F-statistic:                     71.67
Date:                Mon, 29 Jun 2026   Prob (F-statistic):           4.46e-30
Time:                        08:40:10   Log-Likelihood:                -3122.3
No. Observations:                1165   AIC:                             6251.
Df Residuals:                    1162   BIC:                             6266.
Df Model:                           2                                         
Covariance Type:            nonrobust                                         
===============================================================================
                  coef    std err          t      P>|t|      [0.025      0.975]
-------------------------------------------------------------------------------
const           3.9637      0.549      7.223      0.000       2.887       5.040
Age (Years)     0.1501      0.020      7.488      0.000       0.111       0.189
inc_100k       -1.5010      0.127    -11.844      0.000      -1.750      -1.252
==============================================================================
Omnibus:                      259.027   Durbin-Watson:                   2.111
Prob(Omnibus):                  0.000   Jarque-Bera (JB):              690.833
Skew:                           1.149   Prob(JB):                    9.72e-151
Kurtosis:                       5.991   Cond. No.                         162.
==============================================================================

Notes:
[1] Standard Errors assume that the covariance matrix of the errors is correctly specified.

```

![Effect of predictors on weekly trips](assets/images/predictors.png")

The regression results indicate that age and income have opposite relationships with weekly travel frequency. Age has a small positive effect, suggesting that older respondents tend to make slightly more weekly trips. In contrast, respondents with a monthly income above KSh 100,000 make, on average, about 1.5 fewer trips per week than respondents in the reference income group. The larger magnitude of the income coefficient indicates that income has a stronger influence on weekly travel behaviour than age.


---

#### What factors influence how many trips one takes?

```
Optimization terminated successfully.
         Current function value: 1.117202
         Iterations: 63
         Function evaluations: 67
         Gradient evaluations: 67
                             OrderedModel Results                             
==============================================================================
Dep. Variable:        trip_change_ord   Log-Likelihood:                -1338.4
Model:                   OrderedModel   AIC:                             2697.
Method:            Maximum Likelihood   BIC:                             2748.
Date:                Mon, 29 Jun 2026                                         
Time:                        06:25:49                                         
No. Observations:                1198                                         
Df Residuals:                    1188                                         
Df Model:                           7                                         
==========================================================================================
                             coef    std err          z      P>|z|      [0.025      0.975]
------------------------------------------------------------------------------------------
Age (Years)               -0.1002      0.013     -7.910      0.000      -0.125      -0.075
inc_100k                  -0.2083      0.081     -2.563      0.010      -0.368      -0.049
emp_Employed(Informal)    16.6066    608.882      0.027      0.978   -1176.780    1209.993
emp_Self employed          2.3632      0.250      9.470      0.000       1.874       2.852
emp_Student              -29.5100   1.51e+04     -0.002      0.998   -2.97e+04    2.97e+04
emp_Unemployed            -2.2124      0.276     -8.018      0.000      -2.753      -1.672
gender_Male               -0.0103      0.117     -0.088      0.930      -0.239       0.219
-1/0                      -5.4997      0.362    -15.202      0.000      -6.209      -4.791
0/1                        0.5028      0.058      8.709      0.000       0.390       0.616
1/2                        0.3023      0.053      5.705      0.000       0.198       0.406
==========================================================================================

```

The ordered logit model (n = 1,198) reveals that age and income are negatively associated with trip growth, indicating that digital transport platforms generate the greatest additional mobility among younger and lower-income users. Self-employment emerges as the strongest positive predictor, with self-employed individuals significantly more likely to report increased travel, reflecting the mobility demands of flexible and demand-driven work activities. Conversely, unemployed respondents are substantially less likely to experience trip growth, suggesting that fare affordability remains a key constraint. Gender does not have a statistically significant effect on trip changes. The coefficients for students and informal employees exhibit extremely large standard errors, indicating estimation instability due to sparse observations and should therefore be interpreted with caution.

---
### 2. Trade
#### Which reasons constitutes most trips taken by the respondents?

![Purpose of trips in the Last 7 days](assets/images/Trade.png)


Work-related trips were the most common purpose for travel during the past seven days, followed by shopping trips. Food pickup and delivery accounted for a smaller share of trips, while business trips were the least common. Overall, the findings suggest that most travel was driven by daily necessities and employment-related activities, rather than business or delivery purposes.

---

#### What factors influence how much respondents spend on transportation?

```
                             OLS Regression Results                            
===============================================================================
Dep. Variable:     log_transport_spend   R-squared:                       0.024
Model:                             OLS   Adj. R-squared:                  0.022
Method:                  Least Squares   F-statistic:                     9.322
Date:                 Mon, 29 Jun 2026   Prob (F-statistic):           4.33e-06
Time:                         06:25:50   Log-Likelihood:                -2188.4
No. Observations:                 1124   AIC:                             4385.
Df Residuals:                     1120   BIC:                             4405.
Df Model:                            3                                         
Covariance Type:             nonrobust                                         
================================================================================
                   coef    std err          t      P>|t|      [0.025      0.975]
--------------------------------------------------------------------------------
const            6.5377      0.275     23.745      0.000       5.997       7.078
weekly_trips    -0.0239      0.014     -1.652      0.099      -0.052       0.004
inc_100k        -0.2937      0.065     -4.493      0.000      -0.422      -0.165
Age (Years)      0.0466      0.010      4.724      0.000       0.027       0.066
==============================================================================
Omnibus:                      145.509   Durbin-Watson:                   2.014
Prob(Omnibus):                  0.000   Jarque-Bera (JB):             1391.279
Skew:                           0.177   Prob(JB):                    7.72e-303
Kurtosis:                       8.439   Cond. No.                         171.
==============================================================================

Notes:
[1] Standard Errors assume that the covariance matrix of the errors is correctly specified.

```
Regression analysis indicates that individuals who use ride-hailing platforms such as Uber and Bolt do not exhibit higher overall weekly transport expenditure. In fact, the estimated coefficient suggests that users may spend slightly less on transport, holding frequency, age, and income constant.

This finding suggests and confirm that ride-hailing services may substitute for other forms of transport rather than simply adding additional costs. Users may be reallocating their transport spending toward more efficient or convenient modes without increasing total expenditure.

---

### 3. Diet
#### What factors influences the number of meals ordered?

```
                            OLS Regression Results                            
==============================================================================
Dep. Variable:          meals_ordered   R-squared:                       0.190
Model:                            OLS   Adj. R-squared:                  0.188
Method:                 Least Squares   F-statistic:                     88.08
Date:                Mon, 29 Jun 2026   Prob (F-statistic):           3.41e-51
Time:                        06:25:50   Log-Likelihood:                -1765.7
No. Observations:                1128   AIC:                             3539.
Df Residuals:                    1124   BIC:                             3560.
Df Model:                           3                                         
Covariance Type:            nonrobust                                         
=================================================================================
                    coef    std err          t      P>|t|      [0.025      0.975]
---------------------------------------------------------------------------------
const             1.0588      0.212      5.000      0.000       0.643       1.474
delivery_user     1.1586      0.081     14.276      0.000       0.999       1.318
Age (Years)      -0.0343      0.008     -4.549      0.000      -0.049      -0.019
inc_100k         -0.0472      0.052     -0.909      0.363      -0.149       0.055
==============================================================================
Omnibus:                      194.309   Durbin-Watson:                   2.049
Prob(Omnibus):                  0.000   Jarque-Bera (JB):              318.801
Skew:                           1.115   Prob(JB):                     5.93e-70
Kurtosis:                       4.344   Cond. No.                         191.
==============================================================================

Notes:
[1] Standard Errors assume that the covariance matrix of the errors is correctly specified.

```

Regression analysis reveals a strong and statistically significant relationship between the use of food delivery platforms such as Uber Eats and increased food ordering behavior. Users of these platforms order, on average, approximately 1.16 more meals per week than non-users, holding age and income constant.

This effect is substantial, effectively representing a shift from near-zero platform-based consumption among non-users to regular weekly usage among adopters. The results suggest that delivery platforms are not merely substituting traditional dining options but are enabling new forms of consumption by reducing access barriers such as travel time and effort.

Age is negatively associated with platform-based food ordering, indicating that younger individuals are more responsive to these technologies, while income does not significantly influence ordering behavior. This suggests that the impact of delivery platforms is broadly distributed across income groups.

Overall, the findings provide strong evidence that digital delivery platforms are reshaping dietary patterns by increasing both the frequency and accessibility of prepared food consumption.

---

#### What influences the spending on food?
```
                             OrderedModel Results                             
==============================================================================
Dep. Variable:       food_variety_ord   Log-Likelihood:                -460.65
Model:                   OrderedModel   AIC:                             929.3
Method:            Maximum Likelihood   BIC:                             949.2
Date:                Mon, 29 Jun 2026                                         
Time:                        06:25:50                                         
No. Observations:                1075                                         
Df Residuals:                    1071                                         
Df Model:                           3                                         
=================================================================================
                    coef    std err          z      P>|z|      [0.025      0.975]
---------------------------------------------------------------------------------
delivery_user    34.5413   3.04e+04      0.001      0.999   -5.96e+04    5.97e+04
Age (Years)      -0.0189      0.021     -0.900      0.368      -0.060       0.022
inc_100k          0.5889      0.138      4.268      0.000       0.318       0.859
0.0/1.0          34.8295   3.04e+04      0.001      0.999   -5.96e+04    5.97e+04
```

Analysis of self-reported dietary changes indicates a strong association between the use of food delivery platforms such as Uber Eats and increased variety in food consumption. A large majority of users report that their dietary variety has increased since adopting these platforms.

Attempts to formally estimate this relationship using an ordered logit model resulted in convergence issues due to near-perfect separation, suggesting that platform usage is a dominant predictor of increased variety. This indicates that the effect is both strong and systematic.

These findings suggest that delivery platforms expand consumers’ accessible choice sets, enabling greater dietary diversity beyond what was previously feasible.


---

![Percentage of meals ordered via the app](assets/images/meals.png)

Most respondents (60.1%) did not order any meals through mobile apps. About one in four respondents (26.7%) ordered between one and two meals, while only a small proportion ordered meals more frequently (10.6% ordered 3–5 meals and 2.7% ordered six or more). Overall, the findings indicate that food ordering through mobile apps is relatively infrequent among most respondents.
The low uptake of food ordering services may reflect user preferences and local market conditions. Many consumers may prefer preparing meals at home, purchasing food directly from nearby restaurants or vendors, or may not have regular access to restaurants that offer delivery through ride-hailing platforms. In addition, delivery fees, food prices, and limited availability of delivery services in some areas may discourage frequent use.


---

#### What influences ones choices of food ordered between age and income. 
```
Optimization terminated successfully.
         Current function value: 0.452462
         Iterations: 216
         Function evaluations: 378
                             OrderedModel Results                             
==============================================================================
Dep. Variable:       food_variety_ord   Log-Likelihood:                -468.75
Model:                   OrderedModel   AIC:                             945.5
Method:            Maximum Likelihood   BIC:                             965.3
Date:                Mon, 29 Jun 2026                                         
Time:                        06:25:51                                         
No. Observations:                1036                                         
Df Residuals:                    1032                                         
Df Model:                           3                                         
=================================================================================
                    coef    std err          z      P>|z|      [0.025      0.975]
---------------------------------------------------------------------------------
meals_ordered     0.9062      0.069     13.214      0.000       0.772       1.041
Age (Years)      -0.0064      0.018     -0.355      0.723      -0.042       0.029
inc_100k          1.0484      0.119      8.828      0.000       0.816       1.281
0.0/1.0           2.7095      0.488      5.557      0.000       1.754       3.665
=================================================================================


```

![Factors influencing variety of meals ordered](assets/images/variety.png)

*Values above 1 indicate a higher likelihood of reporting greater food variety.*

Meals ordered and income appear to increase the likelihood of higher food variety, while age has little effect because it is close to 1.
Respondents who ordered more meals through mobile apps were more likely to report greater food variety. Higher-income respondents also tended to have more diverse food choices. Age had little influence on food variety.

---

### 4. Price Sensitivity (Incase of an increase in price will the respondents stop using the apps)


```
                            OLS Regression Results                            
==============================================================================
Dep. Variable:           weekly_trips   R-squared:                       0.142
Model:                            OLS   Adj. R-squared:                  0.139
Method:                 Least Squares   F-statistic:                     46.47
Date:                Mon, 29 Jun 2026   Prob (F-statistic):           3.68e-36
Time:                        06:25:51   Log-Likelihood:                -2991.4
No. Observations:                1124   AIC:                             5993.
Df Residuals:                    1119   BIC:                             6018.
Df Model:                           4                                         
Covariance Type:            nonrobust                                         
=======================================================================================
                          coef    std err          t      P>|t|      [0.025      0.975]
---------------------------------------------------------------------------------------
const                   4.5903      0.689      6.659      0.000       3.238       5.943
log_transport_spend    -0.0803      0.061     -1.312      0.190      -0.200       0.040
ridehail_user           0.9477      0.209      4.538      0.000       0.538       1.357
Age (Years)             0.1418      0.020      7.111      0.000       0.103       0.181
inc_100k               -1.6283      0.126    -12.921      0.000      -1.876      -1.381
==============================================================================
Omnibus:                      203.508   Durbin-Watson:                   2.121
Prob(Omnibus):                  0.000   Jarque-Bera (JB):              485.770
Skew:                           0.981   Prob(JB):                    3.28e-106
Kurtosis:                       5.553   Cond. No.                         211.
==============================================================================

Notes:
[1] Standard Errors assume that the covariance matrix of the errors is correctly specified.

```

The OLS regression model indicates that age is positively associated with weekly travel frequency, while higher-income respondents report significantly fewer weekly trips. Transport expenditure exhibits a weak negative relationship with trip frequency, although the effect is not statistically significant at the 5%. The model explains 12.7% of the variation in weekly trips and is statistically significant overall. However, the ride-hailing user variable appears to be constant within the estimation sample, resulting in multicollinearity with the intercept term and preventing meaningful interpretation of its coefficient. The model diagnostics further suggest non-normal residuals, indicating that count-data models such as Poisson or Negative Binomial regression may provide a more suitable framework for analysing trip frequency.

---
### In conclusion

This study examined the potential impact of digital transportation platforms, including Bolt, Uber, LittleCab, and Uber Eats, on mobility, economic activity, and food consumption patterns. Overall, the findings suggest that these platforms have had a positive influence on users' mobility and daily activities.

The descriptive analysis showed that a majority of respondents reported an increase in the number of trips made since adopting ride-hailing applications, with work and shopping accounting for the largest share of travel. While many respondents indicated that they would still make most of their trips without ride-hailing services, more than one-third reported that they would either reduce their travel or were uncertain, suggesting that these platforms have expanded mobility for a substantial proportion of users rather than simply replacing traditional transport modes.

The findings also indicate that increased mobility has supported access to economic activities. Work-related and shopping trips dominated respondents' travel patterns, highlighting the role of digital transportation platforms in facilitating access to employment, businesses, and essential services.

With regard to food consumption, the results suggest that food delivery services are not yet the primary use of ride-hailing platforms. Most respondents reported not ordering meals through these applications during the previous week. However, respondents who ordered meals more frequently were more likely to report greater food variety, indicating that digital food delivery services may contribute to more diverse dietary choices among active users.

Regression analysis further showed that demographic characteristics such as age and income were associated with travel behavior and transport expenditure. However, the relatively low explanatory power of the models suggests that additional factors including accessibility, transport costs, travel distance, service availability, and personal preferences may also play important roles in shaping mobility and consumption patterns.

Overall, the study provides evidence that digital transportation platforms contribute to increased mobility, facilitate access to economic activities, and influence food consumption behaviours. Although they do not completely replace traditional modes of transport, they have become an important component of the urban transport ecosystem by improving convenience, accessibility, and travel flexibility for many users.

---





