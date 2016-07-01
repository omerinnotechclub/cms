<!DOCTYPE html>
<html>
	<head>
		<title>SimpleWiki</title>
		<link rel="stylesheet" type="text/css" href="{!! url(('animate.css')) !!}">
		<link rel="stylesheet" type="text/css" href="{!! url('css/app.css') !!}">
		<style>
			.pace {
				-webkit-pointer-events: none;
				pointer-events: none;

				-webkit-user-select: none;
				-moz-user-select: none;
				user-select: none;

				position: fixed;
				top: 0;
				left: 0;
				width: 100%;

				-webkit-transform: translate3d(0, -50px, 0);
				-ms-transform: translate3d(0, -50px, 0);
				transform: translate3d(0, -50px, 0);

				-webkit-transition: -webkit-transform .5s ease-out;
				-ms-transition: -webkit-transform .5s ease-out;
				transition: transform .5s ease-out;
			}

			.pace.pace-active {
				-webkit-transform: translate3d(0, 0, 0);
				-ms-transform: translate3d(0, 0, 0);
				transform: translate3d(0, 0, 0);
			}

			.pace .pace-progress {
				display: block;
				position: fixed;
				z-index: 2000;
				top: 0;
				right: 100%;
				width: 100%;
				height: 5px;
				background: #28b62c;

				pointer-events: none;
			}

		</style>
		<script src="{!! url('pace.min.js') !!}"></script>
		<script src="{!! url('jquery-1.12.4.min.js') !!}"></script>
		<script src="{!! url('bootstrap.min.js') !!}"></script>
		@yield('styles')
	</head>
	<body>
		<div class="container-fluid fill full-page">
			<div class="col-sm-3 col-md-2 navigation-bar">
				<h3>SimpleWiki</h3>

				<nav>
					<ul class="nav nav-pills nav-stacked">
						<li>
							<a href="/">Home</a>
						</li>
						@foreach(\App\Page::orphaned() as $orphan)
						<li>
							<a href="{!! url('wiki/'.$orphan->id) !!}">{{ $orphan->title }}</a>
						</li>
						@endforeach
					</ul>
				</nav>
			</div>
			<div class="col-sm-9 col-md-10 fill content animated fadeIn">
				@include('flash::message')
				@yield('contentPane')
			</div>
		</div>
		@yield('scripts')
	</body>
</html>
