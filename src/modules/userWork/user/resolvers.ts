import _ from 'lodash'
import jwt from 'jsonwebtoken'
import config from '../../../../config'
import { User } from "../../../entity/User";
import md5 from 'md5'
import { getConnection } from 'typeorm';
import moment from 'moment'
import bcrypt from 'bcrypt';
export const resolvers: any = {
  Query: {
    meQuery: async (root: any, args: any, { connection, connectionErp, userId }: { connection: any, connectionErp: any, userId: any }) => {
      console.log('userId', userId)

      try {
        if (userId) {
          const user = await connectionErp.getRepository(User).createQueryBuilder("user").where('user.id=:userId', { userId }).getOne()
          return user;
        } else {return {}}
      } catch (err) {
        console.log('meQuery Err', err)
      }
    },
    userQuery: async (root: any, args: any, { connection, connectionErp, userId }: { connection: any, connectionErp: any, userId: any }) => {
      try {
        const usersObj = await connectionErp.getRepository(User).createQueryBuilder("user").orderBy("user.id", "ASC")
        if (args.name == '') { args.name = '---' }
        if (args.name) { usersObj.andWhere("user.name like:name", { name: `%${args.name}%` }) }
        const result = await usersObj.getMany()
        return result
      } catch (err) {
        console.log('err', err)
      }

    },

    
  },
  Mutation: {
    userLogin: async (root: any, args: any, { connection, connectionErp, req }: { connection: any, connectionErp: any, req: any }) => {
      let getuser: any = {}
      try {
        getuser = await connectionErp.getRepository(User).findOne({ account: args.account })
        const valid = await bcrypt.compare(args.password, getuser.password)
        if (!valid) { throw new Error('無效的密碼') }
        console.log("getuser", getuser);
      } catch (err) {
        console.log('err', err);
        throw new Error('無此使用者或是已經離職')
      }
 
      const token = jwt.sign({userId: getuser.id,account: getuser.account}, config.secret, { expiresIn: '1d' })
      req.session.userToken = token
      return getuser

    },
    userLogout: async (root: any, args: any, { req }: { req: any }) => {
      console.log('userLogout 登出')
      const token = req.session.userToken
      req.session.userToken = null
      return { token }
    },
    userUpdate: async (root: any, args: any, { connection, connectionErp, req }: { connection: any, connectionErp: any, req: any }) => {
       try {
        await connectionErp.createQueryBuilder().update(User).set(args).where("userCode = :userCode", { userCode: args.userCode }).execute();
        return await connectionErp.getRepository(User).findOne({ userCode: args.userCode })
      } catch (err) {
        console.log('err', err)
      }
    },
     
  }
}

