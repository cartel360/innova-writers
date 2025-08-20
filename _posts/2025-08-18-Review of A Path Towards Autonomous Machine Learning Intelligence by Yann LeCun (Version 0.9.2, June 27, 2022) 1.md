---
layout: post
author: Omega Makena
title: Review of "A Path Towards Autonomous Machine Learning Intelligence" by Yann LeCun (Version 0.9.2, June 27, 2022)
categories: [AI, Machine Learning]
tags: [Autonomous Agents, Self-Learning, Planning, Reasoning]
image: assets/images/image.png
description: This article reviews Yann LeCun's paper on autonomous machine learning intelligence, focusing on self-learning agents and their capabilities.
---


Hi everyone, in this article we shall be going through Yan LeCun’s paper, titled A Path Towards Autonomous Machine Intelligence. It is version 0.9.2, released on June 27th, 2022.

This paper explores the foundation and architecture of self-learning agents capable of autonomous planning and reasoning. In this article, we will cover pages 1 to 17, which is sections 1 to 3 of the paper.

In the next articles, we will look into the remaining sections until we have reviewed the entire paper.

After that, we shall explore whether these autonomous agents can be applied in financial modeling and how they can be applied in financial modeling.



You can access the full paper here:  
[https://openreview.net/pdf?id=BZ5a1r-kVsf](https://openreview.net/pdf?id=BZ5a1r-kVsf)


**Question: Can Machines Learn as Effectively as Humans and Animals?**
*   The paper opens by posing a fundamental question: Can machines learn to represent their percepts and actions so that they can plan and act autonomously, like humans and animals?
*   This question frames the entire investigation: How can machines develop internal representations that support flexible planning and reasoning?
*   Implicit in this question is the challenge of moving beyond current AI limitations where learning is often narrow and task-specific.
*   The question highlights two key abilities machines must acquire:
    1.  Representation of percepts (sensory inputs)
    2.  Representation of actions (to enable planning)
*   These representations must support autonomous learning and adaptation without heavy reliance on explicit external supervision.
*   The focus is on general autonomous learning that mimics or parallels biological learning capabilities.

**Section 1: Introduction**
**Opening**
*   The introduction frames the problem of learning by describing how animals and humans exhibit remarkable learning abilities.
*   It emphasizes that these biological agents learn continuously, autonomously, and efficiently from their environment without explicit labeling or engineered rewards.

**The Challenges AI Must Address**
LeCun explicitly lists three major challenges AI must overcome:
1.  Learning to represent the world:
    *   Machines must develop internal representations of the environment that capture its structure and dynamics.
    *   These representations need to be hierarchical and compositional, enabling abstraction beyond raw sensory data.
2.  Learning to predict and act by observation:
    *   AI must learn from unlabeled sensory streams how to anticipate future states.
    *   Actions should be learned by interacting with the environment, not by imitating external supervisors.
3.  Learning to plan and reason:
    *   Agents must be capable of mental simulation of potential futures based on their internal models.
    *   This planning enables goal-directed behavior without reliance on task-specific training.

**Contributions of the Paper**
*   The paper proposes a path toward autonomous machine intelligence that addresses the above challenges.
*   It introduces an architecture that:
    *   Learns world models via self-supervised predictive learning.
    *   Develops cost models that specify goals and preferences internally.
    *   Utilizes planning mechanisms operating on learned latent representations.
    *   Supports continuous and open-ended learning without external supervision.

**Page 3 Section 2: Learning World Models**
**Opening**
*   The section begins by reiterating that building internal world models is central to intelligence.
*   LeCun draws parallels between machines and biological systems (humans and animals), emphasizing how these organisms learn hierarchical models of their environment.

**Hierarchical World Models in Biological Systems**
*   Animals and humans build multi-level predictive models:
    *   Low-level sensory features (e.g., edges, textures)
    *   Mid-level concepts (e.g., objects, parts)
    *   High-level abstractions (e.g., causes, intentions)
*   These models enable the brain to:
    *   Predict future sensory inputs.
    *   Infer hidden states (e.g., object permanence, intentions of others).
    *   Plan and reason using mental simulation.

**Machine Learning Approaches to World Models**
*   Most AI systems today do not explicitly learn such hierarchical world models.
*   Instead, many rely on direct mapping from sensory inputs to actions or value functions (policy/value-based RL).
*   LeCun emphasizes that predictive models of the latent state are necessary for flexible, general intelligence.

**The Role of Self-Supervised Learning**
*   Self-supervised learning allows models to predict parts of their inputs from other parts without external labels.
*   This is a natural mechanism for learning latent representations that capture relevant environmental structure.

**The JEPA Framework**
*   LeCun introduces Joint Embedding Predictive Architectures (JEPA):
    *   Instead of predicting raw sensory data, JEPA learns to predict latent embeddings.
    *   Uses energy-based models to evaluate how well the predicted latent matches the actual latent.
    *   This approach avoids problems like blurry image reconstruction common in pixel-level prediction.
*   JEPA focuses on learning semantic, compressed, and predictive embeddings rather than raw sensory reconstruction.

**Summary of Section 2’s Purpose**
*   This section grounds the need for hierarchical latent predictive models.
*   It shows biological precedent and outlines machine learning approaches that approximate this.
*   Sets the stage for the architectural proposals that follow.

**Page 4  Continuation of Section 2: Learning World Models and Architectural Overview**
**Continuation on World Models**
*   LeCun emphasizes the importance of latent state prediction for efficient learning and planning.
*   He contrasts pixel-level prediction (high-dimensional and noisy) with latent embedding prediction, which is more robust and semantically meaningful.
*   He stresses that good world models must capture causal structure of the environment, not just statistical correlations.

**Architectural Insight: Brain-Inspired Modular Structure**
*   LeCun begins to sketch an analogy between the proposed agent architecture and brain organization.
*   He highlights modularity as crucial, with separate but interacting functional units for:
    *   Perception (sensory processing)
    *   World modeling (prediction and latent state dynamics)
    *   Cost modeling (evaluation of states/actions)
    *   Actor/planning (decision-making and action selection)
    *   Memory (temporal context integration)
*   This division supports:
    *   Scalability: modules can be developed and improved independently.
    *   Interpretability: each module has a clear purpose.

**Emphasis on Hierarchical and Recursive Processing**
*   The architecture supports hierarchical processing where:
    *   Lower levels handle sensory details.
    *   Higher levels manage abstract reasoning and long-term planning.
*   Recurrence and feedback loops are essential for integrating information over time and updating internal beliefs.

**Preview of Configurator Module (Foreshadowing)**
*   LeCun briefly mentions a Configurator module, which will dynamically set goals, modulate internal cost functions, and balance exploration/exploitation.
*   This module acts as a meta-controller, enabling autonomy and adaptability.

**Summary of Page 4**
*   Reinforces that learning hierarchical, latent world models is foundational.
*   Modular, brain-inspired architecture is introduced as a promising design pattern.
*   Sets the stage for detailed architecture discussion starting on following pages.

**Overall Architecture:**
*   LeCun proposes a modular system architecture for autonomous intelligence.
*   All components are differentiable, i.e., can receive gradient signals via arrows indicating functional connections.
*   Learning is end-to-end, with gradients propagated through the entire architecture.

**Modules:**
1.  Configurator
    *   Inputs: Implicitly takes signals from all other modules (not shown in diagram).
    *   Function: Dynamically configures each module for the current task.
    *   Role: Acts as a meta-controller or gating mechanism.
    *   Not trainable in the same sense as others -- possibly rule-based or learned via meta-optimization.
2.  Perception Module
    *   Input: Raw sensory data from the environment.
    *   Output: Estimated current state of the world.
    *   Function: Acts as an encoder, likely similar to a vision or language model.
    *   Use: Feeds state estimates into short-term memory, actor, and world model.
3.  World Model
    *   Input: Current state estimate + action sequences proposed by the actor.
    *   Output: Predicted future world states.
    *   Function: Simulates environmental dynamics, akin to learned transition functions.
    *   May operate in imagination mode, i.e., not actually interacting with environment but simulating forward.
4.  Cost Module
    *   Outputs a scalar value called "energy" -- a general measure of "discomfort."
    *   Comprised of two components:
        *   Intrinsic Cost
            *   Fixed (non-trainable).
            *   Directly computes energy from raw state (pain, hunger, etc.).
        *   Critic
            *   Trainable.
            *   Predicts future intrinsic costs from imagined/predicted future states.
    *   Feeds gradients to the actor (via energy gradients) and possibly to world model.
5.  Short-Term Memory
    *   Stores:
        *   Current state (from Perception).
        *   Predicted states (from World Model).
        *   Associated intrinsic costs (from Cost Module).
    *   Likely functions as a buffer or working memory for sequence-based decision making.
6.  Actor Module
    *   Input: State representations + feedback from critic/world model.
    *   Output: A proposed sequence of future actions.
    *   Learning Target: Minimize predicted energy as estimated by critic and intrinsic cost on predicted states.
    *   Execution: Only the first action from the optimized sequence is executed (model-predictive control).

**Workflow:**
1.  Perception processes input -> produces current state.
2.  Short-Term Memory stores this state.
3.  Actor proposes action sequences.
4.  World Model predicts future states from those actions.
5.  Critic predicts costs for those future states.
6.  Actor receives gradients from cost signals and improves action proposals.
7.  Only first action executed, rest discarded -> loop continues.

**Section 3: A Model Architecture for Autonomous Intelligence**

**General Architecture Overview**
*   The architecture is composed of modular, differentiable components, enabling end-to-end training via backpropagation.
*   Figure 2 visualizes the architecture (see earlier notes for full breakdown).
*   Key idea: Modules can be dynamically reconfigured for different tasks by a Configurator Module.
    *   This is an executive controller that modulates the behavior of other modules by adjusting parameters and attention circuits.
    *   It takes input from all modules and emits configuration signals to Perception, World Model, Cost, and Actor.

**Configurator Module**
*   Role: Executive control / meta-controller
*   Inputs: Receives signals from all other modules
*   Outputs:
    *   Configures modules dynamically based on current task.
    *   Primes the Perception, World Model, and Cost Module to attend to task-relevant aspects of their input.
*   Mechanisms:
    *   Modulates parameters.
    *   Modulates attention circuits (implies dynamic routing of computation).
*   May serve as a form of task-conditioning mechanism, similar to top-down control in cortex.

**Perception Module**
*   Input: Raw sensor data
*   Output: Current state estimate of the environment
*   Hierarchical representation:
    *   Represents state at multiple levels of abstraction.
    *   Relevance to task: Only a subset of perceived state is necessary; Configurator primes the module to extract this.
*   Analogy: Could be vision transformers, CNNs, or hierarchical latent spaces (e.g., VQ-VAE, capsule nets).
*   Acts as the encoder into internal state space used by other modules.

**World Model Module**
*   Most complex component in the architecture.
*   Dual roles:
    1.  Fills in missing information in current state estimation (spatial or perceptual gaps).
    2.  Predicts future world states, based on:
        *   Natural evolution (unsupervised temporal dynamics).
        *   Imagined action sequences proposed by the Actor.
*   Prediction space:
    *   Operates in abstract representation space (task-relevant latent space).
    *   Supports multi-level abstraction and multi-scale temporal dynamics.
*   Handles uncertainty:
    *   Predicts multiple plausible futures.
    *   Parameterized by latent variables encoding epistemic uncertainty (e.g., variational inference, stochastic models).
    *   Need to address how to:
        1.  Represent multimodal uncertainty over future states.
        2.  Train such a generative forward model.
*   Serves as a simulator -- internally models the consequences of action without actual environment interaction.

**Cost Module**
*   Outputs: A scalar signal called "energy" -- the proxy for discomfort / negative utility.
*   Energy = sum of two components:
    1.  Intrinsic Cost Module
    2.  Trainable Critic Module
*   Learning Objective: Minimize long-term average energy.

**Intrinsic Cost Module**
*   Non-trainable / immutable -- hardcoded behavioral priors.
*   Input: Current or predicted world states.
*   Output: Scalar intrinsic energy, representing:
    *   Pain (high energy)
    *   Pleasure (low or negative energy)
    *   Hunger, satiety, danger, etc.
*   Hardwired motivational structures:
    *   "Standing up" -> low energy -> encourages walking
    *   "Influencing environment" -> agency
    *   "Interacting with humans" -> social behavior
    *   "Perceiving joy in others" -> empathy
    *   "Novelty" -> curiosity
    *   "Task fulfillment" -> satisfaction
*   Can be modulated by Configurator to reflect contextual drives.
*   This module defines the core behavioral substrate -- akin to limbic system or evolutionary priors.

**Trainable Critic Module**
*   Predicts future intrinsic energy based on:
    *   Current world state
    *   Future states from the World Model
*   Uses Short-Term Memory:
    *   Retrieves past states and intrinsic costs.
    *   Learns to predict energy at t+k given state at t.
*   Configurable:
    *   Configurator can bias critic toward specific subgoals.
*   Trained using supervised regression (e.g., TD-learning if recursive).
*   Output used by Actor for action planning.

**Short-Term Memory Module**
*   Stores:
    *   Past, current, and predicted world states.
    *   Associated intrinsic costs
*   Queryable by:
    *   World Model (for temporal extrapolation or correction of missing data).
    *   Critic (for training supervision).
*   Interface resembles Key-Value Memory Networks.
*   Role: Combines functionality of a working memory, episodic buffer, and associative lookup.
*   Neuroscientific analogy: Similar role to hippocampus.

**Actor Module**
*   Generates action sequences conditioned on:
    *   Current state from Perception
    *   Configuration signals
*   Proposes action sequences -> passed to World Model.
*   World Model simulates future states -> passed to Cost Module.
*   Uses gradient of estimated cost to update action proposals:
    *   Optimization method: Gradient descent (if continuous)
    *   Dynamic programming (if action space is discrete)
*   Outputs: First action from optimized sequence.
*   Analogy: Functions as Model Predictive Control (MPC).
    *   Reoptimizes at every step.
    *   Discards rest of the sequence post-execution.
    *   Feedback loop closes each time step.

**Summary of Inference Flow (at a single timestep):**
1.  Perception -> current state.
2.  Actor proposes action sequence.
3.  World Model predicts future states.
4.  Cost Module evaluates predicted states.
5.  Gradients passed to Actor -> update action sequence.
6.  Actor outputs first action -> action executed.
7.  Loop repeats at next time step.

**Section 3.1Mode-1 and Mode-2 Perception-Action Loops (No Math)**

**Figure 3: Mode-1 Perception-Action Episode**
*   The perception module processes sensory input and creates an internal representation of the current state of the world.
*   The actor then uses this internal state representation to directly compute an action or a short sequence of actions to perform. This is done via a policy module.
*   This process is purely reactive: it does not involve any planning or consideration of future states using the world model or cost evaluation.
*   The cost module calculates a scalar value called "energy" which measures how good or bad the current state is, and stores this information together with the current state in short-term memory.
*   Optionally, the system may predict the next state after the action using the world model, but this prediction is used only to update the model later once the real outcome is observed. It does not influence the immediate action.
*   The actor is composed of two parts: the policy module that produces direct actions, and an action optimizer used in more complex planning (Mode-2).
*   This Mode-1 behavior is like fast, automatic, habitual responses--similar to Daniel Kahneman’s "System 1".

**Typical Perception-Action Loops (Section 3.1 Overview)**
*   The model can operate in two modes during a perception-action cycle:
    *   Mode-1: Reactive behavior that produces actions directly from perception and short-term memory, without deep reasoning.
    *   Mode-2: Involves reasoning and planning by simulating future outcomes using the world model and evaluating their costs.
*   "Reasoning" here is broadly understood as minimizing some cost or energy function, a generalization of decision-making.

**Mode-1: Reactive Behavior (Section 3.1.1)**
*   The perception module encodes raw sensory input into a state relevant for the current task.
*   The policy module outputs an action based on this state and possibly by recalling relevant past states and actions from short-term memory.
*   The configurator tunes the policy module parameters dynamically to suit the task at hand.
*   Even though the policy module is reactive, it can be complex, using memory for associating past experiences to current decisions.
*   The cost module produces a differentiable cost for the current state, but because the external environment is non-differentiable, it’s impossible to backpropagate gradients through the environment.
*   This means learning how actions affect cost must rely on trial-and-error approaches, which can be slow and risky in real environments.
*   The system can update the world model by comparing predicted next states to actual observed outcomes, improving its internal simulation ability.
*   Using a world model allows the agent to mentally "imagine" consequences of actions, reducing the need for risky or costly physical exploration.

**Mode-2: Reasoning and Planning Using the World Model (Section 3.1.2)**
*   The agent first perceives the current state.
*   The actor proposes an initial sequence of actions.
*   The world model simulates what future states might result from these actions.
*   The cost module estimates the total expected cost over the simulated future.
*   The actor adjusts the proposed action sequence to minimize this expected cost, using optimization methods that leverage gradients passed through the model.
*   This loop repeats iteratively until a satisfactory plan emerges.
*   This is similar to model-predictive control techniques used in control theory and robotics.
*   After the actor optimizes the action sequence to minimize expected future cost, it executes only the first action (or a small initial part) of that optimized sequence on the real environment.
*   This action-perception-planning cycle repeats continuously, allowing dynamic adjustment as new information arrives.
*   This approach is essentially Model-Predictive Control with a receding horizon: plan ahead, execute the first step, then re-plan at the next time step.
*   The difference here from classical MPC is that both the world model and the cost function are learned, not hand-designed or fixed.

**Optimization Strategies Beyond Gradient Descent**
*   While gradient-based optimization is efficient when the model and cost are smooth and differentiable, many real-world problems have discontinuities or discrete action/state spaces.
*   For such cases, other optimization methods can be employed, such as:
    *   Dynamic programming
    *   Combinatorial optimization
    *   Simulated annealing
    *   Gradient-free heuristic searches (e.g., tree search with pruning)
*   These alternative methods allow coping with non-smooth, discrete, or combinatorial problems where gradients are not reliable.

**Handling Uncertainty and Stochasticity in the World Model**
*   The earlier description assumes a deterministic environment for clarity, but real-world environments are often uncertain and stochastic.
*   Causes of unpredictability include:
    *   Aleatoric uncertainty: inherent randomness in the environment (e.g., weather, noisy sensors).
    *   Epistemic uncertainty: incomplete knowledge or partial observability of the true state.
    *   Model limitations: inaccuracies due to limited training data, model capacity, or computational constraints.
*   The world model must therefore be capable of representing multiple plausible futures instead of a single predicted next state.

**Figure 5 and Training a Reactive Policy from Mode-2 Optimization**
*   Mode-2 reasoning (planning and simulation) requires significant computational resources and can only handle one complex task at a time.
*   To reduce computational load and enable multitasking, the system learns reactive policies (Mode-1) by imitating Mode-2 behavior.
*   The procedure is:
    *   Run Mode-2 to generate an optimal action sequence for a task.
    *   Train the policy module (Mode-1) to approximate this optimal sequence, minimizing a divergence between its output and the Mode-2 results.
*   This process is a form of amortized inference, where the expensive planning process teaches the reactive policy to act effectively without planning.
*   The trained policy module can then be used for:
    *   Fast, reactive behavior (Mode-1).
    *   Providing an initial guess to speed up Mode-2 optimization.

**Section 3.1.3 From Mode-2 to Mode-1: Learning New Skills**
*   The world model engine can only focus on one task at a time due to resource constraints, similar to human focused attention.
*   Reactive policies (Mode-1) are less resource-intensive and multiple such policies can run in parallel, each specialized for particular tasks.
*   The iterative training from Mode-2 to Mode-1 enables the agent to "compile" complex reasoning into fast, reactive skills.
*   This process reflects skill acquisition: reasoning-heavy planning helps acquire new skills, which are then executed reactively.

**Section 3.1.4 Reasoning as Energy Minimization**
*   Planning in Mode-2 can be conceptualized as reasoning by simulation and optimization.
*   Actions are treated as variables that transform one state into another, and reasoning corresponds to finding sequences of actions that minimize a cost or "energy" function.
*   This framework generalizes many classical AI reasoning approaches, such as constraint satisfaction and probabilistic inference.
*   The architecture represents reasoning as a factor graph where cost modules act like factors enforcing constraints.
*   Importantly, it supports reasoning beyond symbolic logic, enabling analogy and simulation-based reasoning typical in natural intelligence.

**3.2 The Cost Module as the Driver of Behavior**
*   The cost module is central to the agent’s behavior control, composed of two parts:
    *   Intrinsic Cost (IC): Immutable, hardwired, defines basic drives and survival instincts.
    *   Trainable Critic (TC): Learned module, predicts future costs, enabling planning and goal focus.
*   Both IC and TC consist of multiple submodules whose outputs are linearly combined, with weights modulated dynamically by the configurator to focus on relevant subgoals.
*   Intrinsic Cost Module (IC):
    *   Encodes fundamental behavioral drives and instincts.
    *   Examples for robots: pain from overload or damage, hunger (energy reserves), fear of hazardous environments.
    *   Can also include social and exploratory drives like empathy, curiosity, and desire for social interaction.
    *   Functions similarly to the amygdala in animals, which governs primal drives and emotions.
    *   Must be immutable to avoid behavioral collapse or unintended drift.
*   Trainable Critic Module (TC):
    *   Anticipates long-term outcomes without heavy use of world model.
    *   Allows configurator to guide agent focus by learning subgoal-specific costs.
    *   Plays a role in flexible, adaptive behavior tuning.
*   Four ways to specify agent behavior:
    1.  Explicit programming of specific behaviors triggered by conditions.
    2.  Defining an objective function that, when minimized, leads to desired behavior.
    3.  Supervised training by an expert demonstrating desired actions (training a reactive Mode-1 policy).
    4.  Imitation learning (inverse reinforcement learning), inferring the objective function from expert behavior to build a critic submodule for Mode-2 planning.
*   The second method (objective-driven) is generally preferred due to robustness and easier engineering compared to hardcoded behaviors, which can fail in novel or unexpected conditions.

**3.3 Training the Critic**
*   The critic's primary role is to predict future intrinsic costs (energy), supporting planning and adaptive behavior.
*   Utilizes the short-term associative memory which stores triplets: (time, state, intrinsic energy).
*   Stored data may come from real perceptions or imagined states generated by the world model during Mode-2 planning.
*   The critic retrieves a past state and the intrinsic cost at some later time, then trains itself to minimize the prediction error between its estimate and the observed intrinsic cost at that later time.
*   Training resembles standard reinforcement learning critic updates (e.g., Advantage Actor-Critic methods), focusing on reducing future cost prediction errors.
*   The short-term memory can be implemented as a key-value memory network, which:
    *   Matches query vectors with stored keys to retrieve weighted combinations of values.
    *   Allows interpolation and "soft" associative recall rather than exact matches.
    *   Enables one-shot learning and is fully differentiable, facilitating end-to-end training.
