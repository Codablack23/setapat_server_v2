import { SamplesService } from './samples.service';
export declare class SamplesController {
    private readonly samplesService;
    constructor(samplesService: SamplesService);
    getAllSamples(): void;
    reactToSamples(): void;
}
