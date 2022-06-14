import {
  IsString,
  IsNumber,
  Min,
  Max,
  IsLongitude,
  IsLatitude,
  IsOptional,
} from 'class-validator';

export class UpdateReportDto {
  @IsString()
  @IsOptional()
  make: string;

  @IsString()
  @IsOptional()
  model: string;

  @IsNumber()
  @Min(1930)
  @Max(new Date().getFullYear()+1)
  @IsOptional()
  year: number;

  @IsNumber()
  @Min(0)
  @Max(1000000)
  @IsOptional()
  mileage: number;

  @IsLongitude()
  @IsOptional()
  lng: number;

  @IsLatitude()
  @IsOptional()
  lat: number;

  @IsNumber()
  @Min(0)
  @Max(1000000)
  @IsOptional()
  price: number;
}
