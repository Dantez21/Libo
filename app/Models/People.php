<?php
namespace App\Models;

use CodeIgniter\Model;

class People extends Model
{
	protected $table      = 'people';
	protected $primaryKey = 'personID';
	protected $returnType = 'object';

	protected $allowedFields = ['firstName', 'lastName', 'email', 'phoneNumber','userName','password'];

	protected $useTimestamps = true;
	protected $dateFormat = 'int';
    protected $useSoftDeletes = false;
	
	protected $createdField  = 'created_at';
	protected $updatedField  = 'updated_at';
	protected $deletedField  = 'deleted_at';

}
