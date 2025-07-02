import { Injectable } from '@nestjs/common';
import { createReadStream } from 'fs';
import { CsvParser } from 'nest-csv-parser';

@Injectable()
export class ReadCSVService {
  constructor(private readonly csvParser: CsvParser) {}

  public async chunk<T>(
    csvPath: string,
    config: object,
    chunkSize: number = 1000,
  ): Promise<T[][]> {
    const chunks: T[][] = [];
    const stream = createReadStream(csvPath, 'utf-8');
    const { list: entities } = await this.csvParser.parse(stream, config);

    for (let i = 0; i < entities.length; i += chunkSize) {
      chunks.push(entities.slice(i, i + chunkSize));
    }

    return chunks;
  }
}
