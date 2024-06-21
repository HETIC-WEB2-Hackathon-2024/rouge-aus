import { useAuth0 } from "@auth0/auth0-react";
import { Box } from "@mui/material";
import React from "react";
import {authenticatedGet, authenticatedPost} from "../auth/helper";
import "./offre.scss";
import { DashboardBox } from "../components/cards/DashboardBox";
import Alert from '@mui/material/Alert';
import SimpleBackdrop from "../components/loader/Backdrop";
import { PaginationComponent } from "../components/pagination/Pagination";
import { SearchComponent } from "../components/Search";


export function Offre() {
  const { getAccessTokenSilently, user } = useAuth0();
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<any[]>([]);
  const [searchData, setSearchData] = React.useState<any[]>([]);
  const [error, setError] = React.useState<string | null>(null);
  const [search, setSearch] = React.useState<string>("");
  const [Noresult, setNoResult] = React.useState<boolean>(false);
  const [actualPage, setActualPage] = React.useState<number>(1);
  const [isFocus, setIsFocus] = React.useState<boolean>(false);
  const [totalPages, setTotalPages] = React.useState<number>(0);
  const [searchLieu, setSearchLieu] = React.useState<string>("");
  const [searchContrat, setSearchContrat] = React.useState<string>("");
  const [favoriteOffreList, setFavoriteOffreList] = React.useState(null);
  const [changes, setChanges] = React.useState(false)
  React.useEffect(() => {
    async function callApi() {
      try {
        setError(null);
        setLoading(true);
        window.scrollTo(0, 0);
        const token = await getAccessTokenSilently();
        const userInfos = await authenticatedPost(token, "v1/candidats/", {email: user?.email} )
        const document = await authenticatedGet(token, `/v1/offres/${actualPage}/16`);
        const favoriteList = await authenticatedPost(token, "v1/getfavoris/", {user_id : userInfos.id})
          console.log('favoriteList', favoriteList)
        setFavoriteOffreList(favoriteList)
        setData(document.offres);
        setTotalPages(document.NumberPageTotal);
        console.log(document)
      } catch (error) {
        setError(`Error from web service: ${error}`);
      } finally {
        setLoading(false);
      }
    }
    callApi();
  }, [getAccessTokenSilently, actualPage, changes]);

    const handleChange = () => {
        setChanges(prevState => !prevState);
    };



  const searchOffres = async (search: string) => {
   try {
    setError(null);
    if(search === "") return;
    setNoResult(false)
    setLoading(true);
    const token = await getAccessTokenSilently();
    const url = `/search/${search}/${searchLieu===""?"null":searchLieu}/${searchContrat===""?"null":searchContrat}/${actualPage}`;
    //enlevez si ya deux slash
    const urlTraite = url.replace(/\/+/g, "/")
    const document = await authenticatedGet(token, urlTraite);
    if(document.error){
      setSearchData([
       "Aucun résultat trouvé"
      ])
      setNoResult(true)
    
      setLoading(false)
      return;
    }
    setSearchData(document.offres);
    setTotalPages(document.NumberPageTotal);
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

    const isFavorite = (offreId: number) => {
        // Use the some() method to check if any element in favoriteOffreList matches the offreId
        const isFav = favoriteOffreList?.some((el) => el.id === offreId);
        return isFav;
    }

    console.log("la requête a abouti");
    return (
      <Box>
       <SearchComponent search={search} setSearch={setSearch} setIsFocus={setIsFocus} isFocus={isFocus} searchOffres={searchOffres} lieu={searchLieu} setLieu={setSearchLieu} contrat={searchContrat} setContrat={setSearchContrat} loading={loading} Noresult={Noresult} />
       <div className="titre_dashboard">
          <h1>Recherchez votre stage idéal</h1>
          <h2>Retrouvez les stages de vos rêves</h2>
        </div>
       { !loading ? <ul className="dashboard_box_container large">
        {
          Noresult? 
         <><div className="no_result">
            Aucun résultat trouvé
          </div>
           {
            data.map((offre, index) => {
              return <DashboardBox key={index} offre={offre} favorite={isFavorite(offre.id)} handleChange={handleChange}/>
            })
           }
          </> 
           : searchData.length > 0 ? searchData.map((offre, index) => {
            return(
            
              <DashboardBox key={index} offre={offre} favorite={isFavorite(offre.id)} handleChange={handleChange}/>
            
            )
           
          }) : data.length > 0 ? data.map((offre, index) => {
            return <DashboardBox key={index} offre={offre} favorite={isFavorite(offre.id)} handleChange={handleChange}/>
          }) : <SimpleBackdrop />

        }
          
        </ul>
        : error ? <Alert severity="error">{error}</Alert> : <SimpleBackdrop />

        }
        <div className="pagination_container">
        <PaginationComponent actualPage={actualPage} ChangePage={ChangePage} count={totalPages} />
        </div>
       
      </Box>
    );
  
}