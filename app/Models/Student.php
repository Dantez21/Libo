<?php
namespace App\Models;

use CodeIgniter\Model;

class Student extends Model
{
	protected $table      = 'students';
	protected $primaryKey = 'studentID';
	protected $returnType = 'object';

	protected $allowedFields = ['regNo','institution','course', 'personID'];

	protected $useTimestamps = true;
	protected $dateFormat = 'int';
    protected $useSoftDeletes = false;
	
	protected $createdField  = 'created_at';
	protected $updatedField  = 'updated_at';
	protected $deletedField  = 'deleted_at';

}
