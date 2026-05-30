# Чеклист проверки проекта

## Что реализовано

- [x] Просмотр списка записей журнала
- [x] Добавление новой записи
- [x] Редактирование записи
- [x] Удаление записи с подтверждением
- [x] Фильтрация по датам `dateFrom` / `dateTo`
- [x] Сортировка по дате `asc` / `desc`
- [x] Frontend-валидация обязательных полей
- [x] Backend-валидация через Zod
- [x] PostgreSQL через Docker Compose
- [x] Prisma schema + миграция
- [x] Seed справочника видов работ
- [x] Отдельная таблица `work_types`
- [x] README с запуском
- [x] `.env.example`

## Команды для ручной проверки

```bash
docker-compose up --build
```

Потом открыть:

```text
http://localhost:5173
```

Проверить API:

```bash
curl http://localhost:3000/health
curl http://localhost:3000/api/work-types
curl http://localhost:3000/api/journal
```

Создать запись через API:

```bash
curl -X POST http://localhost:3000/api/journal \
  -H "Content-Type: application/json" \
  -d '{"workDate":"2026-05-30","workTypeId":1,"volume":24,"unit":"м²","executorName":"Иванов Сергей Петрович","comment":"Работы выполнены на 3 этаже"}'
```
