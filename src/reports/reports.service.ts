import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Report } from './report.entity';
import { CreateReportDto } from './dtos/create-report.dto';
import { User } from '../users/user.entity';
import { GetEstimateDto } from './dtos/get-estimate.dto';

@Injectable()
export class ReportsService {
  constructor(@InjectRepository(Report) private repo: Repository<Report>) {}

  createEstimate({ make, model, lng, lat, year, mileage }: GetEstimateDto) {
    return this.repo
      .createQueryBuilder()
      // .select('AVG(price)', 'price')
      .select('*')
      .where('make = :make', { make })
      .andWhere('model = :model', { model })
      .andWhere('lng - :lng BETWEEN -5 AND 5', { lng })
      .andWhere('lat - :lat BETWEEN -5 AND 5', { lat })
      .andWhere('year - :year BETWEEN -3 AND 3', { year })
      .andWhere('approved IS TRUE')
      .orderBy('ABS(mileage - :mileage)', 'DESC')
      .setParameters({ mileage })
      .limit(3)
      .getRawOne();
    // return this.repo
    // .createQueryBuilder()
    // .select('*')
    // .where('make = :make', { make })
    // .getRawMany();
  }

  getAll() {
    const reports = this.repo.find({ relations: ["user"] });
    return reports;
  }

  create(reportDto: CreateReportDto, user: User) {
    console.log("🚀 ~ file: reports.service.ts ~ line 35 ~ ReportsService ~ create ~ user", user);
    const report = this.repo.create(reportDto);
    report.user = user;
    return this.repo.save(report);
  }

  async update(id: number, attrs: Partial<Report>) {
    // console.log("🚀 ~ file: reports.service.ts ~ line 42 ~ ReportsService ~ update ~ report", id);
    const report = await this.repo.findOne(id);
    if (!report) {
      throw new NotFoundException('report not found');
    }
    Object.assign(report, attrs);
    return this.repo.save(report);
  }

  async changeApproval(id: string, approved: boolean) {
    const report = await this.repo.findOne(id, { relations: ["user"] });
    if (!report) {
      throw new NotFoundException('report not found');
    }

    report.approved = approved;
    return this.repo.save(report);
  }
}
