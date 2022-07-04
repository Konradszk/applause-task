# ApplauseTest

![](https://github.com/Konradszk/applause-task/blob/main/result.gif)
https://github.com/Konradszk/applause-task/blob/main/result.mov

## Set up project
### Server

- run mysql using `docker-compose up`
- open [localhost:8080](http://localhost:8080)
- if database user doesn't exist login with:
  - Login: root
  - Password: konrad
  - Server: mysql
- create user with credentials from [env](.env), set all privileges
- logout from root
- log in using credentials from [env](.env) file
- create database named like in [env](.env) file
- run command `nx run api:migrate-run`
- run command `nx serve api`

server listens on [localhost:3333](http://localhost:3333)

### App

- run `nx serve`
- open [localhost:4200](http://localhost:4200)
