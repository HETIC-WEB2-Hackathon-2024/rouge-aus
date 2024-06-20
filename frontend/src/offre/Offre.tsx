import { useAuth0 } from "@auth0/auth0-react";
import { Box, TextField } from "@mui/material";
import React from "react";
import { authenticatedGet } from "../auth/helper";
import "./offre.scss";
import { DashboardBox } from "../components/cards/DashboardBox";
import Alert from '@mui/material/Alert';
import SimpleBackdrop from "../components/loader/Backdrop";
import { PaginationComponent } from "../components/pagination/Pagination";


export function Offre() {
  const { getAccessTokenSilently } = useAuth0();
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<any[]>([]);
  const [searchData, setSearchData] = React.useState<any[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [search, setSearch] = React.useState<string>("");
  const [Noresult, setNoResult] = React.useState<boolean>(false);
  const [actualPage, setActualPage] = React.useState<number>(1);
  const [isFocus, setIsFocus] = React.useState<boolean>(false);
  React.useEffect(() => {
    async function callApi() {
      try {
        setLoading(true);
        window.scrollTo(0, 0);
        const token = await getAccessTokenSilently();
        const document = await authenticatedGet(token, `/v1/offres/${actualPage}/16`);
        setData(document);
        console.log(document);
      } catch (error) {
        setError(`Error from web service: ${error}`);
      } finally {
        setLoading(false);
      }
    }
    callApi();
  }, [getAccessTokenSilently, actualPage]);

  const handleSearchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {  
        setSearch(event.target.value);
  };

  const searchOffres = async (search: string) => {
   try {
    if(search === "") return;
    setNoResult(false)
    setLoading(true);
    const token = await getAccessTokenSilently();
    const document = await authenticatedGet(token, `/v1/offres/search/${search}`)
    if(document.error){
      setSearchData([
       "Aucun résultat trouvé"
      ])
      setNoResult(true)
      setLoading(false)
      return;
    }
    setSearchData(document);
    console.log(document)

  }
  catch(error){
    console.error(error);
  }
  finally{
    setLoading(false);
  }
  }

  const ChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    event.preventDefault();
    setActualPage(value);
  }


    console.log("la requête a abouti");
    return (
      <Box>
        <div className={`search_container ${isFocus ? "focus" : ""}`}>
         <input value={search} onChange={handleSearchChange} placeholder="Cherche ton Stage" onFocus={() => setIsFocus(true)} onBlur={() => setIsFocus(false)} />
          <button onClick={() => searchOffres(search)}>Rechercher</button>
        </div>
       { !loading ? <ul className="dashboard_box_container large">
        {
          Noresult? <div>{searchData[0]}</div> : searchData.length > 0 ? searchData.map((offre, index) => {
            return <DashboardBox key={index} offre={offre} />
          }) : data.map((offre, index) => {
            return <DashboardBox key={index} offre={offre} />
          })

        }
          
        </ul>
        : error ? <Alert severity="error">{error}</Alert> : <SimpleBackdrop />

        }
        <div className="pagination_container">
        <PaginationComponent actualPage={actualPage} ChangePage={ChangePage} />
        </div>
       
      </Box>
    );
  
}