import { addRecord } from './addRecord';
import type { GameRecord } from '../types';
import { describe, expect, it } from 'vitest';

describe('addRecord', () => {
  const records: GameRecord[] = [
    {
      config: {
        length: 5,
        base: 10,
      },
      attempts: 4,
      time: 50,
    },
    {
      config: {
        length: 5,
        base: 10,
      },
      attempts: 4,
      time: 50,
    },
    {
      config: {
        length: 5,
        base: 10,
      },
      attempts: 4,
      time: 60,
    },
    {
      config: {
        length: 5,
        base: 10,
      },
      attempts: 5,
      time: 200,
    },
    {
      config: {
        length: 5,
        base: 10,
      },
      attempts: 7,
      time: 105,
    },
  ];

  it('новая запись не попадает в таблицу, если количество попыток больше существующих', () => {
    const record: GameRecord = {
      config: {
        length: 5,
        base: 10,
      },
      attempts: 10,
      time: 2,
    };

    expect(addRecord(records, record, 5)).toEqual(records);
  });

  it('новая запись не попадает в таблицу, если количество попыток совпадает с худшим существующем, но время больше', () => {
    const record: GameRecord = {
      config: {
        length: 5,
        base: 10,
      },
      attempts: 7,
      time: 200,
    };

    expect(addRecord(records, record, 5)).toEqual(records);
  });

  it('новая запись попадет в таблицу, если размер таблицы меньше лимита', () => {
    const record: GameRecord = {
      config: {
        length: 5,
        base: 10,
      },
      attempts: 10,
      time: 2,
    };

    expect(addRecord(records, record, 10).length).toBe(6);
  });

  it('таблица будет отсортирована по количеству попыток', () => {
    const record: GameRecord = {
      config: {
        length: 5,
        base: 10,
      },
      attempts: 1,
      time: 2,
    };

    expect(addRecord(records, record, 10)).toEqual([record, ...records]);
  });

  it('таблица будет отсортирована по по попыткам, затем по времени', () => {
    const record: GameRecord = {
      config: {
        length: 5,
        base: 10,
      },
      attempts: 4,
      time: 40,
    };

    expect(addRecord(records, record, 10)).toEqual([record, ...records]);
  });

  it('не мутирует исходный массив', () => {
    const original = structuredClone(records);
    addRecord(records, { config: { length: 5, base: 10 }, attempts: 1, time: 1 }, 10);
    expect(records).toEqual(original);
  });
});
