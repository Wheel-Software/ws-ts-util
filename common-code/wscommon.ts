/**
 * deepEqual: element-by-element binary object comparison
 * @param obj1 (any)
 * @param obj2 (any)
 * @returns boolean
 */
export function deepEqual<T>(obj1: T, obj2: T): boolean {
  // 1. Handle primitive types and null/undefined
  if (obj1 === obj2) {
    return true;
  }

  // 2. Handle non-object types or null
  // If either is not an object or is null (and they weren't strictly equal)
  if (
    typeof obj1 !== "object" ||
    obj1 === null ||
    typeof obj2 !== "object" ||
    obj2 === null
  ) {
    return false;
  }

  // 3. Handle Arrays
  if (Array.isArray(obj1) && Array.isArray(obj2)) {
    if (obj1.length !== obj2.length) {
      return false;
    }
    for (let i = 0; i < obj1.length; i++) {
      if (!deepEqual(obj1[i], obj2[i])) {
        return false;
      }
    }
    return true;
  }

  // If one is an array and the other is not (and they both are objects)
  if (Array.isArray(obj1) !== Array.isArray(obj2)) {
    return false;
  }

  // 4. Handle Objects (non-arrays)
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  // Check if they have the same number of properties
  if (keys1.length !== keys2.length) {
    return false;
  }

  // Check each property recursively
  for (const key of keys1) {
    if (
      !Object.prototype.hasOwnProperty.call(obj2, key) ||
      !deepEqual(
        (obj1 as Record<string, unknown>)[key],
        (obj2 as Record<string, unknown>)[key],
      )
    ) {
      //console.log(`wscommons: deepEqual: obj1 and obj2 differ at key ${key}.`);
      return false;
    }
  }

  return true;
}

/**
 * get_unique_id: wrap UUID method
 * @returns (crypto)UUID
 */
export function get_unique_id(): string {
  return crypto.randomUUID();
}

/**
 * Durstenfeld optimization of the Fisher-Yates-Knuth unbiased shuffle
 * @params string[] | number[]
 * @returns void (array is shuffled as ref)
 */
export function dshuffle(array: string[] | number[]): void {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

/**
 * normalizeColor: Normalizes color strings (24-bit hex, 12-bit hex, or web colors)
 * @param {string} color
 * @returns {string} 24-bit hex color
 */
export function normalizeColor(color: string): string {
  // 1. Handle 12-bit hex (e.g., #ABC -> #AABBCC)
  if (/^#([A-Fa-f0-9]{3})$/.test(color)) {
    return color.replace(
      /^#([A-Fa-f0-9])([A-Fa-f0-9])([A-Fa-f0-9])$/,
      "#$1$1$2$2$3$3",
    );
  }

  // 2. Handle 24-bit hex (e.g., #AABBCC)
  if (/^#([A-Fa-f0-9]{6})$/.test(color)) {
    return color;
  }

  // 3. Handle Web Colors (Named colors)
  // We use a temporary DOM element to resolve named colors
  const div = document.createElement("div");
  div.style.color = color;
  document.body.appendChild(div);
  const rgb = getComputedStyle(div).color;
  document.body.removeChild(div);

  // Convert "rgb(r, g, b)" to hex
  const rgbValues = rgb.match(/\d+/g);
  if (rgbValues) {
    return (
      "#" +
      rgbValues.map((x) => parseInt(x).toString(16).padStart(2, "0")).join("")
    );
  }

  return color; // Fallback or throw error
}

/**
 * constrastingColor24bit: shift each color component +/- by 100
 * @param color (webcolor | 24-bit hash | 12-bit hash)
 * @returns 24-bit hash contrasting color
 */
export function constrastingColor24bit(color: string): string {
  const theColor = normalizeColor(color);
  const rgb: string[] = [];
  for (let i = 1, j = 0; i < 7; i += 2, ++j)
    rgb[j] = contrastingComponent24bit(
      Number.parseInt(theColor.substring(i, i + 2), 16),
    )
      .toString(16)
      .padStart(2, "0");

  return "#" + rgb.join("");
}

const contr_comp_diff_24bit = 100;
function contrastingComponent24bit(comp: number): number {
  if (contr_comp_diff_24bit > 127) {
    console.error("wscommons: constrastingColor24bit diff const is bad.");
    return 0;
  }

  if (comp > 127) return comp - contr_comp_diff_24bit;
  else return comp + contr_comp_diff_24bit;
}

/**
 * escapeRegex: escape general strings for regex
 * @param raw string
 * @returns regex string
 */
export function escapeRegex(string: string): string {
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}
