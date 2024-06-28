import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  AfterInsert,
  AfterUpdate,
  AfterRemove,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @AfterInsert()
  logInsert() {
    console.log(`user with id : ${this.id} inserted`);
  }

  @AfterUpdate()
  logUpdate() {
    console.log(`user with id : ${this.id} updated`);
  }

  @AfterRemove()
  logRemove() {
    console.log(`user with id : ${this.id} removed`);
  }
}
