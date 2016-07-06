/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

$(function() {
	// Test suite for RSS feeds definitions and
	// the allFeeds variable in our application.
	describe('RSS Feeds', function() {

		// Ensure that the allFeeds variable has been defined
		// and that it is not empty.
		it('are defined', function() {
			expect(allFeeds).toBeDefined();
			expect(allFeeds.length).not.toBe(0);
		});

		// Ensure that each feed in allFeeds has a defined,
		// nonempty URL.
		it('have defined URLs', function() {
			allFeeds.forEach(function(feed) {
				expect(feed.url).toBeDefined();
				expect(feed.url.length).not.toBe(0);
			});
		});

		// Ensure that each feed in allFeeds has a defined,
		// nonempty name.
		it('have defined names', function() {
			allFeeds.forEach(function(feed) {
				expect(feed.name).toBeDefined();
				expect(feed.name.length).not.toBe(0);
			});
		 });
	});

	// Test suite for the sliding side menu
	describe('The menu', function() {

		var body = $('body');
		var menuIcon = $('.menu-icon-link');

		// Ensure that menu is hidden by default on page load
		it('should be hidden by default', function() {
			expect(body.attr('class')).toContain('menu-hidden');
		});

		// Ensure that clicking will alternately show and hide menu
		it('should toggle visibility when menu icon is clicked', function() {
			menuIcon.trigger('click');
			expect(body.attr('class')).not.toContain('menu-hidden');

			menuIcon.trigger('click');
			expect(body.attr('class')).toContain('menu-hidden');
		});
	});

	// Test suite for entry element DOM insertion
	describe('Initial Entries', function() {
		var feedContainer = $('.feed');

		// Function ensures async api function completes before test
		// is run
		beforeEach(function(done) {
			loadFeed(0, done);
		});

		// Runs when loadFeed has completed
		// Ensures there is at least one .entry element within
		// the .feed container
		it('should have at least one entry', function(done) {
			var entries = feedContainer.find('.entry');
			expect(entries.length).not.toBe(0);
			done();
		});
	});

	// Test suite for loading of new feeds
	describe('New Feed Selection', function() {
		var originalContent,
			newContent;

		// Function ensures async api function loads first feed
		// before testing of new feed; also stores selected
		// content of first feed for comparison
		beforeEach(function(done) {
			loadFeed(0, function() {
				originalContent = $('.entry')[0].innerText;
				done();
			});
		});

		// Runs when first feed has finished loading
		// Ensures new feed load causes content to change
		it('should cause new feed content to load', function(done) {
			loadFeed(1, function() {
				newContent = $('.entry')[0].innerText;
				expect(newContent).not.toEqual(originalContent);
				done();
			});
		});
	});
}());
