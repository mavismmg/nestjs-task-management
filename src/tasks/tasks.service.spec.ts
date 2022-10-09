import { NotFoundException } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { TaskStatus } from './task-status.enum';
import { TasksRepository } from './tasks.repository';
import { TasksService } from './tasks.service';

const mockTasksRepository = () => ({
  getTasks: jest.fn(),
  findOne: jest.fn(),
  createTask: jest.fn(),
  save: jest.fn(),
  delete: jest.fn(),
});

const mockUser = {
  username: 'Test',
  id: 'id',
  password: 'password',
  tasks: [],
  movies: [],
};

describe('TasksService', () => {
  let tasksService: TasksService;
  let tasksRepository: any;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        TasksService,
        { provide: TasksRepository, useFactory: mockTasksRepository },
      ],
    }).compile();
    tasksService = module.get<TasksService>(TasksService);
    tasksRepository = module.get<TasksRepository>(TasksRepository);
  });

  describe('getTasks', () => {
    it('calls TasksRepository.getTasks and returns the result', async () => {
      tasksRepository.getTasks.mockResolvedValue('someValue');
      const result = await tasksService.getTasks(null, mockUser);
      expect(result).toEqual('someValue');
    });
  });

  describe('getTaskById', () => {
    it('calls TaskRepository.findOne and returns the result', async () => {
      const mockTask = {
        title: 'Title',
        description: 'desc',
        id: 'id',
        status: TaskStatus.OPEN,
      };
      tasksRepository.findOne.mockResolvedValue(mockTask);
      const result = await tasksService.getTaskById('someId', mockUser);
      expect(result).toEqual(mockTask);
    });

    it('calls TaskRepository.findOne and handles an error', async () => {
      tasksRepository.findOne.mockResolvedValue(null);
      expect(tasksService.getTaskById('someId', mockUser)).rejects.toThrow(
        NotFoundException
      );
    });
  });

  describe('createTask', () => {
    it('calls TaskRepository.createTask and returns the result', async () => {
      tasksRepository.createTask.mockResolvedValue('someValue');
      const result = await tasksService.createTask(null, mockUser);
      expect(result).toEqual('someValue');
    });
  });

  describe('updateTaskStatus', () => {
    it('call TaskRepository.save and returns the result', async () => {
      const mockTask = {
        title: 'title',
        description: 'desc',
        id: 'id',
        status: TaskStatus.OPEN,
      };
      tasksRepository.findOne.mockResolvedValue(mockTask);
      tasksRepository.save.mockResolvedValue(mockTask);
      const result = await tasksService.updateTaskStatus('someId', TaskStatus.OPEN, mockUser);
      expect(result).toEqual(mockTask);
    });

    describe('deleteTask', () => {
      it('call TaskRepository.delete and returns the result', async () => {
        const someId = 'someId';
        tasksRepository.delete.mockResolvedValue({ someId, mockUser });
        const result = await tasksService.deleteTask('someId', mockUser);
        expect(result).toEqual(undefined);
      });

      it('call TaskRepository.delete and handles an error', async () => {

      });
    });
  });
});