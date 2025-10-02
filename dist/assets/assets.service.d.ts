import { CreateAssetDto } from './dto/create-asset.dto';
import { UpdateAssetDto } from './dto/update-asset.dto';
export declare class AssetsService {
    create(createAssetDto: CreateAssetDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateAssetDto: UpdateAssetDto): string;
    remove(id: number): string;
}
