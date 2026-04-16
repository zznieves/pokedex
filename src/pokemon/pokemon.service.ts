import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';

/**
 * Pokemon Service:
 *      - handles all logic dealing with Pokemon
 */
@Injectable()
export class PokemonService {

    // class properties
    private readonly dbService: DatabaseService;

    // constructor: inject services here
    constructor(databaseService: DatabaseService) {
        this.dbService = databaseService;
    }

    /**
     * DEV Method: getAll()
     *      - return all Pokemon from database
     */
    async getAll(): Promise<any> {

        const result = await this.dbService.query<any>(
            `
            SELECT
                p.id,
                p.dex_number AS "dexNumber",
                p.name,
                p.form,
                p.is_legendary AS "isLegendary"
            FROM pokemon p
            ORDER BY p.dex_number ASC, p.id ASC;
            `,
        );

        return result.rows
        
    }
}
