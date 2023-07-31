# MD-frontend
frontend for [Movie Diary](https://github.com/datfeelbruh/moviesDiary)

# Installation
docker compose:
```yml
  frontend:
    build:
      context: path/to/frontend
      dockerfile: Dockerfile

    restart: always
    container_name: 'service-frontend'

    ports:
      - 8080:80

    depends_on:
      - backend
```

# Development
Created with [vite](https://vitejs.dev/)+[preact](https://preactjs.com/) on node ^18.15.0.

| Commands | Description |
| --- | --- |
| `npm run dev` | build, watch file changes |
| `npm run build` | generate release version |
| `npm run preview` | serve release version |