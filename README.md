This is a node backend service using express, inversify & sequelize

I failed to containerize it due to some issue with localstack but it is working locally you can check the docker and docker compose files to check the progress

You need the following to run the app

  - docker
  - docker-compose
  - postgres

set up the db info in ormConfig and if you want run migration using the sql file in the db folder or when sequelize intializes it will sync it up

Run the following:

    - docker-compose up localstack

    - npm i
    - npm run build
    - npm run local synth
    - npm run local bootstrap
    - npm run local deploy

The above command will deploy the lambda, sqs, sns on the localstack using cdk, cdk-local

Then to run the app 

    - npm run start

Then to test the apis following can be used 

To get all prodcuts 

curl -X GET http://localhost:5000/v1/products \

To get product

curl -X GET http://localhost:5000/v1/products/1 \

To add product

curl -X POST http://localhost:5000/v1/products \
   -H 'Content-Type: application/json' \
   -d '{ "name": "smartphone", "description": "Latest smart phone", "price": 10000, "quantity": 15 }'

To update product

curl -X PUT http://localhost:5000/v1/products/2 \
   -H 'Content-Type: application/json' \
   -d '{ "data": { "name": "smartphone_3", "quantity": 5 } }'


To delete product

curl -X DELETE http://localhost:5000/v1/products/1