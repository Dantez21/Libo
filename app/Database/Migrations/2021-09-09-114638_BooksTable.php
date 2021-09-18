<?php

namespace App\Database\Migrations;

use CodeIgniter\Database\Migration;

class BooksTable extends Migration
{
	public function up()
	{
		$this->forge->addField([
			'id' => [
				'type' => 'INT',
				'constraint' => 5,
				'unsigned' => true,
				'auto_increment' => true,
			],
			'name' => [
				'type' => 'VARCHAR',
				'constraint' => '100',
			],
			'author' => [
				'type' => 'VARCHAR',
				'constraint' => '100',
			],
			'description' => [
				'type' => 'VARCHAR',
				'constraint' => '100',
			],
		 ]);
		 $this->forge->addKey('id', true);
		 $this->forge->createTable('books');
	  
	}

	public function down()
	{
		$this->forge->dropTable('books');
	}
}
