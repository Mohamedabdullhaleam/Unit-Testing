export function sum(a: number, b: number): number {
  return a + b;
}

export function isPrime(num: number): boolean {
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

export function reverseString(str: string): string {
  return str.split("").reverse().join("");
}

export function getCharactersCount(str: string): Record<string, number> {
  const count: Record<string, number> = {};

  for (const char of str) {
    if (count[char]) {
      count[char]++;
    } else {
      count[char] = 1;
    }
  }
  return count;
}

const mm = getCharactersCount("mohamed");
