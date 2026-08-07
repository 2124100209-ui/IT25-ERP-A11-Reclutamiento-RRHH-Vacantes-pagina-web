import { Pipe, PipeTransform } from '@angular/core';

export function formatMoney(value: unknown): string {
  const text = String(value ?? '').trim();

  if (!/\d/.test(text)) {
    return text;
  }

  const plainValue = text.replace(/[\s,$]/g, '');

  if (/^\d+(\.\d+)?$/.test(plainValue)) {
    return formatMoneyNumber(plainValue);
  }

  return text.replace(/\$?\s*\d[\d,]*(?:\.\d+)?/g, (match) =>
    formatMoneyNumber(match)
  );
}

export function formatMoneyInput(value: unknown): string {
  const text = String(value ?? '');
  const clean = text
    .replace(/[^\d.]/g, '')
    .replace(/(\..*)\./g, '$1');

  if (!clean) {
    return '';
  }

  return formatMoneyNumber(clean);
}

function formatMoneyNumber(value: unknown): string {
  const text = String(value ?? '').replace(/[^\d.]/g, '');
  const [integerPart, decimalPart] = text.split('.');
  const integer = Number(integerPart || '0').toLocaleString('en-US');
  const decimals = decimalPart ? `.${decimalPart.slice(0, 2)}` : '';

  return `$${integer}${decimals}`;
}

@Pipe({
  name: 'moneyFormat',
  standalone: true,
})
export class MoneyFormatPipe implements PipeTransform {
  transform(value: unknown): string {
    return formatMoney(value);
  }
}
