const isValidEmail = (email: string) =>
  // eslint-disable-next-line no-useless-escape
  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

export const handleEmailValidation = (email: string) => {
  const isValid = isValidEmail(email);

  if (isValid) {
    return true;
  } else {
    return 'Email is invalid';
  }
};
