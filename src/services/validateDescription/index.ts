export const validateDescription = (value: string) => {
  if (!value) {
    return;
  }
  const isOnlySpaces = value.trim().length > 0;

  if (!isOnlySpaces) return 'The field must not contain spaces';

  return true;
};
