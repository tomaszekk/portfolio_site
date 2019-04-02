/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */


$(function() {
    /* A test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* A test asures that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* A test that loops through each feed
         * in the allFeeds and ensures it has a URL defined
         * and is not empty.
         */

         it('each feed has a URL defined and is not empty', function(){
           allFeeds.forEach(function(el, index) {
            expect(el.url).not.toEqual('');
             expect(el.url).not.toBeUndefined();
             expect(el.url).not.toBeNull();
             console.log(el.url);
           });

         });


        /* A test that loops through each feed
         * in the allFeeds and ensures it has a name defined
         * and is not empty.
         */

         it('each feed has a name defined and is not empty', function(){
           allFeeds.forEach(function(el, index) {
            expect(el.name).not.toEqual('');
             expect(el.name).not.toBeUndefined();
             expect(el.name).not.toBeNull();
             console.log(el.name);

           });

         });
    });


    /* A test suite named "The menu" */
    describe('The menu', function() {
        //let spyEvent;
        const btnMenu=document.getElementById('btnMenu');

        /* A test that ensures the menu element is
         * hidden by default.
         */

         it('the menu is hidden by default', function(){
           //jQuery
           // expect($('body').hasClass('menu-hidden')).toBeTruthy();
           //jasmine
           expect(document.body).toHaveClass('menu-hidden');
         });

         /* A  test that ensures the menu changes
          * visibility when the menu icon is clicked.
          */

          //$('menu-icon-link').click();
          it('the menu is visibile when is clicked on', function() {
            const spyEvent = spyOn(btnMenu, 'click');

            //click once on a link
            // i dont know why jasmine require full def. from DOM document not jQuery and its only method i associated with spyOn not with addEventListener??
            $('a#btnMenu').click();
            btnMenu.click();
            //expect(spyEvent).toHaveBeenCalledWith(btnMenu);
            expect(spyEvent).toHaveBeenCalled();
            expect(document.body).not.toHaveClass('menu-hidden');

            //click again on a link
            $('a#btnMenu').click();
            btnMenu.click();
            //expect(spyEvent).toHaveBeenCalledWith('#btnMenu');
            expect(spyEvent).toHaveBeenCalled();
            expect(document.body).toHaveClass('menu-hidden');

          });
    });

    /* A test suite named "Initial Entries" */

        /* A test that ensures when the loadFeed works and
         * there is at least a single .entry element within the .feed container.
         */

    describe('Initial Entries', function(){
         beforeEach(function(done){
           loadFeed(0, function() {
             //init();
             done();
           });
         });

         it('load at least one feed is loaded', function(done){
           //expect(loadFeed).toBe(true);
           expect($('.feed .entry')).not.toBeNull();
           expect($('.feed .entry').length).toBeGreaterThan(0);
           done();
         });
       });

    /* A test suite named "New Feed Selection" */

        /* A test that ensures when a new feed is loaded
         *  the content actually changes.
         */

     describe('New Feed Selection', function(){
       let firtLoad, secondLoad;

          beforeEach(function(done){
            loadFeed(0, function() {
              //init();
              firstLoad = $('.feed').html();
              loadFeed(1, function() {
                done();
              });
            });
          });

          it('a new feed is loaded and the content changes', function(done) {

            expect(firstLoad).toBeDefined();
            expect(secondLoad).not.toBeDefined();
            secondLoad = $('.feed').html();
            expect(secondLoad).toBeDefined();
            expect(firstLoad).not.toBe(secondLoad);
            done();
          });
    });
}());
