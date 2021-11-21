import { ormconfigErp, } from '../ormconfig'
import { createConnection } from "typeorm";

export const connectionErp: any = async () => {
  try {
    return await createConnection(ormconfigErp)
  } catch (err) {
    console.log('連線失敗', err)
  }

}
