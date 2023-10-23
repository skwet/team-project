run:
	python3 manage.py makemigrations
	python3 manage.py migrate
	python3 manage.py runserver

runserver:
	python3 manage.py runserver

makemigrations:
	python3 manage.py makemigrations

migrate:
	python3 manage.py migrate

superuser:
	python3 manage.py createsuperuser

black:
	black ./ --config black.toml

flake8:
	flake8 ./ --config flake8.cfg