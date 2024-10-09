import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from "./pages/Header";
import Landing from "./pages/Landing";
import File from './pages/File';
import Trash from './pages/Trash';
import Favorite from './pages/Favorite';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Learnmore from './pages/Learnmore';


export default function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <ToastContainer />
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route path='/file' element={<File />} />
          <Route path='/dashboard/files' element={<File />} />
          <Route path='/dashboard/favorites' element={<Favorite/>} />
          <Route path='/dashboard/trash' element={<Trash />} />
          <Route path='/learnmore' element={<Learnmore />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}
