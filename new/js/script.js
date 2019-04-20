$(function() {

		var jsScriptsLoad = new Array;
		function dhtmlLoadScript(url)
		{
		   if(jsScriptsLoad.join().search(url) == -1){
		      jsScriptsLoad[jsScriptsLoad.length] = url;
		      var e = document.createElement("script");
		      e.src = url;
		      e.type="text/javascript";
		      document.getElementsByTagName("head")[0].appendChild(e);
		   }
		}


		var city_name = false;
		var city_url = false;

		var handshake = 0;

		$('.all-my-services-title').hover(function(){

			if (handshake == 0){

				handshake = 1;

				var a = $('#handshake');

				a.css('background-position-y','1px');

				setTimeout(function (){a.css('background-position-y','0px');}, 150);
				setTimeout(function (){a.css('background-position-y','1px');}, 300);
				setTimeout(function (){a.css('background-position-y','0px');}, 450);
				setTimeout(function (){a.css('background-position-y','1px');}, 600);
				setTimeout(function (){a.css('background-position-y','0px');}, 750);
			}
		});
		$(".consolelog").css ('height','100px');
		$(".consolelog").css ('overflow','scroll');
		$(".consolelog").css ('overflow','scroll');

		$(".consolelog").css ('background-color','white');
		$(".consolelog").css ('padding','10px');

		var myconlog = 0;

		if ($('.consolelog').length > 0) myconlog = 1;

		function my_console_log (v){

			if (myconlog == 0) return false;

			console.log (v);

			$(".consolelog").prepend ('-'+v+'<br>');
		}







		function get_time_now (){

			return new Date().getTime();

		}


		//var call_show_rate = 0;

		var start_call_time = 0;
		var phone_click = 0;

		$(window).click(function() {

			my_console_log('page click..');

			phone_click = 0;


		});

		var phone_data;

		$("body").on('mousedown','.showphone1 a',function(){

			phone_data = $(this).parent();

		    setTimeout(function() {

				my_console_log('click phone..');

				start_call_time = get_time_now ();
				resize_count = 0;
				phone_click = 1;

		    }, 1);


		});

		var resize_count = 0;
		var calldur = 0;
		var startinnerHeight = 0;

		$(window).resize(function() {

			if (phone_click == 0) return false;

			resize_count ++;


			my_console_log('page resize..'+resize_count+'..'+window.innerWidth+'x'+window.innerHeight);



			if (resize_count == 2) {

				my_console_log('call dur = '+ ((get_time_now() - calldur)/1000));


				var id = phone_data.data('id');
				var h = phone_data.data('h');
				var calld = get_time_now() - calldur;

				$.post( "/?do=callstat", { id: id, h: h, innerWidth: startinnerHeight, innerHeight: window.innerHeight, calld: calld });

			}


			if (resize_count == 1) {


				my_console_log ('..'+ (start_call_time - get_time_now()));

				calldur = get_time_now();
				startinnerHeight = window.innerHeight;

			}
			else call_show_rate = 0;



		});







		function scrollToElement(theElement) {
		if (typeof theElement === "string") theElement = document.getElementById(theElement);

		    var selectedPosX = 0;
		    var selectedPosY = 0;

		    while (theElement != null) {
		        selectedPosX += theElement.offsetLeft;
		        selectedPosY += theElement.offsetTop;
		        theElement = theElement.offsetParent;
		    }

		    window.scrollTo(selectedPosX, selectedPosY - 10);
		}


		//$('.bar').animate( { width:"50%"}, 150);

		$(window).on('load',function () {
				//$('.bar').animate( { width:"100%"}, 300, function() {	$('.bar').css ('width','0px');	} );
		});

		var showratedo = 0;

		var close_post = function (){

			if (showratedo == 1) {

				showratedo = 0;

				show_ratecall();

			}

			$( ".onpil" ).hide ();
			$( "#posts-items" ).show ();
			$( "#one-post-item" ).hide ();



			post_is_open = 0;

			window.history.pushState('', '', '#back');

			window.scroll(0,cur_scroll);

			console.log (cur_scroll);

		}

		$( ".onpil" ).hide ();
		$( "#one-post-item" ).hide ();

		$("body").on('click','.one-post-item-back',function(){


			close_post ();

			//


		});


		window.addEventListener('popstate', function(e) {


		    if (post_is_open == 1) close_post ();

		});




		var cur_scroll = 0;
		var post_is_open = 0;



		$(".similarblock").hide ();

		var show_similar = function (data){

			$.post( "/?do=posts&a=similar", data ).done(function( data1 ) {

			  	$(".similarblock").html (data1);
			  	$(".similarblock").show ();


			});


		}

		var show_mainimg_img = function (this1) {

			var src = this1.attr('src');

			src = src.replace("thumbnail", "medium");

			$("#mainimg img").attr ('src',src);

			$('.miniimg').css('border-color','');

			this1.css('border-color','red');

			//return false;
		}

		$("body").on('click','.miniimg',function(){

			show_mainimg_img ($(this));

		});

		$("body").on('mouseover','.miniimg',function(){
			//var id = $(this).data('id');

			show_mainimg_img ($(this));

		});

		$("body").on('click','.doclose',function(){

			var id = $(this).data('id');
			var h = $(this).data('h');



			if (confirm('Ð â€™Ð¡â€¹ Ð¡Ñ“Ð Ð†Ð ÂµÐ¡Ð‚Ð ÂµÐ Ð…Ð¡â€¹ Ð¡â€¡Ð¡â€šÐ Ñ• Ð¡â€¦Ð Ñ•Ð¡â€šÐ Ñ‘Ð¡â€šÐ Âµ Ð¡ÐƒÐ Ð…Ð¡ÐÐ¡â€šÐ¡ÐŠ Ð Ñ•Ð Â±Ð¡Ð‰Ð¡ÐÐ Ð†Ð Â»Ð ÂµÐ Ð…Ð Ñ‘Ð Âµ Ð¡Ðƒ Ð Ñ—Ð¡Ñ“Ð Â±Ð Â»Ð Ñ‘Ð Ñ”Ð Â°Ð¡â€ Ð Ñ‘Ð Ñ‘?')){

				$(".doclose"+id).hide();

				$.get( "/?do=posts&a=doclose&id="+id+"&h="+h, function( data ) {

					my_console_log (data);

					if (data == 'ok') {
						$(".doclose"+id).hide();
						$(".doopen"+id).show();


						my_console_log (data);
					}
					else $(".doclose"+id).show();
				});
			}

			return false;

		});


		$("body").on('click','.doopen',function(){

			var id = $(this).data('id');
			var h = $(this).data('h');



			if (confirm('Ð â€™Ð¡â€¹ Ð¡Ñ“Ð Ð†Ð ÂµÐ¡Ð‚Ð ÂµÐ Ð…Ð¡â€¹ Ð¡â€¡Ð¡â€šÐ Ñ• Ð¡â€¦Ð Ñ•Ð¡â€šÐ Ñ‘Ð¡â€šÐ Âµ Ð Ñ•Ð Ñ—Ð¡Ñ“Ð Â±Ð Â»Ð Ñ‘Ð Ñ”Ð Ñ•Ð Ð†Ð Â°Ð¡â€šÐ¡ÐŠ Ð Ñ•Ð Â±Ð¡Ð‰Ð¡ÐÐ Ð†Ð Â»Ð ÂµÐ Ð…Ð Ñ‘Ð Âµ?')){

				$(".doopen"+id).hide();

				$.get( "/?do=posts&a=doclose&b=open&id="+id+"&h="+h, function( data ) {

					my_console_log (data);

					if (data == 'ok') {
						$(".doopen"+id).hide();
						$(".doclose"+id).show();
						$(".close1"+id).hide();
						my_console_log (data);
					}
					else $(".doopen"+id).show();
				});
			}

			return false;

		});

		$("body").on('click','.approve',function(){

			var id = $(this).data('id');
			var h = $(this).data('h');



			if (confirm('Ð â€™Ð¡â€¹ Ð¡Ñ“Ð Ð†Ð ÂµÐ¡Ð‚Ð ÂµÐ Ð…Ð¡â€¹ Ð¡â€¡Ð¡â€šÐ Ñ• Ð¡â€¦Ð Ñ•Ð¡â€šÐ Ñ‘Ð¡â€šÐ Âµ Ð Ñ•Ð Ñ—Ð¡Ñ“Ð Â±Ð Â»Ð Ñ‘Ð Ñ”Ð Ñ•Ð Ð†Ð Â°Ð¡â€šÐ¡ÐŠ Ð Ñ•Ð Â±Ð¡Ð‰Ð¡ÐÐ Ð†Ð Â»Ð ÂµÐ Ð…Ð Ñ‘Ð Âµ?')){

				$(".approve"+id).hide();

				$.get( "/?do=posts&a=approve&b=open&id="+id+"&h="+h, function( data ) {

					my_console_log (data);

					if (data == 'ok') {
						$(".approve"+id).hide();
						$(".approve0"+id).hide();
						$(".approveto0"+id).show();
						my_console_log (data);
					}
					else $(".approve"+id).show();
				});
			}

			return false;

		});

		$("body").on('click','.approveto0',function(){

			var id = $(this).data('id');
			var h = $(this).data('h');



			if (confirm('Ð â€™Ð¡â€¹ Ð¡Ñ“Ð Ð†Ð ÂµÐ¡Ð‚Ð ÂµÐ Ð…Ð¡â€¹ Ð¡â€¡Ð¡â€šÐ Ñ• Ð¡â€¦Ð Ñ•Ð¡â€šÐ Ñ‘Ð¡â€šÐ Âµ Ð Â·Ð Â°Ð Â±Ð Â»Ð Ñ•Ð Ñ”Ð Ñ‘Ð¡Ð‚Ð Ñ•Ð Ð†Ð Â°Ð¡â€šÐ¡ÐŠ Ð Ñ•Ð Â±Ð¡Ð‰Ð¡ÐÐ Ð†Ð Â»Ð ÂµÐ Ð…Ð Ñ‘Ð Âµ?')){

				$(".approveto0"+id).hide();

				$.get( "/?do=posts&a=approve&b=close&id="+id+"&h="+h, function( data ) {

					my_console_log (data);

					if (data == 'ok') {
						$(".approveto0"+id).hide();
						$(".approve"+id).show();
						my_console_log (data);
					}
					else $(".approveto0"+id).show();
				});
			}

			return false;

		});






		$("body").on('click','.delpost',function(){
			if(confirm('Ð’Ñ‹ Ð´ÐµÐ¹ÑÑ‚Ð²Ð¸Ñ‚ÐµÐ»ÑŒÐ½Ð¾ Ñ…Ð¾Ñ‚Ð¸Ñ‚Ðµ ÑƒÐ´Ð°Ð»Ð¸Ñ‚ÑŒ Ð¾Ð±ÑŠÑÐ²Ð»ÐµÐ½Ð¸Ðµ ?')){
				return true;
			}
			return false;

		});











		$("body").on('click','.blockuser',function(){

			var id = $(this).data('id');
			var h = $(this).data('h');



			if (confirm('Ð â€™Ð¡â€¹ Ð¡Ñ“Ð Ð†Ð ÂµÐ¡Ð‚Ð ÂµÐ Ð…Ð¡â€¹ Ð¡â€¡Ð¡â€šÐ Ñ• Ð¡â€¦Ð Ñ•Ð¡â€šÐ Ñ‘Ð¡â€šÐ Âµ Ð Â·Ð Â°Ð Â±Ð Â»Ð Ñ•Ð Ñ”Ð Ñ‘Ð¡Ð‚Ð Ñ•Ð Ð†Ð Â°Ð¡â€šÐ¡ÐŠ Ð ÑŸÐ Ñ•Ð Â»Ð¡ÐŠÐ Â·Ð Ñ•Ð Ð†Ð Â°Ð¡â€šÐ ÂµÐ Â»Ð¡Ð Ð Ñ‘ Ð ÐˆÐ Ò‘Ð Â°Ð Â»Ð Ñ‘Ð¡â€šÐ¡ÐŠ Ð Ñ•Ð Â±Ð¡Ð‰Ð¡ÐÐ Ð†Ð Â»Ð ÂµÐ Ð…Ð Ñ‘Ð¡Ð?')){


				$.get( "/?do=posts&a=blockuser&id="+id+"&h="+h, function( data ) {

					my_console_log (data);


				});
			}

			return false;

		});








		$("body").on('click','.up_date',function(){

			var id = $(this).data('id');
			var h = $(this).data('h');


			$(".up_date"+id).hide();

			$.get( "/?do=posts&a=up_date&b=up_date&id="+id+"&h="+h, function( data ) {

				my_console_log (data);

				if (data == 'ok') {
					$(".up_date_info"+id).hide();
					my_console_log (data);
				}
				else $(".up_date"+id).show();
			});


			return false;

		});




		var add_post_Iagree = getCookie('add_post_Iagree');

		if (add_post_Iagree == undefined) $("#addform").addClass("disabledbutton");
		else $('#Iagree').hide();

		$("body").on('click','#Iagree',function(){

			$('#Iagree').hide();

			$( "#addform" ).removeClass( "disabledbutton" )

			document.cookie = "add_post_Iagree=1";

			return false;

		});

		$("body").on('click','#go2order_alert',function(){

			var text =  ('Ð â€Ð Â»Ð¡Ð Ð Ñ—Ð¡Ð‚Ð Ñ•Ð¡ÐƒÐ Ñ˜Ð Ñ•Ð¡â€šÐ¡Ð‚Ð Â° Ð Â·Ð Â°Ð Ñ”Ð Â°Ð Â·Ð Ñ•Ð Ð† Ð¡Ñ“Ð¡ÐƒÐ Â»Ð¡Ñ“Ð Ñ– Ð Ð…Ð¡Ñ“Ð Â¶Ð Ð…Ð Â° Ð¡Ð‚Ð ÂµÐ Ñ–Ð Ñ‘Ð¡ÐƒÐ¡â€šÐ¡Ð‚Ð Â°Ð¡â€ Ð Ñ‘Ð¡Ð. Ð ÑŸÐ Ñ•Ð Â¶Ð Â°Ð Â»Ð¡Ñ“Ð â„–Ð¡ÐƒÐ¡â€šÐ Â°, Ð Ð†Ð Ñ•Ð â„–Ð Ò‘Ð Ñ‘Ð¡â€šÐ Âµ Ð Ñ‘Ð Â»Ð Ñ‘ Ð Â·Ð Â°Ð¡Ð‚Ð ÂµÐ Ñ–Ð Ñ‘Ð¡ÐƒÐ¡â€šÐ¡Ð‚Ð Ñ‘Ð¡Ð‚Ð¡Ñ“Ð â„–Ð¡â€šÐ ÂµÐ¡ÐƒÐ¡ÐŠ.');

			if (confirm(text)) {

				document.location = '/?do=users&a=login&from=go2order_alert';

			}

			return false;

		});



		$("body").on('click','.ratecall-radio',function(){

			$('.btn-ratecall-sumbit').removeClass("btn-default");
			$('.btn-ratecall-sumbit').addClass("btn-primary");

			$('.btn-ratecall-sumbit').prop("disabled", false);

		});

		$("body").on('click','.btn-ratecall-sumbit',function(){

			$('.btn-ratecall-sumbit').prop("disabled", true);

			var form = $(this).parent( "form" );

			$.post( "/?do=ratecall", $(form).serialize() ).done(function( data ) {

				$( ".mainpage" ).show ();
				$( ".reqblock" ).hide ();

				window.onbeforeunload = false;

				scrollToElement('one-post-item-back-link');

			});


			return false;

		});

		var show_ratecall = function (){



			$( ".mainpage" ).hide ();
			$( ".reqblock" ).show ();
			$( ".reqblock" ).html ('load..');

			$.post( "/?do=ratecall").done(function( data ) {

				$( ".reqblock" ).html (data);

			});

			scrollToElement ('ratecall_h1');

		}

		var clickontel = false;

		$("body").on('mousedown','.showphone1 a',function(){

			clickontel = true;

		});






		if ( $(window).width() >= 768 ){

			$('.sitebar').css ('position','relative');

			$( window ).scroll(function() {

				var top = $(window).scrollTop();

				if ($('.blog-main').height () - $('.sitebar').height () > top) $('.sitebar').css ('top',top);

			});

		}

		$("#phone").mask("+7 (999) 999-9999");

		$("#phone2").mask("+7 (999) 999-99-99");



	});

function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
