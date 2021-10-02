<?php

namespace App\Controllers;

use App\Models\People;
use App\Models\Student;
use App\Models\Lecturer;

 class Register extends BaseController{

	protected $_peopleModel, $_studentModel;

	public function initController(\CodeIgniter\HTTP\RequestInterface $request, \CodeIgniter\HTTP\ResponseInterface $response, \Psr\Log\LoggerInterface $logger)
	{
		parent::initController($request, $response, $logger);

		$this->_peopleModel = new People();
		$this->_studentModel = new Student();
		$this->_lecturerModel = new Lecturer();
	}

	function index()
	{
			echo view('register');
	}

	function save( $personID = -1){

		$userType = $this->request->getPost('user-type');

		$userType == "Student"? $role = 'student' : $role = "lecturer";

		$personData = array(
			'firstName' => $this->request->getPost('fname'),
			'lastName' => $this->request->getPost('lname'),
			'email' => $this->request->getPost('email'),
			'phoneNumber' => $this->request->getPost('phone-no'),
			'userName' => $this->request->getPost('username'),
			'password' => md5($this->request->getPost('password')),
			'role' => $role,

		);

		if($userType == "Student"){

			if($this->_peopleModel->save($personData)){

				$username = $this->request->getPost('username');

				$personID = $this->_peopleModel->where('username', $username)->first()->personID;
				
				$studentData = array(
					'personID' => $personID,
					'regNo' => $this->request->getPost('admno'),
					'institution' => $this->request->getPost('institution'),
					'course' => $this->request->getPost('course'),
					
				);

				if($this->_studentModel->save($studentData)){

					$studentID = $this->_studentModel->where('personID', $personID)->first()->studentID;

					echo json_encode(array('success' => true, 'message' => "student saved successfully", 'studentID'  => $studentID));
				} else{

					echo json_encode(array('success' => false, 'message' => "Failed to save student"));
				}

			} else{

				echo json_encode(array('success' => false, 'message' => "Failure!!! User was not saved"));

			}
		} 

		if($userType == "Lecturer"){

			if($this->_peopleModel->save($personData)){

				$username = $this->request->getPost('username');

				$personID = $this->_peopleModel->where('username', $username)->first()->personID;
				
				$lecturerData = array(
					'personID' => $personID,
					'institution' => $this->request->getPost('institution'),
					'specialization' => $this->request->getPost('specialization'),
					
				);

				if($this->_lecturerModel->save($lecturerData)){

					$lecturerID = $this->_lecturerModel->where('personID', $personID)->first()->lecturerID;

					echo json_encode(array('success' => true, 'message' => "lecturer saved successfully", 'lecturerID'  => $lecturerID));
				} else{

					echo json_encode(array('success' => false, 'message' => "Failed to save lecturer"));
				}

			} else{

				echo json_encode(array('success' => false, 'message' => "Failure!!! User was not saved"));

			}
				
		}

	

	}

	public function getUserInfo($personID)
	{
		$userInfo = $this->_registerModel->where('UserId', $personID)->first();

		var_dump($userInfo);
	}
}