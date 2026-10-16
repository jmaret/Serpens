# Vision and requirements

**Product:** Serpens

**Last updated:** 2026-10-15

## Summary

Serpens is a public room that teaches Python. A visitor can read where the language came from, how it sits beside Rust, JavaScript, and Java, and why engineers reach for it. The first page is a short path: the shape of a tiny program, the syntax that writes it, and names, shared objects, `None`, and exceptions. `/further` continues on its own page with duck typing, modules, comprehensions, closures, threads, and async.

Checks are graded in the browser. A program runs only when the visitor chooses Try it, and then on Python Tutor. This site does not run an interpreter and does not keep an account.

The name of the product is Serpens.

## Vision

Serpens teaches Python by a short path, then a second page. The first lessons are the shape of a program: a file that runs from the top, `print`, and a project directory. The next lessons are the syntax that fills that shape. The last lessons on that page are the ideas that make Python Python: names refer to objects, a function can change a shared object, and absence is `None` while failure is an exception. `/further` is the later path: duck typing through async, so the first page does not keep growing.

The room is free to open. Nothing the visitor answers is stored. The interpreter stays on [pythontutor.com](https://pythontutor.com), and a program is sent there only when the visitor chooses Try it.

## Users

- **Visitor** — reads where the language came from, then a lesson on the first page or on `/further`, answers its checks, and may open the same program in Python Tutor.
- **Builder** — ships the static site and keeps the lessons and these documents together.

## Principles

- **Zero cost** — static export, no account, no paid API, no interpreter host.
- **A real program** — each lesson shows one short program. Try it opens that program.
- **A check you can finish here** — the answer is graded in the browser, with the explanation either way.
- **One visual system** — AetherForge chrome: paper `#F6EAD8`, ink `#152028`, petrol `#0F4C5C`, Source Serif 4, Source Sans 3, IBM Plex Mono, frosted panels. The mark is a coiled python. The backdrop is a python.
- **Living documents** — the vision page and the architecture page render the Summary of these files. A change to the app updates the files in the same work.
- **The name is Serpens** — pages, the header, and these documents use that word alone.

## In scope

- `/language` explains the origins of Python, how it compares with Rust, JavaScript, and Java, why someone chooses it, and where it has a following.
- Thirteen lessons on `/`: a script and `main`, `print` and f-strings, the project shape, rebinding names, a few types and annotations, functions and `return`, `if` and `for`, classes and methods, `match`, `list` and `str`, names that refer to objects, shared mutation, `None`, and exceptions.
- Eleven lessons on `/further`: duck typing, one function for more than one type, a nested function that keeps its names, modules, comprehensions, closures, a list of different objects, threads and `join`, a queue, a lock, and async coroutines.
- One or two checks on each lesson, graded in the browser.
- Try it opens Python Tutor with that lesson's program, as Python 3.11.
- `/vision` renders the Summary of this document.
- `/architecture` draws the conceptual, logical, and physical views, then renders the architecture Summary.
- `/releases` renders `CHANGELOG.md`. The header version chip links there and shows the package version.
- A python behind the pages, with the AetherForge paper wash so the type stays readable.
- A static export. Styles and the photograph load from the site root.

## Out of scope

- Hosting a Python interpreter.
- Accounts, saved answers, or progress that survives a refresh.
- Teaching the whole standard library. The async lesson shows that a coroutine is a value until something awaits it. It does not run the body.
- An AetherForge catalog entry, until that is asked for.

## Requirements

| ID | Requirement | Status |
| --- | --- | --- |
| V-1 | Lessons run from the top of a script through names, shared objects, `None`, and exceptions | Met |
| V-2 | Each lesson has one program and one or two checks graded in the browser | Met |
| V-3 | Try it opens Python Tutor with that program. This site does not host an interpreter | Met |
| V-4 | `/vision` renders the Summary of this document | Met |
| V-5 | `/architecture` shows conceptual, logical, and physical pictures, then the architecture Summary | Met |
| V-6 | `/releases` renders the changelog. The header chip links to it and shows the package version | Met |
| V-7 | The chrome matches AetherForge, with the coiled-python mark and the python backdrop | Met |
| V-8 | The site is a static export with no auth and no paid dependency | Met |
| V-9 | A code change updates this document, the architecture document, and `CHANGELOG.md` together | Met |
| V-10 | The product name is Serpens alone | Met |
| V-11 | `/language` covers origins, comparisons with Rust, JavaScript, and Java, why someone chooses Python, and where it has a following | Met |
| V-12 | `/further` teaches duck typing through async, on a page of its own, with the same checks and Try it | Met |
| V-13 | Styles and the photograph load from the site root | Met |

## Acceptance

A visitor can read the language page, open a lesson on the first page or on `/further`, answer a check, see whether it was right, and open Try it on Python Tutor. The visitor can read the vision summary, the three architecture pictures, and the release notes from the version chip. The page does not ask for a sign-in, and a check does not leave the browser.

## Changelog

- 2026-10-15 — First room: thirteen lessons, eleven further lessons, checks, Try it, the language page, vision, architecture drawings, and release notes. The backdrop is a python.
