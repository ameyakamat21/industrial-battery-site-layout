# Battery Site Configurator App

## Running the app
### Hosted on Heroku
Access app hosted on Heroku: https://industrial-site-configurator.herokuapp.com/

### Run locally with Express server

This depends on [Node.js](http://nodejs.org/).
```
./quick-start.sh
```
Access app locally on [localhost:8000](http://localhost:8000/).

## Design tenets

* This app was built with [React](https://react.dev/). 
* [ANT design](https://ant.design/) was used for styling, top level components and the form
* Form sanitization checks were integrated into the [ANT form validator](https://ant.design/components/form#components-form-demo-validate-static)
* This app has a customizable layout feature that allows the user to move the devices around and modify the layout. 
* * The [React-DnD](https://react-dnd.github.io/react-dnd/about) package was used to implement drag-and-drop functionality within the site layout container
* * State is passed from the layout to the estimated metrics panel, so that changes to the layout update the estimated metrics  
