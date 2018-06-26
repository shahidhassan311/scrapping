jQuery(document).ready(function($) {
	var form = $('#booking-form');
    $(form)
        .bootstrapValidator()
        .on('success.form.bv', function(e) {
            // Prevent form submission
            e.preventDefault();

            // Get the form instance
            var $form = $(e.target);

            // Get the BootstrapValidator instance
            var bv = $form.data('bootstrapValidator');

           // $("#bfs").remove();
            $("#bf-msg").html('<div class="gg-ajax-loader">Loading...</div>');
           
			$.ajax({
				type: 'POST',
				url: ajax_object_bf.ajax_url,
				data: form.serialize(),
				dataType: 'json',
				success: function(response) {
					if (response.status == 'success') {
						form[0].reset();
					}
					$("#bf-msg .gg-ajax-loader").remove();
					$('#bf-msg').html(response.errmessage);

				}

			});

        });

        $('#checkin')
		    .on('changeDate show', function(e) {
		        // Revalidate the date when user change it
		        form.bootstrapValidator('revalidateField', 'checkin');
		});

		$('#checkout')
		    .on('changeDate show', function(e) {
		        // Revalidate the date when user change it
		        form.bootstrapValidator('revalidateField', 'checkout');
		});
});