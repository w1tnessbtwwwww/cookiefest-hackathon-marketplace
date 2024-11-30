deploy:
	docker-compose --env-file .env -f docker/docker-compose.yml --project-directory . up --build

run:
	poetry run uvicorn start:api --reload --host 0.0.0.0 --port 8008

rev:
	poetry run alembic revision --autogenerate

mig:
	poetry run alembic upgrade head

zshrc:
	source ~/.zshrc

bashrc:
	source ~/.bashrc

parser:
	poetry run python runparser.py

bdinstance:
	docker run -e POSTGRES_PASSWORD=123123 -e POSTGRES_DB=cookiefest -p 5656:5432 --name cookiefest -d postgres

DEFAULT_GOAL := run
