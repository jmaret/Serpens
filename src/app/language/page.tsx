import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "The language" };

export default function LanguagePage() {
  return (
    <article className="site-wrap space-y-6 py-8 sm:py-12">
      <header className="panel px-5 py-8 sm:px-8 sm:py-10">
        <p className="eyebrow">The language</p>
        <h1 className="mt-2 max-w-2xl font-[family-name:var(--font-display)] text-4xl tracking-tight">
          A language you can read on the first draft.
        </h1>
        <p className="mt-4 max-w-2xl text-[var(--ink-muted)]">
          Python is a language for programs a person can follow, from a short script to a service
          that calls a large library. The lessons teach the syntax. This page is the reason the
          syntax looks the way it does.
        </p>
      </header>

      <section className="panel px-5 py-8 sm:px-8">
        <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-tight">Origins</h2>
        <div className="doc mt-3 max-w-2xl">
          <p>
            Guido van Rossum began Python in December 1989, at CWI in the Netherlands, over a
            Christmas break. He wanted a successor to ABC, a teaching language he had worked on,
            that would also feel at home to people writing C and Unix tools. The name comes from
            Monty Python&apos;s Flying Circus. The snake came later, as a mascot.
          </p>
          <p>
            The first public release, 0.9.0, went out in February 1991. Python 1.0 followed in
            January 1994. Python 2.0 arrived in October 2000. Python 3.0, in December 2008, was a
            deliberate break: print became a function, text and bytes split apart, and some old
            habits were removed so the language could stay coherent.
          </p>
          <p>
            Python 2.7 was maintained until 1 January 2020. The programs in Serpens use syntax from
            Python 3.10 onward, including match and int | None. Try it opens Python Tutor, which
            runs them as Python 3.11.
          </p>
          <p>
            The Python Software Foundation, created in 2001, holds the intellectual property and
            runs PyPI, the index of packages. Guido was the language&apos;s benevolent dictator for
            life until July 2018. A steering council governs it now. Indentation is part of the
            syntax, which is why a block in these lessons is a change of indent and not a pair of
            braces.
          </p>
        </div>
      </section>

      <section className="panel px-5 py-8 sm:px-8">
        <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-tight">Beside other languages</h2>
        <p className="mt-3 max-w-2xl">
          Python shares habits with languages you may already know, and it spends its strictness
          on indentation and on errors at the line that runs.
        </p>
        <div className="doc mt-4 overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Python</th>
                <th>Rust</th>
                <th>JavaScript</th>
                <th>Java</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Types</td>
                <td>Decided as the program runs. Annotations are hints.</td>
                <td>Checked before the program runs</td>
                <td>Dynamic. TypeScript checks, then erases the types</td>
                <td>Checked before the program runs</td>
              </tr>
              <tr>
                <td>Memory</td>
                <td>Garbage collected. Names refer to objects.</td>
                <td>Freed when the owner ends. No garbage collector</td>
                <td>Garbage collected</td>
                <td>Garbage collected, on a virtual machine</td>
              </tr>
              <tr>
                <td>Absence and failure</td>
                <td>
                  <code>None</code> and exceptions
                </td>
                <td>
                  <code>Option</code> and <code>Result</code>
                </td>
                <td>
                  <code>undefined</code> and exceptions
                </td>
                <td>
                  <code>null</code> and exceptions
                </td>
              </tr>
              <tr>
                <td>Runs as</td>
                <td>An interpreter, or a bytecode virtual machine</td>
                <td>Native code, or WebAssembly</td>
                <td>A browser, Node, or another JS engine</td>
                <td>The Java virtual machine</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="doc mt-2 max-w-2xl">
          <h3>Rust</h3>
          <p>
            Both reward a program you can read. Rust gets there by refusing to build until the
            types, the owners, and the borrows agree. Python gets there with names, indentation,
            and a large library. A wrong type in Python usually appears when that line runs. Rust
            is the tighter program when the work is the CPU, the memory, or a bug you cannot
            afford later. Python is the faster first draft when the program spends its time
            waiting, or calling a library that already did the fast part.
          </p>
          <h3>JavaScript</h3>
          <p>
            Both are dynamic, both are garbage collected, and both have a large package culture,
            PyPI and npm. JavaScript is the language of the page. It runs in the browser and in
            Node. TypeScript adds types and then removes them: what runs is still JavaScript.
            Python runs as an interpreter or a bytecode virtual machine. It is the usual language
            of notebooks, automation, and the scripts around a web system. The page itself stays
            JavaScript.
          </p>
          <h3>Java</h3>
          <p>
            Both are used for programs that live for years, and both can say what a type is for.
            Java checks those types before the program runs, and it runs on a virtual machine.
            Almost any reference can be null, and failure is often an exception. Python checks a
            value when the line runs. Annotations can be checked by a separate tool, and the
            interpreter does not require that check. A team with a large Java codebase will often
            ship sooner by staying there. Python pays that choice back when the work is a script,
            a service with a small team, or a library the scientist or the operator already knows.
          </p>
        </div>
      </section>

      <section className="panel px-5 py-8 sm:px-8">
        <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-tight">Why someone reaches for it</h2>
        <div className="doc mt-3 max-w-2xl">
          <p>People choose Python when the next reader matters as much as the next release.</p>
          <ul>
            <li>The first version should be readable, and a teammate should be able to change it next week.</li>
            <li>The work is a script, a notebook, a service, or a call into a library, and PyPI already has that library.</li>
            <li>A wrong type can wait until that line runs, because this program is not the piece that must be rejected at build time.</li>
            <li>The slow part can live in a library written in C or Rust, and Python can be the language that calls it.</li>
          </ul>
          <p>
            A program that must control every byte, avoid garbage-collection pauses, or reject a
            mistake before it starts is usually happier in Rust or Java. Python is the language
            for the part of the system a person has to read, glue, and change.
          </p>
        </div>
      </section>

      <section className="panel px-5 py-8 sm:px-8">
        <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-tight">Where it has a following</h2>
        <div className="doc mt-3 max-w-2xl">
          <p>
            The following is in teaching, in science, in automation, and in the services that sit
            in front of faster libraries.
          </p>
          <ul>
            <li>
              <strong>Teaching. </strong>
              Python is often the first language in a classroom, because a small program is a small
              file and the error names the line.
            </li>
            <li>
              <strong>Science and data. </strong>
              NumPy, pandas, and Jupyter are the usual tools. A notebook is a Python program with
              the results kept beside the code.
            </li>
            <li>
              <strong>The web. </strong>
              Django, Flask, and FastAPI are Python. Instagram grew up on Django.
            </li>
            <li>
              <strong>Automation. </strong>
              Operators and builders use Python for the glue around files, APIs, and deployments.
              Dropbox was written largely in Python.
            </li>
            <li>
              <strong>Machine learning. </strong>
              PyTorch and scikit-learn present themselves as Python. Much of the heavy arithmetic
              is in C, C++, or a GPU kernel. The training script, the notebook, and the experiment
              are Python.
            </li>
          </ul>
          <p>
            YouTube&apos;s early stack was Python as well. The pattern is the same in each of these:
            Python is the language people write, and faster code sits underneath when the work
            needs it.
          </p>
          <p>
            <Link href="/#script">Start at the top</Link> when you want the syntax those programs are written in.
          </p>
        </div>
      </section>
    </article>
  );
}
