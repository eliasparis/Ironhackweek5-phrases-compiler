
		function getArtist(event) 
		{
			event.preventDefault();
  			var request = $.get("https://api.spotify.com/v1/search?type=artist&query=" + $('#search').val());

  			function handleArtists(artists) 
  			{
  				if ($('body').hasClass('full'))
  				{
  					$('.erase').remove();

  				}else{
  					$('body').addClass('full');};

  				var items = artists.artists.items

  				var i = 0
  				
  				for (var i = 0; i < items.length-1; i++)
  				{
	  				 if (items[i].images[0] != undefined) 
	  				 {
	  				 	var html = 
	  					[
	  					'<div style="margin-bottom: 15px" class="erase">',
	  						'<ul>',
	  							'<p>',
	  								'<dt>'+ items[i].name + '</dt><br>',
	  								'<img src="' + items[i].images[0].url+ '" height="200px">',
	  							'</p>',
	  						'</ul>',
	  					'</div>'
	  					].join('\n');

	  					$('.general').append(html);
	  				 };
  				};
				
  			}

  			function handleError (err1, err2, err3) 
  			{
    			console.error('OH NO!!', err1, err2, err3);
  			}

  			request.done(handleArtists);
  			request.fail(handleError);

		}

		$('.submitart').on('click', getArtist);