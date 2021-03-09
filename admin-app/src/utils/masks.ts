/* eslint-disable no-plusplus */
export const unmask = (str: string): string => str.replace(/[-)./(+ ]/g, '');

export const mask = (str: string, ...masks: any[]): string => {
  const auxMask =
    masks.find((it) => unmask(it).length >= unmask(str).length) ||
    masks.sort((a, b) => unmask(a).length - unmask(b).length).pop();

  if (!auxMask) return str;

  let auxStr = unmask(str);
  const maskLength = unmask(auxMask).length;
  if (auxStr.length > maskLength) {
    auxStr = str.substring(0, maskLength);
  }
  let maskedStr = '';
  let j = 0;
  for (let i = 0; i < auxStr.length; i++) {
    try {
      while (auxMask[j] && auxMask[j] !== '#') maskedStr += auxMask[j++];
      maskedStr += auxStr[i];
      j++;
    } catch {
      break;
    }
  }

  return maskedStr;
};

export const maskDocument = (cpf: string): string => {
  return mask(cpf.replace(/\D/g, ''), '###.###.###-##', '##.###.###/####-##');
};
