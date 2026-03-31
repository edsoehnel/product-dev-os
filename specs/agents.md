
# Context

To understand the general process for this repo, please review the PRODUCT-DEV-OS.md file.  

# This Document

Functions more like a router, telling AI where to find stuff.

# This Repo

- Rules for editing code
- AI should modify docs before modifying code. 
- All new features must update data-model.md. All tests must pass before merge.

# Where To Find Documentation

in specs folder. Ignore anything with "draft" in the name.  Pointy out workflow docs, skill docs (or agent skills) and system documentation (describing different parts of the system)


# Additional General Requirements

 Code is created in files.  Code is well documented and explains why the code exists, what it does, maintenance tips, gotchas if any.
 
 ## Change Propagation Rules
 
 When any of the following are modified:
 - API responses
 - data structures
 - business logic
 - system behavior
 
 You must:
 
 1. Identify all affected layers:
    - specs
    - srv
    - data-ops
    - tests
 
 2. Update only the impacted sections, but in audit mode first. Do not edit yet until I review and give command to proceed with updates
 
 3. Maintain consistency across:
    - schema definitions
    - example data
    - architecture documentation
 
 4. Add an entry to `specs/decisions.md` if the change alters:
    - system behavior
    - data contracts
    - architectural assumptions
 
 5. Do not rewrite entire documents unless explicitly instructed
 
 Consider writing a change audit template md file for above. 