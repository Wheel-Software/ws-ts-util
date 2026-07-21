export function get_unique_id(): string {
  //let tuid = gen_name();
  //while (null != document.getElementById(tuid)) tuid = gen_name();

  return crypto.randomUUID();
}

// function gen_name(): string {
//   const lowers = "abcdefghijklmnopqrstuvwxyz";
//   const uppers = lowers.toUpperCase();
//   const cset = lowers + uppers + "0123456789";
//   let uid = lowers[Math.round(Math.random() * 25)];
//   for (let i = 0; i < 10; i++) {
//     uid += cset[Math.round(Math.random() * 61)];
//   }
//   return uid;
// }

// Durstenfeld optimization of the Fisher-Yates-Knuth unbiased shuffle
export function dshuffle(array: string[] | number[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

//export default get_unique_id ;

export function constrastingColor24bit(color: string): string {
  const rgb: string[] = [];
  for (let i = 1, j = 0; i < 7; i += 2, ++j)
    rgb[j] = contrastingComponent24bit(
      Number.parseInt(color.substring(i, i + 2), 16),
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

export function escapeRegex(string: string): string {
  return string.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
}
