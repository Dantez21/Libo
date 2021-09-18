<?php
namespace App\Models;

use CodeIgniter\Model;

class Lecturer extends Model
{
	protected $table      = 'lecturers';
	protected $primaryKey = 'lecturerID';
	protected $returnType = 'object';

	protected $allowedFields = ['institution','specialization', 'personID'];

	protected $useTimestamps = true;
	protected $dateFormat = 'int';
    protected $useSoftDeletes = false;
	
	protected $createdField  = 'created_at';
	protected $updatedField  = 'updated_at';
	protected $deletedField  = 'deleted_at';

}
