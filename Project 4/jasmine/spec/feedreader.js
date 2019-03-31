/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

         it('each feed has a URL defined and is not empty', function(){
           allFeeds.forEach(function(el, index) {
            expect(allFeeds[index].url).not.toEqual('');
             expect(allFeeds[index].url).not.toBeUndefined();
             expect(allFeeds[index].url).not.toBeNull();
             console.log(allFeeds[index].url);
           });

         });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

         it('each feed has a name defined and is not empty', function(){
           allFeeds.forEach(function(el, index) {
            expect(allFeeds[index].name).not.toEqual('');
             expect(allFeeds[index].name).not.toBeUndefined();
             expect(allFeeds[index].name).not.toBeNull();
             console.log(allFeeds[index].name);

           });

         });
    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        //let spyEvent;
        const btnMenu=document.getElementById('btnMenu');

        // beforeEach(function(){
        //   spyEvent = spyOn(btnMenu, 'click');
        // });
        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */

         it('the menu is hidden by default', function(){
           //jQuery
           // expect($('body').hasClass('menu-hidden')).toBeTruthy();
           //jasmine
           expect(document.body).toHaveClass('menu-hidden');
         });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
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

    /* TODO: Write a new test suite named "Initial Entries" */

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
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
           expect($('.feed')).not.toBeNull();
           expect($('.feed').length).toBeGreaterThan(0);
           done();
         });
       });

    /* TODO: Write a new test suite named "New Feed Selection" */

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
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
