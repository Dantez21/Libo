<?php 

namespace App\Filters;
use CodeIgniter\Filters\FilterInterface;
use CodeIgniter\HTTP\RequestInterface;
use CodeIgniter\HTTP\ResponseInterface;
use Config\Services;

class Auth implements FilterInterface
{
    public function before(RequestInterface $request, $arguments = null)
    {
        $session = Services::session();
    
        if ($session->has('userID'))
        {
            if ($request->uri->getPath() ==  'login' || $request->uri->getPath() == 'login/login_check' || $request->uri->getPath() == 'register')
            {
                return redirect()->to( base_url().'/home');
            }
            if ($request->uri->getSegment(1) == 'admin')
            {
                 return redirect()->back();
            }
        } 
        else
        {
            if ($request->uri->getPath() != 'login/login_check' && $request->uri->getPath() != 'login' && $request->uri->getPath() != 'register' && $request->uri->getPath() != 'register/save')
            {
                return redirect()->to(base_url().'/login');
            }
        }
    }

    public function after(RequestInterface $request, ResponseInterface $response, $arguments = null)
    {
    }

} 

?>