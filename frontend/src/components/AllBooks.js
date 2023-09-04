import React, {useState, useEffect} from "react";
import axios from "axios";


export default function AllBooks(){

    const [books, setBooks] = useState([]);

    useEffect(()=>{
        function getBooks(){
            axios.get("http://localhost:8090/book/").then((res)=>{
                setBooks(res.data);
            }).catch((err)=>{
                alert(err.message);
            })
        }
        getBooks();
    },[])
      

    return(
        <div className="container">
            <h1>All Books</h1>
        </div>
    )
}