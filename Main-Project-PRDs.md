# **03\. PRD & Design Doc: Hostel Laundry Machines**

Build an app that shows which hostel washing machines and dryers are free, and lets students start a cycle and collect their clothes: a **FastAPI \+ SQLite** backend and a **React** frontend. **Team: 2 students. Time: 2 days, with the demo on day 3\.**

## **1\. What to build**

* Students see each machine's state: **free**, **running** (with minutes left), **waiting for pickup**, or **out of order**.

* A student starts a free machine with their **roll number**, and collects their clothes when the cycle ends. Only that student can collect.

* If clothes are left in a machine for **15 minutes** after the cycle ends, another student can clear the machine and use it.

* Laundry staff add machines and mark them out of order. There are no logins.

## **2\. Data**

One SQLite file, laundry.db, with two tables.

| Table | Columns |
| :---- | :---- |
| machines | id, name, block, kind, cycle\_minutes, in\_service (1 or 0\) |
| runs | id, machine\_id, roll\_no, started\_at, ends\_at, collected\_at (empty until collected), status |

block must be one of: a, b, c, d. kind is washer or dryer. Run status is one of: running, collected, cleared. Times are written as YYYY-MM-DD HH:MM.

A machine's state comes from its data, not a column: **out of order** if in\_service is 0; **running** if it has a running run and ends\_at hasn't come; **waiting for pickup** if it has a running run and ends\_at has passed; otherwise **free**.

Add **8 machines** across the four blocks (one out of order) and **10 runs** to start with: some collected, two still running, and one waiting for pickup for more than 15 minutes.

## **3\. API: 10 endpoints**

Run it on port **8001**, and add CORS so the React app can call it.

**Before you write any code, fill in the empty columns.** Pick the method (GET, POST, PATCH or DELETE), the path, what the client sends, and the status codes. Use the rules in section 4 for the error codes.

| \# | What it does | Method | Path | Request body | Success code | Error codes |
| :---- | :---- | :---- | :---- | :---- | :---- | :---- |
| E1 | Get all the machines. Can be filtered by block and kind. Each one includes its state, and minutes left if running. |  |  |  |  |  |
| E2 | Get one machine by its id, with its last 5 runs. |  |  |  |  |  |
| E3 | Add a machine: name, block, kind and cycle minutes. It starts in service. |  |  |  |  |  |
| E4 | Mark a machine out of order or back in service. |  |  |  |  |  |
| E5 | Start a machine with a roll number. It starts now and ends after the machine's cycle minutes. |  |  |  |  |  |
| E6 | Collect clothes from a run, with the roll number of the student who started it. |  |  |  |  |  |
| E7 | Clear a machine whose clothes weren't collected, with your roll number. The run becomes cleared. |  |  |  |  |  |
| E8 | Get one student's runs that aren't collected or cleared, by roll number. Each one includes the machine's name and minutes left. |  |  |  |  |  |
| E9 | Get the machines that need attention: out of order, or waiting for pickup for more than 15 minutes. |  |  |  |  |  |
| E10 | Get today's usage: for each block, the number of washer runs and dryer runs started. |  |  |  |  |  |

## **4\. Rules the API must check**

| Rule | Status |
| :---- | :---- |
| Starting a machine that is out of order | 400 |
| Starting a machine that is running or waiting for pickup | 400 |
| Starting when the student already has a run that isn't collected or cleared | 400 |
| Collecting before the cycle has finished, or from a run that is already collected or cleared | 400 |
| Clearing less than 15 minutes after the cycle ended | 400 |
| Clearing your own run (collect it instead) | 400 |
| Marking a machine out of order while it is running | 400 |
| Collecting with a roll number that isn't the student who started the run | 403 |
| A machine or run id that doesn't exist | 404 |
| A missing or empty field, a block or kind not in the list, or cycle\_minutes not between 20 and 90 | 422 |

Every error sends a clear message: {"detail": "This machine is running. It will be free in 12 minutes."}. 403 means "you're not allowed to do this".

Hint for times: from datetime import datetime, timedelta, then datetime.now() \+ timedelta(minutes=cycle\_minutes) is the end time. Save it with .strftime("%Y-%m-%d %H:%M").

## **5\. Frontend**

One page with three parts. Keep the API address in one place: const API\_URL \= "http\://127.0.0.1:8001";

| Part | Shows | Does | Uses |
| :---- | :---- | :---- | :---- |
| Machines | a card per machine: name, block, kind, and a coloured label: "Free", "Running · 12 min left", "Waiting for pickup" or "Out of order"; click one to see its recent runs | block and kind filters; roll number \+ **Start** on free machines; roll number \+ **Clear** on machines waiting too long | E1, E2, E5, E7 |
| My laundry | the student's runs with minutes left | type roll number \+ **Show**; **Collect** button | E6, E8 |
| Laundry staff | the machines that need attention; today's usage per block; a form with block and kind dropdowns | **Out of order / In service** button; adds a machine | E3, E4, E9, E10 |

* Put each component in its own file in src/components/.

* After every action, the page updates without a refresh.

* When the API says no, show its detail message on the page.

## **6\. Plan**

| Day | Finish |
| :---- | :---- |
| Day 1 | Database \+ all 10 endpoints \+ the rules, tested in /docs |
| Day 2 | React app connected to the API |
| Day 3 | Demo |

Fill in the progress check-in every 3 hours.

## **7\. Done when**

* ☐ All 10 endpoints work in /docs.

* ☐ Each rule in section 4 gives the right status code.

* ☐ Starting a machine changes its label to Running, and collecting makes it Free again, without a refresh.

* ☐ Starting a busy machine shows the API's message on the page.

* ☐ The data is still there after restarting the API.

## **8\. Submit and marks**

One GitHub repo with backend/, frontend/ (without node\_modules) and a README.md that says how to run both. Both partners must be able to explain any part of the code.

| Part | Marks |
| :---- | :---- |
| Endpoints and rules | 40 |
| Frontend connected to the API | 40 |
| README and demo (explain your code) | 20 |

**Bonus, if you finish early:** refresh the minutes left every 30 seconds, a "Your clothes are ready" banner in My laundry, or pytest tests for the rules.

