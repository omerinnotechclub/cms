@extends('app')
@section('styles')
	<style>
		.modal-backdrop .in{
			opacity: 0 !important;
		}
	</style>
	<link href="{!! url('libs/summernote/summernote.css') !!}" type="text/css" rel="stylesheet" />
	<style type = "text/css">
		.note-editor{position:relative;border:0 !important;}
	</style>
@endsection
@section('contentPane')
<div class="container-fluid">
	<div class="col-md-12">
		<h1>Create a Page</h1>
		@if (count($errors) > 0)
			<div class="alert alert-danger">
				<ul>
					@foreach ($errors->all() as $error)
						<li>{{ $error }}</li>
					@endforeach
				</ul>
			</div>
		@endif
		<hr>
		<form class="form-horizontal" action="{!! url('wiki') !!}" method="post">
			{{ csrf_field() }}
			<input type="hidden" name="_method" value="post">
			<input type="text" class="form-control" name="title" id="title" placeholder="An Awesome Title">
			<div id="editor" class="col-md-12">

				<textarea v-model="input" debounce="300" name="raw" style="display: none !important;" id="inputText"></textarea>
				<div class="col-md-5"><textarea id="summernote"></textarea></div>
				<div class="col-md-2"></div>
				<div class="col-md-5"><div v-html="input | marked"></div></div>
			</div>
			<div class="col-md-12"><button type="submit" class="btn btn-success">Save</button></div>


		</form>
	</div>
	<div class="col-md-12">
	</div>
</div>
<div class="container-fluid footer">
	<div class="col-sm-3 col-md-2"></div>
	You can categorize this to a page using this syntax[[PageName]]
</div>
@endsection

@section('scripts')
	<script src="{!! url('marked.min.js') !!}"></script>
	<script src="{!! url('vue.js') !!}"></script>

	<script type="text/javascript">
		new Vue({
			el: '#editor',
			data: {
				input: '# My New Page\n\nIt is easy to write:\n\n* And can even do bullets!'
			},
			filters: {
				marked: marked
			}
		})
	</script>
	<script src="{!! url('libs/summernote/summernote.js') !!}"></script>
	<script>
		$(document).ready(function() {
			$('#summernote').summernote({
				height: 100,                 // set editor height
				minHeight: 50,             // set minimum height of editor
				maxHeight: null,             // set maximum height of editor
				focus: true,                  // set focus to editable area after initializing summernote
				padding: 20,
				border: 0,
				placeholder: 'write here...',

			});
			// same as above
			$("#summernote").on("summernote.change", function (e) {   // callback as jquery custom event
				console.log('it is changed');
				var input = $("#inputText");
				input.val($('#summernote').summernote('code'));
				input.trigger("change");
			});
			$('#summernote').summernote('code', $("#inputText").val());
			console.log($("#inputText").val());
		});

	</script>
@endsection