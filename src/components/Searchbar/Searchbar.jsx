
import { SearchbarHead, SearchForm,SearchFormBtn, SearchFormBtnLabel,SearchFormInput } from './Searchbar.styled';
import { toast } from 'react-toastify';
import { useState } from "react";
import { ImSearch } from 'react-icons/im';
import PropTypes from "prop-types";



export default function Searchbar ({onSubmit}) { 
    const [searchQuery, setSearchQuery] = useState('')
    
    const handleNameChange = event => {
    setSearchQuery(event.currentTarget.value.toLowerCase());
    
  };
    const handleSubmit = e => {
        e.preventDefault();
        if (searchQuery.trim() === '') {
      toast.info("Please! Enter your search query! Ok");
            return;
        }
        onSubmit(searchQuery)
        setSearchQuery('')
    }

    
        return (
        <SearchbarHead>
                <SearchForm onSubmit={handleSubmit} >
                    <SearchFormBtn type="submit" ><ImSearch style= {{marginRight: 2,marginTop:4,width:25,height:25}}/>
                   <SearchFormBtnLabel>Search</SearchFormBtnLabel>
            </SearchFormBtn>
                    <SearchFormInput
                    type="text"
                            name="searchQuery"
                            value={searchQuery}
                    onChange={handleNameChange}
                        autoComplete="off"
                        autoFocus
              placeholder="Search images and photos"
            />
                </SearchForm>
            </SearchbarHead>
          )
    }
    
Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

      
        