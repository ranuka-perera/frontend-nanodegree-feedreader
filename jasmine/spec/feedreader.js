/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

// Setting the timeout to be higher for people with bad connections.
jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

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

        it('contains urls', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });


        it('has names', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });

    describe('The menu', function() {

        it('is hidden by default', function () {
            expect($('body')).toHaveClass('menu-hidden');
        });

        it('shows and hides when it is clicked', function () {
            $burger = $('.menu-icon-link');
            $burger.click();
            expect($('body')).not.toHaveClass('menu-hidden');
            $burger.click();
            expect($('body')).toHaveClass('menu-hidden');
        });
    });

    describe('Initial Entries', function () {

        beforeEach(function (done) {
            // Although init() calls loadFeed(0) before the test's loadFeed() is done, the test's loadFeed() returns
            // first.
            loadFeed(0, done);
        });

        it('gets populated', function (done) {
            // Check that the number of entries populated are greater than 0.
            var feedL = $('.feed .entry').length;
            expect(feedL).toBeGreaterThan(0);
            done();
        })

    });

    describe('New Feed Selection', function () {
        var contentHtml;

        beforeEach(function (done) {
            // Load feed 0, then save content, then load feed 1 before proceeding to test case.
            loadFeed(0, function () {
                contentHtml = $('.feed').html();
                loadFeed(1, done);
            });
        });

        afterAll(function () {
            // Load feed(0) in end because we commented out the init.
            loadFeed(0);
        });

        it('loads content', function (done) {
            expect($('.feed').html()).not.toContainHtml(contentHtml);
            done();
        });

    });


}());
