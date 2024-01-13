default: base

base: node_modules

node_modules: package.json
	npm install --legacy-peer-deps
	touch node_modules

.PHONY: node_version
node_version: node_modules
	node lib/bin/enforce-node-version.js

.PHONY: dev
dev: base
	npx nodemon --watch lib --watch config lib/bin/server.js

.PHONY: run
run: base
	node lib/bin/server.js

.PHONY: debug
debug: base
	node --debug --inspect lib/bin/server.js

.PHONY: test
test: lint
	BCRYPT=no npx mocha --recursive --exit

.PHONY: test-integration
test-integration: node_version
	BCRYPT=no npx mocha --recursive test/integration --exit

.PHONY: test-unit
test-unit: node_version
	npx mocha --recursive test/unit --exit

.PHONY: lint
lint: node_version
	npx eslint --cache --max-warnings 0 .
