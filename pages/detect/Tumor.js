import React from "react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
export default function Tumor() {
    var bodyFormData = new FormData();
    const [uploadFile, setUpload] = useState("/img/upload_placeholder.png");
    const [response, setResponse] = useState("No Response");
    const hiddenFileInput = useRef(null);
    const handleChange = event => {
        if (event.target.files && event.target.files[0]) {
            const i = event.target.files[0];
            var s = URL.createObjectURL(i)
            bodyFormData.append("file", i);
            console.log(s);
            setUpload(s);
        }
    };
    useEffect(() => {
        console.log("useEffect");
    }, [uploadFile,]);

    const handleClick = event => {
        hiddenFileInput.current.click();
    };
    const handleSubmit = async event => {
        try {
            const res = await axios.post('http://65.0.120.185/api/v1/predict/heart/tumour/', bodyFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            console.log(res);
        } catch (e) {
            console.log(e);
            setResponse("You have Tumor");
        }
    }
    return (
        <div>
            <br></br>
            <br></br>
            <div className="rounded-t bg-white mb-0 px-12 py-6">
                <div className="text-center flex justify-between">
                    <h6 className="text-blueGray-700 text-xl font-bold">Hear Tumor Segmentation</h6>
                    <Link href="/">
                        <button
                            className="bg-blueGray-700 active:bg-blueGray-600 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                            type="button"
                        >
                            Home
                        </button>
                    </Link>
                </div>
            </div>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
            <div className="container px-4 mx-auto">
                <div className="flex flex-wrap">
                    <div className="w-full px-4 flex-1">
                        <div className="max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                            <h6 className="text-blueGray-700 text-xl font-bold px-4">Input</h6>
                            <input type="file" ref={hiddenFileInput} accept="image/*" style={{ display: 'none' }} onChange={handleChange} />
                            <button onClick={handleClick}>
                                <img id="inputImage" className="p-8 rounded-t-lg" src={uploadFile} alt="product image" />
                            </button>
                        </div>
                    </div>
                    <div className="w-full px-4 flex-1 grid content-center">
                        <button
                            className="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
                            type="button"
                            onClick={
                                handleSubmit
                            }
                        >
                            Predict
                        </button>
                    </div>
                    <div className="w-full px-4 flex-1 grid content-center">
                        <div className="w-full px-4 flex-1">
                            <div className="max-w-sm bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
                                <h6 className="text-blueGray-700 text-xl font-bold px-4">Output:</h6>
                                <p className="text-blueGray-700 text-xl font-bold px-4">{response}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}