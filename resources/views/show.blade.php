@extends('app')
@section('contentPane')
<div class="container-fluid">
	<div class="col-md-12">
		<h1>{{ isset($page->title) ? $page->title : 'This page doesn\'t exist!' }}
			@if(isset($page->id))
				<span class="pull-right">
					<a class="btn btn-success btn-xs" href="{!! url('wiki/create') !!}"><i class="glyphicon glyphicon-plus"></i></a>
					<a class="btn btn-danger btn-xs" href="{!!  url('/wiki/'. $page->id .'/delete') !!}"><i class="glyphicon glyphicon-remove"></i></a>
					<a class="btn btn-warning btn-xs" href="{!! url('/wiki/'. $page->id .'/refresh') !!}"><i class="glyphicon glyphicon-refresh"></i></a>
					<a class="btn btn-primary btn-xs" href="{!! url('/wiki/'. $page->id .'/edit') !!}"><i class="glyphicon glyphicon-edit"></i> Edit</a>
				</span>
			@endif
		</h1>
		<hr>
		@if(isset($page->parsed))
			{!! $page->parsed !!}
		@else
			<p>Sorry, this page doesn't exist. You can create it though.</p>
			<a href="/wiki/create" class="btn btn-success">Create Page</a>
		@endif
		@if(isset($page->id) && $page->children()->count() > 0)
			<hr>
			Pages and categories in this category:
			<ul>
			@foreach($page->children()->get() as $child)
				<li><a href="/wiki/{{ $child->id }}">{{ $child->title }}</a></li>
			@endforeach
			</ul>
		@endif
		<div style="height:50px;"></div>
	</div>
</div>
<div class="container-fluid footer">
	<div class="col-sm-3 col-md-2"></div>
	Categories:
	@if(isset($page->id) && $page->parents()->get()->count() > 0)
		@foreach($page->parents()->get() as $parent)
			<a href="/wiki/{{ $parent->id }}">{{ $parent->title }}</a>
		@endforeach
	@else
		None
	@endif
	<div class="pull-right">Created by Chris Thomas for CSCI 215.</div>
</div>
@endsection
