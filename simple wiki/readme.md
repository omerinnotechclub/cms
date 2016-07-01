# SimpleWiki

This project was a very barebones wiki developed on top of a lot of open source software for CSCI 215 Ethical Issues in Computer Science by Chris Thomas. It is based off the Open Source project, [MediaWiki](https://www.mediawiki.org/wiki/MediaWiki), which runs Wikipedia. The application is built mainly upon the Laravel framework, using Parsedown to parse pages inputted by the user in Markdown. The front end uses Twitter Bootstrap, and Lumen, a theme for Bootstrap. From there, the application layout was heavily customized with my own CSS changes using SASS, an extension language for easily writing and compiling CSS. While there are several other open source projects that played roles in the creation of this application, it would take forever to list them all.

This is not a production-worthy wiki and was intended as a simple class project.

I acknowledge this is good bit of work to get running on your own, so I've provided a live demo here: http://faore.in:8000/wiki

## Installation

This application is built on the [PHP programming language](http://php.net/), with a component written in Ruby. PHP will be needed to run any part of the application. Ruby will only be needed if recompiling CSS. This guide assumes you can setup PHP for use on a command line.

Laravel, and this application rely on several dependencies that will need to be installed with [Composer](https://getcomposer.org/), a PHP package manager similar to NPM, or RubyGems.

From the command line, clone this repository
``` bash
$ git clone https://www.github.com/Faore/SimpleWiki.git
```
Change to the root of the project and install all the dependencies for the application.
``` bash
$ cd ./SimpleWiki
$ composer install
```
For simple viewing, the application is setup with defaults out of the box that do not require an external MySQL server, or an external webserver to operate. For the purpose of evaluation, this works fine. The application is also preloaded with pages for demonstration in the file-based database. **The initial content contains a simple wiki with information on various licenses as well as information on the concepts of copyright.** To use the built-in server, and existing database run this command:
``` bash
$ php artisan serve
```
If all goes well, you will have the full wiki application running at http://localhost:8000 which you can use and edit.

If you want to start with an empty application, press Ctrl+C to stop the development server. This command will rebuild the database and fill it with empty content.
``` bash
$ php artisan migrate:refresh
```

Since this application is heavily built on the Laravel Framework, the entirety of the Laravel documentation applies to this application. The config directory, in particular is where application settings can be changed to suit different deployments including MySQL server configuration. You can find all that [here](http://www.laravel.com). The application can be served up using Nginx or Apache as a real web server with the document root set as the public folder. Make sure the application is only served at the root of a domain or subdomain as it relies on relative links.

## Application Architecture / How It Works

This wiki works off the common Model-View-Controller (MVC) architecture. Here's a quick overview of the components I wrote:

### Model

I opted to have a single model. Like Wikipedia, everything is a page. There is no differentiation between categories an pages. They're stored the same but follow a parent-child relationship in the database. Pages can belong to several other pages and can have several pages as children. This is all taken care of in the [Page](https://github.com/Faore/SimpleWiki/blob/master/app/Page.php) model. The model also handles parsing the markdown input from the user and creating all the relations based on the wiki tags. The final HTML is stored in the database for speed. It also stores some helper functions to quickly access data without having to make huge queries elsewhere in the app.

### Controllers

There are 2 controllers in this application. One is really straightforward:

* The [HomeController](https://github.com/Faore/SimpleWiki/blob/master/app/Http/Controllers/HomeController.php) is responsible only for the Wiki's homepage. It finds all the pages without a parent and lists them out. This effectively makes it impossible for pages to be unlinked, and gives good structure to the content of the app. This is also how the sidebar is populated.
* The [PageController](https://github.com/Faore/SimpleWiki/blob/master/app/Http/Controllers/PageController.php) handles all the other pages in the app in a psuedo REST format: It provides the pages necessary to view, edit, delete and create pages as well as refresh their associations. (Parent pages aren't automatically updated when a child adds a new parent.)

### Views

The views in the application are written in the Blade templating language. There are 5 in total:

* Blade templates can extend each other. The [app](https://github.com/Faore/SimpleWiki/blob/master/resources/views/app.blade.php) template contains HTML common to all pages. It pulls in all the CSS and JS needed to run the application as well as render the sidebar. All other templates extend this one.
* The [create](https://github.com/Faore/SimpleWiki/blob/master/resources/views/create.blade.php) template proves the form to create and save a new page. It uses a JavaScript tool to show render the Markdown in real time so you have an idea of what the page will look like as you're writing it.
* The [edit](https://github.com/Faore/SimpleWiki/blob/master/resources/views/edit.blade.php) template is identical to the create template with some minor changes. It fills with the content of the page that is being edited and shows the name of it in the title so it is clear what you're editing and don't have to write it from scratch.
* The [show](https://github.com/Faore/SimpleWiki/blob/master/resources/views/show.blade.php) template just shows the page from the database. It also makes a list of the parent pages, showing them in the footer. If the page has children, those are shown at the bottom of the article.
* The [home](https://github.com/Faore/SimpleWiki/blob/master/resources/views/home.blade.php) template is based off the show template. It only lists out the pages in the wiki without parents.

## License

I've release this code under the MIT License. For more information, see [License.md](https://github.com/Faore/SimpleWiki/blob/master/License.md).
