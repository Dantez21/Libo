<?php

namespace App\Controllers;
use CodeIgniter\Config\Services;

class UserProfile extends BaseController
{

	protected $_session;

	public function initController(\CodeIgniter\HTTP\RequestInterface $request, \CodeIgniter\HTTP\ResponseInterface $response, \Psr\Log\LoggerInterface $logger)
	{
		parent::initController($request, $response, $logger);

		$this->_session = Services::session(); 
	}
	
	public function index()
	{
		
		echo view('user');
	}

}