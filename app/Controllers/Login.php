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
			} else{

				$msg[] = "Wrong credentials";
			}
			
		}


		echo view('login', $data);
	}
	
}
