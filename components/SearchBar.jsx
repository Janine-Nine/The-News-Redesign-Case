import "./SearchBar.css";
import { MagnifyingGlass } from "phosphor-react";

function SearchBar({

    placeholder = "Pesquisar notícias..."

}) {

    return (

        <div className="search-bar">

            <MagnifyingGlass
                size={20}
            />

            <input
                type="text"
                placeholder={placeholder}
            />

        </div>

    );

}

export default SearchBar;