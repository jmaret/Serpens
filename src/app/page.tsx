import Link from "next/link";
import { chapterId, lessonsByChapter } from "../../content/lessons";
import { LessonView } from "@/components/LessonView";

export default function HomePage() {
  const chapters = lessonsByChapter();

  return (
    <div className="site-wrap space-y-8 py-8 sm:py-12">
      <section className="panel px-5 py-8 sm:px-8 sm:py-10">
        <p className="eyebrow">Serpens</p>
        <h1 className="mt-2 max-w-2xl font-[family-name:var(--font-display)] text-4xl tracking-tight sm:text-5xl">
          From the top of a file to the name that still points at the object.
        </h1>
        <p className="mt-4 max-w-xl text-base text-[var(--ink-muted)] sm:text-lg">
          Thirteen short programs on this page. Each one has a check you answer here. Try it opens
          Python Tutor with that program, and only when you ask. Modules, threads, and async are on
          the next page.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="#script" className="btn-accent">
            Start at the top
          </a>
          <Link href="/further" className="btn-ghost">
            Further
          </Link>
          <Link href="/language" className="btn-ghost">
            The language
          </Link>
          <Link href="/vision" className="btn-ghost">
            Read the vision
          </Link>
        </div>
      </section>

      {chapters.map((group) => (
        <section key={group.chapter} id={chapterId(group.chapter)} className="space-y-4">
          <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-tight">{group.chapter}</h2>
          {group.lessons.map((lesson) => (
            <LessonView key={lesson.id} lesson={lesson} />
          ))}
        </section>
      ))}

      <section className="panel px-5 py-8 sm:px-8">
        <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-tight">The next page</h2>
        <p className="mt-2 max-w-xl text-[var(--ink-muted)]">
          The short path ends at None and exceptions. Duck typing, modules, comprehensions, threads,
          and async each have their own program on the next page.
        </p>
        <Link href="/further" className="btn-accent mt-6">
          Continue
        </Link>
      </section>
    </div>
  );
}
