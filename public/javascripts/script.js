/**
 * Created by doru.muntean on 16/07/17.
 */

var endpoint = 'https://www.posta-romana.ro/cnpr-app/modules/track-and-trace/ajax/status2.php';

/**
 * This will retrieve the data from the provided endpoint
 * @param apiEndpoint
 * @param data
 * @returns {*}
 */
function getData (apiEndpoint, data) {

	// deferred object
	var deferred = $.Deferred();

	//send ajax to someone
	$.getJSON(apiEndpoint, data, function (data) {
		// alert('success');
		deferred.resolve(data);
		})
		.fail(function() {
			// alert( "error" );
			deferred.reject(data);
		})
		.always(function() {
			// alert( "always" );
		});

	return deferred.promise();
}

function loading (show) {

	var image = $("#loading");
	var info = $("#info");

	info.text('');

	if(show) {
		image.show();
	} else {
		image.hide();
	}
}

$(function () {

	$("#getAwb").on('click', function () {

		var awb = $("#awb");
		var info = $("#info");
		var input = $("#container");

		input.removeClass('has-error');

		info.text('');
		awb.popover('destroy');

		if(!awb.val()) {
			// alert("Please enter the awb!");
			input.addClass('has-error');
			awb.popover({ placement : 'top', content :  'Please insert an AWB value' }).popover('show');
		} else {
			loading(true);

			//get response and parse it
			getData(endpoint, { awb: awb.val(), lang: 'ro' })
				//add the results to the page
				.then(function (data) {
					loading(false);

					if(!data.found){
						info.text('No info about this package!')

					} else {
						info.html(data.summary);
					}
				})
				//handle error
				.fail(function (data) {
					loading(false);
					// alert("I am fail from deferred!");
					info.text('Could not retrieve the requested data.');
				});
		}
	});
});