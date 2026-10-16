import { py, type Lesson } from "./lessons";

export const furtherLessons: Lesson[] = [
  {
    id: "duck",
    chapter: "Shared behavior",
    title: "A method is there if the object has it",
    summary:
      "pier.meters() works because Pier defines meters. Another class can define meters too, and a caller can use it without a shared declaration. If the method is missing, the error appears when that line runs.",
    code: py(`
      class Pier:
          def __init__(self, span: int) -> None:
              self.span = span

          def meters(self) -> int:
              return self.span

      pier = Pier(12)
      print(pier.meters())
    `),
    notice:
      "Nothing registers Pier as a provider of meters ahead of time. The lookup happens on the object, at the call.",
    checks: [
      {
        id: "duck-output",
        prompt: "What is printed?",
        options: [
          { id: "a", label: "12" },
          { id: "b", label: "Pier" },
          { id: "c", label: "meters" },
        ],
        answer: "a",
        explanation: "pier.meters() runs the method and returns the span attribute, which is 12.",
      },
      {
        id: "duck-missing",
        prompt: "What happens if you call meters on an object that has no such method?",
        options: [
          { id: "a", label: "It prints 0" },
          { id: "b", label: "AttributeError is raised when that line runs" },
          { id: "c", label: "The program refuses to start, before any line runs" },
        ],
        answer: "b",
        explanation:
          "Python looks up meters on the object at the call. A missing attribute raises AttributeError then, not before the program starts.",
      },
    ],
  },
  {
    id: "wider",
    chapter: "Shared behavior",
    title: "One function, more than one type",
    summary:
      "wider is written once. It returns whichever argument compares as greater. The two arguments have to support that comparison with each other. The check happens when the line runs.",
    code: py(`
      def wider(left, right):
          if left > right:
              return left
          return right

      print(wider(4, 12))
    `),
    notice:
      "4 and 12 are both ints, and ints can be ordered, so the comparison is legal when it runs. The function does not name the type in its header.",
    checks: [
      {
        id: "wider-output",
        prompt: "What is printed?",
        options: [
          { id: "a", label: "4" },
          { id: "b", label: "12" },
          { id: "c", label: "left" },
        ],
        answer: "b",
        explanation: "12 is greater than 4, so wider returns the right-hand value.",
      },
      {
        id: "wider-types",
        prompt: "What happens if the call is wider(4, \"12\")?",
        options: [
          { id: "a", label: "It prints 12, after turning the text into a number" },
          { id: "b", label: "TypeError is raised when the comparison runs" },
          { id: "c", label: "The program refuses to start, because the arguments have different types" },
        ],
        answer: "b",
        explanation:
          "An int and a str cannot be ordered with >. Python reports that when the comparison runs, as a TypeError.",
      },
    ],
  },
  {
    id: "kept",
    chapter: "Shared behavior",
    title: "A nested function keeps the names it uses",
    summary:
      "choose builds north, south, and the function picked. picked uses those two names. choose returns picked, and the call is over. name() still sees north, because the nested function kept the names it needed.",
    code: py(`
      def choose(take_left: bool):
          north = "north"
          south = "south"

          def picked() -> str:
              if take_left:
                  return north
              return south

          return picked

      name = choose(True)
      print(name())
    `),
    notice:
      "north is a local of choose, and it is still available after choose returns. The nested function holds onto the names it reads.",
    checks: [
      {
        id: "kept-output",
        prompt: "What is printed?",
        options: [
          { id: "a", label: "north" },
          { id: "b", label: "south" },
          { id: "c", label: "picked" },
        ],
        answer: "a",
        explanation: "take_left is True, so picked returns north. name is that function, and calling it prints north.",
      },
      {
        id: "kept-alive",
        prompt: "How can name() read north after choose has returned?",
        options: [
          { id: "a", label: "The nested function keeps the names it uses, so they stay alive" },
          { id: "b", label: "north is a global that every function can see" },
          { id: "c", label: "The call fails, because north was local to choose" },
        ],
        answer: "a",
        explanation:
          "picked refers to north, so that binding outlives the call that created it. north is not a global, and the later call still succeeds.",
      },
    ],
  },
  {
    id: "modules",
    chapter: "Shared behavior",
    title: "A leading underscore is a courtesy",
    summary:
      "A module is a file other code can import. Names in that file are visible to the importer. A leading underscore asks people to treat the name as internal. The language still lets you call it.",
    code: py(`
      # field/
      # ├── pyproject.toml
      # └── notes.py

      def _hidden() -> str:
          return "hidden"

      def label() -> str:
          return "north"

      print(label())
    `),
    notice:
      "On your machine, another file would say import notes and then call notes.label. This page is one file, so the call is direct. _hidden is still a normal function.",
    aside:
      "Try it opens this one file. A second file, and the import that reaches it, is the shape you use on your own machine.",
    checks: [
      {
        id: "modules-output",
        prompt: "What is printed?",
        options: [
          { id: "a", label: "north" },
          { id: "b", label: "hidden" },
          { id: "c", label: "notes.label" },
        ],
        answer: "a",
        explanation: "label returns the string north, and print writes it.",
      },
      {
        id: "modules-private",
        prompt: "What happens if this file calls _hidden()?",
        options: [
          { id: "a", label: "It returns hidden. The underscore does not hide the function." },
          { id: "b", label: "The program refuses to start, because a name that starts with _ is private" },
          { id: "c", label: "It returns an empty string" },
        ],
        answer: "a",
        explanation:
          "Privacy here is a convention. from notes import * skips a leading underscore, and a direct call still finds the function.",
      },
    ],
  },
  {
    id: "comprehensions",
    chapter: "Lists and functions",
    title: "A comprehension builds a new list",
    summary:
      "The comprehension walks spans, keeps values greater than 5, and builds a new list. spans itself is unchanged. len reports how many values were kept.",
    code: py(`
      spans = [3, 12, 7]
      long = [meters for meters in spans if meters > 5]
      print(len(long))
    `),
    notice: "3 is left out. 12 and 7 are kept. The new list is long. The source list is still three items.",
    checks: [
      {
        id: "comprehensions-output",
        prompt: "What is printed?",
        options: [
          { id: "a", label: "1" },
          { id: "b", label: "2" },
          { id: "c", label: "3" },
        ],
        answer: "b",
        explanation: "3 fails the test. 12 and 7 remain, so the new list has length 2.",
      },
      {
        id: "comprehensions-source",
        prompt: "What is spans after this program runs?",
        options: [
          { id: "a", label: "Still [3, 12, 7]. The comprehension built a separate list." },
          { id: "b", label: "[12, 7], because the filter changed the source" },
          { id: "c", label: "Empty. The items moved into long." },
        ],
        answer: "a",
        explanation: "A comprehension reads the source and writes a new list. spans still holds the original three numbers.",
      },
    ],
  },
  {
    id: "closures",
    chapter: "Lists and functions",
    title: "A function can use a name from outside",
    summary:
      "coat adds extra to its argument. extra is not a parameter. It is a name in the surrounding block, and coat reads it when coat is called.",
    code: py(`
      extra = 2

      def coat(meters: int) -> int:
          return meters + extra

      print(coat(10))
    `),
    notice: "The call passes 10. extra is already in scope, so the function adds 2 and returns 12.",
    checks: [
      {
        id: "closures-output",
        prompt: "What is printed?",
        options: [
          { id: "a", label: "10" },
          { id: "b", label: "12" },
          { id: "c", label: "2" },
        ],
        answer: "b",
        explanation: "coat(10) adds the captured extra, so the result is 12.",
      },
      {
        id: "closures-capture",
        prompt: "Where does extra come from inside coat?",
        options: [
          { id: "a", label: "From the surrounding block. It is not a parameter." },
          { id: "b", label: "The caller must pass it as a second argument" },
          { id: "c", label: "It is built into every function" },
        ],
        answer: "a",
        explanation: "extra is assigned above the function. coat uses that name without listing it in the parentheses.",
      },
    ],
  },
  {
    id: "mixed",
    chapter: "Lists and functions",
    title: "A list can hold different objects",
    summary:
      "Pier and Cable are different classes. Both have a name method. One list can hold an instance of each, because a list stores references, and every reference is the same size.",
    code: py(`
      class Pier:
          def name(self) -> str:
              return "pier"

      class Cable:
          def name(self) -> str:
              return "cable"

      parts = [Pier(), Cable()]
      print(len(parts))
    `),
    notice: "The list does not require the two objects to be the same class. len counts the references, which is two.",
    checks: [
      {
        id: "mixed-output",
        prompt: "What is printed?",
        options: [
          { id: "a", label: "2" },
          { id: "b", label: "pier" },
          { id: "c", label: "Pier" },
        ],
        answer: "a",
        explanation: "The list is built with two objects, so len is 2.",
      },
      {
        id: "mixed-size",
        prompt: "Why can Pier and Cable share this list?",
        options: [
          { id: "a", label: "The list stores references, and each reference has one size" },
          { id: "b", label: "A list can only hold numbers, and these classes are numbers" },
          { id: "c", label: "The classes are the same type because both define name" },
        ],
        answer: "a",
        explanation:
          "Each slot holds a reference to an object. Pier and Cable remain different classes. The list does not need them to share a declared type.",
      },
    ],
  },
  {
    id: "threads",
    chapter: "Concurrency",
    title: "join waits for a thread",
    summary:
      "Thread starts work on another thread. work appends 12 to a list both threads can see. join waits until that thread finishes, so the print reads the 12.",
    code: py(`
      from threading import Thread

      found: list[int] = []

      def work() -> None:
          found.append(12)

      thread = Thread(target=work)
      thread.start()
      thread.join()
      print(found[0])
    `),
    notice:
      "start returns when the thread has been started, not when work has finished. join is the wait. The list is shared because both threads are in one process.",
    aside:
      "Python Tutor opens this source in an editor. Its visualizer follows one flow, so a second thread may not step the way it does under CPython on your machine.",
    checks: [
      {
        id: "threads-output",
        prompt: "What is printed?",
        options: [
          { id: "a", label: "12" },
          { id: "b", label: "Nothing. start returns before work runs, and the print does not wait." },
          { id: "c", label: "found" },
        ],
        answer: "a",
        explanation: "join waits until work has appended 12. The print then reads the first item of the list.",
      },
      {
        id: "threads-join",
        prompt: "How does the print see the 12?",
        options: [
          { id: "a", label: "join waits for the thread, and both threads share the list" },
          { id: "b", label: "start itself returns 12" },
          { id: "c", label: "work writes a file that the print reads back" },
        ],
        answer: "a",
        explanation:
          "The thread and the caller share found. join makes sure the append has happened before found[0] is read.",
      },
    ],
  },
  {
    id: "queue",
    chapter: "Concurrency",
    title: "A queue passes a value across threads",
    summary:
      "Queue is a line of items. The new thread puts 12. get waits until that item arrives, then returns it. The print writes 12.",
    code: py(`
      from queue import Queue
      from threading import Thread

      messages: Queue[int] = Queue()

      def work() -> None:
          messages.put(12)

      thread = Thread(target=work)
      thread.start()
      meters = messages.get()
      thread.join()
      print(meters)
    `),
    notice:
      "put places 12 in the queue. get blocks until an item is available. join runs after get, once the worker has finished the put.",
    aside:
      "Python Tutor opens this source in an editor. Its visualizer follows one flow, so the worker thread may not run there the way it does on your machine.",
    checks: [
      {
        id: "queue-output",
        prompt: "What is printed?",
        options: [
          { id: "a", label: "12" },
          { id: "b", label: "messages" },
          { id: "c", label: "Nothing. put keeps the value on the other thread." },
        ],
        answer: "a",
        explanation: "put places 12 in the queue. get takes it back out, and the print writes 12.",
      },
      {
        id: "queue-get",
        prompt: "What does get do if the queue is still empty?",
        options: [
          { id: "a", label: "It waits until a put provides an item" },
          { id: "b", label: "It returns 0 immediately" },
          { id: "c", label: "It copies 12 onto every thread" },
        ],
        answer: "a",
        explanation: "get with no timeout blocks. The call continues when work has put an item, which is 12 in this program.",
      },
    ],
  },
  {
    id: "lock",
    chapter: "Concurrency",
    title: "A lock keeps one update exclusive",
    summary:
      "Three threads each add one to count. They already share the name, because they share the process. The lock makes each read-and-add finish before another thread starts the same steps. After every join, the count is 3.",
    code: py(`
      from threading import Lock, Thread

      count = 0
      lock = Lock()

      def add() -> None:
          global count
          with lock:
              count += 1

      threads = [Thread(target=add) for _ in range(3)]
      for thread in threads:
          thread.start()
      for thread in threads:
          thread.join()
      print(count)
    `),
    notice:
      "global tells add to rebind the module-level name. with lock: acquires the lock for the block and releases it afterward. The three joins finish before the print.",
    aside:
      "Python Tutor opens this source in an editor. Its visualizer follows one flow, so these three threads may not interleave there the way they can on your machine.",
    checks: [
      {
        id: "lock-output",
        prompt: "What is printed?",
        options: [
          { id: "a", label: "0" },
          { id: "b", label: "1" },
          { id: "c", label: "3" },
        ],
        answer: "c",
        explanation: "Each of the three threads adds one, and the print runs only after all three have joined.",
      },
      {
        id: "lock-why",
        prompt: "Why does this counter use a lock?",
        options: [
          { id: "a", label: "The threads already share count. The lock makes the update exclusive." },
          { id: "b", label: "The lock starts the threads. global prints the number." },
          { id: "c", label: "A lock is what lets a second thread see the same integer" },
        ],
        answer: "a",
        explanation:
          "Threads in one process already share objects. count += 1 reads the number, adds one, and rebinds the name. The lock keeps another thread out of those steps until they finish.",
      },
    ],
  },
  {
    id: "async",
    chapter: "Concurrency",
    title: "Calling an async function builds a coroutine",
    summary:
      "meters is an async function. Calling it does not run the body and does not produce 12. It returns a coroutine, which is an object that describes the work. This program builds that object, prints a line, and closes it. Nothing awaits it, so the body never runs.",
    code: py(`
      async def meters() -> int:
          return 12

      coro = meters()
      print("coroutine built")
      coro.close()
    `),
    notice:
      "await is how you wait on a coroutine, and it is allowed inside an async function. asyncio.run is a runner that drives a coroutine to the end. This program stops before either of those.",
    aside:
      "Try it opens this program. It still does not run the body of meters. Running that body takes a runner, and this lesson stops at the coroutine object.",
    checks: [
      {
        id: "async-output",
        prompt: "What is printed?",
        options: [
          { id: "a", label: "coroutine built" },
          { id: "b", label: "12" },
          { id: "c", label: "coroutine built and then 12" },
        ],
        answer: "a",
        explanation:
          "The program prints one line. meters() only builds a coroutine, and close throws that coroutine away before a runner awaits it.",
      },
      {
        id: "async-call",
        prompt: "What does the call meters() produce?",
        options: [
          { id: "a", label: "A coroutine. The 12 appears only after a runner awaits it." },
          { id: "b", label: "The number 12, because the function body is the return value" },
          { id: "c", label: "A new thread that prints 12" },
        ],
        answer: "a",
        explanation:
          "async def wraps the body in a coroutine. The body runs when something awaits that coroutine, not when the function is called. A coroutine is not a thread.",
      },
    ],
  },
];
