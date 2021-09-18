<?php

namespace App\Controllers;

use App\Models\BookModel;

 class Books extends BaseController{

	protected $_bookModel;

	public function initController(\CodeIgniter\HTTP\RequestInterface $request, \CodeIgniter\HTTP\ResponseInterface $response, \Psr\Log\LoggerInterface $logger)
	{
		parent::initController($request, $response, $logger,);

		$this->_bookModel = new BookModel();
	}

	// function index()
	// {
	// 		echo view('books');
	// }

	public function index(){
		return view('books');
	}

	public function getBooks(){

		$request = service('request');
		$postData = $request->getPost();
		$dtpostData = $postData['data'];
		$response = array();
		
		
   
		## Read value
		$draw = $dtpostData['draw'];
		$start = $dtpostData['start'];
		$rowperpage = $dtpostData['length']; // Rows display per page
		$columnIndex = $dtpostData['order'][0]['column']; // Column index
		$columnName = $dtpostData['columns'][$columnIndex]['data']; // Column name
		$columnSortOrder = $dtpostData['order'][0]['dir']; // asc or desc
		$searchValue = $dtpostData['search']['value']; // Search value
   
		## Total number of records without filtering
		$books = new Books();
		$totalRecords = $books->select->getPost('id')
						->countAllResults();
   
		## Total number of records with filtering
		$totalRecordwithFilter = $books->select->getPost('id')
			   ->orLike('name', $searchValue)
			   ->orLike('author', $searchValue)
			   ->orLike('description', $searchValue)
			   ->countAllResults();
   
		## Fetch records
		$records = $books->select->getPost('*')
			   ->orLike('name', $searchValue)
			   ->orLike('author', $searchValue)
			   ->orLike('description', $searchValue)
			   ->orderBy($columnName,$columnSortOrder)
			   ->findAll($rowperpage, $start);
   
		$data = array();
   
		foreach($records as $record ){
   
		   $data[] = array( 
			  "id"=>$record['id'],
			  "name"=>$record['book_name'],
			  "author"=>$record['book_author'],
			  "description"=>$record['book_description']
		   ); 
		}
   
		## Response
		$response = array(
		   "draw" => intval($draw),
		   "iTotalRecords" => $totalRecords,
		   "iTotalDisplayRecords" => $totalRecordwithFilter,
		   "aaData" => $data,
		   "token" => csrf_hash() // New token hash
		);
   
		return $this->response->setJSON($response);
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

