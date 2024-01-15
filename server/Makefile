# Makefile
.DEFAULT_GOAL := base

base: node_modules

# Install dependencies
node_modules: package.json
	npm install --legacy-peer-deps
	touch node_modules

# Check Node.js version
.PHONY: node_version
node_version: node_modules
	node lib/bin/enforce-node-version.js

# Development task using nodemon
.PHONY: dev
dev: base
	npx nodemon --watch lib --watch config ./lib/bin/start

# Start the application
.PHONY: run
run: base
	node ./lib/bin/start

# Debug the application
.PHONY: debug
debug: base
	node --inspect lib/bin/server.js

# Run tests (unit and integration)
.PHONY: test
test: lint
	BCRYPT=no npx mocha --recursive --exit

# Run integration tests
.PHONY: test-integration
test-integration: node_version
	BCRYPT=no npx mocha --recursive test/integration --exit

# Run unit tests
.PHONY: test-unit
test-unit: node_version
	npx mocha --recursive test/unit --exit

# Lint the code
.PHONY: lint
lint: node_version
	npx eslint --cache --max-warnings 0 .
