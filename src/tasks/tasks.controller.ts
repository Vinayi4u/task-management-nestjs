import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.module';
import { CreateTaskDTO } from 'src/dto/create-task.dto';
import { filterDTO } from 'src/dto/filter-tasks.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(@Query() filterDTO: filterDTO): Task[] {
    if (Object.keys(filterDTO).length) {
      return this.tasksService.getAllFilterTasks(filterDTO);
    } else {
      return this.tasksService.getAllTasks();
    }
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string) {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDTO: CreateTaskDTO) {
    return this.tasksService.createTask(createTaskDTO);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string) {
    const task = this.tasksService.getTaskById(id);
    if (!task) {
      return new NotFoundException('Task Not Found!!!');
    }
    return this.tasksService.deleteTaskById(id);
  }

  @Patch('/:id/status')
  updateTask(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Task {
    return this.tasksService.updateTaskById(id, status);
  }
}
