
## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
```

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Deployment

When you're ready to deploy your NestJS application to production, there are some key steps you can take to ensure it runs as efficiently as possible. Check out the [deployment documentation](https://docs.nestjs.com/deployment) for more information.

If you are looking for a cloud-based platform to deploy your NestJS application, check out [Mau](https://mau.nestjs.com), our official platform for deploying NestJS applications on AWS. Mau makes deployment straightforward and fast, requiring just a few simple steps:

```bash
$ npm install -g @nestjs/mau
$ mau deploy
```

With Mau, you can deploy your application in just a few clicks, allowing you to focus on building features rather than managing infrastructure.

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.

## Prisma

#### Run the following command in your project root:

```bash
   npx prisma generate
```

💡 Optional: Add it to your postinstall script
To make sure this doesn’t happen again (e.g., when other developers clone your repo), add this line to your package.json:

```bash
     "scripts": {
      "postinstall": "prisma generate"
    } 
```

🔁 Full workflow (in order):
if you haven’t already.

````bash
    npx prisma init
````


Update your prisma/schema.prisma.

Run:
````bash
    npx prisma migrate dev --name init
````
````bash
    npx prisma generate
````

#### After adding new Schema of new field into schema.prisma file to migrate and populate use command
````bash
npx prisma migrate dev
````
after command type a name of table and pres Enter. 
All database migrations you can see in prisma/migrations/...


## Use Nest to generate a new module run command

````bash
  npx nest generate module <modulename>
````
#  new Controller
````bash
  npx nest generate controller <controllername>
````
# new Service
````bash
  npx nest generate service <servicename>
````

# PAYMENT UTILS Stripe
Use an account (nazarroshchuk@gmail.com - safary pass)
On dashboard Developers => API keys or create a new sandbox and watch  Secret Key
https://dashboard.stripe.com/test/dashboard

#### For testing https://docs.stripe.com/testing, testing cards

## Get started with the Stripe CLI
https://docs.stripe.com/stripe-cli