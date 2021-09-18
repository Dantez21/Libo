<?php
namespace App\Models;

use CodeIgniter\Model;

class BookModel extends Model
{
	
	protected $table      = 'books';
	protected $primaryKey = 'bookID';
	protected $returnType = 'object';

	protected $allowedFields = ['name', 'author', 'datePublished','type','bookUrl'];

	protected $useTimestamps = true;
	protected $dateFormat = 'int';
    protected $useSoftDeletes = false;

	protected $createdField  = 'created_at';
	protected $updatedField  = 'updated_at';
	protected $deletedField  = 'deleted_at';

	// protected $validationRules = [];
    //  protected $validationMessages = [];
    //  protected $skipValidation = false;
    //  protected $cleanValidationRules = true;

	// protected $allowCallbacks = true;
    // protected $beforeInsert = [];
    // protected $afterInsert = [];
    // protected $beforeUpdate = [];
    // protected $afterUpdate = [];
    // protected $beforeFind = [];
    // protected $afterFind = [];
    // protected $beforeDelete = [];
    // protected $afterDelete = [];

}