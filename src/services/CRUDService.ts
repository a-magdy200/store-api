import {EntityTarget, FindManyOptions, FindOneOptions, FindOptionsSelect, FindOptionsWhere} from "typeorm";
import {AppDataSource} from "../common/data-source";
import {QueryDeepPartialEntity} from "typeorm/query-builder/QueryPartialEntity";

interface Base {
  id: number
}

class CRUDService {
  public static async createOne<T extends Base>(item: QueryDeepPartialEntity<T>, E: EntityTarget<T>): Promise<T> {
    const insertResult = await AppDataSource.getRepository<T>(E).insert(item);
    return await this.getOne<T>({where: {id: insertResult.generatedMaps[0].id}}, E);
  }

  public static async deleteOne<T>(id: number, E: EntityTarget<T>): Promise<number> {
    await AppDataSource.getRepository(E).delete(id);
    return id;
  }

  public static async getAll<T extends Base>(where: FindOptionsWhere<T>, E: EntityTarget<T>): Promise<T[]> {
    return AppDataSource.getRepository<T>(E).find({
      where
    });
  }

  public static async getOne<T extends Base>(options: FindOneOptions<T & Base>, E: EntityTarget<T>): Promise<T> {
    return AppDataSource.getRepository<T>(E).findOne(options);

  }

  public static async updateOne<T extends Base>(id: number, item: QueryDeepPartialEntity<T>, E: EntityTarget<T>): Promise<T> {
    await AppDataSource.getRepository<T>(E).update(id, item);
    const options: FindOneOptions<T & Base> = {
      // @ts-ignore
      // Issue not resolved from Typeorm
        where: {
          id
        }
    }
    return await this.getOne<T>(options, E);
  }
}

export default CRUDService
