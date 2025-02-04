---
layout: post
title: How Large Language Models Work, Part 1
author: Margaret Maina
categories: [AI]
# image: assets/images/optimal-asset-allocation.png
tags: [LLM]  
description: Large language models has revolutionized how machines understand and generate human language. These models demonstrate incredible capabilities, however the mathematics behind their architecture, training, and fine-tuning can at times seem complicated 
---

Large language models has revolutionized how machines understand and generate human language. These models demonstrate incredible capabilities, however the mathematics behind their architecture, training, and fine-tuning can at times seem complicated. Understanding the math behind it can help in effectively fine tuning them while customizing them for other applications. In this articles we will break down the mathematical concept behind large language models.

This artical assumes you have a good understanding of Artificial Intelligence, Machine Learning, Mathematical Modeling and Neural Networks.

#### Transformers and Attention architecture 

At the core of LLMs is the transformer architecture which was introduced in the paper Attention Is All You Need in 2017. The architecture borrows heavily from a mechanism called self-attention. It allows the model to weigh the importance of different words in a sequence when making predictions.

#### Self-Attention
Unlike traditional models where input is processed sequentially, which limits the model's ability to capture long-range dependencies, transformers uses self-attention mechanism to process the entire sequence simultaneously. This enables the model to factor in the relationships between any two tokens, regardless of their position in the sequence.

Self-attention works by computing a weighted sum of the input tokens. This tokens are then transformed into three vectors.

Query (Q) - queries that define what to look for in the input sequence.

Key (K) - keys that define the relationship between each query and every token in the input sequence.

Value (V) - values that provide information about each token’s content.

The attention score for each pair of tokens is computed using the dot product of the query and key vectors.

To allow the model to focus on the most relevant tokens in the sequence when making predictions, a softmax function that ensures that the attention scores sum to 1 is introduced.

#### Positional Encoding.
The encoder cares about word order (tokens). This is why they use positional encoding to inject information about token positions. Positional encoding adds a series of sine and cosine functions to the input embedding, ensuring that the model knows the position of each word in the input sequence.

In the next article we will look at Feed-Forward Networks and how they are used in LLMS. But first a summary of what we have covered.

##### Summary

**Input Processing:** Text is tokenized into manageable pieces.
Tokens are fed into the model simultaneously thanks to the Transformer architecture.

**Understanding Context:** Self-attention mechanisms allow the model to consider the relationships between all words in the input.
The model generates context-aware representations of the text.