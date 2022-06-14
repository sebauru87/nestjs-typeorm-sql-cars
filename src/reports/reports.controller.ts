import {
  Controller,
  Post,
  Body,
  UseGuards,
  Patch,
  Param,
  Get,
  Query,
} from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { ReportDto } from './dtos/report.dto';
import { UserDto } from '../users/dtos/user.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { AdminGuard } from '../guards/admin.guard';
import { GetEstimateDto } from './dtos/get-estimate.dto';
import { UpdateReportDto } from './dtos/update-report.dto';

@Controller('reports')
export class ReportsController {
  constructor(private reportsService: ReportsService) {}

  @Get()
  getEstimate(@Query() query: GetEstimateDto) {
    return this.reportsService.createEstimate(query);
  }

  @Get('/all')
  @UseGuards(AdminGuard)
  @Serialize(ReportDto)
  // @Serialize(UserDto)
  async getAll() {
    const reports = await this.reportsService.getAll();
    // console.log("🚀 ~ file: reports.controller.ts ~ line 35 ~ ReportsController ~ getAll ~ reports", reports);
    return reports;
  }

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(ReportDto)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User) {
    // console.log("🚀 ~ file: reports.controller.ts ~ line 35 ~ ReportsController ~ createReport ~ user", user);
    const dd = new Date();
    console.log(dd.getFullYear());
    
    return this.reportsService.create(body, user);
  }

  @Patch('/myreport/:id')
  @UseGuards(AdminGuard)
  updateReport(@Param('id') id: string, @Body() body: UpdateReportDto) {
    console.log("🚀 ~ file: reports.controller.ts ~ line 51 ~ ReportsController ~ updateReport ~ body", body);
    // console.log("🚀 ~ file: reports.controller.ts ~ line 51 ~ ReportsController ~ updateReport ~ id", id);
    return this.reportsService.update(parseInt(id), body);
  }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  @Serialize(ReportDto)
  approveReport(@Param('id') id: string, @Body() body: ApproveReportDto) {
    return this.reportsService.changeApproval(id, body.approved);
  }
}
