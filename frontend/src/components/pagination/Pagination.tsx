
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export const PaginationComponent = ({actualPage, ChangePage}: {actualPage: number, ChangePage: (event: React.ChangeEvent<unknown>, value: number) => void}) => {

    return (
        <Stack spacing={2}>
          <Pagination count={10} page={actualPage} onChange={ChangePage} variant="outlined" shape="rounded" size='large' />
        </Stack>
    );
    }

