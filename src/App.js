/* eslint-disable */ 

import React, {useState, useEffect} from 'react';
import FileUploadScreen from './FileUploadScreen';
import {getSingleFiles, getMultipleFiles} from './data/api';
import axios from 'axios'
 
function App() {
  const [singleFiles, setSingleFiles] = useState([]);
  const [multipleFiles, setMultipleFiles] = useState([]);

  const getSingleFileslist = async () => {
    try {
        const fileslist = await getSingleFiles();
        setSingleFiles(fileslist);
    } catch (error) {
      console.log(error);
    }
  }
  const getMultipleFilesList = async () => {
    try {
        const fileslist = await getMultipleFiles();
        setMultipleFiles(fileslist);
        console.log(multipleFiles);
    } catch (error) {
      console.log(error);
    }
  }

  const handleDeleteImage = async (id)=>{
      await axios.delete('https://mernserver.herokuapp.com/api/' + id)
      setSingleFiles(prev=>prev.filter(file=>file._id !== id))
  }

  useEffect(() => {
    getSingleFileslist();
    getMultipleFilesList();
  }, []);

  return (
    <>
        <div className="container">
          <FileUploadScreen getsingle={() => getSingleFileslist()} getMultiple={() => getMultipleFilesList()}/>
       </div> 
       <div className="container-fluid mt-5">
         <div className="row">
           <div className="col-6">
             <h4 className="text-success font-weight-bold">Single Files List</h4>
             <div className="row">
                {singleFiles.map((file, index) => 
                  <div className="col-6">
                    <div className="card mb-2 border-0 p-0">
                      <img src={`https://mernserver.herokuapp.com/${file.filePath}`} height="200" className="card-img-top img-responsive" alt="img"/>
                      <button size="small" variant="contained" color="secondary" onClick={() => handleDeleteImage(file._id)}>Delete</button>
                      </div>
                  </div>
                )}
             </div>
           </div>
           <div className="col-6">
             <h4 className="text-success font-weight-bold">Multiple Files List</h4>
             {multipleFiles.map((element, index) =>
                <div key={element._id}>
                    <h6 className="text-danger font-weight-bold">{element.title}</h6>
                    <div className="row">
                      {element.files.map((file, index) =>
                        <div className="col-6">
                            <div className="card mb-2 border-0 p-0">
                              <img src={`https://mernserver.herokuapp.com/${file.filePath}`} height="200" className="card-img-top img-responsive" alt="img"/>
                              </div>
                          </div>
                       )}
                      </div>
                </div>
              )}
           </div>
         </div>
       </div>
    </>
  );
}

export default App;
