# Журнал работ на строительном объекте

Fullstack-приложение для ведения журнала выполненных строительных работ. Прораб может добавлять, редактировать, удалять и фильтровать записи по датам.

## Стек

- Frontend: React + TypeScript + Vite
- Backend: Node.js + Express + TypeScript
- Database: PostgreSQL
- ORM: Prisma
- Запуск: Docker Compose

## Почему выбран этот стек

React + TypeScript подходит под требования тестового задания и позволяет быстро собрать понятный интерфейс. Node.js + Express выбран для простого и прозрачного REST API без лишней сложности. PostgreSQL используется для надежного хранения данных, Prisma — для удобной работы с моделями, миграциями и seed-данными. Docker Compose позволяет запустить frontend, backend и базу одной командой.

## Реализовано

- Просмотр списка записей журнала
- Добавление новой записи
- Редактирование записи
- Удаление записи с подтверждением
- Фильтрация по диапазону дат
- Сортировка по дате: сначала новые / сначала старые
- Справочник видов работ через отдельную таблицу `work_types`
- Валидация формы на frontend и backend
- Seed начальных видов работ

## Быстрый запуск

```bash
docker-compose up --build
```

После запуска:

- Frontend: http://localhost:5173
- Backend: http://localhost:3000
- Backend API: http://localhost:3000/api
- Healthcheck: http://localhost:3000/health
- PostgreSQL: localhost:5432

При первом старте backend автоматически выполнит `prisma migrate deploy` и `prisma db seed`.

## Проверка API после запуска

```bash
curl http://localhost:3000/api/work-types
curl http://localhost:3000/api/journal
```

В `GET /api/work-types` после seed должны быть доступны:

- Кладка перегородок
- Монтаж опалубки
- Бетонирование
- Армирование
- Штукатурные работы
- Монтаж инженерных сетей

## Локальный запуск без Docker

### Backend

```bash
cd backend
npm install
cp ../.env.example .env
npx prisma migrate dev
npx prisma db seed
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## API

### Журнал работ

- `GET /api/journal?dateFrom=2026-05-01&dateTo=2026-05-30&sort=desc` — получить записи
- `POST /api/journal` — создать запись
- `PUT /api/journal/:id` — обновить запись
- `DELETE /api/journal/:id` — удалить запись

### Виды работ

- `GET /api/work-types` — получить справочник видов работ

## Пример body для создания/обновления записи

```json
{
  "workDate": "2026-05-30",
  "workTypeId": 1,
  "volume": 24,
  "unit": "м²",
  "executorName": "Иванов Сергей Петрович",
  "comment": "Работы выполнены на 3 этаже"
}
```

## Структура проекта

```text
construction-work-journal/
├── backend/
│   ├── prisma/
│   └── src/
├── frontend/
│   └── src/
├── docker-compose.yml
├── .env.example
├── .gitignore
└── README.md
```

## Проверка перед сдачей

```bash
cd backend && npm run typecheck
cd ../frontend && npm run typecheck
```

Также можно проверить архив:

```bash
unzip -t construction-work-journal.zip
```
