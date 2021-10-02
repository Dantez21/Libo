<?php

namespace App\Controllers;

use App\Models\BookModel;

use App\Models\People;

 class Books extends BaseController{

	protected $_bookModel, $_personModel;

	public function initController(\CodeIgniter\HTTP\RequestInterface $request, \CodeIgniter\HTTP\ResponseInterface $response, \Psr\Log\LoggerInterface $logger)
	{
		parent::initController($request, $response, $logger,);

		$this->_bookModel = new BookModel();

		$this->_personModel = new People();
	}

	// function index()
	// {
	// 		echo view('books');
	// }

	public function index(){
		return view('books');
	}

	public function getBooks(){

		$limit = $this->request->getVar('length');

		$offset = $this->request->getVar('start');

		$search = $this->request->getVar('search');

		$users = $this->_personModel->
			groupStart()->
				like('firstName', $search['value'])->
				orLike('lastName', $search['value'])->
				orLike('email', $search['value'])->
				orLike('userName', $search['value'])->
			groupEnd()
		
		->findAll($limit, $offset);

		// var_dump($users);

		$result = array();

		$counter = 1;

		foreach ($users as $user) {
			
			$result[] = array(
				$counter,
				$user->firstName." ".$user->lastName,
				$user->firstName,
				$user->email,
				$user->userName
			);

			$counter++;

		}
		

		$data = array(
			"recordsTotal" => sizeof($users),
			"recordsFiltered" => sizeof($result),
			"data" => $result
		);

		// var_dump($data);

		echo json_encode($data);

	  }
   }

	// function save( $bookID = -1){

	// 	$bookData = array(
	// 		'name' => $this->request->getPost('book_name'),
	// 		'author' => $this->request->getPost('book_author'),
	// 		'description' => $this->request->getPost('book_description'),
	// 	);

	// 	if($this->_bookModel->save($bookData)){

	// 		echo "book saved successfully";
	// 	} else{

	// 		echo 'Failed to save book';
	// 	}


	// }

	// public function getBookInfo($bookID)
	// {
	// 	$bookInfo = $this->_bookModel->where('BookId', $bookID)->first();

	// 	var_dump($bookInfo);
	// }


