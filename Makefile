deploy-dev:
	docker compose up -d
	docker exec -it aws-sls-api-base_dind_1 sls deploy --stage dev
	docker compose down
	rm -rf ./.serverless
.PHONY: docker-deploy-dev

remove-dev:
	docker compose up -d
	docker exec -it aws-sls-api-base_dind_1 sls remove --stage dev
	docker compose down
	rm -rf ./.serverless
.PHONY: docker-remove-dev

print-dev:
	docker compose up -d
	docker exec -it aws-sls-api-base_dind_1 sls print --stage dev
	docker compose down
.PHONY: docker-remove-dev

yarn-install:
	docker compose up -d
	docker exec -it aws-sls-api-base_dind_1 yarn install
	docker compose down
.PHONY: docker-yarn-install

docker-up:
	docker compose up -d
.PHONY: docker-up

docker-ssh:
	docker compose up -d
	docker exec -it aws-sls-api-base_dind_1 /bin/bash
.PHONY: docker-ssh
