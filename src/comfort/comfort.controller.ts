import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ComfortService } from './comfort.service';
import { CreateComfortDto } from './dto/create-comfort.dto';
import { UpdateComfortDto } from './dto/update-comfort.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Comfort")
@Controller('comfort')
export class ComfortController {
  constructor(private readonly comfortService: ComfortService) {}

  @Post()
  create(@Body() createComfortDto: CreateComfortDto) {
    return this.comfortService.createComfort(createComfortDto);
  }

  @Get()
  findAll() {
    return this.comfortService.findAllComfort();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.comfortService.findOneComfort(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateComfortDto: UpdateComfortDto) {
    return this.comfortService.updateComfort(+id, updateComfortDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.comfortService.removeComfort(+id);
  }
}
