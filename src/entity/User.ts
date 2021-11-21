import { BaseEntity, Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn, RelationId } from "typeorm";
  

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;


  @Column({ default: '' })
  userCode: string

  @Column({ default: '' })
  name: string

  @Column({ default: '' })
  account: string

  @Column({ default: '' })
  password: string

  @Column({ default: false })
  active: boolean

  @Column({ default: false })
  isAdmin: boolean

 
}

