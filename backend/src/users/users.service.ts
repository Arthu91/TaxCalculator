import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { TaxService } from '../tax/tax.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private taxService: TaxService,
  ) {}

  findAll() {
    return this.userRepo.find({ relations: ['group'] });
  }

  findOne(id: string) {
    return this.userRepo.findOne({ where: { id }, relations: ['group'] });
  }

  create(user: Partial<User>) {
    return this.userRepo.save(user);
  }

  update(id: number, user: Partial<User>) {
    return this.userRepo.update(id, user);
  }

  remove(id: number) {
    return this.userRepo.delete(id);
  }

  async computeUserTax(id: number) {
    const user = await this.userRepo.findOne({ where: { id: id.toString() } });
    if (!user) throw new Error('User not found');

    const result = this.taxService.computeMonthlyWithholding(user.salary);
    return { userId: user.id, salary: user.salary, ...result };
  }
}
