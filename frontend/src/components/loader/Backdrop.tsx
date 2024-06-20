import CircularProgress from '@mui/material/CircularProgress';

export default function SimpleBackdrop() {


  return (
    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>

        <CircularProgress color="inherit" />
    </div>
  );
}
