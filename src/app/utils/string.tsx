export const truncate = (str: string, maxLength: number) => {
  return str.length > maxLength ? str.substring(0, maxLength) + '...' : str;
};

export const isNullOrWhitespace = (input: string) => {
  if (typeof input === 'undefined' || input == null) {
    return true;
  }
  return input.replace(/\s/g, '').length < 1;
};

export const format = (format: string, ...args: any[]) => {
  if (isNullOrWhitespace(format)) {
    return '';
  }

  return format.replace(/{(\d+)}/g, (match, index) => args[index] + '');
};