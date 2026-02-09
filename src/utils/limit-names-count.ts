export const limitNamesCount = (names: (string | null | undefined)[]) => {
  const validNames = names.filter((name): name is string => Boolean(name));

  if (validNames.length <= 5) return validNames;

  const rest = validNames.length - 5;
  return [
    ...validNames.slice(0, 5),
    `y ${rest} persona${rest === 1 ? '' : 's'} más.`,
  ]
};