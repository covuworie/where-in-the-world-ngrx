# WhereInTheWorldNgrx

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.4. The project is to practice Angular development and is based on Frontend Mentor's challenge [REST Countries API with color theme switcher](https://www.frontendmentor.io/challenges/rest-countries-api-with-color-theme-switcher-5cacc469fec04111f7b848ca). However, when you run the code you will see that I have extended the project with extra functionality. If you prefer to use [Angular Material](https://material.angular.io/) Design Components then please see this [version](https://github.com/covuworie/where-in-the-world-ngrx).

There are several ways to manage data in Angular projects. This project uses [NgRx](https://ngrx.io/) to manage the data. The project goes further by using the [facade pattern](https://auth0.com/blog/ngrx-facades-pros-and-cons/) to hide the implementation details of the store from the components. I'm sold on NgRx after implementing this project as it makes the code far cleaner and easier to reason about. If you want a comparison to not using NgRx then take a look at my [first implementation which does not use NgRx](https://github.com/covuworie/where-in-the-world). The components are far messier containing a lot more business logic. Just look at the number of services that are injected into the various components. 

In this project you will also see a clear separation of concerns between [smart vs presentation components](https://blog.angular-university.io/angular-2-smart-components-vs-presentation-components-whats-the-difference-when-to-use-each-and-why/) which is a best practice for reuse of components. You will also see a few examples of [when and how to unsubscribe from subscriptions](https://blog.briebug.com/blog/when-should-i-unsubscribe-my-subscriptions-in-angular). However, in the majority of the code, you will not see subscriptions at all since the main rule is never manaually subscribe to observables if you can avoid it. Throughout the code you will see the best practice of using the async pipe to subscribe to observables directly in templates. The async pipe cleans up its own subscriptions when necessary, taking that responsibility away from you.

Furthermore there is no database in this project and the data is actually stored in a simple `db.json` file at the root of the project using [json-server](https://www.npmjs.com/package/json-server). JSON Server creates a full fake REST API so that you can communicate with the backend via standard HTTP requests.
## Development server

Run `npm run dev`. This will concurrently run the dev data server and the dev server. Navigate to `http://localhost:3000` if you want to see the endpoints available and the data for the data server.
Navigate to `http://localhost:4200/` to see the running app. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
