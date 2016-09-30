$('.back_to_top').hide();
	$(window).scroll(function(){
		if($(window).scrollTop()>$(window).height()){
			$('.back_to_top').fadeIn();	
		}else{
			$('.back_to_top').fadeOut();	
		}
	});	
	
	$('.back_to_top').click(function(){
		$('html,body').animate({scrollTop:0},600);
		return false;
	});