import { Expose, Transform } from 'class-transformer';
import { Report } from 'src/reports/report.entity';

export class UserDto {
  @Expose()
  id: number;

  @Expose()
  email: string;

  // @Expose()
  // reports: Report[];

  // @Transform(({ obj }) => obj.user.id)
  // @Expose()
  // userId: number;

  @Transform(({ obj }) => {
    // console.log("acaaa", obj.reports);
    const result = obj?.reports ? obj.reports.map(item=>item.id) : [];
    
    return result})
  @Expose()
  reports: number[];
}
