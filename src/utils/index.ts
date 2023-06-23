export const getEmailLogin = (email: string | undefined) => {
  if (!email) return;
  return `${email.split("@")[0]} `;
};
export function bytesToMB(bytes: number) {
  const megabytes = bytes / (1024 * 1024);
  return megabytes.toFixed(2); // Return the result rounded to 2 decimal places
}
