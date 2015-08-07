
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
	  					'<div style="margin-bottom: 15px; display: inline-block " class="erase">',
	  						'<ul>',
	  							'<p>',
	  								'<dt>'+ items[i].name + '</dt><br>',
	  								'<img src="' + items[i].images[0].url+ '" height="200px">',
	  							'</p>',
	  							'<p><button type="button" num="'+ items[i].id +'" class="button-album" data-toggle="modal" data-target="#myModal">Albums</button></p>',
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



  				function showAlbum(event)
				{		
					event.preventDefault();
					var idartist = $(this).attr('num');
					var request = $.get('https://api.spotify.com/v1/artists/'+idartist+'/albums');

					function albumsWorking(albums)
					{

						if ($('.modal-body').hasClass('full'))
  						{
  							$('.album-erase').remove();
						}else{
  							$('.modal-body').addClass('full');};

						var items = albums.items;
						var i = 0;
						for (var i = 0; i < items.length-1; i++)
  						{
	  					 	if (items[i].images[0] != undefined) 
	  				 	{
		  				 	var htmlalbum = 
		  					[
		  							'<div style="display: inline-block ;margin: 12px" class="album-erase">',
		  								'<dt>'+ items[i].name + '</dt><br>',
		  								'<img src="' + items[i].images[0].url+ '" height="200px">',
		  								'<button type="button" thelistid="' + items[i].id + '" class="button-playlist">Playlist</button>',
		  							'</div>'	
		  		
		  					].join('\n');

		  					$('.modal-body').append(htmlalbum);
	  					}
	  				 };
					}

					function albumsNotWorking (err1, err2, err3) 
		  			{
		    			console.error('OH NO!!', err1, err2, err3);
		  			}

					request.done(albumsWorking);
		  			request.fail(albumsNotWorking);
				}

		$(document).on('click','.button-album', showAlbum);

		function showPlaylist(event)
				{		
					event.preventDefault();
					var thelistid = $(this).attr('thelistid');
					var request = $.get('https://api.spotify.com/v1/albums/' + thelistid + '/tracks');

					function playlistWorking(songs)
					{
						
  						$('.album-erase').remove();
						
  						$('.modal-body').addClass('full-list')

						

						var items = songs.items;
						var i = 0;
						for (var i = 0; i < items.length-1; i++)
  						{
  							console.log(items[i].name)
  							
  							
		  				 	var htmlplaylist = 
		  					[
		  					
		  							'<div style="display: inline-block ;margin: 12px" class="playlist-erase">',
		  								'<dt>'+ items[i].name + '</dt><br>',
		  							'</div>'	
		  		
		  					].join('\n');

		  					$('.modal-body').append(htmlplaylist);
		  					
		  				 }
					}

					function playlistNotWorking (err1, err2, err3) 
		  			{
		    			console.error('OH NO!!', err1, err2, err3);
		  			}

					request.done(playlistWorking);
		  			request.fail(playlistNotWorking);
				}

		$('.modal-body').on('click','.button-playlist', showPlaylist)








