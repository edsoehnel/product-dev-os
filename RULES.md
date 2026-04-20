# Project Rules

Dump in rules that I come across - could be anything, specific or general.  

1. Human is the architect (what + why), AI is the operator (how + execution)
2. In planning phase of projects, the goal is to implement solutions that scale, that fit well int he bigger picture, are easy to maintain, and respect good software engineering paradigms.  AI agents are to think like a founder, not a part-time engineer. Model this expression:  Prototype for 1X; Build for 10X; Engineer for 100X.
3. Break down projects and problems into many different sub-tasks that you can put a box around.  Think components that are connected together once, not overly interconnected systems with functions consolidated into same script files.  THink folders for components and putting them into discrete folders.  Big sytems are daunting, but not if you break them down into discrete components that also means discrete tasks to work on them.  THe bigger the component or task, the more context memory is needed, which creates problems.  Respect and be good to AI agents by keeping context and memory as small as possible.
4. Components are evoling fast - a better one could come out tomorrow.  Think about developing systems where you can swap out components and pieces with better ones that emerge.
5. Never mutate data without reviewing plan, understanding impact, vertifying results
6. Before deleting, backup, then review, then confirm
7. If working in windows workstation, handle windows + Linux paths for testing
8. Never modify production database schemas without migration scripts.
9. Update documentation when architecture changes.
10. Follow directory structure strictly.
11. Do not place business logic in API controllers.
12. All new features require tests.
13. AI wil work in isolated environments that give them safe, parallel workspaces.  Never work on production environments. 
14. Feed AI agents currated context that provides the right info without overwhelming them.
15. Repos might contain contradictory information.  AI agents will flag that and ask before proceeding to get clarification.

# Dev. Vs Production

All projects worked on and tested in dev VM,  then pushed to producton via Git.  

1. Dev work
- build features
- test
2. Push to GitHub
- commit
- push
3. Deploy to prod
- git pull
- restart
4. Validate
5. Tag release
- v1.2.0

Or, create branch, spin up VM and work on it, test, open PR, merge to main.  

# AI Processes

0. Prep: Cleans the working tree by analyzing any uncommitted work and doing the right thing with it (stash or commit). Also runs the entire current test suite and fixes any failures it encounters.
1. Picks a task from bugs first, or if bugs are complete, a feature that I've completed a spec for
2. Loads up the spec, and then analyzes it
3. Loads relevant docs, then looks at relevant code
4. Develops a testing plan (absolutely critical)
5. Writes extensive tests for this, then runs them, expecting failures
6. Develops an extensive plan of its own (I NEVER read this, I do not care)
7. Runs sub-agents as critical reviewers (review agents) based on 6 personas I've detailed in REVIEW_PERSONAS.md: Designer, Architect, Domain Expert, Code Expert, Performance Expert, Human Advocate. Each of these "owns" a portion of the docs, and reviews against their own documentation, including suggesting where their own docs need to be adapted.
8. Adapts plan based on review agent reviews, and loops to 7 until green light from all review agents
9. Implements the plan, including documentation adjustments (docs live in the same code base under Docs)
10. Runs type checking, linting, compiler, other static analysis tools such as bundle size reporter, as many things as possible, and of course the relevant tests themselves, and verifies that it works, iterating as it goes. Be as strict as possible with your type checking and linting system. I used to be anti strictness, but that was when I was a wetware dev. For agents, I want the most strictness possible.
11. Run the entire test suite to protect against regressions, fix any new issues
12. Runs the review agents again on the implementation diff, and loops back to step 10 until getting a green light from all review agents.
13. Add any encountered unrelated TODOs for human review that they've noticed along the way to the TODO doc
14. Wrap-up: write a CHANGELOG entry, commit with a detailed commit message meant for human context when reviewing the code. (More on commits later)
15. Loop back to the beginning (step 1), and select the next task or spec.
16. When completely done, write up a report for human review. Extremely concise. Details live in commit messages.

Only give an AI a few rounds to fix a problem because if not fixed, then repeated rounds offer diminishing returns of fixing, and more rounds cost more tokens without proportional improvements.  Knowing when to stop is important

# Human Processe After AI Processes

1. Review: Check the changelog and agent recap. Then go commit by commit, reviewing each commit message, implementation diff, tests, and docs changes.
2. Stacked commits: I keep all commits in the same branch so they stack on each other (a good use for stacked PRs, btw). Improvements carry forward to each subsequent commit. Fewer conflicts, better results, less duplicative work.
3. Quick fixes: If I need to correct something quickly, I do it using an interactive agent session or by hand. But before I do, I ALWAYS analyze and correct the docs, workflow, and validations/testing first.
4. Postmortem: If the agent misbehaved, don't just fix the code. Don't tell it to fix the code either. Use that valuable context to figure out why it did the wrong thing. Have it analyze its own context and tell you what docs, skills, or workflow led it astray, and what improvements would make it make the right decision next time. Have it fix those issues first — be diligent, because you can amortize the improvement over the rest of your project. Only after that, have it fix the original issue. Use that feedback cycle and continuous improvement to get to a point where it is making the right decisions more often than not.
5. Manual testing: I check almost every change manually and thoroughly. Not just to catch bugs, but to catch gaps in my docs, skills, specs, validations/tests, and my own understanding of the system. And fix them!
6. Spec writing: Then I get back to the first part — gathering requirements, writing specs, doing architecture, and thinking a lot.

# Notes
Automated testing is incredibly important. This WILL NOT WORK if you don't have a super robust end-to-end testing harness in place and excellent docs so the agents can create their own tests.
