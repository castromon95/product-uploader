import { DateTime } from 'luxon';

export class DateUtils {
  public static isValid(date: string): boolean {
    return DateTime.fromFormat(date, 'M/d/yyyy').isValid;
  }
}
