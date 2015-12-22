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
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });
        /*
         * This test makes sure that the loaded articles have urls.
         */
        it('contains urls', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        /*
         * This test makes sure that th allFeeds variable contain names.
         */
        it('has names', function () {
            allFeeds.forEach(function (feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });

    /*
     * This test suit checks that the menu functionality works as expected.
     */
    describe('The menu', function() {

        /*
         * This testcase checks that the menu is hidden when the application is first loaded.
         */
        it('is hidden by default', function () {
            expect($('body')).toHaveClass('menu-hidden');
        });

        /*
         * This testcase asserts that the menu show/hide functionality works when the hamburger menu button is pressed.
         */
        it('shows and hides when it is clicked', function () {
            $burger = $('.menu-icon-link');
            $burger.click();
            expect($('body')).not.toHaveClass('menu-hidden');
            $burger.click();
            expect($('body')).toHaveClass('menu-hidden');
        });
    });

    /*
     * This test suit checks that the loaded feed gets displayed in the UI.
     */
    describe('Initial Entries', function () {

        beforeEach(function (done) {
            // The init() function's loadFeed(0) call has been disabled because of conflicting states with this and the
            // next test suit.
            loadFeed(0, done);
        });

        /*
         * Check that the content is appended to the feed class in the UI.
         */
        it('gets populated', function (done) {
            // Check that the number of entries populated are greater than 0.
            var feedL = $('.feed .entry').length;
            expect(feedL).toBeGreaterThan(0);
            done();
        });

    });

    /*
     * This suit Checks that new item is loaded when selected.
     */
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

        /*
         * This test case checks that clicking an item on the menu loads new content.
         */
        it('loads content', function (done) {
            expect($('.feed').html()).not.toEqual(contentHtml);
            done();
        });

    });


}());
