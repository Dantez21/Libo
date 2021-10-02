<?php

namespace App\Controllers;

use App\Models\People;
use CodeIgniter\Config\Services;

class Login extends BaseController
{
	
	protected $_personModel, $_session;

	public function initController(\CodeIgniter\HTTP\RequestInterface $request, \CodeIgniter\HTTP\ResponseInterface $response, \Psr\Log\LoggerInterface $logger)
	{
		parent::initController($request, $response, $logger);

		$this->_personModel = new People();

		$this->_session = Services::session();

	}


	public function index()
	{

		$data = array();
	
		if($this->request->getPost('username') != ""){

			$username = $this->request->getPost('username');

			$password = md5($this->request->getPost('password'));

			if($this->_personModel->where('userName', $username)->where('password', $password)){

				$personID = $this->_personModel->where('userName', $username)->where('password', $password)->first()->personID;         

				$this->_session->set('userID', $personID);

				return redirect()->to(base_url().'/home');
			} 
			
		}
		// else{
		// 	msg = ('$error', 'Invalid Credentials');
			
		// }
		$rules =[
			'username' =>'required|valid_username',
			'password' =>'required|validateUser[username,password]',
		];
		$errors = [
			'password' =>[
				'validateUser' => 'username or password dont match'
			]
		];
		if(! $this->validate($rules, $errors)){
			$data['validation']=$this->validator;
		}else{
			$_personModel=new People();
		}
		

		echo view('login', $data);
	}
		
}
