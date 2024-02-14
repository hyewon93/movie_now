import { Button } from '@mui/material';

const TabButton = ({tabName, currentTab, setCurrentTab}) => {
  return (
    <Button
        className={currentTab === tabName ? "tabButton active" : "tabButton"}
        key={tabName}
        onClick={() => setCurrentTab(tabName)}
        sx={{ m: 2, color: 'white', display: 'block', fontWeight: 'bold' }}
    >
        {tabName}
    </Button>
  )
}

export default TabButton