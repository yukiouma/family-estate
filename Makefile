.PHONY: build
build:
	docker build -t family-estate/client:v0.1.2 .

.PHONY: dev
dev:
	docker run -d --rm --name family-estate-client -p 9001:80 family-estate/client:v0.1.0
