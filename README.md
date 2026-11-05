## 1. PRD
Build an app that shows which hostel washing machines and dryers are free, and lets students start a cycle and collect their clothes: a FastAPI + SQLite backend and a React frontend

## 2. Endpoint tracker

Fill in the method and path from your PRD's endpoint table. Status: ✅ done · 🟡 in progress · ⬜ not started

| # | Method + path            | Built   | Rules checked in /docs | Connected to React | Who |
|---|--------------------------|---------|------------------------|---|---|
| E1 |        GET /machines       |    ✅  |✅                     | ⬜  | Yashwanth |
| E2 |  GET/machines/{id}  |    ✅  | ✅                    | ⬜  | Sarang |
| E3 |    POST + /machines         |    ✅  |✅                     | ⬜  | Sarang  |
| E4 | PATCH /service/{machine_id} | ✅      | ✅                     | ⬜  | Shafi |
| E5 | POST/runs/{machine_id} |  ✅      | ✅                     | ⬜  | Sarang  |
| E6 | PATCH /collect/{machine_id}           | ✅      | ✅                       | ⬜  | Shafi  |
| E7 | PATCH /clear/{machine_id}                        |  ✅     | ✅                      | ⬜  | Shafi  |
| E8 | GET /runs/{roll_no}                        |  ✅     | ✅                     | ⬜  | Shafi  |
| E9 |  GET/attention                       |  ✅     | ✅                      | ⬜  | Sarang  |
| E10 | GET /usage                       |  ✅     | ✅                      | ⬜  |  Shafi |

## 3.Frontend Tracker
| Part | Shows | Does | Uses | Who |
| :---- | :---- | :---- | :---- | :---- |
| Machines | a card per machine: name, block, kind, and a coloured label: "Free", "Running · 12 min left", "Waiting for pickup" or "Out of order"; click one to see its recent runs | block and kind filters; roll number \+ **Start** on free machines; roll number \+ **Clear** on machines waiting too long | E1, E2, E5, E7 |Sarang |
| My laundry | the student's runs with minutes left | type roll number \+ **Show**; **Collect** button | E6, E8 | Shafi |
| Laundry staff | the machines that need attention; today's usage per block; a form with block and kind dropdowns | **Out of order / In service** button; adds a machine | E3, E4, E9, E10 | |

## 4. Problems and Bugs Encountered

Sarang - E2

1. Fixing the linking between tables for quering the last 5 runs
2. Issues with helper functions checking for available machines


E3

1. fixing issues with invalid input code giving wrong detail information

E5

1. dealing with datetime values with time delta to calculate end time using cycle_minutes.

E9

1. dealing with machine state for out of order machines getting overwritten by the machine state for pickup longer than 15 minutess.


