import { Module } from '@nestjs/common';
import { CsvModule } from 'nest-csv-parser';
import { ReadCSVService } from './services/csv/read-csv.service';
import { HttpModule } from '@nestjs/axios';
import { FetchCurrenciesService } from './services/currencies/fetch-currencies.service';

@Module({
  imports: [CsvModule, HttpModule],
  controllers: [],
  providers: [ReadCSVService, FetchCurrenciesService],
  exports: [ReadCSVService, FetchCurrenciesService],
})
export class CommonModule {}
