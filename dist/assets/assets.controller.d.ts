import { AssetsService } from './assets.service';
import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
export declare class AssetsController {
    private readonly assetsService;
    constructor(assetsService: AssetsService);
    create(createAssetDto: CreateAssetDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateAssetDto: UpdateAssetDto): string;
    remove(id: string): string;
}
