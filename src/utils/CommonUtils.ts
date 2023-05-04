export const customStr = 'Custom...';

export function getLabel(key: string, obj: {[key: string]: string}) {
  return obj[key] ? `${key} (${obj[key]})` : key;
}

export function selectedFirstList(
  selected: string,
  list: string[],
  last?: string | string[],
) {
  const ret = [selected, ...list.filter(val => val !== selected)];
  if (last) {
    if (typeof last === 'string') {
      ret.push(last);
    } else if (Array.isArray(last)) {
      ret.push(...last);
    }
  }
  return ret;
}
