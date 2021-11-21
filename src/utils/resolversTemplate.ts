import _ from 'lodash'
import { Connection, getConnection } from 'typeorm'


export const resolversTemplate = (perfix: any, Model: any) => {


    return {
        Query: {
            [`${perfix}Query`]: async (root: any, args: any, { connectionErp }: { connectionErp: any }) => {
                try {
                    const obj = connectionErp.getRepository(Model).createQueryBuilder('model')
                        .orderBy("sort", "ASC")
                    return await obj.getMany()
                } catch (err) { console.log('err', err); return []; }
            },
        },
        Mutation: {
            [`${perfix}Create`]: async (root: any, args: any, { connectionErp }: { connectionErp: Connection, }) => {
                try {
                    return await connectionErp.getRepository(Model).save(args)
                } catch (err) { console.log(`${perfix}Create`, err); return {}; }
            },
            [`${perfix}Update`]: async (root: any, args: any, { connectionErp, }: { connectionErp: any, }) => {
                try {
                    await connectionErp.createQueryBuilder().update(Model).set(args).where("id = :id", { id: args.id }).execute();
                    return await connectionErp.getRepository(Model).findOne(args.id);
                } catch (err) { console.log(`${perfix}UpdateErr`, err); return {}; }
            },
            [`${perfix}Delete`]: async (root: any, args: any, { connectionErp }: { connectionErp: any }) => {
                const objRepository = await connectionErp.getRepository(Model);
                let objToRemove = await objRepository.findOne(args.id);
                try { const data = await objRepository.remove(objToRemove); return { Status: "刪除成功" }; } catch (err) { return { Status: "刪除失敗" }; }
            },


        }
    }
}

