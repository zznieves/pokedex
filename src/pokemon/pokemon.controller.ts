import { Controller, Get } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

/**
 * Main Controller
 *      - Handles Requests dealing with Pokemon data
 */
@Controller('pokemon')
export class PokemonController {

    // class properties
    private readonly pokemonService: PokemonService;

    /**
     * Constructor
     *      - inject all services here
     */
    constructor(pokemonService: PokemonService) {
        this.pokemonService = pokemonService;
    }


    /**
     * GET route:
     *      - retrieve all Pokemon data from database
     *      - use PokemonService for logic
     */
    @Get()
    getAll() {
        return this.pokemonService.getAll();
    }
}
