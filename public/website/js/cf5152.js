jQuery(document).ready(function($) {
	var form = $('#contact-form');
    $(form)
        .bootstrapValidator()
        .on('success.form.bv', function(e) {
            // Prevent form submission
            e.preventDefault();

            // Get the form instance
            var $form = $(e.target);

            // Get the BootstrapValidator instance
            var bv = $form.data('bootstrapValidator');

            $("#cf-msg").html('<div class="gg-ajax-loader">Loading...</div>');
			$.ajax({
				type: 'POST',
				url: ajax_object_cf.ajax_url,
				data: $('#contact-form').serialize(),
				dataType: 'json',
				success: function(response) {
					if (response.status == 'success') {
						$('#contact-form')[0].reset();
					}
					$("#cf-msg .gg-ajax-loader").remove();
					$('#cf-msg').html(response.errmessage);

				}

			});

        });
});