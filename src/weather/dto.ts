import { Expose, Type } from "class-transformer";
import { BaseDto } from "../common/dto";
import { Field, ObjectType, Int } from "@nestjs/graphql";

@ObjectType()
export class CurrentWeatherDto extends BaseDto<CurrentWeatherDto>{
    @Expose()
    @Field(() => Int)
    last_updated_epoch: number;

    @Expose()
    @Field()
    last_updated: string;

    @Expose()
    @Field()
    temp_c: number;

    @Expose()
    @Field()
    temp_f: number;

    @Expose()
    @Field()
    feelslike_c: number;

    @Expose()
    @Field()
    feelslike_f: number;
}

@ObjectType()
export class LocationDto extends BaseDto<LocationDto> {
    @Expose()
    @Field()
    name: string;

    @Expose()
    @Field()
    region: string;

    @Expose()
    @Field()
    country: string;

    @Expose()
    @Field()
    lat: number;

    @Expose()
    @Field()
    lon: number;

    @Expose()
    @Field()
    tz_id: string;

    @Expose()
    @Field(() => Int)
    localtime_epoch: number;

    @Expose()
    @Field()
    localtime: string;
}

@ObjectType()
export class CurrentWeatherDataDto extends BaseDto<CurrentWeatherDataDto> {
    @Expose()
    @Type(() => LocationDto)  
    @Field(() => LocationDto)
    location: LocationDto;
    
    @Expose()
    @Type(() => CurrentWeatherDto) 
    @Field(() => CurrentWeatherDto)
    current: CurrentWeatherDto;
}
