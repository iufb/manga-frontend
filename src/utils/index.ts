export const getEmailLogin = (email: string | undefined) => {
  if (!email) return;
  return `${email.split("@")[0]} `;
};
