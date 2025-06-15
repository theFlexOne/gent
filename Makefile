fe:
	npm --prefix ./frontend run dev

be:
	mvn -f ./server/pom.xml spring-boot:run