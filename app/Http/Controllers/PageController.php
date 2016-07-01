<?php

namespace App\Http\Controllers;

use App\Page;
use DOMDocument;
use Illuminate\Http\Request;
use Intervention\Image\Facades\Image;

class PageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     *
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $this->validate($request, [
            'title' => 'required|unique:pages|max:255',
            'raw' => 'required',
        ]);
        $page = new Page();

        $message = $request->get('raw');
        $dom = new DomDocument();
        $dom->loadHtml( mb_convert_encoding($message, 'HTML-ENTITIES', "UTF-8"), LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);

        $images = $dom->getElementsByTagName('img');



        // foreach <img> in the submited message
        foreach($images as $img){
            $src = $img->getAttribute('src');

            // if the img source is 'data-url'
            if(preg_match('/data:image/', $src)){

                // get the mimetype
                preg_match('/data:image\/(?<mime>.*?)\;/', $src, $groups);
                $mimetype = $groups['mime'];

                // Generating a random filename
                $filename = uniqid();
                $filepath = "/images/$filename.$mimetype";

                // @see http://image.intervention.io/api/
                $image = Image::make($src)
                    // resize if required
                    /* ->resize(300, 200) */
                    ->encode($mimetype, 100) 	// encode file to the specified mimetype
                    ->save(public_path($filepath));

                $new_src = asset($filepath);
                $img->removeAttribute('src');
                $img->setAttribute('src', $new_src);
            } // <!--endif
        } // <!--endforeach

        $page->raw = $dom->saveHTML();

        $page->title = $request->input('title');
        $page->parse();
        $page->save();
        \Flash::success('Page created.');

        return redirect()->to('/wiki/'.$page->id);
    }

    /**
     * Display the specified resource.
     *
     * @param int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $page = Page::find($id);

        return view('show')->with('page', $page);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        $page = Page::findOrFail($id);

        return view('edit')->with('page', $page);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param int                      $id
     *
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $page = \App\Page::findOrFail($id);
        $this->validate($request, [
            'title' => 'required|max:255|unique:pages,title,'.$page->title.',title',
            'raw' => 'required',
        ]);
        $message = $request->get('raw');
        $dom = new DomDocument();
        $dom->loadHtml( mb_convert_encoding($message, 'HTML-ENTITIES', "UTF-8"), LIBXML_HTML_NOIMPLIED | LIBXML_HTML_NODEFDTD);

        $images = $dom->getElementsByTagName('img');



        // foreach <img> in the submited message
        foreach($images as $img){
            $src = $img->getAttribute('src');

            // if the img source is 'data-url'
            if(preg_match('/data:image/', $src)){

                // get the mimetype
                preg_match('/data:image\/(?<mime>.*?)\;/', $src, $groups);
                $mimetype = $groups['mime'];

                // Generating a random filename
                $filename = uniqid();
                $filepath = "/images/$filename.$mimetype";

                // @see http://image.intervention.io/api/
                $image = Image::make($src)
                    // resize if required
                    /* ->resize(300, 200) */
                    ->encode($mimetype, 100) 	// encode file to the specified mimetype
                    ->save(public_path($filepath));

                $new_src = asset($filepath);
                $img->removeAttribute('src');
                $img->setAttribute('src', $new_src);
            } // <!--endif
        } // <!--endforeach

        $page->raw = $dom->saveHTML();

        $page->title = $request->input('title');
        $page->parse();
        $page->save();
        \Flash::success('Page edited.');

        return redirect()->to('/wiki/'.$id);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     *
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $page = Page::findOrFail($id);
        $page->delete();
        \Flash::success('Page deleted.');

        return redirect()->to('/');
    }

    public function refresh($id)
    {
        $page = Page::findOrFail($id);
        $page->parse();
        $page->save();
        \Flash::success('Page refreshed. The latest HTML has been rebuilt.');

        return redirect()->to('/wiki/'.$id);
    }
}
