# Product Development And Production Methodology

## Overview

This is a template that will be copied when a new product is to be created.  This template is to be used when an AI is involved because this document helps provide executable structure that an AI can understand to create the product and manage its production.  A change to the product would mean changing the executable structure, not the actual code or the product itself, because AI is the production layer and uses the executable structure layer to produce.  This template guides how to create the product, how to produce it, and improve it.  This process is not just for software products, but also for physical products, because increasingly, AI will assume control of physical production of products via automated test and assembly lines.

### Tools:

* If humans need to think through it → Google Docs to allow for shared working  
* If AI needs to read it to build something → Markdown in a repo

The most valuable stack is:

1. problem framing
2. system design
3. data modeling
4. AI orchestration

### 3-layer system

1. Knowledge layer   → what the system is supposed to do. The truth via highly structured executable knowledge that AI can understand  
2. Product layer → takes the knowledge layer and executes it:  develop code, develop the product, produce the product  
3. Data layer → what the system observes, stores, and learns from based on production. The data validates reality, that leads to iterate above to improve

# ## Structure For Git Repo

Changes and commits always tracked. 
Branch strategy:  main (production), dev (active development), feature branches (experimental). Flow: feature>>dev>>main 

### repo/

README.md \ see template 
CHANGELOG.md
VERSION.md \ see template
PROJECTRULES.md \ see template

### docs/
*The executable structure layer: product intent, product behavior, systems design, build plan*
agents.md \ how this repo works, what the structure means, rules for editing code. AI should modify docs before modifying code. All new features must update data-model.md. All tests must pass before merge.
vision/concept validation/strategy/mission/goals/marketing/sales/distribution/goals/target customer/constraints/success metrics/.md \ use the **B2C framework**. 
requirements/desired outcomes.md
user-flows/screen states/actions.md
architecture.md \- infrastructure, platforms, code bases, tech stack, engineering design, environment \ the [long-term tech stack is here](https://docs.google.com/document/d/1BtcV4Lpv4E8vf5jMHcYmzw__U8ZN0ZCx0-1KTo0Z-1U/edit?tab=t.0)
environments.md - multiple environments that exist - dev, staging, production
data-model.md \- how the data flows through the product, where it ends up, how it is , structure, relationships, rules governing it, where stored
api-spec.md \- AI capabilities, focus for this project. 
build-plan.md \- sequences, tasks, modules, dependencies, components
decisions.md \ why we did what we did, why we chose A over B, etc.  Architecture Decision Records (ADR). provide context, decision, risks, consequences. Document using the [decision layer and biases layer](https://docs.google.com/document/d/1VjtP-jPn-wOpE8z5QSVOdk-pPxneyuDDM6z_a9OIpYY/edit?tab=t.0)
system.md \ map of how the knowledge layer connects to the code, how data flows, how AI should reason about the repo

### src/
*The production/execution layer for AI to execute on. Code is created in files.  Code is well documented and explains why the code exists, what it does, maintenance tips, gotchas if any*
app/
models/
scripts/
services/
ui/
utils/
routes/

### data/
*Data that is already a part of the system (ie.: CRM customer data) or which gets produced from the system. repo/ topline and docs/ are strategy, systems and product development are src/, data is all other functions, pulled from **B2C Framework**
json-db/
schemas/
runtime-exports/
finance/
marketing/
sales/
support/

### tests/
*Run time feedback*
acceptance-tests.md
qa-checklists.md
dev-tests/

### ops/
deployment.md
monitoring.md
maintenance.md
backup.md
security.md

### config/
.env files, API's, feature flags, for both dev and production
