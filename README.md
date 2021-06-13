# projectG
Funny Movies  - Round 2 interview from Remitano

## Deploy back-end

`heroku git:remote -a az-funny-movies-api`
`git subtree push --prefix back-end heroku master`

## Deploy front-end

`heroku git:remote -a az-funny-movies-app`
`git subtree push --prefix front-end heroku master`