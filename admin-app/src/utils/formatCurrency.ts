const formatCurrency = (value: number): string => {
  const newValue = value.toFixed(2).replace('.', ',');

  return `R$ ${newValue}`;
};

const unformatCurrency = (value: string): number => {
  return value ? Number(value.replace(/\D/g, '')) / 100 : 0;
};

export { formatCurrency, unformatCurrency };
