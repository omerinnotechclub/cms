Talking points:

-   Wikipedia is something everyone loves.

    -   Jimmy wales had a pretty ambitious goal to essentially document and make a large sum of human knowledge available for the world to view, and contribute to.

    -   It started with MediaWiki, a system created by the Wikimedia Foundation specifically to run Wikipedia.

    -   It has become very sophisticated since then, and they don’t really run it on a single server anymore. They’ve got all sorts of proxies routing and balancing requests. Nginx is used as the termination proxy. And they use a hacked up version of PHP called HHVM, developed by Facebook to manage their PHP load.

    -   A pretty big feat for a relatively small organization.

-   I challenged myself to build a full modern web application like Wikipedia on fully open source software.

    -   It runs on an object oriented MVC framework called Laravel, released under the MIT License

    -   It runs on a debian linux server – several licenses that follow the Debian Free Software Guidelines

    -   There’s a lot of other things under the MIT license.

-   Everything goes through the page model, which controls data flow between the application and database.

-   Takeaways:

    -   There is so much open source software available to help you do just about everything.

    -   MediaWiki is a complex system.
