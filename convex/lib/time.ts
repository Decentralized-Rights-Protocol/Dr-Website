export function nowIso() {
  return new Date().toISOString();
}

export function toMonthBucket(value: string) {
  return value.slice(0, 7);
}
