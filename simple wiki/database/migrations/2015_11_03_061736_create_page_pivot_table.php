<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;

class CreatePagePivotTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('page_pivot', function (Blueprint $table) {
            $table->integer('parent_id')->unsigned();
            $table->integer('child_id')->unsigned();

            $table->foreign('parent_id')->references('id')->on('pages')
                ->onUpdate('cascade')->onDelete('cascade');
            $table->foreign('child_id')->references('id')->on('pages')
                ->onUpdate('cascade')->onDelete('cascade');

            $table->primary(['parent_id', 'child_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('page_pivot');
    }
}
