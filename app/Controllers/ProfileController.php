<?php

namespace App\Controllers;
use CodeIgniter\Config\Services;

class ProfileContoller extends BaseController
{

	protected $_session;

	public function initController(\CodeIgniter\HTTP\RequestInterface $request, \CodeIgniter\HTTP\ResponseInterface $response, \Psr\Log\LoggerInterface $logger)
	{
		parent::initController($request, $response, $logger);

		$this->_session = Services::session(); 
	}
	
	public function index()
	{
		$session = session();

		echo "Hello : ".$session->get('username');
	}

}