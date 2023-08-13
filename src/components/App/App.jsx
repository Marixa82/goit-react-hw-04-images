
// import React, { Component } from "react";
import { AppSheet } from "./App.styled";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from "../Searchbar/Searchbar";
import {CreateGallery} from "../ImageGallery/ImageGallery";
import { Button } from "../Button/Button";
import { Loader } from "../Loader/Loader";
import * as API from 'services/api'
import { useEffect, useState } from "react";

 export default function App ()  {
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [hits, setHits] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [BtnLoadMore, setBtnLoadMore] = useState(true);
  
  
   useEffect(() => {
     if (searchQuery === '') {
      return;
    }
     const fetchData = async () => {
       setIsLoading(true);
       try {
         const data = await API.fetchAllData(searchQuery, page);
         const totalPages = Math.ceil(data.totalHits / 12);
      
         if (data.hits.length === 0) {
           toast.error("Sorry! There are no images matching your search query. Try again.")
          } 
         setHits(hits => [...hits, ...data.hits]);

         if (page === 1) {
           toast.success(`Wonderful! We found ${data.totalHits} images! Continue`);
           return;
         } else {
           setTimeout(() => scroll(), 100);
         }
         if (page >= totalPages) {
           toast.info("Sorry! This is the end of search results! Ok");
           setBtnLoadMore(false);
          }
         if (page < totalPages) {
          setBtnLoadMore(true);
        }
       }catch (error) {
         Error(true, Error);
       }finally {
         (setIsLoading(false));
        }
     };
     fetchData();
   },[searchQuery, page]);
   
   const scroll = () => {
    const { clientHeight } = document.documentElement;
    window.scrollBy({
      top: clientHeight - 180,
      behavior: 'smooth',
    });
  }
const handleSearchQuery = (searchQuery) => {
    setSearchQuery(searchQuery);
    setPage(1);
    setHits([]);
  };
const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  }
  return (
      <>
        <Searchbar onSubmit={handleSearchQuery} />
        <AppSheet>
          {hits.length !== 0 && <CreateGallery hits={hits} />}
          {isLoading ? (<Loader />) :
            (BtnLoadMore && hits.length!==0 &&<Button onLoadMore={handleLoadMore} />)}
          </AppSheet>
        <ToastContainer autoClose={3000} />
      </>
    )
  }


