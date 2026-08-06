![CI Tests](https://github.com/Wheel-Software/ws-ts-util/actions/workflows/test.yaml/badge.svg)

![Version](https://img.shields.io/github/v/tag/Wheel-Software/ws-ts-util?label=version&sort=semver)

# ws-ts-util: Wheel Software's Typescript Utilities

- Integration: 2 files;
  7 functions, 18 tests.
  
- wscommon:
  - deepEqual<T>(obj1: T, obj2: T): boolean := element-by-element binary object comparison
  - get_unique_id(): string := wrapper on UUID
  - dshuffle(array: string[] | number[]):void := Fisher-Yates shuffle
  - normalizeColor(color: string): string := Normalizes color strings (24-bit hex, 12-bit hex, or web colors)
  - constrastingColor24bit(color: string): string := shift each color component +/- by 100
  - escapeRegex(string: string): string := escape general strings for regex

- wscommon-dom:
  - getLargestAncestorRect(HTMLElement): { width, height } := returns the rectangle of the largest parent within the body
