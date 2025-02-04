---
layout: post
title: Anomaly Detection
author: Joy Omondi
categories: [ Machine Learning]
# image: assets/images/derivatives.png
tags: [machine learning]  
description: Anomalies appear because of different reasons for example data collection error, fraud and cybe security attacks. This blog gives an introduction of a series i am going to do on anomaly detection using machine learning.
---

- Anomalies are data points or observations that deviate from the normal or expected observation

- Anomaly detection is the technique of identifying rare occurrences or observations which are statistically different from the rest of the observations.

- Anomalies can be inform of problems like fraud, cyber attacks, failing machine in server, and long system run times/ errors.

- Machine learning helps to hasten the identification process, leading to better decision making. 

- Machine learning models can also handle large volumes of data and have a high success rate in identifying anonomalies.

### Types of Anomalies

Anomalies can be classified in different subclasses:
- Intentional: These are anomalies that occur as a result of a specific event. This event could be a breach in security or even a cyber attack

- Unintentional: These anomalies are caused by human error for example errors during data collection which can cause outliers. 

- Contextual anomalies: These are anomalies that arise from difference in geography where data maybe be considered normal in one area and anomalous in another area

- Point anomalies: This is where a single data point in a data set is an outlier. For example having a salary of Ksh 500000 where the salary range is ksh 40000 to ksh 80000.

- Collective anomalies: These is where a group of data points deviate from the normal behavior, this could be because of system failures, fraud and other security threats. This is similar to the intentional anomalies

### Anomaly detection techniques and algorithms
There are three main anomaly detection techniques. The technique chosen largely depends on the type of data, whether labeled or unlabeled data.
The three techniques include:

1. Unsupervised anomaly detection

Unsupervised anomaly detection is a machine learning approach to anomaly detection. This method is commonly used because anomalous data is often unlabeled and unstructured. This technique makes use of  artificial neural networks, isolation forests, and one-class support vector machines. You can see unsupervised anomaly detection used in areas such as fraud detection and detecting medical anomalies. 

2. Supervised anomaly detection

Supervised anomaly detection is also a type of machine learning that uses labeled data, unlike unsupervised learning methods. The major disadvantage of this method is that it can only detect anomalies it has seen in its training data before.
Supervised learning anomaly detection requires one to provide the algorithm with different scenaries of anomalies to be able to identify such anomalies in data you provide it with. This can be used in fraud detection. 

3. Semi-supervised anomaly detection

This combines both supervised and unsupervised anomaly detection methods and has the ability to handle some labeled data as well as large volumes of unlabeled data. Using labeled data gives you more control over the training process, potentially leading to better outcomes. An example of a semi-supervised anomaly detection algorithm is linear regression and it is often employed in identification of high level system breaches as well as fraud detection. 

### Challenges of anomaly detection
1. Unsupervised and supervised approaches can sometimes return too many false positives. Therefore alot of time and effort is needed to develop a better model to filter through the false positives or going through the result to identify the false positives themselves. 

2. The results of anomaly detection also aren’t always simple to interpret, making it necessary to have employees certain skill set to understand what they’re reviewing. 

3. Anomaly detection requires some specific data features as well. The data you use to develop a trained algorithm needs to be clean, with no duplicate information or incomplete data sets. 

4. Additionally, the data set used for training should be sizeable. If you don’t have a big enough training set, the model can’t accurately develop the model. However, one can solve for this by developing synthetic data.  

### Anomaly detection use cases
Implementing anomaly detection is useful across a wide range of industries. 

1. Businesses can use anomaly detection techniques to verify that they are working with real people and not fraudulent accounts especially when they partner with content creators. Anomaly detection algorithms can identify behavior that is concerning in this context.

2. The cybersecurity industry benefits greatly from anomaly detection, with the power to differentiate potentially malicious activity that can cause damage to the system from standard online actions. 

3. Anomaly detection helps with the monitoring of information technology systems, observing metrics that provide context to the overall performance of a system.