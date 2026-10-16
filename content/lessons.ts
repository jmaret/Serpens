export type Choice = {
  id: string;
  label: string;
};

export type Check = {
  id: string;
  prompt: string;
  options: Choice[];
  answer: string;
  explanation: string;
};

export type Lesson = {
  id: string;
  chapter: string;
  title: string;
  summary: string;
  code: string;
  notice: string;
  aside?: string;
  checks: Check[];
};

export function py(code: string): string {
  const lines = code.replace(/^\n/, "").replace(/\n\s*$/, "").split("\n");
  const pad = lines
    .filter((line) => line.trim().length > 0)
    .reduce((min, line) => Math.min(min, line.match(/^ */)?.[0].length ?? 0), 80);
  return lines.map((line) => line.slice(pad)).join("\n");
}

export const lessons: Lesson[] = [
  {
    id: "script",
    chapter: "A small program",
    title: "The file runs from the top",
    summary:
      "A Python file is executed from the first line to the last. def main stores a function. The function runs when the last lines call it, which they do when you run this file as a program.",
    code: py(`
      def main() -> None:
          print("The python holds still.")

      if __name__ == "__main__":
          main()
    `),
    notice:
      "__name__ is \"__main__\" when this file is the program you started. The same file can later be imported, and then those last lines skip the call. The programs on this page are Python 3.",
    checks: [
      {
        id: "script-entry",
        prompt: "Where does this program start?",
        options: [
          { id: "a", label: "Inside main, before any other line is read" },
          { id: "b", label: "At the top of the file. main runs because the last lines call it." },
          { id: "c", label: "On the print line, because it is the only statement" },
        ],
        answer: "b",
        explanation:
          "Python reads the file from the top. def creates the function and does not run its body. The if calls main when the file is started as a program.",
      },
      {
        id: "script-output",
        prompt: "What line does the program write?",
        options: [
          { id: "a", label: "The python holds still." },
          { id: "b", label: "def main()" },
          { id: "c", label: "Nothing. print only prepares the text." },
        ],
        answer: "a",
        explanation: "print writes the text between the quotes, then a newline.",
      },
    ],
  },
  {
    id: "printing",
    chapter: "A small program",
    title: "An f-string fills a placeholder",
    summary:
      "print writes a line. An f before the opening quote makes braces into placeholders. The name inside the braces is filled in when the line runs.",
    code: py(`
      coils = 12
      print(f"Coils: {coils}")
    `),
    notice: "The braces are not printed. {coils} is replaced by the value 12. Without the f, the braces would be ordinary characters.",
    checks: [
      {
        id: "print-output",
        prompt: "What is printed?",
        options: [
          { id: "a", label: "Coils: {coils}" },
          { id: "b", label: "Coils: 12" },
          { id: "c", label: "coils" },
        ],
        answer: "b",
        explanation: "The placeholder takes the value 12. The rest of the string is written as it appears.",
      },
      {
        id: "print-f",
        prompt: "What does the f before the quote do?",
        options: [
          { id: "a", label: "It marks an f-string, so the braces are filled in" },
          { id: "b", label: "It sends the text to the error stream" },
          { id: "c", label: "It means the call can fail" },
        ],
        answer: "a",
        explanation: "The f is part of the literal. A plain string would print the braces and the word coils.",
      },
    ],
  },
  {
    id: "project",
    chapter: "A small program",
    title: "A project is a directory",
    summary:
      "A small program can be one file. A project is a directory around it. pyproject.toml names the project. hello.py holds the program you run.",
    code: py(`
      # serpens-field/
      # ├── pyproject.toml
      # └── hello.py

      print("python hello.py")
    `),
    notice:
      "pyproject.toml is the manifest. hello.py is the script. Comments with # are not executed.",
    aside:
      "This site does not run Python. Try it opens the program that would live in hello.py. On your own machine, python hello.py runs that file.",
    checks: [
      {
        id: "project-file",
        prompt: "Which file holds the program you run?",
        options: [
          { id: "a", label: "pyproject.toml" },
          { id: "b", label: "hello.py" },
          { id: "c", label: "__pycache__" },
        ],
        answer: "b",
        explanation:
          "The program lives in hello.py. pyproject.toml describes the project. __pycache__ is where Python stores compiled bytecode after a run.",
      },
      {
        id: "project-command",
        prompt: "On your own machine, which command runs this file?",
        options: [
          { id: "a", label: "python hello.py" },
          { id: "b", label: "npm start" },
          { id: "c", label: "cargo run" },
        ],
        answer: "a",
        explanation: "python hello.py runs the file. This page only sends the source to Python Tutor when you choose Try it.",
      },
    ],
  },
  {
    id: "names",
    chapter: "Syntax",
    title: "A name can be rebound",
    summary:
      "A name refers to an object. Writing the name again points it at a new object. There is no separate mark that allows the change. The old object stays as it was.",
    code: py(`
      bolts = 4
      coats = 1
      coats += 1
      print(f"{bolts} bolts, {coats} coats")
    `),
    notice: "coats += 1 is coats = coats + 1. The name coats moves from 1 to 2. bolts still refers to 4.",
    checks: [
      {
        id: "names-output",
        prompt: "What is printed?",
        options: [
          { id: "a", label: "4 bolts, 1 coats" },
          { id: "b", label: "4 bolts, 2 coats" },
          { id: "c", label: "5 bolts, 2 coats" },
        ],
        answer: "b",
        explanation: "bolts stays 4. coats starts at 1 and is then rebound to 2.",
      },
      {
        id: "names-assign",
        prompt: "What happens if you add the line bolts = 5 before the print?",
        options: [
          { id: "a", label: "It prints 5 bolts, 2 coats" },
          { id: "b", label: "It prints 4 bolts, 2 coats, because a name can be set only once" },
          { id: "c", label: "The program refuses to start" },
        ],
        answer: "a",
        explanation: "Assignment rebinds the name. bolts = 5 points bolts at 5, and the print uses that value.",
      },
    ],
  },
  {
    id: "types",
    chapter: "Syntax",
    title: "A few types, and a hint",
    summary:
      "int is a whole number. bool is True or False. str is text, written with quotes. A colon and a type after a name is an annotation. The program runs without checking it.",
    code: py(`
      piers: int = 2
      awake: bool = True
      mark: str = "S"
      name: str = "Serpens"
      print(piers, awake, mark, name)
    `),
    notice:
      "The four values are an int, a bool, and two strings. Python has no separate one-character type. The annotations are for a reader, and for a type checker you run on purpose.",
    checks: [
      {
        id: "types-output",
        prompt: "What is printed?",
        options: [
          { id: "a", label: "2 True S Serpens" },
          { id: "b", label: "2 True 'S' \"Serpens\"" },
          { id: "c", label: "int bool str str" },
        ],
        answer: "a",
        explanation: "print writes the values, separated by spaces. It does not write the type names or the quote marks.",
      },
      {
        id: "types-hint",
        prompt: "What happens if the next line is piers = \"two\"?",
        options: [
          { id: "a", label: "It runs. piers then names the text. The annotation does not stop it." },
          { id: "b", label: "It refuses to start, because piers was annotated as int" },
          { id: "c", label: "It prints the word int and leaves piers as 2" },
        ],
        answer: "a",
        explanation:
          "An annotation is a hint stored on the function or the module. This program does not ask a type checker to enforce it, so the name can be rebound to a string.",
      },
    ],
  },
  {
    id: "functions",
    chapter: "Syntax",
    title: "return hands a value back",
    summary:
      "def names a function. The parameters sit in the parentheses. The arrow and a type are an annotation for the returned value. return is what actually hands that value back. A function with no return hands back None.",
    code: py(`
      def span(piers: int) -> int:
          return piers * 6

      print(span(2))
    `),
    notice: "return piers * 6 leaves the function with 12. The annotation -> int describes that number. It is not the return itself.",
    checks: [
      {
        id: "functions-output",
        prompt: "What is printed?",
        options: [
          { id: "a", label: "2" },
          { id: "b", label: "6" },
          { id: "c", label: "12" },
        ],
        answer: "c",
        explanation: "span(2) evaluates 2 * 6 and returns 12. print writes that number.",
      },
      {
        id: "functions-return",
        prompt: "What does span return if you delete return and leave the line piers * 6?",
        options: [
          { id: "a", label: "None. The multiplication runs, and its result is discarded." },
          { id: "b", label: "12. The last line of a function is always the return value." },
          { id: "c", label: "The program refuses to start, because the annotation says int" },
        ],
        answer: "a",
        explanation:
          "An expression on its own is evaluated and thrown away. Without return, the function ends with None. The annotation does not insert a return.",
      },
    ],
  },
  {
    id: "flow",
    chapter: "Syntax",
    title: "if and for",
    summary:
      "if runs an indented block when the condition is true. for walks a sequence. range(1, 3) yields 1 and then 2. The end value is not included.",
    code: py(`
      length = 3
      if length > 2:
          print("coil")
      for segment in range(1, 3):
          print(f"segment {segment}")
    `),
    notice:
      "The block is the indent, not braces. The condition has no parentheses. range(1, 3) stops before 3. range(1, 3) is two steps.",
    checks: [
      {
        id: "flow-first",
        prompt: "What is the first line printed?",
        options: [
          { id: "a", label: "coil" },
          { id: "b", label: "segment 1" },
          { id: "c", label: "Nothing. length > 2 is false." },
        ],
        answer: "a",
        explanation: "3 is greater than 2, so the if block runs and prints coil before the loop starts.",
      },
      {
        id: "flow-range",
        prompt: "How many lines start with segment?",
        options: [
          { id: "a", label: "One, because range includes the end" },
          { id: "b", label: "Two: segment 1 and segment 2" },
          { id: "c", label: "Three, counting from zero" },
        ],
        answer: "b",
        explanation: "range(1, 3) yields 1 and 2. The body prints one line each time, and 3 is left out.",
      },
    ],
  },
  {
    id: "classes",
    chapter: "Data",
    title: "A class bundles data and methods",
    summary:
      "class starts a new type. __init__ runs when you call the type, and self is the new object. A method's first parameter is that object. snake.label() passes snake in as self.",
    code: py(`
      class Snake:
          def __init__(self, meters: int) -> None:
              self.meters = meters

          def label(self) -> str:
              return f"{self.meters}m"

      snake = Snake(12)
      print(snake.label())
    `),
    notice: "self.meters stores 12 on the object. label reads that attribute and builds the text 12m.",
    checks: [
      {
        id: "classes-output",
        prompt: "What is printed?",
        options: [
          { id: "a", label: "12" },
          { id: "b", label: "12m" },
          { id: "c", label: "Snake" },
        ],
        answer: "b",
        explanation: "label builds the text 12m from the meters attribute and returns it.",
      },
      {
        id: "classes-self",
        prompt: "What is self inside label?",
        options: [
          { id: "a", label: "The Snake object the method was called on" },
          { id: "b", label: "A copy of the integer 12" },
          { id: "c", label: "The class Snake, shared by every instance" },
        ],
        answer: "a",
        explanation: "snake.label() is a call with snake as the first argument. The parameter name self is the convention for that object.",
      },
    ],
  },
  {
    id: "match",
    chapter: "Data",
    title: "match picks a case",
    summary:
      "match compares a value with a series of cases. The first case that fits runs. A value that fits none of them falls through. The language does not require a case for every possible string.",
    code: py(`
      def report(coat: str) -> str:
          match coat:
              case "sound":
                  return "sound"
              case "shed":
                  return "shed"
          return "other"

      print(report("shed"))
    `),
    notice: "case \"shed\" matches the argument, so report returns shed. return \"other\" runs only when no case matched.",
    checks: [
      {
        id: "match-output",
        prompt: "What is printed?",
        options: [
          { id: "a", label: "sound" },
          { id: "b", label: "shed" },
          { id: "c", label: "other" },
        ],
        answer: "b",
        explanation: "The argument is shed, so the second case returns shed.",
      },
      {
        id: "match-gap",
        prompt: "What happens if the sound case is deleted and report is called with sound?",
        options: [
          { id: "a", label: "The program refuses to start, because match must cover every value" },
          { id: "b", label: "It returns other. An unmatched value falls through." },
          { id: "c", label: "It returns shed" },
        ],
        answer: "b",
        explanation:
          "match does not have to be exhaustive. With the sound case gone, sound fits nothing, and the function returns other.",
      },
    ],
  },
  {
    id: "collections",
    chapter: "Data",
    title: "A list can grow. A str is replaced.",
    summary:
      "A list is an ordered collection. append adds an item to that same list. A str cannot grow in place. title += \"s\" points the name at a new string.",
    code: py(`
      names = ["north", "south"]
      names.append("center")
      title = "span"
      title += "s"
      print(len(names), title)
    `),
    notice: "append changes the list object. += on a string rebinds the name. len counts the items in the list, which is now three.",
    checks: [
      {
        id: "collections-output",
        prompt: "What is printed?",
        options: [
          { id: "a", label: "2 span" },
          { id: "b", label: "3 spans" },
          { id: "c", label: "3 span" },
        ],
        answer: "b",
        explanation: "The list starts with two names and append adds a third, so len is 3. title is rebound from span to spans.",
      },
      {
        id: "collections-str",
        prompt: "Why does title += \"s\" create a new string?",
        options: [
          { id: "a", label: "A str cannot be changed in place, so the name is pointed at a new one" },
          { id: "b", label: "A str holds exactly one character" },
          { id: "c", label: "print can only write a list" },
        ],
        answer: "a",
        explanation: "Strings are immutable. The characters of span stay as they were. spans is a different string, and title now refers to it.",
      },
    ],
  },
  {
    id: "references",
    chapter: "The Python idea",
    title: "Assignment adds a name",
    summary:
      "moved = name does not copy the characters and does not take the object away from name. Both names refer to the same object. is is true when two names refer to one object.",
    code: py(`
      name = "Serpens"
      moved = name
      print(f"{moved} {name is moved}")
    `),
    notice: "After the assignment, name and moved are two ways to reach one string. The first name still works.",
    checks: [
      {
        id: "references-output",
        prompt: "What is printed?",
        options: [
          { id: "a", label: "Serpens True" },
          { id: "b", label: "Serpens False" },
          { id: "c", label: "Nothing. The assignment consumes name." },
        ],
        answer: "a",
        explanation: "moved and name refer to the same object, so is is True, and the text is Serpens.",
      },
      {
        id: "references-use",
        prompt: "What does moved = name do?",
        options: [
          { id: "a", label: "It moves the text, and name can no longer be used" },
          { id: "b", label: "It adds a second name for the same object. name still works." },
          { id: "c", label: "It copies the characters, so the two names can never refer to one object" },
        ],
        answer: "b",
        explanation:
          "Assignment binds a name to an existing object. The program prints True for is, which is two names and one object.",
      },
    ],
  },
  {
    id: "mutation",
    chapter: "The Python idea",
    title: "A function can change the object you passed",
    summary:
      "The parameter scales is another name for the list in the caller. append changes that list. When the function returns, the caller sees the new item, because there was only one list.",
    code: py(`
      def add_scale(scales: list[int]) -> None:
          scales.append(1)

      scales = [1, 2]
      add_scale(scales)
      print(len(scales))
    `),
    notice: "The call does not copy the list. len is 3 because append changed the object the caller still names.",
    checks: [
      {
        id: "mutation-output",
        prompt: "What is printed?",
        options: [
          { id: "a", label: "2" },
          { id: "b", label: "3" },
          { id: "c", label: "1" },
        ],
        answer: "b",
        explanation: "The list starts with two items. append adds one to that same list, so the length is 3.",
      },
      {
        id: "mutation-int",
        prompt: "What happens if the function takes an int and does count += 1, and the caller keeps its own name for that int?",
        options: [
          { id: "a", label: "The caller's number increases by 1" },
          { id: "b", label: "The caller's number stays the same. += rebinds the name inside the function." },
          { id: "c", label: "The program refuses to start, because an int cannot be passed" },
        ],
        answer: "b",
        explanation:
          "An int cannot be changed in place. count += 1 points the local name at a new int. The caller's name still refers to the original number.",
      },
    ],
  },
  {
    id: "absence",
    chapter: "The Python idea",
    title: "None and an exception",
    summary:
      "int(text) builds an integer from digits. A string that is not an integer raises ValueError. try runs the conversion. except runs when that error is raised, and this function returns None to say there was no number.",
    code: py(`
      def meters_from(text: str) -> int | None:
          try:
              return int(text)
          except ValueError:
              return None

      print(meters_from("12"))
    `),
    notice:
      "\"12\" converts to the integer 12, so the except block does not run. None is a real object. It is how this function reports that the text was not a number.",
    checks: [
      {
        id: "absence-output",
        prompt: "What does this program print?",
        options: [
          { id: "a", label: "12" },
          { id: "b", label: "None" },
          { id: "c", label: "ValueError" },
        ],
        answer: "a",
        explanation: "\"12\" is a valid integer. int returns 12, and that value is what print writes.",
      },
      {
        id: "absence-bad",
        prompt: "What does meters_from return when the text is not an integer?",
        options: [
          { id: "a", label: "0, and the program continues" },
          { id: "b", label: "None, because the except block handles ValueError" },
          { id: "c", label: "The program stops inside int, because nothing can handle ValueError" },
        ],
        answer: "b",
        explanation:
          "int raises ValueError for text that is not a whole number. The except block catches that error and returns None.",
      },
    ],
  },
];

export function chapterId(chapter: string): string {
  return chapter
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function lessonsByChapter(source: Lesson[] = lessons): { chapter: string; lessons: Lesson[] }[] {
  const order: string[] = [];
  const groups = new Map<string, Lesson[]>();
  for (const lesson of source) {
    const group = groups.get(lesson.chapter);
    if (group) {
      group.push(lesson);
    } else {
      order.push(lesson.chapter);
      groups.set(lesson.chapter, [lesson]);
    }
  }
  return order.map((chapter) => ({ chapter, lessons: groups.get(chapter) ?? [] }));
}
