import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom, map } from 'rxjs';
import { Currency } from 'src/common/enums/currencies';
import { Currencies } from 'src/common/types/currencies';

@Injectable()
export class FetchCurrenciesService {
  constructor(private readonly httpService: HttpService) {}

  public async fetch(currency: Currency): Promise<Currencies> {
    return firstValueFrom(
      this.httpService
        .get<
          Record<Currency, Currencies>
        >(`https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`)
        .pipe(map((res) => res.data[currency])),
    );
  }
}
