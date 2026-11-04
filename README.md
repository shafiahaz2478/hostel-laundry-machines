## 1. PRD
Build an app that shows which hostel washing machines and dryers are free, and lets students start a cycle and collect their clothes: a FastAPI + SQLite backend and a React frontend

## 2. Endpoint tracker

Fill in the method and path from your PRD's endpoint table. Status: ✅ done · 🟡 in progress · ⬜ not started

| # | Method + path            | Built   | Rules checked in /docs | Connected to React | Who |
|---|--------------------------|---------|------------------------|---|---|
| E1 |        GET /machines       |    ✅  |✅                     | ⬜  | Yashwanth |
| E2 |  GET/machines/{id}  |    ✅  | ✅                    | ⬜  | Sarang |
| E3 |    POST + /machines         |    ✅  |✅                     | ⬜  | Sarang  |
| E4 |  |  ✅    | ✅                     | ⬜ | Shafi |
| E5 | POST/runs/{machine_id} |  ✅      | ✅                     | ⬜  | Sarang  |
| E6 | PATCH /collect/{machine_id}           | ✅      | ✅                       | ⬜  | Shafi  |
| E7 | PATCH /clear/{machine_id}                        |  ✅     | ✅                      | ⬜  | Shafi  |
| E8 | GET /runs/{roll_no}                        |  ✅     | ✅                     | ⬜  | Shafi  |
| E9 |  GET/attention                       |  ✅     | ✅                      | ⬜  | Sarang  |
| E10 |                          |  ✅     | ✅                      | ⬜  | Shafi  |
| E1 |               |    ⬜  |⬜                     | ⬜  | Yashwanth |
| E2 |   |    ⬜  | ⬜                    | ⬜  | Sarang |
| E3 |             |    ⬜  |⬜                     | ⬜  | Sarang  |
| E4 | PATCH /service/{machine_id} | ✅      | ✅                     | ⬜  | Shafi |
| E5 |  | ⬜      | ⬜                     | ⬜  | Sarang  |
| E6 | PATCH /collect/{machine_id}           | ✅      | ✅                       | ⬜  | Shafi  |
| E7 | PATCH /clear/{machine_id}                        |  ✅     | ✅                      | ⬜  | Shafi  |
| E8 | GET /runs/{roll_no}                        |  ✅     | ✅                      | ⬜  | Shafi  |
| E9 |                         |  ⬜     | ⬜                      | ⬜  | Sarang  |
| E10 | GET /usage                       |  ✅     | ✅                      | ⬜  |  Shafi |



## 3. Problems and Bugs Encountered

Sarang - E2

1. Fixing the linking between tables for quering the last 5 runs
2. Issues with helper functions checking for available machines


E3

1. fixing issues with invalid input code giving wrong detail information

E5

1.

