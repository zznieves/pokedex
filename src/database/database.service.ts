import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool, QueryResult, QueryResultRow } from 'pg';

@Injectable()
export class DatabaseService {

    // class properties
    private readonly pool: Pool;
    private readonly configService: ConfigService;

    // constructor: inject services here
    constructor(configService: ConfigService) {

        this.configService = configService;

        /**
         * Pool Object:
         *      - allows us to create and re-use multiple connections to the database
         */
        this.pool = new Pool({
            host: this.configService.get<string>('DB_HOST'),
            port: Number(this.configService.get<string>('DB_PORT')),
            user: this.configService.get<string>('DB_USER'),
            password: this.configService.get<string>('DB_PASSWORD'),
            database: this.configService.get<string>('DB_NAME'),
        });
    }

    // make call to the database
    async query<T extends QueryResultRow = QueryResultRow>(
        text: string,
        params: unknown[] = [],
        ): Promise<QueryResult<T>> {
        return this.pool.query<T>(text, params);
    }

    // close the pool after app is closed
    async onModuleDestroy(): Promise<void> {
        await this.pool.end();
    }
}
