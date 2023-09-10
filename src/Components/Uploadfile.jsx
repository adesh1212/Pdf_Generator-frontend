import React, { useRef, useState } from 'react'
import axios from 'axios';
import { saveAs } from 'file-saver';
import '../App.css'
import { ToastContainer,toast } from 'react-toastify';

function Uploadfile() {
    const [files, setFiles] = useState([]);
    const fileName = useRef(null);
    // const server = 'http://localhost:5000';
    const server = 'https://pdf-generator-ntrb.onrender.com';
    // useEffect(() => {
    //     console.log(fileName.current);
    // }, [files])

    function handleChange(e) {
        // console.log(e.target.files[0]);
        if (e.target.files[0]) {
            const name=fileName.current.value.substr(fileName.current.value.length-3); 
            if(name !== 'png' && name!=='jpg' && name!=='jpeg'){
                toast.error('Please upload image in png/jpg format');
                fileName.current.value = '';
                return;
            }
            setFiles(prev => {
                return [...prev, e.target.files[0]]
            })
        }
    }

    async function handleSubmit() {
        try {
            const formData = new FormData();
            
            if(files.length === 0){
                toast.error('Please upload images.');
                return;
            }
            files.map((file) => {
                return formData.append("images", file);
            })

            // console.log(formData);

            const response = await axios.post(`${server}/merge-images`, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                responseType: 'arraybuffer'
            })

            // console.log(response);
            const data = await response.data;

            const pdfBlob = new Blob([data], { type: 'application/pdf' })
            // console.log(pdfBlob);

            saveAs(pdfBlob, 'result.pdf');

            setFiles([]);
            fileName.current.value = '';


        } catch (error) {
            console.log(error);
        }
    }

    function handleDelete(i) {
        const name=fileName.current.value.substr(12); 
        // console.log(name)

        if(name === files[i].name){
            fileName.current.value='';
        }
        const new_files = files.filter((file, index) => {
            return index !== i;
        })
        setFiles(new_files);

        if (new_files.length === 0) {
            fileName.current.value = '';
        }
    }

    return (
        <div>
            <div className='py-4 mb-2 text-blue-700 shadow-md border'>
                <h1 className='font-bold text-4xl'>FREE PDF GENERATOR</h1>
            </div>
            <div className='border max-w-[400px] md:mx-auto mx-4 flex flex-col px-6 shadow-md'>
                <div className=''>
                    <div className='my-4'>
                        <label className="block mb-2 text-lg font-medium" htmlFor="file_input">Upload File</label>
                        <input type="file" ref={fileName} id='file_input' name='images' onChange={handleChange} className='rounded-md border border-gray-200 w-full text-base px-2 py-1 focus:outline-none focus:ring focus:border-blue-600 cursor-pointer' multiple required />
                    </div>
                    {
                        files.length > 0 ?
                            <div>
                                <h2 className='block mb-2 text-lg font-medium'>Selected Files</h2>
                                {
                                    files.map((file, index) => {
                                        return (
                                            <div key={index} className='flex items-center border my-2 justify-between'>
                                                <div className='py-2 px-4'>
                                                    {file.name}
                                                </div>
                                                <div className='border-l h-[100%] py-2 px-4 cursor-pointer bg-black text-white   ' onClick={() => {
                                                    handleDelete(index)
                                                }
                                                }>
                                                    X
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                            </div> : null
                    }

                </div>
                <div className='my-4'>
                    <button className='cursor-pointer bg-blue-600 rounded-md text-white px-4 py-2 hover:bg-blue-700' onClick={handleSubmit}>Create Pdf</button>
                </div>

            </div>
            <ToastContainer />
        </div>
    )
}

export default Uploadfile