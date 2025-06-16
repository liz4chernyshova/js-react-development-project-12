build:
	cd frontend && npm run build

start:
	npx start-server -s ./frontend/dist

start:
	npm install && cd frontend && npm install

lint:
	cd frontend && npx eslint . --ext .js,.jsx

lint-fix:
	cd frontend && npx eslint . --ext .js,.jsx --fix
