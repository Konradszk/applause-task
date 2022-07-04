import {IsArray, IsNumberString, IsOptional, IsString} from "class-validator";

export class TesterQueryParam {

  @IsOptional()
  @IsArray()
  @IsNumberString({}, {each: true})
  deviceIds: number[];

  @IsOptional()
  @IsArray()
  @IsString({each: true})
  countryCodes: string[]
}
