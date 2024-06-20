
import React from 'react';
import { authenticatedGet } from '../auth/helper';
export const SearchComponent = ({search, setSearch, searchResult, setSearchResult, token}: {search: string, setSearch: (value: string) => void, searchResult: any, setSearchResult: (value: any) => void, token: string}) => {
    const [loading, setLoading] = React.useState<boolean>(false);
    const [Noresult, setNoResult] = React.useState<boolean>(false);
    const handleSearchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {  
        setSearch(event.target.value);
    };
    const searchOffres = async (search: string) => {
        try {
            if(search === "") return;
            setNoResult(false)
            setLoading(true);
            const document = await authenticatedGet(token, `/v1/offres/search/${search}`)
            if(document.error){
                setSearchResult([
                    "Aucun résultat trouvé"
                ])
                setNoResult(true)
                setLoading(false)
                return;
            }
            setSearchResult(document);
        }
        catch(error){
            console.error(error);
        }
        finally{
            setLoading(false);
        }
    }
    return (
        <div className="search_container">
            <input type="text" placeholder="Rechercher un emploi" value={search} onChange={handleSearchChange} className="search_input" />
            <button onClick={() => searchOffres(search)} className="search_button">Rechercher</button>
            {loading && <p>Chargement...</p>}
            {Noresult && <p>Aucun résultat trouvé</p>}
        </div>
    );
}