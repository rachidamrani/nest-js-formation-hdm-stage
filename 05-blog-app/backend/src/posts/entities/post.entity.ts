import {
  AfterInsert,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
  })
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => User, (user) => user.posts)
  user: User;

  @AfterInsert()
  insertLogger() {
    console.log(`Post with ID : ${this.id} has been created!`);
  }
}
