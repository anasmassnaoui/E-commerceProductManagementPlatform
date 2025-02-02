import { ValidationResult, validateClass } from '@repo/api';

export function validateForm<T extends object>(
  formData: FormData,
  cls: new () => T,
): Promise<ValidationResult<T>> {
  const data = Object.fromEntries(formData.entries());
  return validateClass(data, cls);
}

export function getUpdatedFields<T>(
  original: T,
  data: T,
): { hasChanges: boolean; changes: T } {
  const changes: T = {} as T;
  let hasChanges = false;
  for (const key in data) {
    if (data[key] !== original[key]) {
      changes[key] = data[key];
      hasChanges = true;
    }
  }
  return { hasChanges, changes };
}
