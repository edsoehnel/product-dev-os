# Product Development And Production Methodology

## Overview

This repository represents an entirely new way for me personally to develop products (physical and digital) and as such, is constantly being added to and refined.  I am doing this because of AI, which is becoming a critical partner in how I develop products.  Because of this new partner, I am having to completely redesign how I go about developing not just new products/services, but new businesses.  

This repository is a template that will be copied when a new product is to be created.  

This template is to be used when an AI is involved because this document helps provide executable structure that an AI can understand to create the product and manage its production.  

A change to the product would mean changing the executable structure, not the actual code or the product itself, because AI is the product development and production layer and uses the executable structure layer to produce.  

This template guides how to create the product, how to produce it, and improve it.  This process is not just for software products, but also for physical products, because increasingly, AI will assume control of physical production of products via automated test and assembly lines.

I organize the layers according to the 8 core functional areas of a business that I created, [as defined here](https://eddiesoehnel.com/startup-roadmap/).

### Tools:

* If humans need to think through it → Google Docs to allow for shared working  
* If AI needs to read it to build something → Markdown in a repo
* You want to map strategy >>> structured specs >>> agent execution.  Strategy is business realm (problem you solve, differertiators, moats, growth strategy), which gets turned into structures specs that AI agents use to build the product to satisfy the strategy.

The most valuable stack is:

1. problem framing
2. system design
3. data modeling
4. AI orchestration

### 3-layer system

1. Knowledge layer (specs/)   → what the system is supposed to do. The truth via highly structured executable knowledge that AI can understand. Structure leads to intelligence.  Smarter AI models help, but if poorly structured, then failure.  Well structure knowledger layers can succeed even with average models. 
2. Product layer (tasks/ and srv/) → takes the knowledge layer and executes it:  develop code, develop the product, produce the product.
3. Data layer (data/) → what the system observes, stores, and learns from based on production. The data validates reality, that leads to iterate above to improve.

### Structure For Git Repo

- Changes and commits always tracked. 
- Branch strategy:  main (production), dev (active development), feature branches (experimental). Flow: feature>>dev>>main 

### Structure For Files

- Use consistent headings
- Keep sections predictable.  If every file has a predictable structure, AI navigation improves dramatically.

#### repo/

- README.md \ high level overview of project; but copy out the contents in this file to the overview file to allow an AI to understand the basis for this repo and its structure for product development.  
- CHANGELOG.md \
- VERSION.md \ 
- PROJECTRULESPROCESSES.md \ agent and human rules/processes

##### specs/

*The executable structure layer, organized by main function and in order*

- agents.md \ Functionas more like a router, telling AI where to find stuff. General rules. Set up clear path where AI agents orchestrate other AI agents
- decisions.md \ why we did what we did, why we chose A over B, etc.  Architecture Decision Records (ADR). provide context, decision, risks, consequences. Document using the [decision layer and biases layer](https://docs.google.com/document/d/1VjtP-jPn-wOpE8z5QSVOdk-pPxneyuDDM6z_a9OIpYY/edit?tab=t.0)
- personas.md \ As AI may run sub-agents, this document defines the  personas for those sub-agents.

###### 1_strategy_s

- vision/concept validation/strategy/mission/goals/marketing/sales/distribution/goals/target customer/constraints/success metrics/.md \ use the **B2C framework**.

###### 2_systems_s

- api-spec.md \- AI capabilities, focus for this project.
- architecture.md \- infrastructure, platforms, code bases, tech stack, engineering design, environment \ the [long-term tech stack is here](https://docs.google.com/document/d/1BtcV4Lpv4E8vf5jMHcYmzw__U8ZN0ZCx0-1KTo0Z-1U/edit?tab=t.0)
- data-model.md \- how the data flows through the product, where it ends up, how it is , structure, relationships, rules governing it, where stored
- environments.md - multiple environments that exist - dev, staging, production
- system.md \ map of how the knowledge layer connects to the code, how data flows, how AI should reason about the repo
- ####### config/
- - .env files, API's, feature flags, for both dev and production
 
###### 3_product_development_s

- user-flows/screen states/actions.md

###### 4_finance_s

###### 5_production_logistics_s

###### 6_marketing_s

###### 7_sales-distribution_s

###### 8_support_s
 
##### tasks

*task/project items in separate documents* 

date_build-plan.md \ sequences, tasks, modules, dependencies, components

##### srv/

*The production/execution layer for AI to execute on. Code is created in files.  Code is well documented and explains why the code exists, what it does, maintenance tips, gotchas if any.*

###### digital 

*digital/software-based products/services*

- app/
- models/
- scripts/
- services/
- ui/
- utils/
- routes/

###### physical

*physical-based products/services*

##### data-ops/

*Data that is already a part of the system (ie.: CRM customer data) or which gets produced from the system. repo/ topline and docs/ are strategy, systems and product development are src/, data is all other functions, pulled from **B2C Framework**

###### 1_strategy_d


###### 2_systems_d

- json-db/
- schemas/
- runtime-exports/
- deployment.md \
- monitoring.md \
- maintenance.md \
- backup.md \
- security.md \
 
###### 3_product_development_d


###### 4_finance_d


###### 5_production-logistics_d


###### 6_marketing_d


###### 7_sales-distribution_d


###### 8_support_d


##### tests/

*Run time feedback*
- acceptance-tests.md \
- qa-checklists.md \
- dev-tests/

