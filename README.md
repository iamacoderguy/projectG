# projectG
Funny Movies  - Round 2 interview from Remitano

Live App: https://az-funny-movies-app.herokuapp.com/
Live API: https://az-funny-movies-api.herokuapp.com/

## Deploy back-end

`heroku git:remote -a az-funny-movies-api`

`git subtree push --prefix back-end heroku master`

## Deploy front-end

`heroku git:remote -a az-funny-movies-app`

`git subtree push --prefix front-end heroku master`