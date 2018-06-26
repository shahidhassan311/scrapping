jQuery(document).ready(function($) {

	jQuery('#mainproperty').change(function(){

		var propertyid = jQuery('#mainproperty').val();
		
		$("#gg-ajax-rooms").empty();
		
		jQuery.ajax({
		type:"POST",
		url: ajax_object_property.ajax_url,
		data:'action=property_rooms&main_propertyid=' + propertyid,
		success:function(results){
		    jQuery("#gg-ajax-rooms").append(results);
		}
		});

	}).change();

})