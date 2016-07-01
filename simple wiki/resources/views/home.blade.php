@extends('app')
@section('contentPane')
<div class="container-fluid">
	<div class="col-md-12">
		<h1>SimpleWiki
			<span class="pull-right">
				<a class="btn btn-success btn-xs" href="{!! url('wiki/create') !!}"><i class="glyphicon glyphicon-plus"></i></a>
			</span>
		</h1>
		<hr>
		Welcome to this very simple wiki! Here's a list of all our main pages or categories.
		<hr>
		<ul>
			@foreach($pages as $page)
			<li><a href="{!! url('wiki/'.$page->id) !!}">{{ $page->title }}</a></li>
			@endforeach
		</ul>
	</div>
</div>
<div class="container-fluid footer">
	<div class="col-sm-3 col-md-2"></div>
	<div class="pull-right">Created by Chris Thomas for CSCI 215.</div>
</div>
@endsection