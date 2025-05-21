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

export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  console.log(day, month);
  return `${year}-${month}-${day}`;
}

export function validatePassword(password: string): boolean {
  const hasSuitableLength = password.length >= 8;
  let hasUppercase = false;
  let hasNumber = false;
  let hasSpecialChar = false;

  const specialChars = "!@#$%^&*()_+-=[]{};':\"\\|,.<>/?";

  for (const char of password) {
    if (char >= "A" && char <= "Z") hasUppercase = true;
    else if (!isNaN(Number(char))) hasNumber = true;
    else if (specialChars.includes(char)) hasSpecialChar = true;
  }
  return hasSuitableLength && hasUppercase && hasNumber && hasSpecialChar;
}
// min 8 chars, 1 uppercase, 1 number, 1 special character
const date = formatDate(new Date());
console.log(date);
