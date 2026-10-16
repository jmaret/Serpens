export function playgroundHref(code: string): string {
  return `https://pythontutor.com/visualize.html#code=${encodeURIComponent(code)}&py=311`;
}
